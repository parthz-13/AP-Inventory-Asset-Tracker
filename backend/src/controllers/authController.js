import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

export const register = async (req, res) => {
  try {
    const { shop_name, name, email, password } = req.body;

    if (!shop_name || !name || !email || !password) {
      return res.status(400).json({
        error: "shop_name, name, email, and password are required.",
      });
    }

    const existingShopkeeper = await prisma.shopkeeper.findFirst({
      where: {
        OR: [{ email }, { shop_name }],
      },
    });

    if (existingShopkeeper) {
      return res.status(400).json({
        error: "Shop name or email already in use.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newShopkeeper = await prisma.shopkeeper.create({
      data: {
        shop_name,
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      message: "Shopkeeper registered successfully.",
      shopkeeper: {
        id: newShopkeeper.shop_id,
        shop_name: newShopkeeper.shop_name,
        name: newShopkeeper.name,
        email: newShopkeeper.email,
      },
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const shopkeeper = await prisma.shopkeeper.findUnique({
      where: { email },
    });

    if (!shopkeeper) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const isValidPassword = await bcrypt.compare(password, shopkeeper.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign(
      { shop_id: shopkeeper.shop_id, email: shopkeeper.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      shopkeeper: {
        id: shopkeeper.shop_id,
        name: shopkeeper.name,
        email: shopkeeper.email,
        shop_name: shopkeeper.shop_name,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const shopkeeperId = req.user?.shop_id;

    if (!shopkeeperId) {
      return res.status(401).json({ error: "Unauthorized access." });
    }

    const shopkeeper = await prisma.shopkeeper.findUnique({
      where: { shop_id: shopkeeperId },
      select: {
        shop_id: true,
        shop_name: true,
        name: true,
        email: true,
        customers: { select: { cust_id: true, cust_name: true } },
        items: { select: { item_id: true, item_name: true, stock: true } },
        transactions: { select: { transaction_id: true, total_price: true } },
      },
    });

    res.status(200).json(shopkeeper);
  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

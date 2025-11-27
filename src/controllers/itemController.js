import { prisma } from "../config/prisma.js";
export const createItem = async (req, res) => {
  try {
    const shop_id = req.user.shop_id;
    const { item_name, category, stock, price } = req.body;

    if (!item_name || !price) {
      return res.status(400).json({ message: "Item name and price required" });
    }

    const item = await prisma.item.create({
      data: {
        item_name,
        category,
        stock: stock !== undefined ? Number(stock) : 0,
        price: Number(price),
        shop_id,
      },
    });

    res.status(201).json({
      message: "Item created successfully",
      item,
    });

  } catch (error) {
    console.error("Create Item Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const getAllItems = async (req, res) => {
  try {
    const shop_id = req.user.shop_id;

    const items = await prisma.item.findMany({
      where: { shop_id },
      orderBy: { item_id: "desc" },
    });

    res.status(200).json(items);

  } catch (error) {
    console.error("Get All Items Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getItemById = async (req, res) => {
  try {
    const shop_id = req.user.shop_id;
    const item_id = Number(req.params.id);

    const item = await prisma.item.findFirst({
      where: { item_id, shop_id },
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);

  } catch (error) {
    console.error("Get Item Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const updateItem = async (req, res) => {
  try {
    const shop_id = req.user.shop_id;
    const item_id = Number(req.params.id);

    const { item_name, category, stock, price } = req.body;

    // ensure item exists for user
    const exists = await prisma.item.findFirst({
      where: { item_id, shop_id },
    });

    if (!exists) {
      return res.status(404).json({ message: "Item not found" });
    }

    const updated = await prisma.item.update({
      where: { item_id },
      data: {
        item_name,
        category,
        stock: stock !== undefined ? Number(stock) : undefined,
        price: price !== undefined ? Number(price) : undefined
      },
    });

    res.status(200).json({
      message: "Item updated successfully",
      updated,
    });

  } catch (error) {
    console.error("Update Item Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const shop_id = req.user.shop_id;
    const item_id = Number(req.params.id);


    const exists = await prisma.item.findFirst({
      where: { item_id, shop_id },
    });

    if (!exists) {
      return res.status(404).json({ message: "Item not found or unauthorized" });
    }

    await prisma.item.delete({
      where: { item_id },
    });

    res.status(200).json({ message: "Item deleted successfully" });

  } catch (error) {
    console.error("Delete Item Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

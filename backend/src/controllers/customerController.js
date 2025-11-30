import { prisma } from "../config/prisma.js";

export const createCustomer = async (req, res) => {
    try {
        const shop_id = req.user.shop_id;
        const { cust_name, email, phone, address } = req.body;

        if (!cust_name) {
            return res.status(400).json({ message: "Customer name is required" });
        }

        const customer = await prisma.customer.create({
            data: {
                cust_name,
                email,
                phone,
                address,
                shop_id,
            },
        });

        res.status(201).json({
            message: "Customer created successfully",
            customer,
        });

    } catch (error) {
        console.error("Create Customer Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getAllCustomers = async (req, res) => {
    try {
        const shop_id = req.user.shop_id;

        const customers = await prisma.customer.findMany({
            where: { shop_id },
            orderBy: { cust_id: "desc" },
        });

        res.status(200).json(customers);

    } catch (error) {
        console.error("Get Customers Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getCustomerById = async (req, res) => {
    try {
        const shop_id = req.user.shop_id;
        const cust_id = Number(req.params.id);

        const customer = await prisma.customer.findFirst({
            where: { cust_id, shop_id },
        });

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json(customer);

    } catch (error) {
        console.error("Get Customer Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

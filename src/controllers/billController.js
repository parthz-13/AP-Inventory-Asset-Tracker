import { prisma } from "../config/prisma.js";
import { v4 as uuidv4 } from 'uuid';

export const createBill = async (req, res) => {
    try {
        const shop_id = req.user.shop_id;
        const { cust_id, items } = req.body; // items: [{ item_id, qty, price }]

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items in bill" });
        }

        const bill_no = uuidv4().split('-')[0].toUpperCase(); // Simple bill number
        const transactions = [];

        // Use a transaction to ensure all records are created and stock is updated
        await prisma.$transaction(async (tx) => {
            for (const item of items) {
                const { item_id, qty, price } = item;
                const total_price = Number(price) * Number(qty);

                // Create transaction record
                const transaction = await tx.transaction.create({
                    data: {
                        bill_no,
                        qty: Number(qty),
                        item_price: Number(price),
                        total_price,
                        shop_id,
                        cust_id: cust_id ? Number(cust_id) : null,
                        item_id: Number(item_id),
                    },
                });
                transactions.push(transaction);

                // Update stock
                await tx.item.update({
                    where: { item_id: Number(item_id) },
                    data: { stock: { decrement: Number(qty) } },
                });
            }
        });

        res.status(201).json({
            message: "Bill created successfully",
            bill_no,
            transactions,
        });

    } catch (error) {
        console.error("Create Bill Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getAllBills = async (req, res) => {
    try {
        const shop_id = req.user.shop_id;

        const transactions = await prisma.transaction.findMany({
            where: { shop_id },
            include: {
                customer: { select: { cust_name: true } },
                item: { select: { item_name: true } },
            },
            orderBy: { bill_date: "desc" },
        });

        // Group by bill_no
        const bills = {};
        transactions.forEach((t) => {
            if (!bills[t.bill_no]) {
                bills[t.bill_no] = {
                    bill_no: t.bill_no,
                    date: t.bill_date,
                    customer: t.customer?.cust_name || "Walk-in",
                    total: 0,
                    items: [],
                };
            }
            bills[t.bill_no].total += Number(t.total_price);
            bills[t.bill_no].items.push({
                name: t.item.item_name,
                qty: t.qty,
                price: t.item_price,
                total: t.total_price,
            });
        });

        res.status(200).json(Object.values(bills));

    } catch (error) {
        console.error("Get Bills Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

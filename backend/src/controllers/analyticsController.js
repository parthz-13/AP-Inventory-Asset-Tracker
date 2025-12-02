import { prisma } from "../config/prisma.js";

export const getAnalytics = async (req, res) => {
    try {
        const shop_id = req.user.shop_id;

        // 1. Total Sales & Profit
        // We need to fetch transactions and join with items to get cost_price
        const transactions = await prisma.transaction.findMany({
            where: { shop_id },
            include: {
                item: true,
            },
        });

        let totalSales = 0;
        let totalProfit = 0;
        const salesByDate = {};
        const salesByCategory = {};

        transactions.forEach((t) => {
            const saleAmount = Number(t.total_price);
            const costAmount = Number(t.item.cost_price || 0) * t.qty;
            const profit = saleAmount - costAmount;

            totalSales += saleAmount;
            totalProfit += profit;

            // Sales by Date
            const date = new Date(t.bill_date).toISOString().split("T")[0];
            if (!salesByDate[date]) {
                salesByDate[date] = 0;
            }
            salesByDate[date] += saleAmount;

            // Sales by Category
            const category = t.item.category || "Uncategorized";
            if (!salesByCategory[category]) {
                salesByCategory[category] = 0;
            }
            salesByCategory[category] += saleAmount;
        });

        // Format for charts
        const salesChartData = Object.keys(salesByDate).map((date) => ({
            date,
            sales: salesByDate[date],
        })).sort((a, b) => new Date(a.date) - new Date(b.date));

        const categoryChartData = Object.keys(salesByCategory).map((category) => ({
            name: category,
            value: salesByCategory[category],
        }));

        res.status(200).json({
            totalSales,
            totalProfit,
            salesChartData,
            categoryChartData,
        });
    } catch (error) {
        console.error("Analytics Error:", error);
        res.status(500).json({ error: "Failed to fetch analytics data" });
    }
};

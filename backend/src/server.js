import express from "express";
import dotenv from "dotenv";
import { prisma } from "./config/prisma.js";
import authRoutes from "./routes/auth.js";
import itemRoutes from "./routes/items.js";


import cors from "cors";

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error("FATAL ERROR: DATABASE_URL is not defined.");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined.");
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

import billRoutes from "./routes/bills.js";
import customerRoutes from "./routes/customers.js";
import analyticsRoutes from "./routes/analytics.js";

app.use("/items", itemRoutes);
app.use("/bills", billRoutes);
app.use("/customers", customerRoutes);
app.use("/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.send("Inventory & Asset Tracker Backend is Running");
});

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

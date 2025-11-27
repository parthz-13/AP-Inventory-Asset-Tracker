import express from "express";
import dotenv from "dotenv";
import { prisma } from "./config/prisma.js";
import authRoutes from "./routes/auth.js";
import itemRoutes from "./routes/items.js";


import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.use("/items", itemRoutes);

app.get("/", (req, res) => {
  res.send("Inventory & Asset Tracker Backend is Running");
});

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

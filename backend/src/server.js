import express from "express"
import dotenv from "dotenv";
import { PrismaClient } from "../generated/prisma/client.js";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Inventory & Asset Tracker Backend is Running");
});

const PORT = 5000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
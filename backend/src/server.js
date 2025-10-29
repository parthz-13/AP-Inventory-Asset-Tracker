const express = require('express')
const dotenv = require('dotenv')
const { PrismaClient } = require("../generated/prisma/client.js");

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Inventory & Asset Tracker Backend is Running");
});

const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
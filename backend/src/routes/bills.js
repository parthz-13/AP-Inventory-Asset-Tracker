import express from "express";
import { createBill, getAllBills } from "../controllers/billController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createBill);
router.get("/", verifyToken, getAllBills);

export default router;

import express from "express";
import { createCustomer, getAllCustomers, getCustomerById } from "../controllers/customerController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createCustomer);
router.get("/", verifyToken, getAllCustomers);
router.get("/:id", verifyToken, getCustomerById);

export default router;

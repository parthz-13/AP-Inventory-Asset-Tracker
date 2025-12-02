import express from "express";
import { getAnalytics } from "../controllers/analyticsController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAnalytics);

export default router;

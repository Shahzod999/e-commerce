import express from "express";
const router = express.Router();
import { createOrder, getAllOrders, getUserOrders, countTotalOrders, calculateTotalSales, calculateTotalSalesByDate, findOrderById } from "../controllers/orderController.js";

import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

router.route("/").post(authenticate, createOrder).get(authenticate, authorizeAdmin, getAllOrders);

router.route("/mine").get(authenticate, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesByDate);
router.route("/:id").get(authenticate, findOrderById);

export default router;

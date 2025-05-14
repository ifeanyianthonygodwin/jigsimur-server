import express from "express";
import { protectRoute } from "../middleware/auth.Middleware.js";
import { checkoutSuccess, createCheckoutSession } from "../controllers/payment.controller.js";

const router = express.Router();

// Protected route for creating a checkout session
router.post("/create-checkout-session", protectRoute, createCheckoutSession);

// Public route to handle Paystack callback after payment
router.post("/checkout-success", checkoutSuccess);  // No need for protectRoute here

export default router;

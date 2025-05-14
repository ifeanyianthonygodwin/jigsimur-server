import axios from "axios";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import dotenv from "dotenv"

dotenv.config()

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_INITIALIZE_URL = "https://api.paystack.co/transaction/initialize";
const PAYSTACK_VERIFY_URL = "https://api.paystack.co/transaction/verify/";

export const createCheckoutSession = async (req, res) => {
	try {
		const { products, couponCode, email } = req.body;
		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

		let totalAmount = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
		let coupon = null;
		if (couponCode) {
			coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
			if (coupon) {
				totalAmount -= (totalAmount * coupon.discountPercentage) / 100;
			}
		}

		const paystackData = {
			email,
			amount: totalAmount * 100, // Convert to kobo
			callback_url: `${process.env.CLIENT_URL}/purchase-success`,
			metadata: {
				userId: req.user._id,
				couponCode: couponCode || "",
				products: products.map((p) => ({ id: p._id, quantity: p.quantity, price: p.price })),
			},
		};

		const response = await axios.post(PAYSTACK_INITIALIZE_URL, paystackData, {
			headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
		});

		// if (totalAmount >= 2000000000) {
		// 	await createNewCoupon(req.user._id);
		// }

		res.status(200).json({ authorization_url: response.data.data.authorization_url });
	} catch (error) {
		console.error("Error processing checkout:", error);
		res.status(500).json({ message: "Error processing checkout", error: error.message });
	}
};

export const checkoutSuccess = async (req, res) => {
	try {
		const { reference } = req.body;
		const response = await axios.get(`${PAYSTACK_VERIFY_URL}${reference}`, {
			headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
		});

		const payment = response.data.data;
		if (payment.status === "success") {
			if (payment.metadata.couponCode) {
				await Coupon.findOneAndUpdate(
					{ code: payment.metadata.couponCode, userId: payment.metadata.userId },
					{ isActive: false }
				);
			}

			const newOrder = new Order({
				user: payment.metadata.userId,
				products: payment.metadata.products,
				totalAmount: payment.amount / 100, // Convert from kobo to Naira
				paystackReference: reference,
			});

			await newOrder.save();

			res.status(200).json({
				success: true,
				message: "Payment successful, order created, and coupon deactivated if used.",
				orderId: newOrder._id,
			});
		} else {
			res.status(400).json({ error: "Payment verification failed" });
		}
	} catch (error) {
		console.error("Error processing successful checkout:", error);
		res.status(500).json({ message: "Error processing successful checkout", error: error.message });
	}
};

async function createNewCoupon(userId) {
	// await Coupon.findOneAndDelete({ userId });
	// const newCoupon = new Coupon({
	// 	code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
	// 	discountPercentage: 10,
	// 	expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
	// 	userId: userId,
	// });
	// await newCoupon.save();
	// return newCoupon;
	return null
}

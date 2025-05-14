import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import mailRoutes from "./routes/mailsending.js"
import path from "path"


const app = express()
dotenv.config()

const db = process.env.MONGO_DB
const port = process.env.PORT || 5000

const __dirname = path.resolve();
// CORS Configuration
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true, // allow frontend to send cookies
    })
  );
  
app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser())


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/", mailRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


mongoose.connect(db).then(() => {
    console.log("Connected to DB")
}).catch(err => console.log(err))
app.listen(port, () => {
    console.log("Server started on port 5000", db)
})
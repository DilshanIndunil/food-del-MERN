import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import Stripe from "stripe";

// Load environment variables
dotenv.config();

// Initialize Stripe
const stripeInstance = Stripe(process.env.STRIPE_SECRET_KEY);

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connections
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Static files
app.use("/images", express.static('uploads'));

// API routes
app.get("/", (req, res) => {
    res.send("API Working");
});

// Test Stripe endpoint
app.get('/test-stripe', async (req, res) => {
    try {
        // Make a simple request to retrieve your account details
        const account = await stripeInstance.accounts.retrieve();
        res.json({ success: true, account });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: err.message }); // Send error message to client
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Directly initialize Stripe with your secret key
const stripe = Stripe('sk_test_51PmJrFRscdqfHtvmoKdR99M9d6ak0hiAiQz6OFvXjLOOSckjECMaIVcDmRoIeNfOkUhQ8Nq5MTxvKG9YqkttbyJ900DeevF830');

// Place order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5174";


    try {
        // Create a new order
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();

        // Clear user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare line items for Stripe
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 // Convert price to cents
            },
            quantity: item.quantity
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 200 // Delivery charge in cents
            },
            quantity: 1
        });

        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        // Respond with session URL
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.json({ success: false, message: error.message }); // Send the actual error message
    }
};

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success == "true") {
            await orderModel.findOneAndUpdate(orderId, { payement: true });
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paind" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}


//  yser orders for frontend
const userOrders = async (req, res) => {

    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })

    }
}

//  Listing orders fro admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


//  api for updating order status
const updateStatus = async (req, res) => {

    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });


    }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };

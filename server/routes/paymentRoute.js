const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/orderModel'); // Add this line
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post("/process", auth, async (req, res) => {
    try {
        const { orderId, token } = req.body;
        
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Mock payment success (Replace this with actual Stripe implementation)
        order.isDelivered = false;
        order.status = "CONFIRMED";
        const updatedOrder = await order.save();

        res.json({
            message: "Payment successful",
            order: updatedOrder
        });
    } catch (error) {
        console.error('Payment error:', error); // Add error logging
        res.status(400).json({
            message: "Payment failed",
            error: error.message
        });
    }
});

// Get payment status
router.get("/status/:orderId", auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({
            status: order.status,
            isDelivered: order.isDelivered
        });
    } catch (error) {
        res.status(400).json({
            message: "Error fetching payment status",
            error: error.message
        });
    }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Create new order
router.post("/placeorder", auth, async (req, res) => {
    try {
        const newOrder = new Order({
            ...req.body,
            userid: req.user.id
        });
        const savedOrder = await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: savedOrder });
    } catch (error) {
        res.status(400).json({ message: "Error placing order", error: error.message });
    }
});

// Get user orders
router.get("/myorders", auth, async (req, res) => {
    try {
        const orders = await Order.find({ userid: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
});

// Get all orders (Admin only)
router.get("/allorders", [auth, admin], async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
});

// Get order by ID
router.get("/:orderId", auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        // Check if user is admin or order belongs to user
        if (!req.user.isAdmin && order.userid.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to view this order" });
        }
        
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error fetching order", error: error.message });
    }
});

// Update order status (Admin only)
router.put("/:orderId/status", [auth, admin], async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.orderId,
            { 
                status,
                deliveredAt: status === 'DELIVERED' ? Date.now() : undefined
            },
            { new: true }
        );
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
        res.status(400).json({ message: "Error updating order status", error: error.message });
    }
});

// Update delivery status (Admin only)
router.patch("/:orderId/deliver", [auth, admin], async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.orderId,
            {
                isDelivered: true,
                deliveredAt: Date.now()
            },
            { new: true }
        );
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        res.status(200).json({ message: "Order marked as delivered", order });
    } catch (error) {
        res.status(400).json({ message: "Error updating delivery status", error: error.message });
    }
});

module.exports = router;
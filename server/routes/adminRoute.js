// routes/adminRoute.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Biryani = require('../models/biryaniModel'); 

// Get Dashboard Statistics
router.get("/stats", [auth, admin], async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalUsers = await User.countDocuments({ isAdmin: false });
        const totalBiryanis = await Biryani.countDocuments();
        const totalRevenue = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$orderAmount" } } }
        ]);
        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            totalOrders,
            totalUsers,
            totalBiryanis,
            totalRevenue: totalRevenue[0]?.total || 0,
            recentOrders
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching statistics", error: error.message });
    }
});

// Get User Stats
router.get("/user-stats", [auth, admin], async (req, res) => {
    try {
        const userStats = await User.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: -1 } },
            { $limit: 6 }
        ]);

        res.json(userStats);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user statistics", error: error.message });
    }
});

// All Orders with Pagination
router.get("/orders", [auth, admin], async (req, res) => {
    try {
        const { status, date, page = 1, limit = 10 } = req.query;
        let query = {};

        if (status) query.status = status;
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            query.createdAt = { $gte: startDate, $lt: endDate };
        }

        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('userid', 'name email');

        const total = await Order.countDocuments(query);

        res.json({
            orders,
            total,
            pages: Math.ceil(total / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
});

// Update Order Status
router.put("/orders/:orderId", [auth, admin], async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order updated successfully", order });
    } catch (error) {
        res.status(400).json({ message: "Error updating order", error: error.message });
    }
});

module.exports = router;
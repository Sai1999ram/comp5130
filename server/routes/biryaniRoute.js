const express = require("express");
const router = express.Router();
const Biryani = require('../models/biryaniModel');
const auth = require('../middleware/auth'); 
const admin = require('../middleware/admin'); 

// Get all biryanis
router.get("/getall", async (req, res) => {
    try {
        const biryanis = await Biryani.find({})
        res.status(200).json(biryanis);
    } catch (error) {
        res.status(500).json({ message: "Error fetching biryanis", error: error.message });
    }
});

// Search biryanis with filters
router.get("/search", async (req, res) => {
    try {
        const { query, category, sortBy } = req.query;
        let queryObj = {};

        // Search by name containing the query string
        if (query) {
            queryObj.name = { $regex: query, $options: 'i' };
        }

        // Add category filter if provided
        if (category) {
            queryObj.category = category;
        }

        const biryanis = await Biryani.find(queryObj);
        res.status(200).json(biryanis);

    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: "Error fetching biryanis", error: error.message });
    }
});

// Get biryanis by category
router.get("/category/:category", async (req, res) => {
    try {
        const biryanis = await Biryani.find({ category: req.params.category, isAvailable: true });
        res.status(200).json(biryanis);
    } catch (error) {
        res.status(500).json({ message: "Error fetching biryanis", error: error.message });
    }
});

// Get single biryani by ID
router.get("/:id", async (req, res) => {
    try {
        const biryani = await Biryani.findById(req.params.id);
        if (!biryani) {
            return res.status(404).json({ message: "Biryani not found" });
        }
        res.status(200).json(biryani);
    } catch (error) {
        res.status(500).json({ message: "Error fetching biryani", error: error.message });
    }
});

// Add new biryani (Admin only)
router.post("/add", [auth, admin], async (req, res) => {
    try {
        const newBiryani = new Biryani(req.body);
        await newBiryani.save();
        res.status(201).json({ message: "New biryani added successfully", biryani: newBiryani });
    } catch (error) {
        res.status(400).json({ message: "Error adding biryani", error: error.message });
    }
});

// Update biryani (Admin only)
router.put("/:id", [auth, admin], async (req, res) => {
    try {
        const biryani = await Biryani.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!biryani) {
            return res.status(404).json({ message: "Biryani not found" });
        }
        res.status(200).json({ message: "Biryani updated successfully", biryani });
    } catch (error) {
        res.status(400).json({ message: "Error updating biryani", error: error.message });
    }
});

// Delete biryani (Admin only)
router.delete("/:id", [auth, admin], async (req, res) => {
    try {
        const biryani = await Biryani.findByIdAndDelete(req.params.id);
        if (!biryani) {
            return res.status(404).json({ message: "Biryani not found" });
        }
        res.status(200).json({ message: "Biryani deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting biryani", error: error.message });
    }
});

// Update availability status (Admin only)
router.patch("/:id/availability", [auth, admin], async (req, res) => {
    try {
        const biryani = await Biryani.findByIdAndUpdate(
            req.params.id,
            { isAvailable: req.body.isAvailable },
            { new: true }
        );
        if (!biryani) {
            return res.status(404).json({ message: "Biryani not found" });
        }
        res.status(200).json({ message: "Availability updated", biryani });
    } catch (error) {
        res.status(400).json({ message: "Error updating availability", error: error.message });
    }
});

module.exports = router;
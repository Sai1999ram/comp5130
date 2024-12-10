const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// Register new user
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Check if user already exists
        let user = await User.findOne({ email: email.toLowerCase() });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            phoneNumber
        });

        await user.save();

        // Create token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                phoneNumber: user.phoneNumber
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

// Login user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        // Check for user
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                phoneNumber: user.phoneNumber
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

// Get user profile
router.get("/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
    try {
        const { name, email, phoneNumber, currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If updating email, check if new email already exists
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email: email.toLowerCase() });
            if (emailExists) {
                return res.status(400).json({ message: "Email already in use" });
            }
            user.email = email.toLowerCase();
        }

        // Update password if provided
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Current password is incorrect" });
            }
            user.password = await bcrypt.hash(newPassword, 10);
        }

        user.name = name || user.name;
        user.phoneNumber = phoneNumber || user.phoneNumber;

        const updatedUser = await user.save();
        
        res.json({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
            isAdmin: updatedUser.isAdmin
        });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(400).json({ message: "Error updating profile", error: error.message });
    }
});

// Address Management
// Add new address
router.post("/address", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { street, city, pincode, isDefault } = req.body;

        if (!street || !city || !pincode) {
            return res.status(400).json({ message: "Please provide all address fields" });
        }

        const newAddress = {
            street,
            city,
            pincode,
            isDefault: isDefault || false
        };

        if (isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        }

        user.addresses.push(newAddress);
        await user.save();

        res.status(201).json({ 
            message: "Address added successfully", 
            addresses: user.addresses 
        });
    } catch (error) {
        console.error('Address add error:', error);
        res.status(400).json({ message: "Error adding address", error: error.message });
    }
});

// Delete address
router.delete("/address/:addressId", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const addressId = req.params.addressId;
        
        if (!user.addresses.id(addressId)) {
            return res.status(404).json({ message: "Address not found" });
        }

        user.addresses = user.addresses.filter(
            addr => addr._id.toString() !== addressId
        );
        
        await user.save();
        
        res.json({ 
            message: "Address removed successfully",
            addresses: user.addresses
        });
    } catch (error) {
        console.error('Address delete error:', error);
        res.status(400).json({ message: "Error removing address", error: error.message });
    }
});

// Update address
router.put("/address/:addressId", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const { street, city, pincode, isDefault } = req.body;
        const addressId = req.params.addressId;

        const address = user.addresses.id(addressId);
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        if (isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        }

        address.street = street || address.street;
        address.city = city || address.city;
        address.pincode = pincode || address.pincode;
        address.isDefault = isDefault ?? address.isDefault;

        await user.save();
        
        res.json({ 
            message: "Address updated successfully",
            addresses: user.addresses
        });
    } catch (error) {
        console.error('Address update error:', error);
        res.status(400).json({ message: "Error updating address", error: error.message });
    }
});

module.exports = router;
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: [2, 'Name must be at least 2 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters long']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date
    },
    addresses: [{
        street: String,
        city: String,
        pincode: String,
        isDefault: { type: Boolean, default: false }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('users', userSchema);
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'User ID is required']
    },
    orderItems: [{
        name: String,
        varient: String,
        quantity: Number,
        price: Number,
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'pizzas' }
    }],
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: String, required: true },
        phoneNumber: { type: String, required: true }
    },
    orderAmount: {
        type: Number,
        required: [true, 'Order amount is required'],
        min: [0, 'Order amount cannot be negative']
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    transactionId: {
        type: String,
        required: [true, 'Transaction ID is required']
    },
    status: {
        type: String,
        enum: ['PLACED', 'CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'],
        default: 'PLACED'
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('orders', orderSchema);
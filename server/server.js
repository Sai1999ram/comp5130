const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');

const app = express();
const port = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const biryaniRoute = require('./routes/biryaniRoute');
const userRoute = require('./routes/userRoute');
const ordersRoute = require('./routes/ordersRoute');
const paymentRoute = require('./routes/paymentRoute');
const adminRoute = require('./routes/adminRoute');

// API Routes
app.use('/api/biryani', biryaniRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/payment', paymentRoute);
app.use('/api/admin', adminRoute);

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Server is healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URI || 'mongodb+srv://SAIRAM:Sairam@cluster0.00wx8.mongodb.net/mern-pizza';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

module.exports = connectDB;
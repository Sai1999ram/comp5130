const mongoose = require('mongoose');
const BiryaniModel = require('./biryaniModel');
const OrderModel = require('./ordersModel');
const UserModel = require('./userModel');

// Add indexes
UserModel.schema.index({ email: 1 });
OrderModel.schema.index({ userid: 1, createdAt: -1 });
BiryaniModel.schema.index({ category: 1, isAvailable: 1 });

module.exports = {
    BiryaniModel,
    OrderModel,
    UserModel
};
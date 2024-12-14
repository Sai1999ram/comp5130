const mongoose = require("mongoose");

const biryaniSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Biryani name is required'],
        trim: true
    },
    varients: {
        type: [String],
        required: [true, 'At least one variant is required'],
        default: ['half', 'full']
    },
    prices: {
        type: [{
            varient: String,
            price: Number
        }],
        required: [true, 'Price information is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['veg', 'non-veg', 'special']
    },
    image: {
        type: String,
        required: [true, 'Image URL is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxLength: [500, 'Description cannot exceed 500 characters']
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('biryani', biryaniSchema);
const mongoose = require('mongoose');

const productModel = mongoose.model('Products', {
    name: {
        type: String
    },
    imgSrc: {
        type: String
    },
    specifications: {
        type: Array,
        default: []
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
    inStock: {
        type: Boolean,
        default: true  
    },
    lastUpdatedDate: {
        type: Date,
        default: Date.now()
    }
});
module.exports = productModel;
const mongoose = require('mongoose');


const productSchema = mongoose.Schema(
    {
        productname: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: Buffer,
            required: true
        },
        discount: {
            type: Number,
            default: 0
        },
        bgcolor: {
            type: String,
            default: ''
        },
        panelcolor: {
            type: String,
            default: ''
        },
        textcolor: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product',productSchema);
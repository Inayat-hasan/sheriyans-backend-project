const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            trim: true,
            minLength: 3
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        cart: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }],
        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: '',
            default: []
        }],
        contact: Number,
        picture: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User',userSchema);
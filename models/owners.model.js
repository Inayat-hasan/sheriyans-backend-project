const { Schema } = require('mongoose');
const mongoose = require('mongoose.');

const ownerSchema = Schema(
    {
        fullname: {
            type: String,
            minLength: 3,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: '',
                default: []
            }
        ],
        picture: {
            type: String,
            required: true
        },
        gstin: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Owner',ownerSchema);
const mongoose = require('mongoose');

const trackedItemSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    targetPrice: {
        type: Number,
        required: true
    },
    recentPrice: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    phone: {
        type: String,
        validate: {
            validator: function (v) {
                return /\d{11}/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
});

module.exports = mongoose.model('TrackedItem', trackedItemSchema);

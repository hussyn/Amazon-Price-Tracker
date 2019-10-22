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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('TrackedItem', trackedItemSchema);

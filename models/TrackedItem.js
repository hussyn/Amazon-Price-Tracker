const mongoose = require("mongoose");

const trackedItemSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
      },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('TrackedItem', trackedItemSchema);

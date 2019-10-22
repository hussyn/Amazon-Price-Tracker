const db = new (require("../db"))();
const mongoose = require('mongoose');
const TrackedItem = mongoose.model('TrackedItem');

exports.getTrackedItemsByUser = async (userId) => {
    
    try {
        return await TrackedItem.find({user: userId});
    }
    catch(err){
        console.error(err)
        return null;
    }
}

exports.addTrackedItem = async (item) => {
    const trackedItem = new TrackedItem(item);
    try {
        await trackedItem.save();
        return trackedItem;
    }
    catch( err ){
        console.error(err)
        return null;
    }
}


exports.getTrackedItem = async (id) => {
    try {
        return await TrackedItem.findById(id);
    }
    catch(err){
        console.error(err)
        return null;
    }
}

exports.updateTrackedItem = async (id, updatedItem) => {
    try {
        return await TrackedItem.findOneAndUpdate(id, updatedItem, {new: true});
    }
    catch(err){
        console.error(err)
        return null;
    }
}

exports.deleteTrackedItem = async (id) => {
    try {
        return await TrackedItem.findOneAndDelete(id);
    }
    catch(err){
        console.error(err);
        return null;
    }
}


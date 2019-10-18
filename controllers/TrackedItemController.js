const db = new (require("../db"))();

exports.getTrackedItems = () => {
    return db.getTrackedItems();
}

exports.addTrackedItem = (trackedItem) => {
    console.log(trackedItem);
    db.addTrackedItem(trackedItem);
}


exports.getTrackedItem = (id) => {
    return db.getTrackedItem(id);
}

exports.updateTrackedItem = (id, updatedItem) => {
    return db.updateTrackedItem(id, updatedItem);
}

exports.deleteTrackedItem = (id) => {
    return db.deleteTrackedItem(id);
}


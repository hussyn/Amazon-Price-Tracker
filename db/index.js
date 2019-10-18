module.exports = function() {
    this.trackedItems = {
        0: {targetPrice: 1000}
    };
    this.count = 0;


    this.getTrackedItems = () => {
        return this.trackedItems;
    }
    
    this.addTrackedItem = (trackedItem) => {
        this.count++;
        this.trackedItems[this.count] = trackedItem;
        return trackedItem;
    }
    
    
    this.getTrackedItem = (id) => {
        return this.trackedItems[id];
    }
    
    this.updateTrackedItem = (id, updatedItem) => {
        this.trackedItems[id] = updatedItem;
        return updatedItem;
    }
    
    this.deleteTrackedItem = (id) => {
        delete this.trackedItems[id];
        return id;
    }
    
};

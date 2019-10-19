const routes = require('express').Router();
const trackedItemController = require('../controllers/TrackedItemController');


//Post a new item to track (link, phone number, target price)
routes.post( '/trackedItem', async (req, res )=> {
    const trackedItem = req.body;
    const addedTrackedItem = await trackedItemController.addTrackedItem(trackedItem);
    
    if(addedTrackedItem === null) {
        return res.status(500).send({msg: "Failed to save tracked item" });
    }
    
    return res.send(addedTrackedItem);
        
});

routes.get('/trackedItem', async (req, res) => {
    const trackedItems = await trackedItemController.getTrackedItems();

    if(trackedItems === null) {
        return res.status(500).send({msg: "Failed to save tracked item" });
    }
    
    return res.send(trackedItems);
});

//get specific tracked item
routes.get('/trackedItem/:id', async (req, res) => {
    const id = req.params.id;
    const trackedItem = await trackedItemController.getTrackedItem(id);

    if(trackedItem === null) {
        return res.status(404).send({msg: "Failed to find tracked item" });
    }
    
    return res.send(trackedItem);
});

//update specfiic tracked item
routes.put('/trackedItem/:id', (req, res) => {
    const trackedItem = req.body;
    const id = req.params.id;
    
    const updatedTrackedItem = trackedItemController.updateTrackedItem(id, trackedItem);
    if(updatedTrackedItem === null ){
        return res.status(404).send({msg: "Failed to find and update tracked item" });
    }
    return res.send(updatedTrackedItem);
})

routes.delete('/trackedItem/:id', async (req, res) => {
    const id = req.params.id;
    const deletedItem = await trackedItemController.deleteTrackedItem(id);

    if(deletedItem === null ){
        return res.status(404).send({msg: "Failed to find and delete tracked item" });
    }
    return res.send(deletedItem);
})

module.exports = routes;
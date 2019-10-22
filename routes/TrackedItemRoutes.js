const routes = require('express').Router();
const trackedItemController = require('../controllers/TrackedItemController');
const { checkLoggedIn }  = require('../middleware/auth');

routes.post( '/trackedItem', checkLoggedIn, async (req, res )=> {
    const trackedItem = req.body;

    const userId = req.user._id;
    trackedItem.user = userId;

    const addedTrackedItem = await trackedItemController.addTrackedItem(trackedItem);
    
    if(addedTrackedItem === null) {
        return res.status(500).send({msg: "Failed to save tracked item" });
    }
    
    return res.send(addedTrackedItem);
        
});

//Should only get ones that the user created
routes.get('/trackedItem', checkLoggedIn, async (req, res) => {
    const userId = req.user._id;
    const trackedItems = await trackedItemController.getTrackedItemsByUser(userId);

    if(trackedItems === null) {
        return res.status(500).send({msg: "Failed to save tracked item" });
    }
    
    return res.send(trackedItems);
});

//TODO: can only view ones that the user created
routes.get('/trackedItem/:id', checkLoggedIn, async (req, res) => {
    const id = req.params.id;
    const trackedItem = await trackedItemController.getTrackedItem(id);

    const userId = req.user._id;

    if(trackedItem.user !== userId) {
        return res.status(403).send({msg: "Unauthorized"});
    }

    if(trackedItem === null) {
        return res.status(404).send({msg: "Failed to find tracked item" });
    }
    
    return res.send(trackedItem);
});

//TODO: can only update ones that the user created
routes.put('/trackedItem/:id', checkLoggedIn, (req, res) => {
    const trackedItem = req.body;
    const id = req.params.id;

    const trackedItemBefore = trackedItemController.getTrackedItem(id);
    const userId = req.user._id;


    if(trackedItem.user !== userId) {
        return res.status(403).send({msg: "Unauthorized"});
    }
    
    const updatedTrackedItem = trackedItemController.updateTrackedItem(id, trackedItem);

    if(updatedTrackedItem === null ){
        return res.status(404).send({msg: "Failed to find and update tracked item" });
    }
    return res.send(updatedTrackedItem);
})

//TODO: can only delete ones that the user created
routes.delete('/trackedItem/:id', checkLoggedIn, async (req, res) => {
    const id = req.params.id;

    const trackedItemBefore = trackedItemController.getTrackedItem(id);
    const userId = req.user._id;

    if(trackedItem.user !== userId) {
        return res.status(403).send({msg: "Unauthorized"});
    }

    const deletedItem = await trackedItemController.deleteTrackedItem(id);

    if(deletedItem === null ){
        return res.status(404).send({msg: "Failed to find and delete tracked item" });
    }
    return res.send(deletedItem);
})

module.exports = routes;
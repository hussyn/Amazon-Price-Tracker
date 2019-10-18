const routes = require('express').Router();
const trackedItemController = require('../controllers/TrackedItemController');


//Post a new item to track (link, phone number, target price)
routes.post( '/trackedItem', (req, res )=> {
    const trackedItem = req.body;
    trackedItemController.addTrackedItem(trackedItem);
    res.send(req.body);
});

routes.get('/trackedItem', (req, res) => {
    const trackedItems = trackedItemController.getTrackedItems();
    res.send(trackedItems);
});

//get specific tracked item
routes.get('/trackedItem/:id', (req, res) => {
    const trackedItem = trackedItemController.getTrackedItem(id);
    res.send(trackedItem);
});

//update specfiic tracked item
routes.put('/trackedItem/:id', (req, res) => {
    const updatedTrackedItem = req.body;
    console.log(updatedTrackedItem);
    const id = req.params.id;
    
    trackedItemController.updateTrackedItem(id, updatedTrackedItem);
    return res.send(updatedTrackedItem);
})

routes.delete('/trackedItem/:id', (req, res) => {
    const id = req.params.id;
    trackedItemController.deleteTrackedItem(id);
    return res.send(id);
})

module.exports = routes;
const routes = require('express').Router();
const { checkLoggedIn, checkLoggedInOrAnonymous } = require('../middleware/auth');

routes.post('/', checkLoggedInOrAnonymous, async (req, res) => {
    const trackedItem = req.body;

    if (!trackedItem.phone) {
        return res.status(400).send({ msg: 'Phone number is required' });
    }

    const userId = req.user ? req.user._id : null; //can be null
    trackedItem.user = userId;

    const addedTrackedItem = await trackedItemController.addTrackedItem(
        trackedItem
    );

    if (addedTrackedItem === null) {
        return res.status(500).send({ msg: 'Failed to save tracked item' });
    }

    return res.send(addedTrackedItem);
});

routes.get('/', checkLoggedIn, async (req, res) => {
    const userId = req.user._id;
    const trackedItems = await trackedItemController.getTrackedItemsByUser(
        userId
    );

    if (trackedItems === null) {
        return res.status(500).send({ msg: 'Failed to save tracked item' });
    }

    return res.send(trackedItems);
});

routes.get('/:id', checkLoggedIn, async (req, res) => {
    const id = req.params.id;
    const trackedItem = await trackedItemController.getTrackedItem(id);
    if (trackedItem === null) {
        return res.status(404).send({ msg: 'Failed to find tracked item' });
    }

    const userId = req.user._id;

    if (!trackedItemController.isOwner(userId, trackedItem)) {
        return res.status(403).send({ msg: 'Unauthorized' });
    }

    return res.send(trackedItem);
});

routes.put('/:id', checkLoggedIn, (req, res) => {
    const trackedItem = req.body;
    const id = req.params.id;

    const trackedItemBefore = trackedItemController.getTrackedItem(id);
    const userId = req.user._id;

    if (!trackedItemController.isOwner(userId, trackedItemBefore)) {
        return res.status(403).send({ msg: 'Unauthorized' });
    }

    const updatedTrackedItem = trackedItemController.updateTrackedItem(
        id,
        trackedItem
    );

    if (updatedTrackedItem === null) {
        return res
            .status(404)
            .send({ msg: 'Failed to find and update tracked item' });
    }

    return res.send(updatedTrackedItem);
});

routes.delete('/:id', checkLoggedIn, async (req, res) => {
    const id = req.params.id;

    const trackedItemBefore = trackedItemController.getTrackedItem(id);
    const userId = req.user._id;

    if (!trackedItemController.isOwner(userId, trackedItemBefore)) {
        return res.status(403).send({ msg: 'Unauthorized' });
    }

    const deletedItem = await trackedItemController.deleteTrackedItem(id);

    if (deletedItem === null) {
        return res
            .status(404)
            .send({ msg: 'Failed to find and delete tracked item' });
    }
    return res.send(deletedItem);
});

module.exports = routes;

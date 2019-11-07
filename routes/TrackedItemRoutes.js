const routes = require('express').Router();
const {
    checkLoggedIn,
    checkLoggedInOrAnonymous
} = require('../middleware/auth');
const mongoose = require('mongoose');
const TrackedItem = mongoose.model('TrackedItem');

routes.post('/', checkLoggedInOrAnonymous, async (req, res) => {
    const user = req.user ? req.user._id : null;
    const trackedItem = new TrackedItem({ ...req.body, user });
    try {
        await trackedItem.save();
        return res.send(trackedItem);
    } catch (err) {
        console.error(err.message);
        return res.status(400).send({ msg: 'Failed to save tracked item' }); //TODO: return specific mongodb message
    }
});

routes.get('/', checkLoggedIn, async (req, res) => {
    console.log('getting user items');
    const user = req.user._id;
    try {
        const trackedItems = await TrackedItem.find({ user });
        return res.send(trackedItems);
    } catch (err) {
        console.error(err);
        return res.status(400).send({ msg: 'Failed to get tracked items' });
    }
});

routes.get('/:id', checkLoggedIn, async (req, res) => {
    const id = req.params.id;
    try {
        const trackedItem = await TrackedItem.findById(id);
        const userId = req.user._id;

        if (!trackedItem.user != userId) {
            return res.status(403).send({ msg: 'Unauthorized' });
        }

        return res.send(trackedItem);
    } catch (err) {
        return res.status(400).send({ msg: 'Failed to get tracked item' });
    }
});

routes.put('/:id', checkLoggedIn, async (req, res) => {
    const trackedItem = req.body;
    const id = req.params.id;

    try {
        const trackedItemBefore = await TrackedItem.findById(id);
        const userId = req.user._id;

        if (!trackedItemBefore.user != userId) {
            return res.status(403).send({ msg: 'Unauthorized' });
        }

        const updatedTrackedItem = await TrackedItem.findByIdAndUpdate(
            id,
            trackedItem,
            { new: true }
        );
        return res.send(updatedTrackedItem);
    } catch (err) {
        return res.status(400).send({ msg: 'Failed to update tracked item' });
    }
});

routes.delete('/:id', checkLoggedIn, async (req, res) => {
    const id = req.params.id;

    try {
        const trackedItem = await TrackedItem.findById(id);
        const userId = req.user._id;

        if (!trackedItem.user != userId) {
            return res.status(403).send({ msg: 'Unauthorized' });
        }

        const deletedTrackedItem = await TrackedItem.findByIdAndDelete(id);
        return res.send(deletedTrackedItem);
    } catch (err) {
        return res.status(400).send({ msg: 'Failed to delete tracked item' });
    }
});

module.exports = routes;

const routes = require('express').Router();
const { checkLoggedIn } = require('../middleware/auth');
const mongoose = require('mongoose');
const TrackedItem = mongoose.model('TrackedItem');

routes.post('/', checkLoggedIn, async (req, res) => {
    const trackedItem = new trackedItem({ ...req.body, user: req.user._id });

    try {
        await trackedItem.save();
        return res.send(trackedItem);
    } catch (err) {
        return res.status(400).send({ msg: 'Failed to save tracked item' });
    }
});

routes.get('/', checkLoggedIn, async (req, res) => {
    console.log('geting stuff!');
    const user = req.user._id;
    try {
        const trackedItems = await TrackedItem.find({ user });
        console.log(trackedItems);
        return trackedItems;
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

        return trackedItem;
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
        return updatedTrackedItem;
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
        return deletedTrackedItem;
    } catch (err) {
        return res.status(400).send({ msg: 'Failed to delete tracked item' });
    }
});

module.exports = routes;

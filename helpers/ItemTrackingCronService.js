const cron = require('node-cron');
const trackedItemController = require('../controllers/TrackedItemController');
const priceHelper = require('./PriceHelpers');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.startItemTrackingCron = () => {
    cron.schedule('* * * * *', async () => {
        console.log('running a task every second');

        const trackedItems = await trackedItemController.getTrackedItems();

        if (trackedItems === null) {
            return console.error(
                "Something went wrong. Couldn't retrieve tracked items from the DB!"
            );
        }

        const pricePomises = trackedItems.map((trackedItem) =>
            priceHelper.retrievePrice(trackedItem.url)
        );

        Promise.all(pricePomises)
            .then((results) => {
                results.forEach((result, index) => {
                    const currentPrice = priceHelper.convertPriceStringToPennies(result);
                    const currentTrackedItem = trackedItems[index];
                    const targetPrice = currentTrackedItem.targetPrice;

                    if (currentPrice < targetPrice) {
                        //notify with text message and/or email
                        console.log('THE PRICE IS CHEAP!');
                        //get the user
                        const userId = currentTrackedItem.user;
                        //const user = await User.findById(userId);
                        //get telephone number from user

                    }
                });
            })
            .catch((err) => {
                console.error(err);
            });
    });
};

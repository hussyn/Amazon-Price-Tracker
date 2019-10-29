const cron = require('node-cron');
const priceHelper = require('./PriceHelpers');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const TrackedItem = mongoose.model('TrackedItem');
const twilioHelper = require('./TwilioHelper');

exports.startItemTrackingCron = () => {
    cron.schedule('* * * * *', async () => {
        console.log('running a task every second');

        const trackedItems = await TrackedItem.find().populate('user');
        console.log(trackedItems);

        if (trackedItems === null) {
            return console.error(
                "Something went wrong. Failed to retrieve tracked items from the DB!"
            );
        }

        const pricePomises = trackedItems.map((trackedItem) =>
            priceHelper.retrievePrice(trackedItem.url)
        );

        Promise.all(pricePomises)
            .then((results) => {
                results.forEach(async (result, index) => {
                    const currentPrice = priceHelper.convertPriceStringToPennies(
                        result
                    );

                    //don't wait for a response, just keep on going :)
                    updateCurrentPriceAndNotify(trackedItems[index], currentPrice)

                });
            })
            .catch((err) => {
                console.error(err);
            });
    });
};

const updateCurrentPriceAndNotify = async (trackedItem, currentPrice) => {

    trackedItem.recentPrice = currentPrice;
    const username = trackedItem.user ? trackedItem.user.username : 'anonymous';
    try {
        await trackedItem.save();
    }
    catch (err) {
        console.error(`Failed to save recent price for ${trackedItem.name} for user ${username}`);
    }

    const targetPrice = trackedItem.targetPrice;

    if (currentPrice < targetPrice) {
        console.log(`${trackedItem.name} for ${username} is below the threshold. Notifying... `);
        twilioHelper.sendTrackedItemMessage(
            trackedItem
        );
    }


}

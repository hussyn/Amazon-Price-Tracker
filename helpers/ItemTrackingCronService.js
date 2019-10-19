const cron = require('node-cron');
const trackedItemController = require('../controllers/TrackedItemController');
const axios = require('axios');
const cheerio = require('cheerio');

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
            retrievePrice(trackedItem.url)
        );

        Promise.all(pricePomises)
            .then((results) => {
                results.forEach((result, index) => {
                    const pennyPrice = convertPriceStringToPennies(result);
                    const targetPrice = trackedItems[index].targetPrice;
                    console.log(pennyPrice, targetPrice);
                });
            })
            .catch((err) => {
                console.error(err);
            });
    });
};

const retrievePrice = async (url) => {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    const dealPrice = $('#priceblock_dealprice').text();
    if (dealPrice) return dealPrice;

    const regularPrice = $('#priceblock_ourprice').text();
    return regularPrice;
};

const convertPriceStringToPennies = (priceStr) => {
    if (priceStr.startsWith('$')) {
        priceStr = priceStr.substring(1);
    }
    const priceNumber = parseFloat(priceStr);
    const priceInPennies = priceNumber * 100;
    return priceInPennies;
};

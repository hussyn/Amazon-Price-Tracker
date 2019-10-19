const cron = require('node-cron');
const trackedItemController = require('../controllers/TrackedItemController');
const retriever = require('amazon-price-retriever')

const getIt = async() => {

    
    const trackedItems = await trackedItemController.getTrackedItems();
    const promises = [];
    //trackedItems.forEach(trackedItem => {
        try{
            const price = await retriever.retrievePrice(trackedItems[0].url);
            console.log(trackedItems[0].url)
            console.log(`***${price}`);
        }
        catch(err){
            console.log(err);
        }
    }

    getIt();
exports.startItemTrackingCron = () => {
    cron.schedule('* * * * *', async () => {
        console.log('running a task every second');
        
        // })
        //  console.log(promises)

        // Promise.all(promises).then( results => {
        //     console.log(results);
        //  }).catch(err => {
        //      console.error(err);
        //  })
    });
}
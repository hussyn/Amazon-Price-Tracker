const cron = require('node-cron');

exports.startItemTrackingCron = () => {
    cron.schedule('* * * * *', () => {
        console.log('running a task every second');
    });
}
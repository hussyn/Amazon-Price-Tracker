const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

exports.sendTrackedItemMessage = (trackedItem, toNumber) => {
    const msg = `Your item is cheap!! ${trackedItem.url}`;
    client.messages
        .create({ body: msg, from: '+19014461913', to: toNumber })
        .then((message) => console.log(message.sid))
        .catch((err) => console.error(err));
};

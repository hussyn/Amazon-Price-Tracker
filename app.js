const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const itemTrackingCronService = require('./helpers/ItemTrackingCronService');
const trackedItemRoutes = require('./routes/TrackedItemRoutes');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

itemTrackingCronService.startItemTrackingCron();

app.use('/', trackedItemRoutes);

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
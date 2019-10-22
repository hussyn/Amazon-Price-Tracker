const express = require('express');
const app = express();

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    { useNewUrlParser: true },
    () => {
        console.group('connected');
    }
);

require('./models/TrackedItem');

// parse application/x-www-form-urlencoded
app.use(express.json());

const itemTrackingCronService = require('./helpers/ItemTrackingCronService');
itemTrackingCronService.startItemTrackingCron();

const trackedItemRoutes = require('./routes/TrackedItemRoutes');
app.use('/', trackedItemRoutes);

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

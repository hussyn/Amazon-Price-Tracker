const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json());

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

const itemTrackingCronService = require('./helpers/ItemTrackingCronService');
itemTrackingCronService.startItemTrackingCron();

const trackedItemRoutes = require('./routes/TrackedItemRoutes');
const userRoutes = require('./routes/UserRoutes');
app.use('/api/trackedItems', trackedItemRoutes);
app.use('/api/user', userRoutes);

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

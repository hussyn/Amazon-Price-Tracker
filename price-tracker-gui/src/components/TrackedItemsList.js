import React from 'react';
import axios from 'axios';

export default function TrackedItemsList() {
    const getTrackedItems = async () => {
        try {
            const res = await axios.get('/api/trackedItems');
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    getTrackedItems();

    return (
        <div>
            <h1>Your Tracked Expenses</h1>
        </div>
    );
}

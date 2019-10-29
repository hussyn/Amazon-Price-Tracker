import React from 'react';
import { fetchWithAuthHeader } from "../utils/Auth";
export default function TrackedItemsList() {
    const getTrackedItems = async () => {
        try {
            const data = await fetchWithAuthHeader('/api/trackedItems', { method: 'GET' })

            console.log(data);
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

import React from 'react';
import { fetchWithAuthHeader } from "../utils/Auth";
import { withRouter } from "react-router";

const TrackedItemsList = () => {
    const getTrackedItems = async () => {
        try {
            const data = await fetchWithAuthHeader('/api/trackedItems', { method: 'GET' })

            console.log(data);
        } catch (err) {
            if (err.response.status === 401) {
                //TODO: navigate to login page
            }
            console.error(err.response.data.msg);
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

export default withRouter(TrackedItemsList);

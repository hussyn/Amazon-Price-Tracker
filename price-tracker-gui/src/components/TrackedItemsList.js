import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { authenticationService } from '../utils/Auth';

const TrackedItemsList = () => {
    const [trackedItems, setTrackedItems] = useState([]);

    useEffect(() => {
        const getTrackedItems = async () => {
            try {
                const data = await authenticationService.fetchWithAuthHeader(
                    '/api/trackedItems',
                    {
                        method: 'GET'
                    }
                );
                setTrackedItems(data);
            } catch (err) {
                console.log(err);
                if (err.response.status === 401) {
                    //TODO: navigate to login page
                }
                //console.error(err.response.data.msg);
            }
        };
        getTrackedItems();
    }, []);

    return (
        <div>
            <h3>Your Tracked Items</h3>
            {trackedItems.map((trackedItem) => (
                <div key={trackedItem._id}>
                    <a href={trackedItem.url}>
                        <p>{trackedItem.name}</p>
                    </a>

                    <p>{trackedItem.targetPrice}</p>
                    <p>{trackedItem.recentPrice || 'No recent price yet'}</p>
                </div>
            ))}
        </div>
    );
};

export default withRouter(TrackedItemsList);

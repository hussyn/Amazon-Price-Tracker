import React from 'react';
import { withRouter } from 'react-router';
import { authenticationService } from '../utils/Auth';

const TrackedItemsList = () => {
    const getTrackedItems = async () => {
        try {
            const data = await authenticationService.fetchWithAuthHeader(
                '/api/trackedItems',
                {
                    method: 'GET'
                }
            );

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
};

export default withRouter(TrackedItemsList);

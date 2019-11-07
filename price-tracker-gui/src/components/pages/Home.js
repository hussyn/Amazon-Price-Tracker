import React from 'react';
import TrackedItemForm from '../TrackedItemForm';
import { authenticationService } from '../../utils//Auth';
import Header from '../Header';
import TrackedItemsList from '../TrackedItemsList';
export default function Home() {
    const user = authenticationService.getUser();

    return (
        <div>
            <Header user={user} />
            <h1>Welcome to Amazon Price Tracker</h1>
            <TrackedItemForm user={user} />
            {user && <TrackedItemsList />}
        </div>
    );
}

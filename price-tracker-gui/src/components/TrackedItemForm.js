import React from 'react';
import { authenticationService } from '../utils/Auth';

export default function TrackedItemForm(props) {
    const [phone, setPhone] = React.useState(props.phone || '');
    const [targetPrice, setTargetPrice] = React.useState(0);
    const [url, setUrl] = React.useState('');
    const [name, setName] = React.useState('');

    const reset = () => {
        setTargetPrice(0);
        setUrl('');
        setName('');
        setPhone(props.phone || '');
    };

    const submitTrackedItem = async (e) => {
        e.preventDefault();
        console.log(phone, targetPrice, url);
        const trackedItem = { phone, targetPrice, url, name };
        try {
            const data = await authenticationService.fetchWithAuthHeader(
                '/api/trackedItems',
                {
                    method: 'POST',
                    body: JSON.stringify(trackedItem)
                }
            );
            console.log(data);
            //TODO: feedback to user on success
            reset();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={submitTrackedItem}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    placeolder="Cool Amazon Item"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
                <label htmlFor="phone">Phone Number</label>
                <input
                    type="text"
                    placeolder="1-555-555-5555"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                ></input>

                <label htmlFor="price">Target Price</label>
                <input
                    type="number"
                    step="0.01"
                    value={targetPrice}
                    min="0"
                    onChange={(e) => setTargetPrice(e.target.value)}
                ></input>

                <label htmlFor="url">Amazon URL</label>
                <input
                    type="text"
                    placeolder="www.amazon.com/abc"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                ></input>
                <button type="submit">Track Item</button>
            </form>
        </div>
    );
}

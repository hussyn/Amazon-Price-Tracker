import React from 'react'
import { fetchWithAuthHeader } from "../utils/Auth";
export default function TrackedItemForm(props) {

    const [phone, setPhone] = React.useState(props.phone);
    const [price, setPrice] = React.useState(0);
    const [url, setUrl] = React.useState('');

    const reset = () => {
        setPrice(0);
        setUrl('');
    }

    const submitTrackedItem = async (e) => {
        e.preventDefault();
        console.log(phone, price, url);
        const trackedItem = { phone, price, url };
        try {
            const data = await fetchWithAuthHeader('/api/trackedItem', { method: 'POST', body: trackedItem })
            //TODO: feedback to user on success
            reset();
        } catch (err) {
            console.err(err)
        }

    }


    return (
        <div>
            <form onSubmit="submitTrackedItem">
                <label for="phone">Phone Number</label>
                <input type="text" placeolder="1-555-555-5555" value={phone}
                    onChange={(e) => setPhone(e.target.value)}></input>

                <label for="price">Target Price</label>
                <input type="number" step="0.01" value={price} min="0"
                    onChange={(e) => setPrice(e.target.value)}></input>

                <label for="url">Amazon URL</label>
                <input type="text" placeolder="www.amazon.com/abc" value={url}
                    onChange={(e) => setUrl(e.target.value)}></input>
                <button type="submit">Track Item</button>
            </form>
        </div>
    )
}

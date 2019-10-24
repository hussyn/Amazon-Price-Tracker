import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <h1>Welcome to Amazon Price Tracker</h1>
            <Link className="link-btn" to="/login">
                Login
            </Link>
            <Link className="link-btn" to="/register">
                Register
            </Link>
        </div>
    );
}

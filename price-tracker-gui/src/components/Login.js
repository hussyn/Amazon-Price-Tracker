import React from 'react';
import { authenticationService } from '../utils/Auth';

export default function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/user/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }
                )
            });
            const data = await res.json();
            setLoading(false);
            authenticationService.saveToken(data.token);
            props.history.push('/');
        } catch (err) {
            console.error(err.response.data.msg); //TODO: check that this still makes sense with new fetch wrapper
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign in</h2>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                value={email}
                placeholder="james@mail.com"
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Sign In'}
            </button>
        </form>
    );
}

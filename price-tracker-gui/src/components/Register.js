import React from 'react';
import axios from 'axios';
import { authenticationService } from '../utils/Auth';
import { withRouter } from "react-router";

const Register = (props) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('/api/user/register', {
                email,
                password,
                username,
                phone
            });
            setLoading(false);
            authenticationService.saveToken(res.data.token);
            props.history.push('/');
        } catch (err) {
            console.error(err.response.data.msg);
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                value={email}
                placeholder="james@mail.com"
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="username">Username</label>
            <input
                type="text"
                name="username"
                value={username}
                placeholder="coolkid3"
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="phone">Phone Number</label>
            <input
                type="text"
                name="phone"
                value={phone}
                placeholder="19014533456"
                onChange={(e) => setPhone(e.target.value)}
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
                {loading ? 'Loading...' : 'Register'}
            </button>
        </form>
    );
}

export default withRouter(Register);


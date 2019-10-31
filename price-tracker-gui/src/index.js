import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Logout from './components/Logout';
import TrackedItemsList from './components/TrackedItemsList';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';


const routing = (
    <Router>
        <div className="container">
            <Route path="/" exact component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <ProtectedRoute path="/logout" component={Logout} />
            <ProtectedRoute path="/myItems" component={TrackedItemsList} />
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

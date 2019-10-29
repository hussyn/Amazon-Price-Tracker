import decode from 'jwt-decode';

const saveToken = (token) => {
    localStorage.setItem('user_token', token);
};

const isLoggedIn = () => {
    return !!localStorage.getItem('user_token');
};

const logout = () => {
    localStorage.removeItem('user_token');
};

const getToken = () => {
    return localStorage.getItem('user_token');
};

const getProfile = () => {
    return decode(this.getToken());
}

export const authenticationService = {
    saveToken,
    isLoggedIn,
    logout,
    getToken,
    getProfile
};

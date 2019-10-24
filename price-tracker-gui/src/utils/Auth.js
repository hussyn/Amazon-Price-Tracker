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
export const authenticationService = {
    saveToken,
    isLoggedIn,
    logout,
    getToken
};

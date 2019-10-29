import decode from 'jwt-decode';

const saveToken = (token) => {
    localStorage.setItem('user_token', token);
};

const isLoggedIn = () => {
    //TODO: can check for expiration
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

const fetchWithAuthHeader = async (url, options) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    if (this.loggedIn()) {
        headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    const res = await fetch(url, {
        headers,
        ...options
    });
    checkStatus(res);
    return await res.json(); //TODO:  caller will need to handle exception...?
    //TODO: check all of the return scenarions


}

checkStatus = (response) => {
    //TODO: if you ever get unauthorized then redirect to login

    if (!(response.status >= 200 && response.status < 300)) {
        const error = new Error(response.statusText)
        error.response = response;
        throw error;
    }
}

export const authenticationService = {
    saveToken,
    isLoggedIn,
    logout,
    getToken,
    getProfile,
    fetchWithAuthHeader
};

const jwt = require('jsonwebtoken');

//TODO: update to use bearer <token> as token header
//TODO: add expiration to token
exports.checkLoggedIn = function (req, res, next) {
    const rawHeader = req.headers['x-access-token'] || req.headers['authorization'];
    const parsedHeader = rawHeader.split(" ");
    const token = parsedHeader[1];

    if (!token)
        return res
            .status(401)
            .send({ msg: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send({ msg: 'Invalid token.' });
    }
};

exports.checkLoggedInOrAnonymous = function (req, res, next) {
    //get the token from the header if present
    const token = req.headers['x-access-token'] || req.headers['authorization'];

    req.user = null;

    try {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (ex) {
        next();
    }
};

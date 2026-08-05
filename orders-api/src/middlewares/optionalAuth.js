const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.js');

const optionalAuthenticate = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.user = decoded;
    } catch (err) {
        req.user = null;
    }

    next();
};

module.exports = { optionalAuthenticate };

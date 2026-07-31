const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.js');

const authenticate = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Faça login.' });
    }

    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};

module.exports = { authenticate }; 
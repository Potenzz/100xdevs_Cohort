const jwt = require('jsonwebtoken');
const { z } = require('zod');
const jwtPassword = 'secret';

// Define Zod schemas for validation
const usernameSchema = z.string().email();
const passwordSchema = z.string().min(6);

function signJwt(username, password) {
    try {
        usernameSchema.parse(username);
        passwordSchema.parse(password);

        const payload = { username, password };

        return jwt.sign(payload, jwtPassword, { expiresIn: '1h' });
    } catch (error) {
        return null;
    }
}

function verifyJwt(token) {
    try {
        jwt.verify(token, jwtPassword);
        return true;
    } catch (err) {
        return false;
    }
}

function decodeJwt(token) {
    try {
        return jwt.decode(token);
    } catch (err) {
        return false;
    }
}

module.exports = {
    signJwt,
    verifyJwt,
    decodeJwt,
    jwtPassword,
};

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcrypt');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id },
        config.jwtSecret,
        {
            expiresIn: '1h'
        });
};

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    generateToken,
    hashPassword,
    comparePasswords,
};
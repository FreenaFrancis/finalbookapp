const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const hashPassword = async (password) => {
    const saltRounds = 10; // Adjust the number of hashing rounds as needed
    return bcrypt.hash(password, saltRounds);
};

const comparePassword = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
};

const generateToken = (userId) => {
    return JWT.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = { hashPassword, comparePassword, generateToken };


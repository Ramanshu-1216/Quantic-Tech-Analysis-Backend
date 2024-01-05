const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    signedOn: {
        type: Date,
        default: Date.now,
    },
    lastLoggedIn: {
        type: Date,
        default: Date.now,
    },
    phone: String,
    address: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

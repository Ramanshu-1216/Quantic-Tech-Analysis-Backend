const mongoose = require('mongoose');
const config = require('../config/config');

const connectDB = () => {
    mongoose.connect(config.mongoURI)
        .then((res) => {
            console.log('Connected to MongoDB');
        }).catch((error) => {
            console.log('Error:', 'Error in MongoDB Connection-', error);
        });
}

module.exports = connectDB;
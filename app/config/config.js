require('dotenv').config();
module.exports = {
    mongoURI: process.env.DATABASE_URL,
    jwtSecret: process.env.SECRET_KEY,
}

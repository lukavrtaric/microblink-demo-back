dotenv = require('dotenv');
dotenv.config();

const config = {
    mongodb: process.env.MONGODB_URI
};

module.exports = config;
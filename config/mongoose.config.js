const mongoose = require('mongoose');
const DB_NAME = require('../constant.js');

const connectDB = async () => {
    try {
        let dbName;
        if (typeof DB_NAME === 'string') {
            dbName = DB_NAME;
        } else if (typeof DB_NAME === 'object' && DB_NAME !== null) {
            dbName = DB_NAME.name; // Assuming DB_NAME is an object with a 'name' property
        } else {
            throw new Error('Invalid DB_NAME format');
        }
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection ERROR: ", error);
        process.exit(1);
    }
};

module.exports = connectDB;

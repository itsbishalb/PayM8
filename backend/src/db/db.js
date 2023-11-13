const mongoose = require("mongoose");
const connectDB = async () => {

    try {
        const MONGO_URL = process.env.MONGOURL;
        const MONGO_USERNAME = process.env.MONGOUSER;
        const MONGO_PASSWORD = process.env.MONGOPASSWORD;
        const MONGO_DB = process.env.DBNAME;
        const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DB}?authSource=admin`;
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MongoDB");
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;

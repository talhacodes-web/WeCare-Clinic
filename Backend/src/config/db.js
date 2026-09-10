const mongoose = require("mongoose");
const config = require("./config");

async function connectDB() {
    try {
        await mongoose.connect(config.mongodbUri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
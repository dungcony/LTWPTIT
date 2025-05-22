const mongoose = require("mongoose");
const env = require('../../envir')

async function Connect() {
    mongoose
        .connect(env.MONGO_URI)
        .then(() => {
            console.log("Successfully connected to MongoDB Atlas!");
        })
        .catch((error) => {
            console.log("Unable to connect to MongoDB Atlas!");
            console.error(error);
        });
}

module.exports = Connect;

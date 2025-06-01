require('dotenv').config()

const env = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,


    NAME_DB: process.env.NAME_DB,
    USER_NAME: process.env.USER_NAME,
    PASS_WORD: process.env.PASS_WORD,

    MONGO_URI: process.env.MONGO_URI,

    JWT_SECRET: process.env.JWT_SECRET
}

module.exports = env


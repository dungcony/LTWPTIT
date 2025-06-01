// File: server.js

const express = require('express');
const cors = require('cors');
const router = require('./src/routes/V1/index');
const app = express();

const exitHook = require('async-exit-hook')

const env = require('./envir');
const Connect = require('./src/connect/connectMongoo');


const START_SERVER = () => {
    const app = express()
    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/V1', router);

    // Khởi động server
    app.listen(process.env.PORT, env.HOST, () => {
        console.log(`Server running http://${env.HOST}:${env.PORT}`);
    });

    exitHook(() => {
        console.log('Disconecting');
        mongoose.disconnect()
        console.log('Disconnected')
    })
}


(async () => {
    try {
        console.log('connectting')
        await Connect()
        console.log('connected')

        START_SERVER()
    } catch (error) {
        console.log("LOI")
        process.exit(0)
    }
})()
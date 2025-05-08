const express = require('express')
const cors = require("cors");

const app = express()

const PORT = 1504
const host = 'localhost'
const routers = require('./src/routers/router')

app.use(cors(

));

app.use('/v1', routers)


// Chạy server
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});
// File: server.js
const express = require('express');
const cors = require('cors');
const router = require('./src/routes/router');
const app = express();
const PORT = 8080;

// Middleware
app.use(cors({
    //origin: 'http://localhost:3000'
}));
app.use(express.json());


app.use('/V1', router);

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});
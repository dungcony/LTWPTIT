const express = require('express');
const router = express.Router();

const BlogRouter = require('./BlogRoutes'); // đúng tên export
const NovelRouter = require('./NovelRoutes')
const UserRouter = require('./UserRouter')

router.use(express.json());

// Test route
router.get('/', (req, res) => {
    res.send('HELLO WORLD');
});

// Mount blog routes under /api
router.use('/', BlogRouter);
router.use('/', NovelRouter)
router.use('/', UserRouter)

module.exports = router;

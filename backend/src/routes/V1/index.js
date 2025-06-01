const express = require('express');
const router = express.Router();

const BlogRouter = require('./BlogRoutes'); // đúng tên export
const NovelRouter = require('./NovelRoutes')
const UserRouter = require('./UserRouter');
const ImgRouter = require('./ImgsRouter'); // đúng tên export
const CheckToken = require('../../auth/CheckToken');



router.use('/user', UserRouter)

// Mount blog routes under /api
router.use('/blog', CheckToken, BlogRouter);
router.use('/novel', CheckToken, NovelRouter)
router.use('/imgs', ImgRouter);

module.exports = router;

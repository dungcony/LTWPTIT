const express = require('express');
const router = express.Router();

const { GetBlogList, GetBlogById } = require('../../functions/GetBlog');

router.use(express.json());

// Blog routes
router.get('/blogs', GetBlogList);
router.get('/blog/:id', GetBlogById);

module.exports = router;

const express = require('express');
const router = express.Router();
const { GetBlogList, GetBlogById, EditBlog, AddComment, AddLike } = require('../../functions/GetBlog');

router.use(express.json());
// Blog routes
router.get('/list', GetBlogList);
router.get('/:id/:userId', GetBlogById);
router.post('/edit/:id', EditBlog);
router.post('/add_comment', AddComment)
router.post('/like', AddLike)
//done BE

module.exports = router;

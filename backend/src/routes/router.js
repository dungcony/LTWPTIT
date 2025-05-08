const express = require('express');
const { getBlogList, getBlogById, getUser } = require('../api/getData');
const router = express.Router();

// Middleware để parse JSON body
router.use(express.json());

// Test route
router.get('/', (req, res) => {
    res.send('HELLO WORLD');
});

// Blog routes
router.get('/blogs', (req, res) => {
    const blogList = getBlogList();
    res.json(blogList);
});

router.get('/blog/:id', (req, res) => {
    const id = req.params.id;
    const blog = getBlogById(id);

    if (!blog) {
        return res.status(404).json({ message: 'Không tìm thấy bài viết' });
    }

    res.json(blog);
});

router.get('/user', (req, res) => {
    const listUser = getUser();
    res.json(listUser);
});

module.exports = router;
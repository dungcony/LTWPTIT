const blogPosts = require('../Data/Blog')
const User = require('../Data/User')

// Danh sách user mẫu
const users = [
    {
        username: 'admin',
        password: 'admin123'
    },
    {
        username: 'user',
        password: 'user'
    }
];

const getBlogList = () => {
    return Object.entries(blogPosts).map(([id, { title }]) => ({
        id,
        title
    }))
}

const getBlogById = (id) => {
    const currentBlog = blogPosts[id]
    if (!currentBlog) {
        return { message: 'Không tìm thấy bài viết' }
    }
    return currentBlog
}

const getUser = () => {
    return users;
}

module.exports = { getBlogList, getBlogById, getUser }
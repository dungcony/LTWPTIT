const Blog = require('../Models/BlogModel')

const GetBlogList = async (req, res) => {
    const list = await Blog.find({},
        'id name desc'
    )
    res.json(list)
}

const GetBlogById = async (req, res) => {

    const id = req.params.id
    const blog = await Blog.findOne({ id }, 'id name desc')

    if (!blog) {
        return res.status(404).json({ message: 'Không tìm thấy bài viết' })
    }

    res.json(blog)
}
module.exports = { GetBlogList, GetBlogById }
const blogList = require("../Data/Blog")


const GetBlogList = (req, res) => {
    const listBlog = Object.entries(blogList).map(([id, { title }]) => ({
        id,
        title
    }))
    res.json(listBlog)
}

const GetBlogById = (req, res) => {
    const id = req.params.id
    const blog = blogList[id]

    if (!blog) {
        return res.status(404).json({ message: 'Không tìm thấy bài viết' })
    }

    res.json(blog)
}
module.exports = { GetBlogList, GetBlogById }
const Blog = require('../Models/BlogModel')

const GetBlogList = async (req, res) => {
    console.log('GetBlogList')
    const list = await Blog.find({}, '')
    res.json(list)
}

const GetBlogById = async (req, res) => {
    console.log('GetBlogById')
    const id = req.params.id
    const userId = req.params.userId

    console.log(userId)
    const blog = await Blog.findOne({ _id: id }, '')
    const like = blog.Like
    let isLike = false

    // if (like.includes(userId)) {
    //     isLike = true
    // }

    like.forEach(element => {
        if (element._id.toString() === userId) {
            isLike = true
        }
        console.log(element._id);
    });

    console.log(like)
    if (!blog) {
        return res.status(404).json({ message: 'Không tìm thấy bài viết' })
    }

    res.json({
        blog: blog,
        isLike: isLike
    })
}

const EditBlog = async (req, res) => {
    console.log(req.body)
    const { id } = req.params
    const { name, desc } = req.body
    try {
        // const blog = await Blog.findByIdAndUpdate(id,
        //     {
        //         name,
        //         desc
        //     },
        //     { new: true } // Trả về bản ghi đã cập nhật
        // )

        // res.send('Edit Blog')

        const blog = await Blog.findOne({ _id: id })
        blog.name = name
        blog.desc = desc
        await blog.save()
        res.json({ message: 'Bài viết đã được chỉnh sửa thành công', blog })

    } catch (error) {
        console.error('Error editing blog:', error)
        return res.status(500).json({ message: 'Lỗi khi chỉnh sửa bài viết' })

    }
}

const AddComment = async (req, res) => {
    console.log('AddComment')
    const { userId, blogId, comment } = req.body
    try {
        const blog = await Blog.findOne({ _id: blogId })
        if (!blog) {
            return res.status(404).json({ message: 'Không tìm thấy bài viết' })
        }
        console.log(userId)

        const newComment = {
            desc: comment,
            dateL: new Date(),
            user_id: userId
        }

        blog.Comment.push(newComment)
        await blog.save()
        res.json({ message: 'Bình luận đã được thêm thành công', comment: newComment })

    } catch (error) {
        console.error('Error adding comment:', error)
        return res.status(500).json({ message: 'Lỗi khi thêm bình luận' })
    }
}

const AddLike = async (req, res) => {
    console.log('AddLike')
    const { userId, blogId } = req.body
    try {
        const blog = await Blog.findOne({ _id: blogId })
        if (!blog) {
            return res.status(404).json({ message: 'Không tìm thấy bài viết' })
        }

        // Kiểm tra xem người dùng đã thích bài viết chưa
        if (blog.Like.includes(userId)) {
            return res.status(400).json({ message: 'yes' })
        }

        blog.Like.push(userId)
        await blog.save()
        res.json('no')

    } catch (error) {
        console.error('Error adding like:', error)
        return res.status(500).json({ message: 'Lỗi khi thêm lượt thích' })
    }
}

module.exports = { GetBlogList, GetBlogById, EditBlog, AddComment, AddLike }
const mongoose = require('mongoose')
const blogPosts = require('../Data/Blog')
const Connect = require('../connect/connectMongoo')

const Comment = new mongoose.Schema({
    desc: { type: String },
    date: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'tblUser' },
})

const Like = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'tblUser' },
})


const Blog = new mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    desc: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'tblUser' },
    Comment: [Comment],
    Like: [Like],
})

module.exports = mongoose.model.Blog || mongoose.model('tblBlog', Blog)


// const TblBlog = mongoose.model('tblBlog', Blog)

// const addBlog = async () => {
//     // const blogs = new TblBlog()
//     // for (i in blogPosts) {

//     // }
//     try {
//         await TblBlog.insertMany(blogPosts)
//     } catch (error) {
//         console.log("hehehe...");
//     }
// }

// (async () => {
//     await Connect()
//     await addBlog()
// })()
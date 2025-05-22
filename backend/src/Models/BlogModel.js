const mongoose = require('mongoose')
const blogPosts = require('../Data/Blog')
const Connect = require('../connect/connectMongoo')

const Blog = new mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    desc: { type: String }
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
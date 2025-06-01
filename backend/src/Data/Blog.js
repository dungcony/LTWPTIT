
const Connect = require("../connect/connectMongoo");
const BlogModel = require("../Models/BlogModel");

// Dữ liệu blog mẫu
const blogPosts = [
    {
        name: 'GOKU',
        desc: 'MUI',
        userId: '682e5fb48610abfd206cd5b6'
    },
    {
        name: 'VEGETA',
        desc: 'ultra ego',
        userId: '682e5fb48610abfd206cd5b6'
    }
]

module.exports = blogPosts;

// (async () => {
//     await Connect()
//     const blog = new BlogModel({
//         id: 1,
//         name: 'GOKU',
//         desc: 'MUI',
//         userId: '682e5fb48610abfd206cd5b6'
//     })
// })()
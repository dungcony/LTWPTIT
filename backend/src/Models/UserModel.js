const mongoose = require('mongoose');
const Connect = require('../connect/connectMongoo');

const env = require('../../envir')

const tblUser = new mongoose.Schema({
    id: { type: String },
    fname: { type: String },
    username: { type: String },
    password: { type: String }
})

module.exports = mongoose.model.User || mongoose.model('tblUser', tblUser)

// const TblUser = mongoose.model('tblUser', tblUser);

// const addUser = async () => {
//     try {
//         const user = new TblUser(
//             {
//                 id: 'motnhipdap',
//                 fname: 'Một Nhịp Đập',
//                 username: 'motnhipdap',
//                 password: '1'
//             }
//         )
//         await user.save()
//     }
//     catch {
//         console.log("hehehe...")
//     }

// }

// (async () => {
//     await Connect()
//     await addUser()
// })()
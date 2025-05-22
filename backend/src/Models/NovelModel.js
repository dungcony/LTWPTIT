const mongoose = require('mongoose')

const Novel = new mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    auth: { type: String },
    desc: { type: String },
    comment: { type: Array }
})

module.exports = mongoose.models.Novel || mongoose.model('tblNovel', Novel)

// const TblNovel = mongoose.model('tblNovel', Novel)



// const addNovel = async () => {
//     try {
//         await TblNovel.insertMany(Novels)
//     } catch (error) {
//         console.log("hehehe...");
//     }
// }

// (async () => {
//     await Connect()
//     await addNovel()
// })()
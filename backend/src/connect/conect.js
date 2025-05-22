
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const env = require("../../envir");

// //khai báo biến dung chứa database
// let dungconyDB = null

// const client = new MongoClient(env.MONGO_URI, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// })

// const CONNECT_DB = async () => {
//     await client.connect()

//     dungconyDB = client.db('dungcony')
// }

// const GET_DB = () => {
//     if (!dungconyDB) {
//         throw new Error('must connect ')
//     }

//     return dungconyDB
// }

// const CLOSE_DB = async () => {
//     await client.close();
// }

// module.exports = { CONNECT_DB, GET_DB, CLOSE_DB }
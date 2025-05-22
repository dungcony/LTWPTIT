const express = require('express')
const CheckUser = require('../functions/CheckUser')
const { GetNovels, GetNovelById } = require('../functions/GetNovel')
const SetComment = require('../functions/SetComment')

const router = express.Router()
const bodyParser = require("body-parser")
const CreateNovel = require('../functions/CreateNovel')
const { GetBlogList, GetBlogById } = require('../functions/GetBlog')


const jsonParser = bodyParser.json()

// Middleware để parse JSON body
router.use(express.json())

// Test route
router.get('/', (req, res) => {
    res.send('HELLO WORLD')
})

// Blog routes
router.get('/blogs', GetBlogList)
router.get('/blog/:id', GetBlogById)

// Novels route
router.get('/novels', GetNovels)
router.get('/novel/:id', GetNovelById)
router.post('/create_novel', jsonParser, CreateNovel)

router.post('/novel/set_comment/:id', jsonParser, SetComment)

// Check user login
router.post('/check_user', jsonParser, CheckUser)

module.exports = router

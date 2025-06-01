const express = require('express')
const router = express.Router()

const bodyParser = require("body-parser")

const CreateNovel = require('../../functions/CreateNovel')
const { GetNovels, GetNovelById } = require('../../functions/GetNovel')
const SetComment = require('../../functions/SetComment')

router.use(express.json())

// Novels route
router.get('/list', GetNovels)
router.get('/:id', GetNovelById)
router.post('/create_novel', CreateNovel)
router.post('/set_comment/:id', SetComment)

module.exports = router
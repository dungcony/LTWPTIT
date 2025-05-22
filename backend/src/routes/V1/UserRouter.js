const express = require('express')
const router = express.Router()

const CheckUser = require('../../functions/CheckUser')

router.use(express.json())
router.post('/check_user', CheckUser)

module.exports = router
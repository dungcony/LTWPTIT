const express = require('express')
const router = express.Router()

const Login = require('../../functions/Login')
const { GetUsers, DeleTeUSer } = require('../../functions/User')

router.use(express.json())
router.post('/login', Login) //login

router.get('/list', GetUsers)
router.post('delete/:id', DeleTeUSer) //delete user

module.exports = router
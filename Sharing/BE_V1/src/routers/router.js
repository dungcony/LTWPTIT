const express = require('express')
const router = express.Router()
const models = require('../models/models');

router.get('/', (req, res) => {
    res.send("Welcome to the Photo Sharing API");
});

router.get('/users', (req, res) => {
    const users = models.userListModel();
    res.json(users);
});

router.get('/user/:id', (req, res) => {
    const user = models.userModel(req.params.id);
    if (user) res.json(user);
    else res.status(404).send("User not found");
});

router.get('/photos/:id', (req, res) => {
    const photos = models.photoOfUserModel(req.params.id);
    res.json(photos);
});

router.get('/schema', (req, res) => {
    const schema = models.schemaInfo();
    res.json(schema);
});

module.exports = router
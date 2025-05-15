const express = require('express');
const User = require('../Data/User')



const CheckUser = (req, res) => {
    console.log(req.body)
    const user = {
        username: req.body.username,
        password: req.body.password
    };

    const foundUser = User.find(
        u => u.username === user.username && u.password === user.password
    );

    if (foundUser) {
        res.json(foundUser)
    }
    else {
        res.status(401).json({ mess: "khong tim thay user" })
    }
}

module.exports = CheckUser;
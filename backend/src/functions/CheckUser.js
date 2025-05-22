const express = require('express');
const Users = require('../Models/UserModel')


const CheckUser = async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;

    const foundUser = await Users.findOne({ username, password },
        'id'
    );


    if (foundUser) {
        res.json(foundUser)
    }
    else {
        res.status(401).json({ mess: "khong tim thay user" })
    }
}

module.exports = CheckUser;
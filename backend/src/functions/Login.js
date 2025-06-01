require('dotenv').config();
const express = require('express');
const Users = require('../Models/UserModel')
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const foundUser = await Users.findOne({ username, password }).select('-password');

        const payload = {
            userId: foundUser._id,
            username: foundUser.username,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            user: foundUser,
            token: token
        });

    } catch (error) {
        console.error("Error in Login:", error);
        return res.status(500).json({ message: "Internal server error" });

    }
}

module.exports = Login;
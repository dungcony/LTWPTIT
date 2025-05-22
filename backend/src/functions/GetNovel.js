const express = require('express')
const Novel = require('../Models/NovelModel')

const GetNovels = async (req, res) => {
    try {
        const novels = await Novel.find({}, 'id name auth desc comment')
        res.json(novels)
    } catch (error) {
        console.log(error)
    }
}

const GetNovelById = async (req, res) => {
    const id = req.params.id
    const novel = await Novel.findOne({ id },
    )

    res.json(novel)
}

module.exports = { GetNovels, GetNovelById };
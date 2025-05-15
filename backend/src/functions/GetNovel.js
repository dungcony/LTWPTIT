const express = require('express')

const Novels = require('../Data/Novels')

const GetNovels = (req, res) => {
    res.json(Novels)
}

const GetNovelById = (req, res) => {
    const id = req.params.id
    const novel = Novels.find(
        n => n.id == id
    )

    res.json(novel)
}

module.exports = { GetNovels, GetNovelById };
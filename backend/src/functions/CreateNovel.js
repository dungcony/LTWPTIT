const Novels = require("../Data/Novels")

const CreateNovel = (req, res) => {
    const { name, author, desc } = req.body

    const newNovel = {
        id: Novels.length + 1,
        name,
        author,
        desc
    }

    console.log(newNovel)

    Novels.push(newNovel)

    res.status(201).json(newNovel)
}

module.exports = CreateNovel
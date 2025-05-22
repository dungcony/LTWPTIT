
const Novel = require('../Models/NovelModel')

const CreateNovel = async (req, res) => {
    const { name, author, desc } = req.body

    const count = await Novel.countDocuments()  // đếm số truyện hiện có

    const newNovel = new Novel({
        id: count + 1,
        name,
        author,
        desc
    })

    console.log(newNovel)

    await newNovel.save()

    res.status(201).json(newNovel)
}

module.exports = CreateNovel
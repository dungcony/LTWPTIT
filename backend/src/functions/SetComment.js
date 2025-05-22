const Novel = require('../Models/NovelModel')

const SetComment = async (req, res) => {
    const { id } = req.params
    const { comment } = req.body


    const novel = await Novel.findOne(
        { id }
    )
    console.log(novel.comment == null)

    novel.comment.push(comment)

    novel.save()

    res.status(200).json({ message: 'Comment set successfully' })
}

module.exports = SetComment

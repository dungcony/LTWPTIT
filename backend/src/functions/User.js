const UserModel = require("../Models/UserModel")

const GetUsers = async (req, res) => {
    console.log('GetUsers')
    try {
        const users = await UserModel.find({}).select('-password')
        console.log(users);
        res.status(200).json(users);

    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal server error' });

    }
}

const DeleTeUSer = async (req, res) => {
    const id = req.params.id
    console.log('DeleTeUSer', id)
    try {
        const user = await UserModel.findByIdAndDelete(id)
        res.status(200).json({ message: 'User deleted successfully' });
    } catch {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }


}

module.exports = {
    GetUsers,
    DeleTeUSer
}
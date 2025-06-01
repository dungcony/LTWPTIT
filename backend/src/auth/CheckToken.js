require('dotenv').config();
const jwt = require('jsonwebtoken');

const CheckToken = (req, res, next) => {
    // console.log(">>> White list: ", req.originalUrl);
    if (req?.headers?.authorization?.split(' ')?.[1]) {
        const token = req.headers.authorization.split(' ')[1];

        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        next()
    } else {
        //console.error(">>> No token provided");
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}

module.exports = CheckToken;
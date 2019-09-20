const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeData = jwt.verify(token, banana);
        req.userData = { ...decodeData, id: decodeData.id };
        return next();
    } catch(error) {
        return res.status(401).json({status: 403, error: "Authorization failed"});
    }
}

module.exports = authMiddleware
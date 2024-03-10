require('dotenv').config()

const jwt = require('jsonwebtoken]')

//
function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) return res.status(401).json({ msg: "Access denied!" });
    
    try {
        const secret = process.env.SECRET_JWT;

        jwt.verify(token, secret);

        next();
    } catch (err) {
        res.status(400).json({ msg: "Token is invalid!" });
    }
}

module.exports = checkToken
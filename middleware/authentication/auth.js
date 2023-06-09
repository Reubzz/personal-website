// check sessions here 
require('dotenv').config()

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT;


const status = {
    200: {
        message: "Authorized User",
        code: 200
    },
    201: {
        message: "Not Authorized",
        code: 201
    },
}

exports.authCheck = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).send("Unknown Error | Kindly clear all cookies from your browser then access the page")
            }

            else {
                res.locals.userRole = decodedToken.role;
                res.locals.userId = decodedToken.id;
                res.locals.userName = decodedToken.username;
                next();
            }
        })
    }
    else {
        res.locals.userRole = "default"
        next()
    }
}

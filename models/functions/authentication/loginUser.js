// check if user is there with username
// check if password is correct 
// login user

/**
 * 
 * if username incorrect- 
 *      @error 101 = username incorrect (no user found)
 *      @status 201 = no login
 * 
 * if password incorrect - 
 *      @error 102 = password incorrect (username correct / pass incorrect)
 *      @status 201 = no login
 * 
 * if username + password correct - 
 *      @error 100 = no error
 *      @status 200 = login + session created + create cookie
 *  
 */

// Databases
const User = require('../../schemas/userAuth')
const jwtSecret = process.env.JWT
const jwt = require('jsonwebtoken')


// Config File
const { loginMaxAge } = require('../../../config.json')


const error = {
    100: {
        messsage: "no error",
        code: 100
    },
    101: {
        messsage: "username incorrect (no user found)",
        code: 101
    },
    102: {
        messsage: "password incorrect (username correct / pass incorrect)",
        code: 102
    },
    103: {
        messsage: "Username or Password not present",
        code: 103
    },
    109: {
        message: "Unknown Error",
        code: 109
    }
}

const status = {
    200: {
        message: "Session created",
        code: 200,
    },
    201: {
        message: "no login",
        code: 201,
    },
}
exports.loginUser = async (req, res, next) => {
    const { username, password, email } = req.body

    let uName = undefined;

    if (username) {
        uName = { username: username }
    }
    else {
        uName = { email: email }
    }

    if (!(username || email) || !password) {
        return res.status(401).json({ error: error[103], status: status[201] })
    }
    try {
        // Check for user in DB
        const check1 = await User.findOne(uName)

        // If no user
        if (!check1) {
            return res.status(401).json({ error: error[101], status: status[201] })
        }

        // Compare password

        // password incorrect
        if (check1.password != password) {
            return res.status(401).json({ error: error[102], status: status[201] })
        }

        // All good - username + password correct
        if (check1.password == password) {
            // Generate JWT
            const token = jwt.sign(
                { id: check1.id, username: check1.username, role: check1.role },
                jwtSecret,
                { expiresIn: loginMaxAge } // 1 day in secs 
            );

            // Setting the Cookie - creating session
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: loginMaxAge * 1000, // 3hrs in ms
            });
            res.status(200).json({ error: error[100], status: status[200], user: check1 })
        }
        else {
            return res.status(401).json({
                error: error[101],
                status: status[201]
            });
        }
    } catch (error) {
        res.status(400).json({
            error: { message: error.message, code: 109 },
            status: status[201]
        });
    }
}
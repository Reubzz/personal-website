// Deletes user from the database 
// takes in the username or id to delete the user

/**
 * 
 * @status codes
 * 200 - Deleted user
 * 201 - Couldn't delete user
 * 
 * @error codes 
 * 100 - No errors
 * 101 - User doesn't exist
 * 102 - Database Error
 * 103 - Unknown Error
 */

const User = require('../../schemas/userAuth')

const status = {
    200: {
        message: "Deleted User",
        code: 200
    },
    201: {
        message: "Couldn't delete user",
        code: 201
    }
};
const error = {
    100: {
        message: "No Errors",
        code: 100
    },
    101: {
        message: "User doesn't exist",
        code: 101
    },
    102: {
        message: "Database Error",
        code: 102
    },
    103: {
        message: "Unknown Error",
        code: 103
    },
    104: {
        message: "Invalid syntax",
        code: 104
    }
};

exports.deleteUser = async (req, res, next) => {

    const { username, id } = req.body
    let uName = undefined;

    if (!username && !id) {
        return res.status(401).json({
            error: error[104],
            status: status[201]
        })
    }

    username ? uName = { username: username } : uName = { id: id }


    try {
        let searchUser = await User.findOne(uName)
        if (!searchUser) {
            return res.status(401).json({
                error: error[101],
                status: status[201]
            })
        }
        User.deleteOne(uName)
            .then(() => {
                res.status(200).json({
                    error: error[100],
                    status: status[200],
                })
            })
            .catch(() => {
                return res.status(401).json({
                    error: error[102],
                    status: status[201]
                })
            })
    } catch (err) {
        return res.status(401).json({
            error: error[103],
            status: status[201]
        })
    }
}
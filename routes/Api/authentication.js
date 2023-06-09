const express = require('express')
const router = express.Router()
const path = require('path')
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

const { registerUser } = require('../../models/functions/authentication/registerUser')
const { loginUser } = require('../../models/functions/authentication/loginUser')
const { deleteUser } = require('../../models/functions/authentication/deleteUser')


// User registration flow 
router.route('/register').post(urlEncodedParser, registerUser)

// Login Flow

router.route('/login')
    .post(urlEncodedParser, loginUser)


// User Account Deletion flow

router.route('/delete').delete(deleteUser)

// User Logout Flow 
router.route('/logout').get()
module.exports = router;

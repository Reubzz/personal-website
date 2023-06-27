const express = require('express')
const router = express.Router()
const path = require('path')
const config = require('../config.json');
const shortlinksdb = require('../models/schemas/shortlinks')
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

// MiddleWares
const { authCheck } = require("../middleware/authentication/auth")

require('dotenv').config();

router.get('/', authCheck, async (req, res) => {
    await sendMainPage({
        req: req,
        res: res,
        error: 0,
        user: {
            id: res.locals.userId,
            role: res.locals.userRole,
            username: res.locals.userName
        }
    })
})

router.post('/', urlEncodedParser, authCheck, async (req, res) => {

    const initialCheck = await shortlinksdb.findOne({ slug: req.body.slug })
    if (initialCheck) {
        return await sendMainPage({
            req: req,
            res: res,
            error: 1
        })
    }

    const newEntry = new shortlinksdb({
        id: getUniqueId(),
        slug: req.body.slug,
        href: `${req.body.href}`,
        disabled: false,
        createdAt: new Date().getTime(),
        [req.body.expiryTime]: new Date(),
        createdBy: {
            id: res.locals.userId,
            username: res.locals.userName,
            role: res.locals.userRole
        }
    })
    await newEntry
        .save()
        .catch((e) => console.log(e))
        .then(async () => {
            await sendConfirmedPage({
                req: req,
                res: res,
                error: 0,
                user: {
                    id: res.locals.userId,
                    role: res.locals.userRole,
                    username: res.locals.userName
                }
            })
        })
})

router.get('/delete/:id', async (req, res) => {
    shortlinksdb.deleteOne({ id: req.params.id }).then(function () {
        res.redirect("/urlshortner");
    }).catch(function (error) {
        console.log(error); // Failure
    });
})
router.get('/disable/:id', async (req, res) => {
    const check = await shortlinksdb.findOne({ id: req.params.id });
    check.disabled = (check.disabled == true) ? false : true;
    await check.save().then(function () {
        res.redirect("/urlshortner");
    }).catch(function (error) {
        console.log(error); // Failure
    });
})

/**
 * 
 * * actual url redirecter shifted to routes/main.js as it won't work if placed here.
 * * due to Routers - if url redirecter is placed here the link would be --> reubz.io/urlshorter/<slug_here>
 * * to avoid this it is placed in routes/main.js, hence now the link works as intended --> reubz.io/<slug_here>
 */

function getUniqueId() {
    return Math.random().toString(36).slice(2);
}

async function sendMainPage({ req, res, error, user }) {

    res.status(200).render("urlshortner/urlshortnermain", {
        allLinks: await shortlinksdb.find(selectFilter({ disabled: false, userId: user.id, userRole: user.role })).sort({ createdAt: -1 }),
        disabledLinks: await shortlinksdb.find(selectFilter({ disabled: true, userId: user.id, userRole: user.role })).sort({ createdAt: -1 }),
        domain: config.domain,
        error: error,
        user: {
            username: user.username,
            id: user.id,
            role: user.role
        }
    })
}
async function sendConfirmedPage({ req, res, error, user }) {
    res.status(200).render('urlshortner/urlconfirmed', {
        data: req.body,
        domain: config.domain,
        allLinks: await shortlinksdb.find(selectFilter({ disabled: false, userId: user.id, userRole: user.role })).sort({ createdAt: -1 }),
        disabledLinks: await shortlinksdb.find(selectFilter({ disabled: true, userId: user.id, userRole: user.role })).sort({ createdAt: -1 }),
        error: error,
        user: {
            username: user.username,
            id: user.id,
            role: user.role
        }
    })
}

function selectFilter(options = {}) {
    options.disabled ??= false // ??= means default value if no option is provided. 
    options.userId ??= null
    options.userRole ??= 'default'

    let filter = {};

    if (options.userRole == 'default') {
        return filter = {
            "createdBy.id": 0
        }
    }

    if (options.userRole == 'basic') {
        return filter = {
            disabled: options.disabled,
            "createdBy.id": options.userId
        }
    }

    if (options.userRole == 'admin') {
        return filter = {
            disabled: options.disabled
        }
    }

    return filter = {
        "createdBy.id": 0
    }
}

module.exports = router;
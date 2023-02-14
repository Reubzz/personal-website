const express = require('express')
const router = express.Router()
const path = require('path')
const config = require('../config.json');
const mongoose = require("mongoose");
const apicache = require('apicache');
const shortlinksdb = require('../models/schemas/shortlinks')
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

require('dotenv').config();
let cache = apicache.middleware

router.get('/urlshortner', async (req, res) => {

    const links = await shortlinksdb.find();

    res.status(200).render("urlshortnermain", { allLinks: links, domain: config.domain, error: 0 })

})

router.post('/urlshortner', urlEncodedParser, async (req, res) => {

    const initialCheck = await shortlinksdb.findOne({ slug: req.body.slug })
    if (initialCheck) {
        return res.render("urlshortnermain", { allLinks: await shortlinksdb.find(), domain: config.domain, error: 1 })
    }
    const uniqueId = getUniqueId();

    const newEntry = new shortlinksdb({
        id: uniqueId,
        slug: req.body.slug,
        href: `${req.body.href}`,
    })
    await newEntry.save()

    const check = await shortlinksdb.findOne({ id: uniqueId })

    if (req.body.expiryTime == "12-Hours") {
        check.expireAt12H = new Date()
    } else if (req.body.expiryTime == "1-Day") {
        check.expireAt1D = new Date()
    } else if (req.body.expiryTime == "2-Day") {
        check.expireAt3D = new Date()
    } else if (req.body.expiryTime == "1-Week") {
        check.expireAt1W = new Date()
    } else if (req.body.expiryTime == "2-Week") {
        check.expireAt2W = new Date()
    } else if (req.body.expiryTime == "1-Month") {
        check.expireAt1M = new Date()
    }

    await check.save().catch()

    const links = await shortlinksdb.find()

    res.status(200).render('urlconfirmed', { data: req.body, domain: config.domain, allLinks: links })
})

router.get('/urlshortner/delete/:id', async (req, res) => {
    shortlinksdb.deleteOne({ id: req.params.id }).then(function () {
        res.redirect("/urlshortner");
    }).catch(function (error) {
        console.log(error); // Failure
    });
})

router.get('/:slug', async (req, res) => {
    const check = await shortlinksdb.findOne({ slug: req.params.slug })
    if (!check) return res.status(404).sendFile(path.join(__dirname, '../pages', 'error', '404.html'));
    else { res.status(302).redirect(check.href); }
})


function getUniqueId() {
    return Math.random().toString(36).slice(2);
}

module.exports = router;
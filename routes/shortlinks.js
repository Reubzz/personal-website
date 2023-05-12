const express = require('express')
const router = express.Router()
const path = require('path')
const config = require('../config.json');
const shortlinksdb = require('../models/schemas/shortlinks')
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: false })

require('dotenv').config();

router.get('/', async (req, res) => {
    res.status(200).render("urlshortner/urlshortnermain", {
        allLinks: await shortlinksdb.find({ disabled: false }),
        disabledLinks: await shortlinksdb.find({ disabled: true }),
        domain: config.domain,
        error: 0
    })

})

router.post('/', urlEncodedParser, async (req, res) => {

    const initialCheck = await shortlinksdb.findOne({ slug: req.body.slug })
    if (initialCheck) {
        return res.render("urlshortner/urlshortnermain", {
            allLinks: await shortlinksdb.find({ disabled: false }),
            disabledLinks: await shortlinksdb.find({ disabled: true }),
            domain: config.domain,
            error: 1
        })
    }
    const uniqueId = getUniqueId();

    const newEntry = new shortlinksdb({
        id: uniqueId,
        slug: req.body.slug,
        href: `${req.body.href}`,
        disabled: false,
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

    res.status(200).render('urlshortner/urlconfirmed', {
        data: req.body,
        domain: config.domain,
        allLinks: await shortlinksdb.find({ disabled: false }),
        disabledLinks: await shortlinksdb.find({ disabled: true }),
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

// actual url redirecter shifted to routes/main.js as it won't work if placed here. 
// due to Routers - if url redirecter is placed here the link would be --> reubz.io/urlshorter/<slug_here>
// to avoid this it is placed in routes/main.js, hence now the link works as intended --> reubz.io/<slug_here>

function getUniqueId() {
    return Math.random().toString(36).slice(2);
}

module.exports = router;
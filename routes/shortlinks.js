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
        allLinks: await shortlinksdb.find({ disabled: false }).sort({ createdAt: -1 }),
        disabledLinks: await shortlinksdb.find({ disabled: true }).sort({ createdAt: -1 }),
        domain: config.domain,
        error: 0
    })

})

router.post('/', urlEncodedParser, async (req, res) => {

    const initialCheck = await shortlinksdb.findOne({ slug: req.body.slug })
    if (initialCheck) {
        return res.render("urlshortner/urlshortnermain", {
            allLinks: await shortlinksdb.find({ disabled: false }).sort({ createdAt: -1 }),
            disabledLinks: await shortlinksdb.find({ disabled: true }).sort({ createdAt: -1 }),
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
        createdAt: new Date().getTime(),
    })
    await newEntry.save()

    const check = await shortlinksdb.findOne({ id: uniqueId })
    check[req.body.expiryTime] = new Date()

    await check.save().catch()

    res.status(200).render('urlshortner/urlconfirmed', {
        data: req.body,
        domain: config.domain,
        allLinks: await shortlinksdb.find({ disabled: false }).sort({ createdAt: -1 }),
        disabledLinks: await shortlinksdb.find({ disabled: true }).sort({ createdAt: -1 }),
        error: 0,
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
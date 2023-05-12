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

const projectsdb = require('../models/schemas/projects')

router.get('/', async (req, res) => {
    // res.sendFile(path.join(__dirname, "../pages", 'projects', 'projects.html'));
    res.status(200).render("projects/projects", {
        projects: await projectsdb.find().sort({ projectId: 1 })
    })
})
router.get('discord-bot', async (req, res) => { })
router.get('bot-website', async (req, res) => { })
router.get('url-shortner', async (req, res) => { })
router.get('discord-canvas', async (req, res) => { })
router.get('web-scrapper', async (req, res) => { })
router.get('flutter-app', async (req, res) => { })


module.exports = router;

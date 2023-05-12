const express = require('express')
const router = express.Router()
const path = require('path')

// Databases
const projectsdb = require('../models/schemas/projects')

router.get('/', async (req, res) => {
    res.status(200).render("projects/projects", {
        projects: await projectsdb.find().sort({ projectId: 1 })
    })
})


module.exports = router;

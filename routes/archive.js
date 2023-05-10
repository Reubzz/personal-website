const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
    res.redirect('archive/home');
})
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/archive/home/v1Home.html"));
})

module.exports = router;

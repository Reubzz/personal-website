const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
    res.redirect('archive/home');
})
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/archive/home/v1Home.html"));
})

router.get('/atiya', (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/archive/atiya/atiya.html"))
})

router.get('/evita', (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "archive", "evita", "evita.html"))
})

router.get("/atu", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "archive", "atiya", "atu.html"))
})

module.exports = router;

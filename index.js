const express = require('express');
const path = require('path');
const apicache = require('apicache');
const config = require('./config.json')

require('dotenv').config();

const app = express();
let cache = apicache.middleware;
const port = process.env.PORT;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'comming soon', 'index.html'))
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'comming soon', 'index.html'))
});
app.get('/instagram', (req, res) => {
    res.redirect(config.socials.instagram)
});
app.get('/twitter', (req, res) => {
    res.redirect(config.socials.twitter)
});
app.get('/discord', (req, res) => {
    res.redirect(config.socials.discord)
});
app.get('/email', (req, res) => {
    res.redirect(config.socials.email)
});
app.get('/github', (req, res) => {
    res.redirect(config.socials.github)
});

app.get('*', (req, res) => {
    res.status(404);
});


app.listen(port, () => console.log(`App Listening at http://localhost:${port}`));
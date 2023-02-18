/** Development Mode */

const devMode = true

/** Development Mode - true or false */

const express = require("express");
const path = require("path");
const apicache = require("apicache");
const config = require("./config.json");
const mongoose = require('mongoose')
const shortlinksdb = require('./models/schemas/shortlinks')


require("dotenv").config();

let cache = apicache.middleware;
const port = process.env.PORT;
const mongooseURI = process.env.MONGOOSEURI;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use('/urlshortner', require(path.join(__dirname, '/routes/shortlinks')))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "comming soon", "index.html"));
});
app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "comming soon", "index.html"));
});
app.get("/valentine", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "valentine", "valentine.html"))
})
app.get("/instagram", (req, res) => {
    res.redirect(config.socials.instagram);
});
app.get("/twitter", (req, res) => {
    res.redirect(config.socials.twitter);
});
app.get("/discord", (req, res) => {
    res.redirect(config.socials.discord);
});
app.get("/email", (req, res) => {
    res.redirect(config.email);
});
app.get("/github", (req, res) => {
    res.redirect(config.socials.github);
});

// For Url Shortner to work
app.get("/:slug", async (req, res) => {
    const check = await shortlinksdb.findOne({ slug: req.params.slug })
    if (!check) return res.status(404).sendFile(path.join(__dirname, '../pages', 'error', '404.html'));
    else { res.status(302).redirect(check.href); }
})

app.get("*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "pages", "error", "404.html"));
});

mongoose.connect(mongooseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));

if (devMode == true) {
    app.listen(port, () =>
        console.log(`App Listening at http://localhost:${port}`)
    );
} else {
    app.listen(port, () =>
        console.log(`App Listening at http://${config.domain}`)
    );
}

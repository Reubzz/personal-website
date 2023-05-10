/** Development Mode */

const devMode = true

/** Development Mode - true or false */

const express = require("express");
const path = require("path");
const apicache = require("apicache");
const config = require("./config.json");
const shortlinksdb = require('./models/schemas/shortlinks')
const aboutMedb = require('./models/schemas/aboutMe')
const projectsdb = require('./models/schemas/projects')


require("dotenv").config();

let cache = apicache.middleware;
const port = process.env.PORT;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use('/urlshortner', require(path.join(__dirname, '/routes/shortlinks')));
app.use('/projects', require(path.join(__dirname, '/routes/projects')));

app.get("/", async (req, res) => {
    res.status(200).render("home/home", {
        projects: await projectsdb.find({ display: "show" }).sort({ projectId: 1 }),
        aboutMe: await aboutMedb.findOne()
    })
});
app.get("/home", async (req, res) => {
    res.status(200).render("home/home", {
        projects: await projectsdb.find({ display: "show" }).sort({ projectId: 1 }),
        aboutMe: await aboutMedb.findOne()
    })
});

app.get("/commingsoon", async (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "comming soon", "index.html"));
})

// Fun Pages

// 1 - Valentines day 
app.get("/valentine", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "fun pages", "valentine", "valentine.html"))
})

// 2 - To be honest I love seeing you 
app.get("/honestly", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "fun pages", "to be honest", "index.html"))
})

// Atiya Birthday
app.get("/atiya", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "atiya", "atiya.html"));
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
app.get("/linkedin", (req, res) => {
    res.redirect(config.socials.linkedin);
});


// For Url Shortner to work
app.get("/:slug", async (req, res) => {
    const check = await shortlinksdb.findOne({ slug: req.params.slug })
    if (!check) return res.status(404).sendFile(path.join(__dirname, 'pages', 'error', '404.html'));
    else { res.status(302).redirect(check.href); }
})

app.get("*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "pages", "error", "404.html"));
});



/**
 * DEV MODE 
 */
if (devMode == true) {
    app.listen(port, () =>
        console.log(`App Listening at http://localhost:${port}`)
    );
} else {
    app.listen(port, () =>
        console.log(`App Listening at http://${config.domain}`)
    );
}

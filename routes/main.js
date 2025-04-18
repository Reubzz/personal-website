const express = require('express')
const router = express.Router()
const path = require('path')

// Config File 
const config = require("../config.json");

// Databases
const shortlinksdb = require('../models/schemas/shortlinks')
const aboutMedb = require('../models/schemas/aboutMe')
const projectsdb = require('../models/schemas/projects')

router.get("/", async (req, res) => {
    res.status(200).render("home/home", {
        projects: await projectsdb.find({ display: "show" }).sort({ projectId: 1 }),
        aboutMe: await aboutMedb.findOne()
    })
});
router.get("/home", async (req, res) => {
    res.status(200).render("home/home", {
        projects: await projectsdb.find({ display: "show" }).sort({ projectId: 1 }),
        aboutMe: await aboutMedb.findOne()
    })
});

router.get("/commingsoon", async (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "comming soon", "index.html"));
})

// Fun Pages

// 1 - Valentines day 
router.get("/valentine", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "fun pages", "valentine", "valentine.html"))
})

// 2 - To be honest I love seeing you 
router.get("/honestly", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages", "fun pages", "to be honest", "index.html"))
})


/**
 * Static Urls
 */
router.get("/instagram", (req, res) => {
    res.redirect(config.socials.instagram);
});
router.get("/twitter", (req, res) => {
    res.redirect(config.socials.twitter);
});
router.get("/discord", (req, res) => {
    res.redirect(config.socials.discord);
});
router.get("/email", (req, res) => {
    res.redirect(config.email);
});
router.get("/github", (req, res) => {
    res.redirect(config.socials.github);
});
router.get("/linkedin", (req, res) => {
    res.redirect(config.socials.linkedin);
});
router.get("/resume", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "files", "resume.pdf"))
});

/**
 * User Auth Flow urls
 */
router.get("/register", (req, res) => {
    if (req.cookies.jwt) {
        return res.redirect('back')
    }
    res.sendFile(path.join(__dirname, "../pages/user control/register.html"))
})
router.get("/login", (req, res) => {
    if (req.cookies.jwt) {
        return res.redirect('back')
    }
    res.sendFile(path.join(__dirname, "../pages/user control/login.html"))
})
router.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.redirect("back")
})

// URL SHORTNER 
// For Url Shortner to work
router.get("/:slug", async (req, res) => {
    const check = await shortlinksdb.findOne({ slug: req.params.slug })
    if (!check) return res.status(404).sendFile(path.join(__dirname, '../pages', 'error', '404.html')); // 404 Page
    if (check.disabled == true) return res.status(404).sendFile(path.join(__dirname, "../pages", "error", "404.html"))
    else { res.status(302).redirect(check.href); }
})

// 404 Page
router.get("*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "../pages", "error", "404.html"));
});



module.exports = router;

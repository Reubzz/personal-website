/** Development Mode */

const devMode = true

/** Development Mode - true or false */

const express = require("express");
const path = require("path");
const config = require("./config.json");

require("dotenv").config();

const port = process.env.PORT;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use('/urlshortner', require(path.join(__dirname, '/routes/shortlinks')));
app.use('/projects', require(path.join(__dirname, '/routes/projects')));
app.use('/archive', require(path.join(__dirname, '/routes/archive')));
app.use('/', require(path.join(__dirname, '/routes/main')));



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

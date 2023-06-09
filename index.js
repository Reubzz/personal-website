require("dotenv").config();
const express = require("express");
const path = require("path");
const config = require("./config.json");
const cookieParser = require("cookie-parser");

/** Development Mode */

const devMode = process.env.DEV || false

/** Development Mode - true or false */

const port = process.env.PORT;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use('/urlshortner', require(path.join(__dirname, '/routes/shortlinks')));
app.use('/projects', require(path.join(__dirname, '/routes/projects')));
app.use('/archive', require(path.join(__dirname, '/routes/archive')));
app.use('/api/auth', require(path.join(__dirname, '/routes/Api/authentication')));
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

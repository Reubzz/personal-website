const mongoose = require('mongoose')
require("dotenv").config();

const URLSHORTNER_DB_URI = process.env.URLSHORTNERURI;
const HOME_PAGE_DB_URI = process.env.HOMEPAGEURI;

mongoose.URL_SHORTNER_DB = mongoose.createConnection(URLSHORTNER_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.HOME_PAGE_DB = mongoose.createConnection(HOME_PAGE_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = mongoose;
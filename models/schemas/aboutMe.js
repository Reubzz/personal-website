const mongoose = require('mongoose');
const db = require('../../dbs.js');

const model = db.HOME_PAGE_DB.model(
    'aboutMe',
    new mongoose.Schema({
        title: { type: String },
        description: { type: Array }
    }),
);

module.exports = model;
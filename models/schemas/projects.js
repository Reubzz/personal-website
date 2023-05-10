const mongoose = require('mongoose');
const db = require('../../dbs.js');

const model = db.HOME_PAGE_DB.model(
    'project',
    new mongoose.Schema({
        name: { type: String },
        img: { type: String },
        description: { type: String },
        projectId: { type: Number },
        code: { type: String },
        live: { type: String },
        display: { type: String }
    }),
);

module.exports = model;
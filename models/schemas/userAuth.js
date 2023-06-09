const mongoose = require("mongoose");
const db = require('../../dbs.js')

const model = db.USER_AUTH.model(
    "user",
    new mongoose.Schema({
        id: { type: String },
        username: { type: String, required: true, unique: true, minlength: 4 },
        password: { type: String, required: true, minlength: 6 },
        email: { type: String, required: true },
        avatar: { type: String },
        role: { type: String, default: "basic" },
        createdAt: { type: Date }
    })
);

module.exports = model;

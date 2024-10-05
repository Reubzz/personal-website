const mongoose = require("mongoose");

const db = require('../../dbs.js')

const model = db.URL_SHORTNER_DB.model(
  "shortlink",
  new mongoose.Schema({
    id: { type: String },
    slug: { type: String },
    href: { type: String },
    
    disabled: { type: Boolean },
    createdAt: { type: Date },
    createdBy: {
      id: { type: String },
      username: { type: String },
      role: { type: String }
    },
    qrcode: { type: String },
    expireAt: { type: Date, required: false, }
  }).index({ expireAt: 1 }, { expireAfterSeconds: 0 })
);

module.exports = model;

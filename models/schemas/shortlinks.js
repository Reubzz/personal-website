const mongoose = require("mongoose");

const db = require('../../dbs.js')

const model = db.URL_SHORTNER_DB.model(
  "shortlink",
  new mongoose.Schema({
    id: { type: String },
    slug: { type: String },
    href: { type: String },
    expireAt12H: { type: Date, expires: 60 * 60 * 12 },
    expireAt1D: { type: Date, expires: 60 * 60 * 24 },
    expireAt3D: { type: Date, expires: 60 * 60 * 24 * 3 },
    expireAt1W: { type: Date, expires: 60 * 60 * 24 * 7 },
    expireAt2W: { type: Date, expires: 60 * 60 * 24 * 14 },
    expireAt1M: { type: Date, expires: 60 * 60 * 24 * 30 },
    date: { type: Date },
    disabled: { type: Boolean },
    createdAt: { type: Date },
    createdBy: {
      id: { type: String },
      username: { type: String },
      role: { type: String }
    },
    qrcode: { type: String }
  })
);

module.exports = model;

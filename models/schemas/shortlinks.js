const mongoose = require("mongoose");

module.exports = mongoose.model(
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
    date: { type: Date }
  })
);

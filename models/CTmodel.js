const mongoose = require("mongoose");
require("dotenv").config();


// MongoDB connection
mongoose.connect(process.env.MONGODBURL);

// Schema
const CTSchema = new mongoose.Schema({
  coin: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  timestamp: { type: Date, default: Date.now },
});

// Model
const CT = mongoose.models.CT || mongoose.model("CT", CTSchema);

module.exports = CT;

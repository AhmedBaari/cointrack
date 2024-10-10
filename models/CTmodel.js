const mongoose = require("mongoose");

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/CoinTrackDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
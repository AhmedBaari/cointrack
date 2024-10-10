const express = require('express'); 
const mongoose = require('mongoose'); // mongodb - local
const axios = require('axios');
const cron = require('node-cron'); // cron job (per 2 hrs)
const app = express();

const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/CoinTrackDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// Schema
const CTSchema = new mongoose.Schema({
  coin: String,
  price: Number,
  marketCap: Number,
  change24h: Number,
  timestamp: { type: Date, default: Date.now }
});

// Model
const CT = mongoose.model("CT", CTSchema);

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

// Fetch data from CoinGecko API
const fetchCryptoData = async () => {
  const coins = ["bitcoin", "matic-network", "ethereum"];
  const url = "https://api.coingecko.com/api/v3/simple/price";

  const params = {
    ids: coins.join(","),
    vs_currencies: "usd",
    include_market_cap: "true",
    include_24hr_change: "true",
  };

  try {

    const response = await axios.get(url, { params });

    const data = response.data;

    coins.forEach(async (coin) => {
      // Creating the record
      const record = new CT({
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
      });

      // Saving the record
      await record.save();

      // Logging (temp)
      console.log(
        `Data saved for ${coin}, price: ${record.price}, market cap: ${record.marketCap}, 24h change: ${record.change24h}`
      );
    });

  } catch (error) {
    console.error("Error in the cron job:", error);
  }

};

// Run it every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);


/* /STATS method: GET THE LATEST DATA */
app.get("/stats", async (req, res) => {
  const { coin } = req.query; // Get coin name

  // Get the latest record
  const Record = await Crypto.findOne({ coin }).sort(
    { timestamp: -1 }); // sort timestamp in descending order

  if (Record) {
    // Send the response with the data
    res.json({
      price: Record.price,
      marketCap: Record.marketCap,
      "24hChange": Record.change24h,
    });

  } else {
    res.status(404).send("Data not found");
  }
});

/* /DEVIATION method: GET THE STANDARD DEVIATION OF (upto) THE LAST 100 PRICES */
app.get("/deviation", async (req, res) => {

  const { coin } = req.query;

  // Getting the last 100 records
  const records = await CT.find({ coin })
    .sort({ timestamp: -1 })
    .limit(100);
  
  
  if (records.length > 0) {
    // Getting the price for each record
    const prices = records.map((record) => record.price);

    // Mean of all of these prices
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;

    // Calculating Variance (σ^2)
    const variance =
      prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
    
    // Standard Deviation (σ) (root of variance)
    const deviation = Math.sqrt(variance);

    // response 
    res.json({ deviation });
  } else {
    res.status(404).send("Data not found");
  }
});



// SERVER LISTENER ------------------------
app.listen(PORT, () => {
  console.log(`server is listening in ${PORT}`);
});

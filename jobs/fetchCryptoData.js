const cron = require("node-cron"); // cron job (per 2 hrs)
const axios = require("axios"); // HTTP requests
const CT = require('../models/CTmodel'); 



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

// 10 seconds (test)
// cron.schedule('*/10 * * * * *', fetchCryptoData);
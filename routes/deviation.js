const express = require("express");
const router = express.Router();
const CT = require('../models/CTmodel');

/* /DEVIATION method: GET THE STANDARD DEVIATION OF (upto) THE LAST 100 PRICES */
router.get("/", async (req, res) => {
  const { coin } = req.query;

  // Getting the last 100 records
  const records = await CT.find({ coin }).sort({ timestamp: -1 }).limit(100);

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


module.exports = router;
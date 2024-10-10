const express = require("express");
const router = express.Router();
const CT = require("../models/CTmodel");

/* /STATS method: GET THE LATEST DATA */
router.get("/", async (req, res) => {
  const { coin } = req.query; // Get coin name

  // Get the latest record
  const Record = await CT.findOne({ coin }).sort({ timestamp: -1 }); // sort timestamp in descending order

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


module.exports = router;
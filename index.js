const express = require('express'); 
const mongoose = require('mongoose'); // mongodb - local
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

// import models (connection to mongodb)
const CT = require('./models/CTmodel');

// import routes
const statsRoute = require('./routes/stats');
const deviationRoute = require('./routes/deviation');

// import cron job
const fetchCryptoData = require('./jobs/fetchCryptoData');


app.use(express.json());
app.use('/stats', statsRoute);  
app.use('/deviation', deviationRoute);




// SERVER LISTENER ------------------------
app.listen(PORT, () => {
  console.log(`server is listening in ${PORT}`);
});

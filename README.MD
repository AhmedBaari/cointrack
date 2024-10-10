
# CoinTrack

## Introduction

CoinTrack is a server-side application developed using Node.js and MongoDB. The app fetches and stores cryptocurrency data and provides APIs to get the latest data and standard deviation for these cryptocurrencies.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- Axios
- Node-cron

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd cointrack
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the necessary environment variables.

4. **Start MongoDB**:
   Ensure MongoDB is running locally or provide a connection string to a remote MongoDB instance.

## Running the Application

1. **Start the server**:
   ```bash
   npm start
   ```

   The server will start on the port specified in the environment variables or default to `3000`.

## API Endpoints

### `/stats`

- **Description**: Latest data about the specific cryptocurrency.
- **Method**: GET
- **Query Params**:
  ```json
  {
    "coin": "bitcoin" // 'bitcoin', 'matic-network', 'ethereum'
  }
  ```
- **Sample Response**:
  ```json
  {
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
  }
  ```

### `/deviation`

- **Description**: Standard deviation of the price of the cryptocurrency for upto the last 100 records.
- **Method**: GET
- **Query Params**:
  ```json
  {
    "coin": "bitcoin" // 'bitcoin', 'matic-network', 'ethereum'
  }
  ```
- **Sample Response**:
  ```json
  {
    "deviation": 4082.48
  }
  ```

## Background Job

The server fetchs the current price (USD), market cap (USD), and 24-hour change of 3 cryptocurrencies: `Bitcoin`, `Matic`, and `Ethereum`.  
This job runs once every 2 hours and stores the data in the MongoDB database.

## Deployment

This was deployed to Microsoft Azure
URL:
```
https://cointrack.azurewebsites.net/
```

### GitHub Actions Workflow

The `.github/workflows/main_cointrack.yml` file contains CI/CD pipeline config to build and deploy to the above project.

## Database

The database is hosted on MongoDB Atlas.
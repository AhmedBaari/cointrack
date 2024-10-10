## Assignment Objective

Develop a server side application using Node.js and MongoDB and complete the following tasks.

## Task 1

- Implement a background job that will fetch the current price in USD, market cap in USD and 24 hour change of 3 cryptocurrencies: Bitcoin, Matic, and Ethereum and store it in a database. This job should run once every 2 hours.
- The above details about a cryptocurrency can be fetched using an API from CoinGecko. You also have to search for the relevant API from their documentation: https://docs.coingecko.com/v3.0.1/reference/introduction.
- Hint: Coingecko IDs for the above listed coins are `bitcoin`, `matic-network` and `ethereum`.

## Task 2

- Implement an API `/stats`, that will return the latest data about the requested cryptocurrency.
- Query params:

```jsx
{
	coin: `bitcoin` // Could be one of the above 3 coins
}
```

- Sample Response:

```jsx
{
	price: 40000,
	marketCap: 800000000,
	"24hChange": 3.4
}
```

## Task 3

- Implement an API, `/deviation`, that will return the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database.
- For example, consider the database only has 3 records for `bitcoin`, each with a price of 40000, 45000, 50000 respectively. Then the result should return 4082.48.
- Query params:

```jsx
{
	coin: `bitcoin` // Could be one of the above 3 coins
}
```

- Sample Response:

```jsx
{
	deviation: 4082.48
}
```

**Optional Tasks:-**

1. Deploy your database using MongoDB Atlas or other similar tools.
2. Deploy your backend using platforms like Heroku or any cloud platform like AWS, GCP or Azure and expose the API to the public.

**Please host your code on GitHub.**

**Notes:-**

1. Think of this assignment as a production grade project. Using best practices, writing clean code etc. will fetch you additional points.
2. Do think well about how you want to design your database schemas.
3. We care about the usage of version control and the way you structure(and name) your commits!

## Assignment Submission

- Once you’re done with the tasks, please submit the links in this form: https://forms.gle/tWmaJ2NcdiZo5qQs5.
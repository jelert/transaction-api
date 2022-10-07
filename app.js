const express = require('express');
const HttpStatusCode = require('./HttpStatusCode')
const server = express();
const port = 3000;

server.use(express.json());

// Arr to store all users and points in memory. Used points are removed, all active points are stored
let transactions = []

// Base route
server.get('/', (req, res) => {
  res.status(HttpStatusCode.OK).send(
    {
        body: 'Server is listening on routes: /spend, /points, and /transactions'
    }
    )
});

// Route to view points
require('./routes/points')(server, transactions);

// Route to add a transaction
require('./routes/transaction')(server, transactions);

// Route to use points
require('./routes/spend')(server, transactions);

// Starts server
server.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
const express = require('express');
const server = express();
const port = 3000;

server.use(express.json());

let transactions = []

server.get('/', (req, res) => {
  res.status(200).send(
    {
        body: 'Server is listening on routes: /spend, /points, and /transactions'
    }
    )
});

require('./routes/points')(server, transactions);
require('./routes/transaction')(server, transactions);
require('./routes/spend')(server, transactions);

server.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
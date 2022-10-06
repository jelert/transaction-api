const request = require('request');

const data = [
    {
        payer: "DANNON", 
        points: 1000, 
        timestamp: "2020-11-02T14:00:00Z"
    },
    {
        payer: "UNILEVER", 
        points: 200, 
        timestamp: "2020-10-31T11:00:00Z"
    },
    {
        payer: "DANNON", 
        points: -200, 
        timestamp: "2020-10-31T15:00:00Z"
    },
    {
        payer: "MILLER COORS", 
        points: 10000, 
        timestamp: "2020-11-01T14:00:00Z"
    },
    {
        payer: "DANNON", 
        points: 300, 
        timestamp: "2020-10-31T10:00:00Z"
    },
]

let prom = new Promise(function(resolve, reject){
    data.forEach(async (val) => {
        await request.post('http://localhost:3000/transaction', { json: val }, (err, res, body) => {
            if (err) { return console.log("Server Error. Will be fixed soon!"); }
            console.log(body);
        });  
    }
    )    
    resolve();

}).then(request.get('http://localhost:3000/points', { json: true }, (err, res, body) => {
    if (err) { return console.log("Server Error. Will be fixed soon!"); }
    console.log(body);
    console.log(res.statusCode);
})).then(request.post('http://localhost:3000/spend', { json: {points: 5000} }, (err, res, body) => {
    if (err) { return console.log("Server Error. Will be fixed soon!"); }
    console.log(body);
    console.log(res.statusCode);
}))
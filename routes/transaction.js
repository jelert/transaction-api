const HttpStatusCode = require('../HttpStatusCode')

module.exports = function(server, transactions){

    server.post('/transaction', function(req, res){
        // verify transaction format
        if(!req.body || JSON.stringify(req.body) === '{}') {
            res.status(HttpStatusCode.BAD_REQUEST).json({
                transaction: "Failed. Body format is wrong"
            })
        }
        else {
            transactions.push(req.body)

            res.status(HttpStatusCode.OK).json({
                transaction: "successful"
            })
        }
    });
}
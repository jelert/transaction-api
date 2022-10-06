module.exports = function(server, transactions){

    server.post('/transaction', function(req, res){
        if(!req.body || JSON.stringify(req.body) === '{}') {
            res.status(405).json({
                transaction: "Failed. Body format is wrong"
            })
        }
        else {
            transactions.push(req.body)

            res.status(200).json({
                transaction: "successful"
            })
        }
    });
}
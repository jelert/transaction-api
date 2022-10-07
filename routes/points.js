const HttpStatusCode = require('../HttpStatusCode')

module.exports = function(server, transactions){

    // Retrieves all summed point values for each payer
    server.get('/points', function(req, res){
        let obj = {}
        transactions.forEach(element => {
            if (!Object.keys(obj).includes(element["payer"])){
                obj[element["payer"]] = 0
            }
            obj[element["payer"]] += element["points"]
        });

        res.status(HttpStatusCode.OK).json(obj);
    });

}
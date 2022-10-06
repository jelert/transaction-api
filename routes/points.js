module.exports = function(server, transactions){

    server.get('/points', function(req, res){
        let obj = {}
        transactions.forEach(element => {
            if (!Object.keys(obj).includes(element["payer"])){
                obj[element["payer"]] = 0
            }
            obj[element["payer"]] += element["points"]
        });

        res.status(200).json(obj);
    });

}
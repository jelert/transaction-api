module.exports = function(server, transactions){

    let pay_up = (paid, name, amount) => {
        if(!Object.keys([paid]).includes(name)){
            paid[name] = 0
        }
        paid[name] -= amount
    }

    server.post('/spend', function(req, res){
        if(transactions === []){
            res.status(405).json({
                Error: "Cannot spend. No transactions"
            })
        } else if ( !req.body || !Object.keys(req.body).includes("points")){
            res.status(405).json({
                Error: "Spend amount uncertain"
            })            
        }

        let needed = req.body["points"]

        transactions.sort((a, b) => {
            const d1 = new Date(a["timestamp"])
            const d2 = new Date(b["timestamp"])
            if(d1 > d2){
                return 1
            }
            else if (d2 > d1){
                return -1
            }
            else{
                return 0
            }

        })

        let paid = {}
        while (needed > 0) {
            if(transactions === []){
                res.status(405).json({Error: "Not enough money left"});
                break
            }
            const curr_points = transactions[0]["points"]
            const curr_name = transactions[0]["payer"]

            if(curr_points === needed){
                needed = 0
            }
            else if(curr_points < needed){
                needed -= curr_points
            }
            else{
                transactions[0]["points"] = curr_points - needed
                pay_up(paid, curr_name, needed)
                break
            }
            pay_up(paid, curr_name, curr_points)
            transactions.shift()
        }
        
        res.status(200).json(paid);
    });

}
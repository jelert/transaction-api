const request = require('request');
const prompt = require('prompt-sync')();


let spend = (request_info, resolve) => {
    request.post('http://localhost:3000/spend', { json: request_info }, (err, res, body) => {
        if (err) { return console.log("Server Error. Will be fixed soon!"); }
        console.log(body);
        resolve();
    })
}

let transaction = (request_info, resolve) => {
    request.post('http://localhost:3000/transaction', { json: request_info }, (err, res, body) => {
        if (err) { return console.log("Server Error. Will be fixed soon!"); }
        console.log(body);
        resolve();
    });  
}

let points = async (request_info, resolve) => {
    request.get('http://localhost:3000/points', { json: true }, (err, res, body) => {
        if (err) { return console.log("Server Error. Will be fixed soon!"); }
        console.log(body);
        resolve();
    })
}

console.log(
"    /\\          /\\          /\\          /\\          /\\\n"+
"/\\//\\\\/\\    /\\//\\\\/\\    /\\//\\\\/\\    /\\//\\\\/\\    /\\//\\\\/\\\n"+
"/\\//\\\\\\///\\\\/\\//\\\\\\///\\\\/\\//\\\\\\///\\\\/\\//\\\\\\///\\\\/\\//\\\\\\///\\\\/\\\n"+
"//\\\\\\//\\/\\\\///\\\\\\//\\/\\\\///\\\\\\//\\/\\\\///\\\\\\//\\/\\\\///\\\\\\//\\/\\\\///\\\\\n"+
"\\\\//\\/                                                    \\/\\\\//\n"+
" \\/                                                          \\/\n"+
" /\\                                                          /\\\n"+
"//\\\\              Welcome to the Requests API!              //\\\\\n"+
"\\\\//                                                        \\\\//\n"+
" \\/                                                          \\/\n"+
" /\\                                                          /\\\n"+
"//\\\\/\\                                                    /\\//\\\\\n"+
"\\\\///\\\\/\\//\\\\\\///\\\\/\\//\\\\\\///\\\\/\\//\\\\\\///\\\\/\\//\\\\\\///\\\\/\\//\\\\\\//\n"+
"\\/\\\\///\\\\\\//\\/\\\\///\\\\\\//\\/\\\\///\\\\\\//\\/\\\\///\\\\\\//\\/\\\\///\\\\\\//\\/\n"+
"\\/\\\\//\\/    \\/\\\\//\\/    \\/\\\\//\\/    \\/\\\\//\\/    \\/\\\\//\\/\n"+
"    \\/          \\/          \\/          \\/          \\/\n\n")


const options = {
    transact: {
        method: transaction,
        required: ["payer", "points", "timestamp (ISO Format YYYY-MM_DDTHH:mm:ss.sssZ)"]
    },
    points: {
        method: points,
        required: []
    },
    spend: {
        method: spend,
        required: ["points"]
    },
    quit: {}
}

const performRequests = async () => {
    while(true) {
        let option;
        while(!Object.keys(options).includes(option)){
            option = prompt("What would you like to do? (spend, transact, points, quit): ")
        }

        if(option == "quit"){
            console.log("Goodbye!")
            break
        }

        let request_info = {}
        options[option]["required"].forEach(element => {
            request_info[element] = prompt(`Please enter the ${element}: `)
            if(element === "points"){
                request_info[element] = parseFloat(request_info[element])
            }
        });

        await new Promise(function(resolve, reject){
            options[option]["method"](request_info, resolve)
        })
    }
}

performRequests()
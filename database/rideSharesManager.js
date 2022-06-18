var mysql = require('mysql');
var userManager = require("./userManager.js")
var utils = require('../goodScripts/utils.js')

// console.log(msg)

var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});


function insertRideShare() {

    const rideShare = {
        consumerEmail: "capsadragos@gmail.com",
        providerEmail: "andrei@gmail.com"
    }
    //de validat atributele din rideShare

    var consumerID;
    var providerID;
    userManager.getUserByEmail(rideShare.consumerEmail).then(r => {
        consumerID = r.id


        userManager.getUserByEmail(rideShare.providerEmail).then(r => {
            providerID = r.id


            console.log("ConsumerID: " + consumerID)
            console.log("ProviderID: " + providerID)
            
            var randomNumberOfMinutes = utils.getRandomInt(25,120)
            var estimatedTime = new Date(new Date().getTime() + randomNumberOfMinutes*60000);
            estimatedTime = estimatedTime.toLocaleTimeString([],{hour12: false}).substring(0,5)
            console.log(estimatedTime)
        })
    })

}


insertRideShare()
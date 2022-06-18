var mysql = require('mysql');
var userManager = require("./userManager.js")
var utils = require('../goodScripts/utils.js')


var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});


function insertRideShare(rideShare) {


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

            var sql = "INSERT INTO `web`.`ride_shares`\n" +
                "(\n" +
                "`consumerID`,\n" +
                "`providerID`,\n" +
                "`start`,\n" +
                "`finish`,\n" +
                "`status`,\n" +
                "`estimated`)\n" +
                "VALUES\n" +
                "(\'" + consumerID + "\', " +
                "\'" + providerID + "\', " +
                "\'" + rideShare.start + "\', " +
                "\'" + rideShare.finish + "\', " +
                "\'unclaimed\',  " +
                "\'" + estimatedTime + "\');"

            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("ride-share inserted");
            });
        })
    })

}

const rideShare = {
    consumerEmail: "andrei@gmail.com",
    providerEmail: "capsadragos@gmail.com",
    start: "de undeva",
    finish: "altundeva"
}

insertRideShare(rideShare)
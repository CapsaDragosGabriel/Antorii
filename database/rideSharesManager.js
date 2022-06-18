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


    userManager.getUserByEmail(rideShare.consumerEmail).then(r => {
        var consumerID = r.id
        var randomNumberOfMinutes = utils.getRandomInt(25, 120)
        var estimatedTime = new Date(new Date().getTime() + randomNumberOfMinutes * 60000);
        estimatedTime = estimatedTime.toLocaleTimeString([], {hour12: false}).substring(0, 5)

        var sql = "INSERT INTO `web`.`ride_shares`\n" +
            "(\n" +
            "`consumerID`,\n" +
            "`start`,\n" +
            "`finish`,\n" +
            "`status`,\n" +
            "`estimated`)\n" +
            "VALUES\n" +
            "(\'" + consumerID + "\', " +
            "\'" + rideShare.start + "\', " +
            "\'" + rideShare.finish + "\', " +
            "\'unclaimed\',  " +
            "\'" + estimatedTime + "\');"

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("ride-share inserted");
        });
    })

}



function setProviderByEmail(emailConsumer,emailProvider){

    userManager.getUserByEmail(emailProvider).then(r => {
        var providerID = r.id;

        userManager.getUserByEmail(emailConsumer).then(r => {
            var consumerID = r.id;

            sql = "UPDATE `web`.`ride_shares`\n" +
                "SET\n" +
                "`providerID` = " + providerID +
                " WHERE `consumerID` = " + consumerID + ";"

            con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("ride-share claimed");
            });

            setStatusByConsumerEmail(emailConsumer,'claimed')
        })
    })
}

function setStatusByConsumerEmail(email,status){
    userManager.getUserByEmail(email).then(r => {
        var consumerID = r.id;

        sql = "UPDATE `web`.`ride_shares`\n" +
            "SET\n" +
            "`status` = \'" + status +
            "\' WHERE `consumerID` = " + consumerID + ";"

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("ride share status changed");
        });
    })
}

function deleteRideShareByConsumerEmail(email){
    userManager.getUserByEmail(email).then(r => {
        var consumerID = r.id;

        sql = "DELETE FROM `web`.`ride_shares`\n" +
            "WHERE consumerID = " + consumerID + ";"

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("ride-share deleted");
        });
    })
}

const rideShare = {
    consumerEmail: "andrei@gmail.com",
    providerEmail: "capsadragos@gmail.com",
    start: "de undeva",
    finish: "altundeva"
}


// insertRideShare(rideShare)
// setProviderByEmail("andrei@gmail.com","capsadragos@gmail.com")
deleteRideShareByConsumerEmail("andrei@gmail.com")
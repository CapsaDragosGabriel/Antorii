const mysql = require("mysql");
const userManager = require("./userManager");
var utils = require('../goodScripts/utils.js')
var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});

async function getRide(consumerID) {
    return new Promise((resolve, reject) => {
        var sql = "select * from ride_shares where consumerID = " + con.escape(consumerID) + ";";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length != 0)
                resolve(JSON.parse(JSON.stringify(result)));
            else
                resolve(null);
        });
    })

}

function changeRideStatus(id, status, providerID) {
    if (providerID) {
        var sql = "update ride_shares set status = ?, providerID = ? where id = ?;";
        con.query(sql, [status, providerID, id], function (err, result) {
            if (err) throw err;
        })
    } else {
        var sql = "update ride_shares set status = ? where id = ?;";
        con.query(sql, [status, id], function (err, result) {
            if (err) throw err;
        })
    }
}

async function getOwn(id) {
    return new Promise((resolve, reject) => {
        var sql = "select * from ride_shares where consumerID= " + con.escape(id) + " order by status; ";
        console.log(sql);
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length != 0)
                resolve(JSON.parse(JSON.stringify(result)));
            else
                resolve(null);
        });
    })
}

async function getUnclaimed() {
    return new Promise((resolve, reject) => {
        var sql = "select * from ride_shares where status = \'unclaimed\'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length != 0)
                resolve(JSON.parse(JSON.stringify(result)));
            else
                resolve(null);
        });
    })
}

async function getClaimed(id) {
    return new Promise((resolve, reject) => {
        var sql = "select * from ride_shares where providerID = " + con.escape(id) + ";";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length != 0)
                resolve(JSON.parse(JSON.stringify(result)));
            else
                resolve(null);
        });
    })
}

function insertRide(from, to, consumerID) {

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
        "VALUES(?,?,?,\'unclaimed\',?)"

    con.query(sql, [consumerID, from, to, estimatedTime], function (err, result) {
        if (err) throw err;
        console.log("ride-share inserted");
    });
}

insertRide("roman", "iasi", 10)

module.exports =
    {
        getOwn,
        changeRideStatus,
        getRide,
        getClaimed,
        getUnclaimed,
        insertRide,
    }
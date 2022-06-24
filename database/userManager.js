var mysql = require('mysql');
const crypto = require("crypto")

var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});

async function checkLogin(email, pass) {
    return new Promise((resolve, reject) => {

        var hashedPass = crypto.createHash("sha256").update(pass).digest("base64")

        var sql = "select * from users where email = ? and pass = ?;";
        con.query(sql,[email,hashedPass], function (err, result) {
            if (err) throw err;

            if (result.length === 1)
                resolve("da");
            else
                resolve("nu");
        });
    })

}

async function checkUserExistence(email) {
    return new Promise((resolve, reject) => {
        var sql = "select * from users where email = " + con.escape(email) + ";";
        con.query(sql, function (err, result) {
            if (err) throw err;

            if (result.length === 1) {
                resolve("da");
            }

            resolve("nu");
        });
    });


}

async function getUserByEmail(email) {
    return new Promise((resolve, reject) => {


        var sql = "select * from users where email = " + con.escape(email) + ";";

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result[0])
        });
    })

}


function insertUser(firstName, lastName, phone, email, pass, city, county, localization, service) {
    var hashedPass = crypto.createHash("sha256").update(pass).digest("base64")

    var sql = "INSERT INTO `web`.`users`\n" +
        "(`first_name`,\n" +
        "`last_name`,\n" +
        "`phone_number`,\n" +
        "`email`,\n" +
        "`pass`,\n" +
        "`city`,\n" +
        "`county`,\n" +
        "`localization`,\n" +
        "`service`)\n" +
        "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)"

    con.query(sql,[firstName,lastName,phone,email,hashedPass,city,county,localization,service], function (err, result) {
        if (err) throw err;
        console.log("user inserted");
    });

}


function updateTokenByEmail(email, token) {
    var sql = "UPDATE `web`.`users`\n" +
        "SET\n" +
        "`token` = ?, `created_token_time` = CURRENT_TIMESTAMP WHERE `email` = ?;"
    con.query(sql,[token,email], function (err, result) {
        if (err) throw err;
    });
}

function removeTokenByEmail(email) {
    var sql = "UPDATE `web`.`users`\n" +
        "SET\n" +
        "`token` = NULL, `created_token_time` = NULL\n" +
        "WHERE `email` = " + con.escape(email) + ";"
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
}

async function getTokenByEmail(email) {
    return new Promise((resolve, reject) => {
        var sql = "select token from users where email = " + con.escape(email) + ";";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length == 1)
                resolve(JSON.parse(JSON.stringify(result[0])).token);
            else
                resolve(null);
        });
    })

}

async function getIDByToken(token) {
    return new Promise((resolve, reject) => {
        var sql = "select id from users where token = " + con.escape(token) + ";";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length == 1)
                resolve(JSON.parse(JSON.stringify(result[0])).id);
            else
                resolve(null);
        });
    })

}

async function getIDByEmail(email) {
    return new Promise((resolve, reject) => {
        var sql = "select id from users where email = " + con.escape(email) + ";";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length == 1)
                resolve(JSON.parse(JSON.stringify(result[0])).id);
            else
                resolve(null);
        });
    })
}

async function getEmailByToken(token) {
    return new Promise((resolve, reject) => {
        var sql = "select email from users where token = " + con.escape(token) + ";";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length == 1)
                resolve(JSON.parse(JSON.stringify(result[0])).email);
            else
                resolve(null);
        });
    })

}



async function getAllUsers(){
    return new Promise((resolve, reject) => {

        sql = "select * from users ";
        con.query(sql, function (err, result) {
            if (err) throw err;
            // console.log(result);

            resolve(result)
        });


    })
}
async function getServiceByToken(token) {
    return new Promise((resolve, reject) => {
        var sql = "select service from users where token = " + con.escape(token) + ";";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length == 1)
                resolve(JSON.parse(JSON.stringify(result[0])).service);
            else
                resolve(null);
        });
    })

}

function hashPasswordByID(userID) {

    var sql = "select pass from users where id = " + con.escape(userID) + ";"
    con.query(sql, function (err, result) {
        if (err) throw err;

        console.log("pass: " + result[0].pass)
        var hashedPass = crypto.createHash("sha256").update(result[0].pass).digest("base64")

        var sql = "update users set pass = ? where id = ?;"

        con.query(sql,[hashedPass,userID], function (err, result) {
            if (err) throw err;
        })

        console.log("password hashed")
    });

}

checkLogin("antonio.fechita@yahoo.com","Parolam3a").then(r => {
    console.log(r)
})

module.exports = {
    removeTokenByEmail,
    getUserByEmail,
    getServiceByToken,
    getTokenByEmail,
    checkUserExistence,
    checkLogin,
    updateTokenByEmail,
    getEmailByToken,
    insertUser,
    getIDByEmail,
    getIDByToken,
    getAllUsers
}
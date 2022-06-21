var mysql = require('mysql');
const Console = require("console");
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

        var sql = "select * from users where email = \'" + email + "\' and pass = \'" + hashedPass + "\'";
        con.query(sql, function (err, result) {
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
        var sql = "select * from users where email = \'" + email + "\'";
        con.query(sql, function (err, result) {
            if (err) throw err;

            if (result.length === 1) {
                resolve("da");
                ;
            }

            resolve("nu");
        });
    });


}

async function getUserByEmail(email) {
    return new Promise((resolve, reject) => {


        var sql = "select * from users where email = \'" + email + "\'";

        con.query(sql, function (err, result) {
            if (err) throw err;

            let jsonPackage = result[0];

            resolve(jsonPackage)
            // console.log([result[0].first_name,result[0].last_name, result[0].phone_number, result[0].email, result[0].pass,
            //     result[0].city, result[0].county, result[0].localization, result[0].service ])
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
        "VALUES\n" +
        "(\'" + firstName +
        "\', \'" + lastName +
        "\', \'" + phone +
        "\', \'" + email +
        "\', \'" + hashedPass +
        "\', \'" + city +
        "\', \'" + county +
        "\', \'" + localization +
        "\', \'" + service + "\');\n";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("user inserted");
    });
    //show result
    con.query("select * from users", function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}

function updateTokenByEmail(email, token) {
    var sql = "UPDATE `web`.`users`\n" +
        "SET\n" +
        "`token` = \'" + token +
        "\', `created_token_time` = CURRENT_TIMESTAMP\n" +
        "WHERE `email` = \'" + email + "\';"
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
}

function removeTokenByEmail(email) {
    var sql = "UPDATE `web`.`users`\n" +
        "SET\n" +
        "`token` = NULL, `created_token_time` = NULL\n" +
        "WHERE `email` = \'" + email + "\';"
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
}

async function getTokenByEmail(email) {
    return new Promise((resolve, reject) => {
        var sql = "select token from users where email = \'" + email + "\'";
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
        var sql = "select id from users where token =\'" + token + "\'";
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
        var sql = "select id from users where email = \'" + email + "\'";
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
        var sql = "select email from users where token = \'" + token + "\'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length == 1)
                resolve(JSON.parse(JSON.stringify(result[0])).email);
            else
                resolve(null);
        });
    })

}

async function getServiceByToken(token) {
    return new Promise((resolve, reject) => {
        var sql = "select service from users where token = \'" + token + "\'";
        con.query(sql, function (err, result) {
            if (err) throw err;
            if (result.length)
                resolve(JSON.parse(JSON.stringify(result[0])).service);
            else
                resolve(null);
        });
    })

}

function hashPasswordByID(userID) {

    var sql = "select pass from users where id = " + userID + ";"
    con.query(sql, function (err, result) {
        if (err) throw err;

        console.log("pass: " + result[0].pass)
        var hashedPass = crypto.createHash("sha256").update(result[0].pass).digest("base64")

        var sql = "update users set pass = \'" + hashedPass + "\' where id = " + userID + ";"

        con.query(sql, function (err, result) {
            if (err) throw err;
        })

        console.log("password hashed")
    });

}

 // hashPasswordByID(5);
// hashPasswordByID(8);
// hashPasswordByID(9);


// insertUser("nume","prenume","98451312","alex@gmail.com","Parola123","Bacau","Buhusi",
//    "banca boss","consumer");

// checkLogin("capsadragos@gmail.com","Parola13").then(r =>{
//     console.log(r)
// })

// insertUser("nume","prenume","98451312","capsadragos@gmail.com","Parola123","Bacau","Buhusi",
//    "banca boss","consumer");

// insertUser("bla","blala","98451312","alexeeeeut@gmail.com","Parola123","Bacau","Buhusi",
//     "banca boss","consumer");

//updateTokenByEmail("capsadragos@gmail.com", "123444")
// checkLogin("capsadragos@gmail.com","Parola123").then(r=>{
//     console.log(r);
// })
// getTokenByEmail("capsadragos@gmail.com").then(r=>{
//     console.log(r);
//     getEmailByToken(r).then(r=>{
//         console.log(r);
//     })
// })
//
// updateTokenByEmail("andrei@gmail.com","n8vjKZHQXPeKk82E")
// getServiceByToken("n8vjKZHQXPeKk82E").then(r=>{
//     console.log(r);
// })

// getUserByEmail("andrei@gmail.com").then(r=>{
//     console.log(r)
// })

let lolw = "595";
module.exports = {
    lolw,
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
    getIDByToken
}
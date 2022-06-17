var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});



function insertUser(firstName, lastName, phone, email, pass, city, county, localization, service) {
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
            "\', \'" + pass +
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

function doesUserExist(email, pass) {
        var sql = "select * from users where email = \'" + email + "\' and pass = \'" + pass + "\'";
        con.query(sql, function (err, result) {
            if (err) throw err;

            if(result.length === 1)
            console.log("da");
            else
                console.log("nu")
        });
}

function updateTokenByEmail(email,token){
        var sql = "update users set token = \'" + token + "\' where email = \'" + email + "\'";
        con.query(sql, function (err, result) {
            if (err) throw err;
        });
}

function removeTokenByEmail(email){
    var sql = "update users set token = NULL where email = \'" + email + "\'";
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
}

doesUserExist("alexxxx.nechita@gmail.com", "1234");
updateTokenByEmail("alexxxx.nechita@gmail.com", "alt_token_random")
removeTokenByEmail("alex.nechita@gmail.com")
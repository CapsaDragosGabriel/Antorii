var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE web", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});
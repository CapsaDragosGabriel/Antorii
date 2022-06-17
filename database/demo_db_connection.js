var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

exports.con = con;
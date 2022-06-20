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
    var sql = "CREATE TABLE users (\n" +
        "    id int NOT NULL AUTO_INCREMENT,\n" +
        "    first_name varchar(100) NOT NULL,\n" +
        "    last_name varchar(100) NOT NULL,\n" +
        "    phone_number varchar(15) NOT NULL,\n" +
        "    email varchar(50) NOT NULL UNIQUE,\n" +
        "    pass varchar(50) NOT NULL,\n" +
        "    city varchar(60) NOT NULL,\n" +
        "    county varchar(60),\n" +
        "    localization varchar(100),\n" +
        "    token varchar(50),\n" +
        "    created_token_time datetime,\n" +
        "    service varchar(50),\n" +
        "    PRIMARY KEY (id)\n" +
        ");";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
    con.end();
});

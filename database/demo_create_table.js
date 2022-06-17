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
    var sql = "CREATE TABLE ride_shares (\n" +
        "    id int NOT NULL AUTO_INCREMENT,\n" +
        "    consumerID int NOT NULL,\n" +
        "    providerID int,\n" +
        "    start varchar(100) NOT NULL,\n" +
        "    finish varchar(100) NOT NULL,\n" +
        "    status varchar(100) NOT NULL,\n" +
        "    estimated int NOT NULL,\n" +
        "    FOREIGN KEY (consumerID) REFERENCES users (id),\n" +
        "    FOREIGN KEY (providerID) REFERENCES users (id),\n" +
        "    PRIMARY KEY (id)\n" +
        ");";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
    con.end();
});

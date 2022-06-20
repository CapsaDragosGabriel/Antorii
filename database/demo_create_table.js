var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});
/*
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "create TABLE orders (\n" +
        "    id int NOT NULL AUTO_INCREMENT,\n" +
        "    restaurantID int NOT NULL,\n" +
        "    consumerID int NOT NULL,\n" +
        "    address varchar(100) NOT NULL,\n" +
        "    status varchar(100) NOT NULL,\n" +
        "    estimated varchar(5) NOT NULL,\n" +
        "    FOREIGN KEY (restaurantID) REFERENCES restaurants (id),\n" +
        "    FOREIGN KEY (consumerID) REFERENCES users (id),\n" +
        "    PRIMARY KEY (id)\n" +
        ");";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
    con.end();
});*/
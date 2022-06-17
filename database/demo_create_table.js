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
    var sql = "CREATE TABLE ordered_items (\n" +
        "    id int NOT NULL AUTO_INCREMENT,\n" +
        "    orderID int NOT NULL,\n" +
        "    itemID int NOT NULL,\n" +
        "    quantity int NOT NULL,\n" +
        "    FOREIGN KEY (orderID) REFERENCES orders (id),\n" +
        "    FOREIGN KEY (itemID) REFERENCES items (id),\n" +
        "    PRIMARY KEY (id)\n" +
        ");";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
    con.end();
});

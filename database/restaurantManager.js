var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});



function insertRestaurant(name) {
    var sql = "INSERT INTO `web`.`restaurants`\n" +
        "(`name`)\n" +
        "VALUES\n" +
        "(\'" + name + "\');\n"
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("restaurant inserted");
    });
    //show result
    con.query("select * from restaurants", function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}


insertRestaurant("MC")
insertRestaurant("KFC")
insertRestaurant("NoodlePack")
insertRestaurant("Mamma Mia")
insertRestaurant("Carul cu burgeri")
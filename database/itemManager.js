var mysql = require('mysql');
var restaurantManager = require('./restaurantManager.js')

var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});



function insertItem(restaurantName,item) {

    restaurantManager.getRestaurantByName(restaurantName).then(r => {
        var restaurantID = r.id
        var sql = "INSERT INTO `web`.`items`\n" +
            "(`restaurantID`,\n" +
            "`name`,\n" +
            "`description`,\n" +
            "`price`)\n" +
            "VALUES\n" +
            "(" + restaurantID +
            ", \'" + item.name + "\', " +
            "\'" + item.description + "\', " +
             item.price + ");"

        console.log("sql: " + sql)
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("item inserted");
        });

    })
}

var item = {
    name: "cartofi pai",
    description: "cei mai tari",
    price: 10
}

insertItem('KFC',item)
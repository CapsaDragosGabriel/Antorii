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
            "VALUES (?, ?, ?, ?)"

        console.log("sql: " + sql)
        con.query(sql,[restaurantID,item.name,item.description,item.price], function (err, result) {
            if (err) {
                console.log("can t do that");
                return 0;}
            else {
                console.log("item inserted");
                return 1;
            }});
    })
    return 1;
}
function getItemName(itemID){
    return new Promise((resolve, reject) => {
        var sql = "select name from items where id=" + con.escape(itemID) + ";"

        con.query(sql, function (err, result) {
            if (err) throw err;

            console.log(result)
            resolve(result[0])
        });
    })
}
// getItemName(1).then(r=>console.log("item id =1 =>"+r.name));

var item =
    {"name": "Chicken Nuggies",
        "description": "Up for tender breasts?",
        "price": "12"
    }
module.exports={
    getItemName,
    insertItem
}
// insertItem('McDonalds',item)
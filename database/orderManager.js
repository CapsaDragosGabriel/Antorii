//insert order, delete order, total for order, get items from order, add items to order,
var mysql = require('mysql');
var restaurantManager = require('./restaurantManager.js')
var utils = require('../goodScripts/utils.js')

var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});



function insertOrder(order) {

        var randomNumberOfMinutes = utils.getRandomInt(25, 120)
        var estimatedTime = new Date(new Date().getTime() + randomNumberOfMinutes * 60000);
        estimatedTime = estimatedTime.toLocaleTimeString([], {hour12: false}).substring(0, 5)


        var sql = "INSERT INTO `web`.`orders`\n" +
            "(`restaurantID`,\n" +
            "`consumerID`,\n" +
            "`address`,\n" +
            "`status`,\n" +
            "`estimated`)\n" +
            "VALUES\n" +
            "(" + order.restaurantID +
            ", " + order.consumerID +
            ", \'" + order.adress + "\', " +
            "\'order sent\', " +
            "\'" + estimatedTime + "\');"

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("order inserted");

            getOrderByIDs(order.consumerID,order.restaurantID).then(r => {
                orderID = r.id;
                console.log(order.items[0]);
                // console.log(order.items.length);
                console.log("ORDER ID: " + orderID)
                let j=0;
                while(order.items[j]!=undefined)
                {
                    var item= order.items[j];
                    console.log(item);
                    var itemid
                    addItemToOrder(orderID,item);
                    j++;
                }
               /* for (let j=0;j<order.items.length;j++)
                {
                    var item= order.items[j];
                    console.log(item);
                    addItemToOrder(orderID,item);
                }*/
                /*if (order.items.length>1)
                for(var item of order.items){
                    addItemToOrder(orderID,item)
                }
                else
                    addItemToOrder(orderID,order.items[0]);*/
            })
        });

}
//add consumerID to orders table
async function getOrderByIDs(consumerID,restaurantID){

    return new Promise((resolve, reject) => {
        var sql = "select * from orders where consumerID = " + consumerID + " and restaurantID = " + restaurantID + " and status <> \'finished\';"

        console.log("getOrderSQL: " + sql)

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result[0])
        });
    })
}
async function getIDofItem(restaurantID){//de facut

    return new Promise((resolve, reject) => {
        var sql = "select * from items where consumerID = " + consumerID + " and restaurantID = " + restaurantID + " and status <> \'finished\';"

        console.log("getOrderSQL: " + sql)

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result[0])
        });
    })
}


function addItemToOrder(orderID, item){

    var sql = "INSERT INTO `web`.`ordered_items`\n" +
        "(`orderID`,\n" +
        "`itemID`,\n" +
        "`quantity`)\n" +
        "VALUES\n" +
        "(" + orderID + ", " +
        item.id + ", " +
        item.quantity + ");"

    console.log("SQL: " + sql)
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("item inserted");
    });
}

function changeStatusForOrder(orderID,status) { //status can be checked with an allowlist

    var sql = "UPDATE `web`.`orders`\n" +
        "SET\n" +
        "`status` = \'" + status +
        "\' WHERE `id` = " + orderID + ";"

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("status changed");
    });


}

async function getTotal(orderID){

    return new Promise((resolve, reject) => {
        var sql = "select sum(price * quantity) as total from orders o join ordered_items oi on o.id = oi.orderID join " +
            "items i on oi.itemID = i.id where orderID = " + orderID + ";"

        con.query(sql, function (err, result) {
            if (err) throw err;

            // console.log(result)
            resolve(result[0].total)
        });
    })
}

var order = {
    restaurantID: 2,
    consumerID: 3,
    adress: 'undeva la mama dracu',
    items: [{
        id: 1,
        quantity: 3
    },
        {
            id: 2,
            quantity: 1
        }]
}

//insertOrder(order)
module.exports={
    insertOrder,
}

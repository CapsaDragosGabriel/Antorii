//insert order, delete order, total for order, get items from order, add items to order,
var mysql = require('mysql');
var restaurantManager = require('./restaurantManager.js')
var utils = require('../goodScripts/utils.js')
var itemDB= require('../database/itemManager');

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
            "\'unclaimed\', " +
            "\'" + estimatedTime + "\');"

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("order inserted");

            getOrderByIDs(order.consumerID,order.restaurantID).then(r => {
                // orderID = r.id;

                // console.log("ORDER ID: " + orderID)
                let j=0;
                console.log("ORDERUL CURENT ESTE"+ r.id);

                orderID=r.id;
                console.log("ITEME DIN ORDERUL ACESTA SUNT:"+ JSON.stringify(order.items));

                // for(var item of JSON.parse(JSON.stringify(order)).items){


                let k=0;
                for (k=0;k<order.items.length;k++) {
                    console.log("parametrii dati sunt:"+orderID+" "+JSON.stringify(order.items[k])+" "+order.restaurantID)
                    addItemToOrder(orderID, order.items[k], order.restaurantID)
                }

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

            resolve(result[result.length-1])
        });
    })
}

async function getCompleteOrdersByID(consumerID){

    return new Promise((resolve, reject) => {
        var sql = "select * from orders where consumerID = '" + consumerID + "';"

        console.log("getOrderSQL: " + sql)

        con.query(sql, function (err, result) {
            if (err) throw err;

            //r=result;
            console.log(JSON.stringify(result));
                let ordersList={}
                for (let i=0;i<result.length;i++)
                {
                    getOrderItems(JSON.stringify( result[i].id)).then(r=>{
                    console.log(r);
                        for (let i=0;i<r.length;i++)
                            itemDB.getItemName(r[i].itemID).then(f=>{
                                console.log(r[i].id+" au fost comandate:" + f.name );

                            })
                    })
                }
            resolve(result)
        });
    })
}
 /*getCompleteOrdersByID(3).then(f=>{
  // console.log(f);
 })*/
/*async function getOrderAndItemsByID(consumerID)
{
    getOrdersByID(consumerID).then(r=>{
        for(let i=0;i<r.length;i++)
        {
            let completeOrder={
                id:r[i].id,
                restaurantID: r[i].restaurantID,
                consumerID:r[i].consumerID,
                address:r[i].address,
                status:r[i].status,
                estimated:r[i].estimated,


            }
        }
    })
}*/
async function getOrderItems(orderID){
    return new Promise((resolve, reject) => {
        var sql = "select * from ordered_items where orderID = '" + orderID+"';"

        console.log("getOrderItems: " + sql)

        con.query(sql, function (err, result) {
            if (err) throw err;
            // console.log("RESULT"+JSON.stringify (result))
            resolve(result)
        });
    })
}

function addItemToOrder(orderID, item,restaurantID){

    restaurantManager.getItemIDFromRestaurantID(restaurantID,item.id).then(r=>{
        // console.log("VREAU SA BAG ITEMUL"+JSON.stringify(r[0]));
        var sql = "INSERT INTO `web`.`ordered_items`\n" +
            "(`orderID`,\n" +
            "`itemID`,\n" +
            "`quantity`)\n" +
            "VALUES\n" +
            "(" + orderID + ", " +
            r[0].id + ", " +
            item.quantity + ");"

        console.log("SQL: " + sql)
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("item inserted");
        });
    })

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

function setFeedback(feedback,orderID){

    var sql = "UPDATE `web`.`orders`\n" +
        "SET\n" +
        "`feedback` = \'" + feedback +
        "\' WHERE `id` = " + orderID + ";"

    con.query(sql, function (err, result) {
        if (err) throw err;

        console.log("Feedback set")
    });
}

async function getFeedbackByOrderID(orderID){
    return new Promise((resolve, reject) => {

        var sql = "select feedback from orders where id = " + orderID + ";"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result[0].feedback)
        });
    })
}


async function getFeedbacksByRestaurantID(restaurantID){
    return new Promise((resolve, reject) => {

        var sql = "select feedback from orders where restaurantID = " + restaurantID + ";"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });
    })
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
    restaurantID: 1,
    consumerID: 1,
    adress: 'undeva la mama dracu',
    items: [{
        id: 1,
        quantity: 3
    },
        {
            id: 3,
            quantity: 1
        }]
}
/**
getOrderItems(60).then(r=>{
// console.log(r);
    for (let i=0;i<r.length;i++)
     itemDB.getItemName(r[i].itemID).then(f=>{
         console.log(r[i].id+" au fost comandate:" + f.name );

     })
}).then(()=>
console.log("Asdasdas")
)*/

//insertOrder(order)

// getTotal(1).then(r => {
//     console.log("Total comanda: " + r)
// })

// setFeedback("oleaca cam sarat",1)
// getFeedbackByOrderID(1).then(r => {
//     console.log(r)
// })

// getFeedbacksByRestaurantID(2).then(r => {
//     console.log(r)
// })

module.exports = {

    insertOrder,
    getOrderByIDs,
    getTotal,
    getFeedbackByOrderID,
    getFeedbacksByRestaurantID,
    addItemToOrder,
    changeStatusForOrder,
    setFeedback,
    getOrdersByID: getCompleteOrdersByID
}
// >>>>>>> Stashed changes

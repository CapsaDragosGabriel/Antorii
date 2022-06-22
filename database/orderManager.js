//insert order, delete order, total for order, get items from order, add items to order,
var mysql = require('mysql');
var restaurantManager = require('./restaurantManager.js')
var utils = require('../goodScripts/utils.js')
var itemDB = require('../database/itemManager');

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
        "VALUES(?, ?, ?, \'unclaimed\', ?)"

    con.query(sql, [order.restaurantID,order.consumerID,order.adress,estimatedTime], function (err, result) {
        if (err) throw err;
        console.log("order inserted");

        getOrderByIDs(order.consumerID, order.restaurantID).then(r => {
            // orderID = r.id;

            // console.log("ORDER ID: " + orderID)
            let j = 0;
            console.log("ORDERUL CURENT ESTE" + r.id);

            orderID = r.id;
            console.log("ITEME DIN ORDERUL ACESTA SUNT:" + JSON.stringify(order.items));

            // for(var item of JSON.parse(JSON.stringify(order)).items){
            console.log(order.items);
            console.log(order)
            let k = 0;
            for (k = 0; k < (order.items).length; k++) {
                console.log("parametrii dati sunt:" + orderID + " " + JSON.stringify(order.items[k]) + " " + order.restaurantID)
                addItemToOrder(orderID, order.items[k], order.restaurantID)
            }

        })
    });

}

//add consumerID to orders table
async function getOrderByIDs(consumerID, restaurantID) {

    return new Promise((resolve, reject) => {
        var sql = "select * from orders where consumerID = ? and restaurantID = ? and status <> \'finished\';"

        console.log("getOrderSQL: " + sql)

        con.query(sql,[consumerID,restaurantID] ,function (err, result) {
            if (err) throw err;

            resolve(result[result.length - 1])
        });
    })
}


async function getCompleteOrdersByID(consumerID) {

    return new Promise((resolve, reject) => {
        var sql = "select * from orders where consumerID = '" + con.escape(consumerID) + "';"

        console.log("getOrderSQL: " + sql)

        con.query(sql, async function (err, result) {
            if (err) throw err;

            let ordersList = [];

            let doStuff = await async function () {
                let tempList = []
                for (i = 0; i < result.length; i++) {//iteram prin orders

                    await getOrderItemNames(result[i].id).then(f => {//intoarcem mancarea si costul total
                        // console.log(JSON.parse(f));
                        let toReturn = {
                            food: JSON.parse(f),
                            orderID:result[i].id,
                            address: result[i].address
                        }
                        console.log("TO RETURN ESTE: " + JSON.stringify(toReturn));
                        tempList[i] = (toReturn);
                    })

                }
                return tempList;
            };
            doStuff().then(r => ordersList = r).then(() => {

                for (let k = 0; k < ordersList.length; k++) {
                    console.log("Comanda" + JSON.stringify(ordersList[k]));
                    var newReturn = {
                        food: ordersList[k].food,
                        address: result[k].address,
                        orderID:ordersList[k].orderID,
                        consumerID:result[k].consumerID,
                        providerID:result[k].providerID,
                        feedback_restaurant: result[k].feedback_restaurant,
                        estimated:result[k].estimated,
                        status:result[k].status,
                        feedback_provider: result[k].feedback_provider
                    }
                    ordersList[k] = newReturn;
                }
                resolve(ordersList);
            })

        });
    })
}
async function getCompleteOrdersUnclaimed() {

    return new Promise((resolve, reject) => {
        var sql = "select * from orders where status = 'unclaimed';"

        console.log("getOrderSQL: " + sql)

        con.query(sql, async function (err, result) {
            if (err) throw err;

            let ordersList = [];

            let doStuff = await async function () {
                let tempList = []
                for (i = 0; i < result.length; i++) {//iteram prin orders

                    await getOrderItemNames(result[i].id).then(f => {//intoarcem mancarea si costul total
                        // console.log(JSON.parse(f));
                        let toReturn = {
                            food: JSON.parse(f),
                            orderID:result[i].id,
                            address: result[i].address
                        }
                        console.log("TO RETURN ESTE: " + JSON.stringify(toReturn));
                        tempList[i] = (toReturn);
                    })

                }
                return tempList;
            };
            doStuff().then(r => ordersList = r).then(() => {

                for (let k = 0; k < ordersList.length; k++) {
                    console.log("Comanda" + JSON.stringify(ordersList[k]));
                    var newReturn = {
                        food: ordersList[k].food,
                        address: result[k].address,
                        orderID:ordersList[k].orderID,
                        consumerID:result[k].consumerID,
                        providerID:result[k].providerID,
                        feedback_restaurant: result[k].feedback_restaurant,
                        estimated:result[k].estimated,
                        status:result[k].status,
                        feedback_provider: result[k].feedback_provider
                    }
                    ordersList[k] = newReturn;
                }
                resolve(ordersList);
            })

        });
    })
}


async function getCompleteOrdersByProviderID(providerID) {

    return new Promise((resolve, reject) => {
        var sql = "select * from orders where providerID = '" + con.escape(providerID) + "';"

        console.log("getOrderSQL: " + sql)

        con.query(sql, async function (err, result) {
            if (err) throw err;

            let ordersList = [];

            let doStuff = await async function () {
                let tempList = []
                for (i = 0; i < result.length; i++) {//iteram prin orders

                    await getOrderItemNames(result[i].id).then(f => {//intoarcem mancarea si costul total
                        // console.log(JSON.parse(f));
                        let toReturn = {
                            food: JSON.parse(f),
                            orderID:result[i].id,
                            address: result[i].address
                        }
                        console.log("TO RETURN ESTE: " + JSON.stringify(toReturn));
                        tempList[i] = (toReturn);
                    })

                }
                return tempList;
            };
            doStuff().then(r => ordersList = r).then(() => {

                for (let k = 0; k < ordersList.length; k++) {
                    var newReturn = {
                        food: ordersList[k].food,
                        address: result[k].address,
                        orderID:ordersList[k].orderID,
                        consumerID:result[k].consumerID,
                        providerID:result[k].providerID,
                        feedback_restaurant: result[k].feedback_restaurant,
                        estimated:result[k].estimated,
                        status:result[k].status,
                        feedback_provider: result[k].feedback_provider
                    }
                    ordersList[k] = newReturn;
                    console.log("Comanda" + JSON.stringify(ordersList[k]));

                }
                resolve(ordersList);
            })

        });
    })
}
async function getOrderItemNames(orderID) {
    return new Promise((resolve, reject) => {
        var sql = "select name,quantity from ordered_items o join items i on o.itemID=i.id where orderID='" + con.escape(orderID) + "';"

        console.log("getOrderItems: " + sql)

        con.query(sql, function (err, result) {
            if (err) throw err;
            // console.log("RESULT"+JSON.stringify (result))
            getTotal(orderID).then(f => {
                let toReturn = {
                    items: result,
                    cost: f,
                    //aici se poate adauga orderID
                }
                resolve(JSON.stringify(toReturn))
            })

        });
    })
}


async function getOrderItems(orderID) {
    return new Promise((resolve, reject) => {
        var sql = "select * from ordered_items where orderID = " + con.escape(orderID) + ";"

        console.log("getOrderItems: " + sql)

        con.query(sql, function (err, result) {
            if (err) throw err;
            // console.log("RESULT"+JSON.stringify (result))
            resolve(result)
        });
    })
}

function addItemToOrder(orderID, item, restaurantID) {

    restaurantManager.getItemIDFromRestaurantID(restaurantID, item.id).then(r => {
        // console.log("VREAU SA BAG ITEMUL"+JSON.stringify(r[0]));
        var sql = "INSERT INTO `web`.`ordered_items`\n" +
            "(`orderID`,\n" +
            "`itemID`,\n" +
            "`quantity`)\n" +
            "VALUES(?, ?, ?)"

        console.log("SQL: " + sql)
        con.query(sql,[orderID,r[0].id,item.quantity], function (err, result) {
            if (err) throw err;
            console.log("item inserted");
        });
    })

}

function changeStatusForOrder(orderID, status,providerID) { //status can be checked with an allowlist

    var sql = "UPDATE `web`.`orders`\n" +
        "SET\n" +
        "`status` = ? WHERE `id` = ?;"

    con.query(sql,[status,orderID] ,function (err, result) {
        if (err) throw err;
        console.log("status changed");
    });

    var sql = "UPDATE `web`.`orders`\n" +
        "SET\n" +
        "`providerID` = ? WHERE `id` = ?;"

    con.query(sql,[providerID,orderID] ,function (err, result) {
        if (err) throw err;
        console.log("status changed");
    });


}

function setFeedbackForRestaurant(feedback, orderID) {

    var sql = "UPDATE `web`.`orders`\n" +
        "SET\n" +
        "`feedback_restaurant` = ? WHERE `id` = ?;"

    con.query(sql,[feedback,orderID], function (err, result) {
        if (err) throw err;
        console.log(sql,[feedback,orderID]);
        console.log("Feedback set")
    });
}

function setFeedbackForProvider(feedback, orderID) {

    var sql = "UPDATE `web`.`orders`\n" +
        "SET\n" +
        "`feedback_provider` = ? WHERE `id` = ?;"

    con.query(sql,[feedback,orderID], function (err, result) {
        if (err) throw err;

        console.log("Feedback set")
    });
}


async function getFeedbackForRestaurantByOrderID(orderID) {
    return new Promise((resolve, reject) => {

        var sql = "select feedback_restaurant from orders where id = " + con.escape(orderID) + ";"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result[0].feedback)
        });
    })
}

async function getFeedbackForProviderByOrderID(orderID) {
    return new Promise((resolve, reject) => {

        var sql = "select feedback_provider from orders where id = " + con.escape(orderID) + ";"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result[0].feedback)
        });
    })
}


async function getFeedbacksForRestaurant(restaurantID) {
    return new Promise((resolve, reject) => {

        var sql = "select feedback_restaurant from orders where restaurantID = " + con.escape(restaurantID) + ";"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });
    })
}

async function getFeedbacksForProvider(restaurantID) {
    return new Promise((resolve, reject) => {

        var sql = "select feedback_provider from orders where restaurantID = " + con.escape(restaurantID) + ";"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });
    })
}

async function getTotal(orderID) {

    return new Promise((resolve, reject) => {
        var sql = "select sum(price * quantity) as total from orders o join ordered_items oi on o.id = oi.orderID join " +
            "items i on oi.itemID = i.id where orderID = " + con.escape(orderID) + ";"

        con.query(sql, function (err, result) {
            if (err) throw err;

            // console.log(result)
            resolve(result[0].total)
        });
    })
}

var order = {
    restaurantID: 1,
    consumerID: 10,
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

// insertOrder(order)
getTotal(4).then(r => {
    console.log(r)
})

module.exports = {
getCompleteOrdersByProviderID,
    getCompleteOrdersUnclaimed,
    insertOrder,
    getOrderByIDs,
    getTotal,
    addItemToOrder,
    changeStatusForOrder,
    getCompleteOrdersByID,
    setFeedbackForProvider,
    setFeedbackForRestaurant
}

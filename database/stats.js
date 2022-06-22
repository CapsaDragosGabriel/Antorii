const mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});

async function getConsumerProviderUserProcent(){
    return new Promise((resolve, reject) => {

        var sql = "select * from (SELECT concat((count(*) / (select count(*) from users)) * 100,'%') as 'consumer_procent' from users where service = 'consumer') c,\n" +
            "(SELECT concat((count(*) / (select count(*) from users)) * 100,'%') as 'provider_procent' from users where service <> 'consumer') p;"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result[0])
        });

    })
}

async function getNumberOfUsersPerCounty(){
    return new Promise((resolve, reject) => {

        var sql = "select county,count(*) as number_of_users from users group by county order by count(*) desc;"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });

    })
}

async function getNumberOfConsumersPerCounty(){
    return new Promise((resolve, reject) => {

        var sql = "select county,count(*) as number_of_consumers from users where service = 'consumer' group by county order by count(*) desc;"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });

    })
}

async function getNumberOfProvidersPerCounty(){
    return new Promise((resolve, reject) => {

        var sql = "select county,count(*) as number_of_providers from users where service <> 'consumer' group by county order by count(*) desc;"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });

    })
}


async function getUsersOrderedByRideSpending(){
    return new Promise((resolve, reject) => {

        var sql = "select coalesce(sum(price),0) as total ,u.* from users u left join ride_shares r on u.id = r.consumerID group by u.id order by sum(price) desc;"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });

    })
}

async function getUsersOrderedByRestaurantSpending(){
    return new Promise((resolve, reject) => {

        var sql = "select  coalesce(sum(price * quantity),0) as total,u.* from users u left join orders o on u.id = o.consumerID left join\n" +
            " ordered_items oi on o.id = oi.orderID left join items i on oi.itemID = i.id group by u.id order by coalesce(sum(price * quantity),0) desc;"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });

    })
}

async function getUsersOrderedByTotalSpending(){
    return new Promise((resolve, reject) => {

        var sql = " select r.total + o.total as total,r.id,r.first_name,r.last_name,r.phone_number,r.email,r.pass,r.city,r.county,r.localization,r.token,r.created_token_time,r.service\n" +
            " from (select coalesce(sum(price),0) as total ,u.* from users u left join ride_shares r on u.id = r.consumerID group by u.id order by sum(price) desc) r join \n" +
            " (select  coalesce(sum(price * quantity),0) as total,u.* from users u left join orders o on u.id = o.consumerID left join\n" +
            " ordered_items oi on o.id = oi.orderID left join items i on oi.itemID = i.id group by u.id order by coalesce(sum(price * quantity),0) desc) o on r.id = o.id order by r.total + o.total desc;"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });

    })
}

async function getRestaurantsOrderByProfit(){
    return new Promise((resolve, reject) => {

        var sql = "select coalesce(sum(price * quantity),0) as total, r.* from restaurants r left join orders o on r.id = o.restaurantID left join ordered_items oi on o.id = oi.orderID left join \n" +
            "items i on oi.itemID = i.id group by r.id order by coalesce(sum(price * quantity),0) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });

    })
}

async function getDeliveryByNrOfOrders(){
    return new Promise((resolve, reject) => {

        var sql = "select count(*) as nr_of_orders,u.* from users u join orders o on u.id = o.providerID and u.service = 'food' group by u.id order by count(*) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });

    })
}

async function getDriversByNrOfTrips(){
    return new Promise((resolve, reject) => {

        var sql = "select count(*) as trips,u.* from users u join ride_shares r on u.id = r.providerID and u.service = 'ride-share' group by u.id order by count(*) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });

    })
}

async function getDriversByRating(){
    return new Promise((resolve, reject) => {

        var sql = "select avg(rating) as rating,u.* from users u join ride_shares r on u.id = r.providerID and u.service = 'ride-share' group by u.id order by avg(rating) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });

    })
}

async function getDriversByProfit(){
    return new Promise((resolve, reject) => {

        var sql = "select sum(price) as profit,u.* from users u join ride_shares r on u.id = r.providerID and u.service = 'ride-share' group by u.id order by sum(price) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });

    })
}

async function getCountiesByNrOfRideShares(){
    return new Promise((resolve, reject) => {

        var sql = "select county,count(*) as nr_of_trips from users u join ride_shares r on u.id = r.consumerID group by county order by count(*) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });

    })
}

async function getCountiesByNrOfOrders(){
    return new Promise((resolve, reject) => {

        var sql = "select county,count(*) as nr_of_orders from users u join orders o on u.id = o.consumerID group by county order by count(*) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });

    })
}

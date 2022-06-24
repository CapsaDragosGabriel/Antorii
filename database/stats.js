const mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});

async function aggregateUserData() {
    return new Promise(resolve => {
        getConsumerProviderUserProcent().then(r => {
            r = "{\n\"consumer_provider\":" + JSON.stringify(r);
            // resolve(r);
            getNumberOfUsersPerCounty().then(p => {
                r = r + ",\n\"users_per_county\":" + JSON.stringify(p) + ",";
                getNumberOfConsumersPerCounty().then(pp => {
                    r += "\n\"consumers_per_county\":" + JSON.stringify(pp);
                    getNumberOfProvidersPerCounty().then(ppp => {
                        r += ",\n\"providers_per_county\":" + JSON.stringify(ppp);

                        getUsersOrderedByRideSpending().then(p => {
                            r += ",\n\"users_by_ride_spending\":" + JSON.stringify(p);
                            getUsersOrderedByRestaurantSpending().then(p => {
                                r += ",\n\"users_by_restaurant_spending\":" + JSON.stringify(p)
                                getUsersOrderedByTotalSpending().then(p => {
                                    r += ",\n\"users_by_total_spending\":" + JSON.stringify(p) + "\n}"
                                    resolve(r);

                                })


                            })
                        })

                    })

                })
            })
        })

    })
}


async function getConsumerProviderUserProcent() { // piechart
    return new Promise((resolve, reject) => {

        var sql = "select * from (SELECT concat((count(*) / (select count(*) from users)) * 100,'%') as 'consumer_procent' from users where service = 'consumer') c,\n" +
            "(SELECT concat((count(*) / (select count(*) from users)) * 100,'%') as 'provider_procent' from users where service <> 'consumer') p;"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result[0])
        });

    })
}

async function getNumberOfUsersPerCounty() {
    return new Promise((resolve, reject) => {

        var sql = "select county,count(*) as number_of_users from users group by county order by count(*) desc;"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });

    })
}

async function getNumberOfConsumersPerCounty() {
    return new Promise((resolve, reject) => {

        var sql = "select county,count(*) as number_of_consumers from users where service = 'consumer' group by county order by count(*) desc;"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });

    })
}

async function getNumberOfProvidersPerCounty() {
    return new Promise((resolve, reject) => {

        var sql = "select county,count(*) as number_of_providers from users where service <> 'consumer' group by county order by count(*) desc;"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result)
        });

    })
}

async function getUsersOrderedByRideSpending() {
    return new Promise((resolve, reject) => {

        var sql = "select coalesce(sum(price),0) as total ,u.* from users u left join ride_shares r on u.id = r.consumerID group by u.id order by sum(price) desc;"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp = [];
            for (let i = 0; i <= 4; i++)
                temp[i] = result[i];
            resolve(temp)
        });

    })
}

async function getUsersOrderedByRestaurantSpending() {
    return new Promise((resolve, reject) => {

        var sql = "select  coalesce(sum(price * quantity),0) as total,u.* from users u left join orders o on u.id = o.consumerID left join\n" +
            " ordered_items oi on o.id = oi.orderID left join items i on oi.itemID = i.id group by u.id order by coalesce(sum(price * quantity),0) desc;"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp = [];
            for (let i = 0; i <= 4; i++)
                temp[i] = result[i];

            resolve(temp)
        });

    })
}

async function maxNumberOfUsersInCounty() {
    return new Promise((resolve, reject) => {

        var sql = "select max(r.nr) as max from (select count(*) as nr from users group by county) r"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result[0].max)
        });

    })
}

async function aggregateRestaurantData() {
    return new Promise(resolve => {
        getRestaurantsOrderByProfit().then(r => {
            r = ("{\"restaurants_by_profit\":" + JSON.stringify(r))
            getDeliveryByNrOfOrders().then(p => {
                r += (",\"delivery_by_orders\":" + JSON.stringify(p) + "\n}")
                resolve(r);
            })
        })
    })
}

async function aggregateRideshareData() {
    return new Promise((resolve, reject) => {
        getDriversByNrOfTrips().then(r => {
            r = "{\n\"drivers_by_trips\":" + JSON.stringify(r);
            getDriversByRating().then(p => {
                r = r + ",\"drivers_by_rating\":" + JSON.stringify(p) + "\n}"
                resolve(r);
            })
        })
    })
}

//-----------------------


async function getUsersOrderedByTotalSpending() {
    return new Promise((resolve, reject) => {

        var sql = " select r.total + o.total as total,r.id,r.first_name,r.last_name,r.phone_number,r.email,r.pass,r.city,r.county,r.localization,r.token,r.created_token_time,r.service\n" +
            " from (select coalesce(sum(price),0) as total ,u.* from users u left join ride_shares r on u.id = r.consumerID group by u.id order by sum(price) desc) r join \n" +
            " (select  coalesce(sum(price * quantity),0) as total,u.* from users u left join orders o on u.id = o.consumerID left join\n" +
            " ordered_items oi on o.id = oi.orderID left join items i on oi.itemID = i.id group by u.id order by coalesce(sum(price * quantity),0) desc) o on r.id = o.id order by r.total + o.total desc;"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp = [];
            for (let i = 0; i <= 4; i++)
                temp[i] = result[i];
            resolve(temp)
        });

    })
}


async function getRestaurantsOrderByProfit() {
    return new Promise((resolve, reject) => {

        var sql = "select coalesce(sum(price * quantity),0) as total, r.* from restaurants r left join orders o on r.id = o.restaurantID left join ordered_items oi on o.id = oi.orderID left join \n" +
            "items i on oi.itemID = i.id group by r.id order by coalesce(sum(price * quantity),0) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp = [];
            for (let i = 0; i <= 4; i++)
                if (result[i])
                    temp[i] = result[i];
            resolve(temp)
        });

    })
}


async function getDeliveryByNrOfOrders() {
    return new Promise((resolve, reject) => {

        var sql = "select count(*) as nr_of_orders,u.* from users u join orders o on u.id = o.providerID and u.service = 'food' group by u.id order by count(*) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp = [];
            for (let i = 0; i <= 4; i++)
                if (result[i])
                    temp[i] = result[i];
            resolve(temp)
        });

    })
}


async function getDriversByNrOfTrips() {
    return new Promise((resolve, reject) => {

        var sql = "select count(*) as trips,u.* from users u join ride_shares r on u.id = r.providerID and u.service = 'ride-sharing' group by u.id order by count(*) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp = [];
            for (let i = 0; i <= 4; i++)
                if (result[i])
                    temp[i] = result[i];
            resolve(temp)
        });

    })
}


async function getDriversByRating() {
    return new Promise((resolve, reject) => {

        var sql = "select avg(rating) as rating,u.* from users u join ride_shares r on u.id = r.providerID and u.service = 'ride-sharing' group by u.id order by avg(rating) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp = [];
            for (let i = 0; i <= 4; i++)
                if (result[i])
                    temp[i] = result[i];
            resolve(temp)
        });

    })
}

async function getDriversByProfit() {
    return new Promise((resolve, reject) => {

        var sql = "select sum(price) as profit,u.* from users u join ride_shares r on u.id = r.providerID and u.service = 'ride-sharing' group by u.id order by sum(price) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp = [];
            for (let i = 0; i <= 4; i++)
                if (result[i])
                    temp[i] = result[i];
            resolve(temp)
        });

    })
}

//----------------????
async function getCountiesByNrOfRideShares() {
    return new Promise((resolve, reject) => {

        var sql = "select county,count(*) as nr_of_trips from users u join ride_shares r on u.id = r.consumerID group by county order by count(*) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp = [];
            for (let i = 0; i <= 4; i++)
                if (result[i])
                    temp[i] = result[i];
            resolve(temp)
        });

    })
}

async function getCountiesByNrOfOrders() {
    return new Promise((resolve, reject) => {

        var sql = "select county,count(*) as nr_of_orders from users u join orders o on u.id = o.consumerID group by county order by count(*) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp = [];
            for (let i = 0; i <= 4; i++)
                if (result[i])
                    temp[i] = result[i];
            resolve(temp)
        });

    })
}

async function getServicesCount() {
    return new Promise((resolve, reject) => {
        var sql = "select r.ride_share,d.delivery,re.rents from (select count(*) as 'ride_share' from users where service = 'ride-sharing') r,\n" +
            "            (select count(*) as 'delivery' from users where service = 'food') d,\n" +
            "            (select count(*) as rents from (select count(*) from users u join rent on u.id = rent.agentID group by u.id) f) re"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result[0])
        })
    })
}


// async function getCountiesByNrOfActions(){
//     return new Promise((resolve, reject) => {
//
//         var sql = "select county,count(*) as nr_of_rents from users u  join rent_periods r on u.id = r.consumerID group by county order by count(*) desc"
//
//         con.query(sql, function (err, result) {
//             if (err) throw err;
//
//             var nrOfRents = result;
//
//             var sql = "select county,count(*) as nr_of_orders from users u join orders o on u.id = o.consumerID group by county order by count(*) desc"
//
//             con.query(sql, function (err, result) {
//                 if (err) throw err;
//
//                 var nrOfOrders = result;
//
//                 var sql = "select county,count(*) as nr_of_trips from users u join ride_shares r on u.id = r.consumerID group by county order by count(*) desc"
//
//                 con.query(sql, function (err, result) {
//                     if (err) throw err;
//
//                     var nrOfTrips = result;
//
//                     console.log(nrOfRents)
//                     console.log(nrOfTrips)
//                     console.log(nrOfOrders)
//
//                     var actions = []
//                     for(var i = 0; i< nrOfTrips.length;i++){
//
//                         }
//                     }
//
//                 })
//             })
//
//         });
//
//     })
// }


// getCountiesByNrOfActions().then(r => {
//     console.log(r)
// })

module.exports = {
    getConsumerProviderUserProcent,
    getNumberOfUsersPerCounty,
    getNumberOfConsumersPerCounty,
    getNumberOfProvidersPerCounty,
    getUsersOrderedByRideSpending,
    getUsersOrderedByRestaurantSpending,
    getUsersOrderedByTotalSpending,
    getRestaurantsOrderByProfit,
    getDeliveryByNrOfOrders,
    getDriversByNrOfTrips,
    getDriversByRating,
    getDriversByProfit,
    getCountiesByNrOfRideShares,
    getCountiesByNrOfOrders,
    aggregateUserData,
    aggregateRestaurantData,
    maxNumberOfUsersInCounty,
    getServicesCount,
    // getRestaurantsOrderByProfitFULL
    // getCountiesByNrOfActions,

}
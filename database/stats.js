const mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});
async function aggregateUserData()
{
    return new Promise(resolve => {
    getConsumerProviderUserProcent().then(r=>{
        r="{\n\"consumer_provider\":"+ JSON.stringify(r);
        // resolve(r);
        getNumberOfUsersPerCounty().then(p=>{
          r=r+",\n\"users_per_county\":"+JSON.stringify(p)+",";
          getNumberOfConsumersPerCounty().then(pp=>{
              r+="\n\"consumers_per_county\":"+JSON.stringify(pp);
              getNumberOfProvidersPerCounty().then(ppp=>{
                r+=",\n\"providers_per_county\":"+JSON.stringify(ppp);

                getUsersOrderedByRideSpending().then(p=>{
                    r+=",\n\"users_by_ride_spending\":"+JSON.stringify(p);
                    getUsersOrderedByRestaurantSpending().then(p=>{
                        r+=",\n\"users_by_restaurant_spending\":"+JSON.stringify(p)
                        getUsersOrderedByTotalSpending().then(p=>{
                            r+=",\n\"users_by_total_spending\":"+JSON.stringify(p)+"\n}"
                            resolve(r);

                        })


                    })
                })

              })

          })
        })
    } )

    })
}
// getNumberOfProvidersPerCounty().then(r=>console.log(r[2]))

// aggregateUserData().then(r=> {
//     r=JSON.parse(r)
//    // console.log(r.consumer_provider)
//     console.log(r.providers_per_county);
// })


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
            var temp=[];
            for (let i=0;i<=4;i++)
                temp[i]=result[i];
            resolve(temp)
        });

    })
}
async function getUsersOrderedByRestaurantSpending(){
    return new Promise((resolve, reject) => {

        var sql = "select  coalesce(sum(price * quantity),0) as total,u.* from users u left join orders o on u.id = o.consumerID left join\n" +
            " ordered_items oi on o.id = oi.orderID left join items i on oi.itemID = i.id group by u.id order by coalesce(sum(price * quantity),0) desc;"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp=[];
            for (let i=0;i<=4;i++)
                temp[i]=result[i];

            resolve(temp)
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
            var temp=[];
            for (let i=0;i<=4;i++)
                temp[i]=result[i];
            resolve(temp)
        });

    })
}


async function aggregateRestaurantData()
{
    return new Promise(resolve=>
    {
        getRestaurantsOrderByProfit().then(r=>
        {
            r=("{\"restaurants_by_profit\":"+JSON.stringify(r))
            getDeliveryByNrOfOrders().then(p=>{
                r+=(",\"delivery_by_orders\":"+JSON.stringify(p)+"\n}")
                resolve(r);
            })
        })
    })
}
// aggregateRestaurantData().then(r=>{
//     r=JSON.parse(r);
//     console.log(r.delivery_by_orders)
// })
async function getRestaurantsOrderByProfit(){
    return new Promise((resolve, reject) => {

        var sql = "select coalesce(sum(price * quantity),0) as total, r.* from restaurants r left join orders o on r.id = o.restaurantID left join ordered_items oi on o.id = oi.orderID left join \n" +
            "items i on oi.itemID = i.id group by r.id order by coalesce(sum(price * quantity),0) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp=[];
            for (let i=0;i<=4;i++)
                if(result[i])
                temp[i]=result[i];
            resolve(temp)
        });

    })
}

async function getDeliveryByNrOfOrders(){
    return new Promise((resolve, reject) => {

        var sql = "select count(*) as nr_of_orders,u.* from users u join orders o on u.id = o.providerID and u.service = 'food' group by u.id order by count(*) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp=[];
            for (let i=0;i<=4;i++)
                if(result[i])
                    temp[i]=result[i];
            resolve(temp)
        });

    })
}

async function aggregateRideshareData()
{
    return new Promise((resolve,reject)=>
    {
        getDriversByNrOfTrips().then(r=>{
            r="{\n\"drivers_by_trips\":"+JSON.stringify(r);
            getDriversByRating().then(p=>{
                r=r+",\"drivers_by_rating\":"+JSON.stringify(p)+"\n}"
                resolve(r);
            })
        })
    })
}
aggregateRideshareData().then(r=>{
    r=JSON.parse(r);
    console.log(r);
})
async function getDriversByNrOfTrips(){
    return new Promise((resolve, reject) => {

        var sql = "select count(*) as trips,u.* from users u join ride_shares r on u.id = r.providerID and u.service = 'ride-share' group by u.id order by count(*) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp=[];
            for (let i=0;i<=4;i++)
                if(result[i])
                    temp[i]=result[i];
            resolve(temp)
        });

    })
}

getDriversByNrOfTrips().then(f=>{
    console.log(f);
})
async function getDriversByRating(){
    return new Promise((resolve, reject) => {

        var sql = "select avg(rating) as rating,u.* from users u join ride_shares r on u.id = r.providerID and u.service = 'ride-share' group by u.id order by avg(rating) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp=[];
            for (let i=0;i<=4;i++)
                if(result[i])
                    temp[i]=result[i];
            resolve(temp)
        });

    })
}

async function getDriversByProfit(){
    return new Promise((resolve, reject) => {

        var sql = "select sum(price) as profit,u.* from users u join ride_shares r on u.id = r.providerID and u.service = 'ride-share' group by u.id order by sum(price) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp=[];
            for (let i=0;i<=4;i++)
                if(result[i])
                    temp[i]=result[i];
            resolve(temp)
        });

    })
}

async function getCountiesByNrOfRideShares(){
    return new Promise((resolve, reject) => {

        var sql = "select county,count(*) as nr_of_trips from users u join ride_shares r on u.id = r.consumerID group by county order by count(*) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp=[];
            for (let i=0;i<=4;i++)
                if(result[i])
                    temp[i]=result[i];
            resolve(temp)
        });

    })
}

async function getCountiesByNrOfOrders(){
    return new Promise((resolve, reject) => {

        var sql = "select county,count(*) as nr_of_orders from users u join orders o on u.id = o.consumerID group by county order by count(*) desc"

        con.query(sql, function (err, result) {
            if (err) throw err;
            var temp=[];
            for (let i=0;i<=4;i++)
                if(result[i])
                    temp[i]=result[i];
            resolve(temp)
        });

    })
}

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

}
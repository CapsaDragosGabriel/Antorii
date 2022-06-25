var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});

function insertRent(rent) {

    var sql = "INSERT INTO `web`.`rent`\n" +
        "(\n" +
        "`location`,\n" +
        "`agentID`,\n" +
        "`price_per_day`,\n" +
        "`description`,\n" +
        "`type`)\n" +
        "VALUES(?, ?, ?, ?, ?)";
    console.log(sql)
    con.query(sql, [rent.location, rent.agentID, rent.price_per_day, rent.description, rent.type], function (err, result) {
        if (err) throw err;

        console.log("rent inserted")
    });
}
function selectRent(rent)
{
    return new Promise((resolve,reject)=>{
    var sql="SELECT * FROM `web`.`rent` where location=? and agentID=? and price_per_day=? and description=? and type=?"
    console.log("SELECTING: "+sql,[rent.location, rent.agentID, rent.price_per_day, rent.description, rent.type]);
        con.query(sql, [rent.location, rent.agentID, rent.price_per_day, rent.description, rent.type], function (err, result) {
        if (err) throw err;
        console.log(result);
        if(!result) return false;
        resolve(result);

    });})
}
rent = {
    location: 'la mare',
    agentID: 3,
    price_per_day: 30,
    description: 'pitoresc tare',
    type: 'apartament'
}
    //
    // selectRent(rent).then(p => {
    //     console.log(p);
    // })

function makeReservation(reservation) {

    var sql = "INSERT INTO `web`.`rent_periods`\n" +
        "(\n" +
        "`rentID`,\n" +
        "`rental_date`,\n" +
        "`expiration_date`,\n" +
        "`consumerID`)\n" +
        "VALUES(?, ?, ?, ?)"

    con.query(sql, [reservation.rentID, reservation.rental_date, reservation.expiration_date, reservation.consumerID], function (err, result) {
        if (err) throw err;

        console.log("reservation inserted")
    });
}

async function getRentCost(rentPeriodID) {
    return new Promise((resolve, reject) => {
        var sql = "select datediff(expiration_date,rental_date) * price_per_day as cost from rent_periods rp join rent r on rp.rentID = r.id where rp.id = " + con.escape(rentPeriodID) + ";"

        con.query(sql, function (err, result) {
            if (err) throw err;

            resolve(result[0].cost)
        })
    })

}
async function checkReservation(rentID,rental_date,expiration_date) {
    return new Promise((resolve, reject) => {
        var sql = "select * from rent_periods where rentID=? and rental_date=? and expiration_date=?"
        con.query(sql,[rentID,rental_date,expiration_date], function (err, result) {
            if (err) throw err;
            if(result[0]!=undefined)
                resolve("da")
            else
            resolve("nu")
        })
    })

}

async function getRentPeriodID(rentID, rental_date) {
    return new Promise((resolve, reject) => {
        var sql = "select rp.id from rent_periods rp join rent r on rp.rentID = r.id where rental_date = ? and rentID = ?"

        con.query(sql, [rental_date, rentID], function (err, result) {
            if (err) throw err;

            resolve(result[0].id)
        })
    })
}

async function getRentID(rent) {
    return new Promise((resolve, reject) => {
        var sql = "select id from rent r where r.location = ? and r.agentID = ? and r.price_per_day = ? and r.description = ? and r.type = ?"

        con.query(sql, [rent.location, rent.agentID, rent.price_per_day, rent.description, rent.type], function (err, result) {
            if (err) throw err;

            resolve(result[0].id)
        })
    })
}

async function getRentsAvailableInPeriod(myRentalDate, leavingDate) {
    return new Promise((resolve, reject) => {
        var sql = "select * from rent r where not exists (select 1 from rent_periods where ? < expiration_date and ? > rental_date)"

        con.query(sql, [myRentalDate, leavingDate], function (err, result) {
            if (err) throw err;
            console.log(result)

            if(result.length > 0)
            resolve(result)
            else resolve('nimic')
        })
    })

}
async function getRentsAvailableInPeriodType(myRentalDate, leavingDate,type) {
    return new Promise((resolve, reject) => {
        var sql = "select * from rent r where type = ? and not exists (select 1 from rent_periods rp where r.id = rp.rentID and ? < expiration_date and ? > rental_date)"

        con.query(sql, [type,myRentalDate, leavingDate], function (err, result) {
            if (err) throw err;

            if(result.length > 0)
                resolve(result)
            else resolve(null);
        })
    })

}
rent = {
    location: 'la mare',
    agentID: 10,
    price_per_day: 30,
    description: 'pitoresc tare',
    type: 'apartament'
}

reservation = {
    rentID: 1,
    rental_date: '2022-06-25',
    expiration_date: '2022-07-01',
    consumerID: 11
}
checkReservation(1,"2022-06-17","2022-06-25").then(r=>{
    console.log(r);
})
module.exports={
    getRentsAvailableInPeriod,
    getRentsAvailableInPeriodType,
    checkReservation,
    getRentPeriodID,
    getRentID,
    getRentCost,
    makeReservation,
    insertRent,
    selectRent
}
// getRentsAvailableInPeriod('2022-06-26', '2022-06-27').then(r => {
//     console.log(r)
// })

// getRentID(rent).then(r => {
//     console.log(r)
// })

// getRentPeriodID(1,'2022-06-25').then(r => {
//     console.log(r)
// })

// makeReservation(reservation)

// getRentCost(1).then(r => {
//     console.log(r)
// })
// insertRent(rent)

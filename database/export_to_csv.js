const mysql = require('mysql');
const fastcsv = require('fast-csv')
const fs = require('fs')
// globalThis.Blob = require('fetch-blob');
const statDB=require("../database/stats");
const {getRestaurantsOrderByProfitFULL} = require("./stats");
var con = mysql.createConnection({
    host: "localhost",
    user: "student",
    password: "student",
    database: "web"
});

function exportUsers(){
    con.query("SELECT * FROM users", function(error, data, fields) {
        if (error) throw error;
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        const ws = fs.createWriteStream("../csv_files/userData.csv");
        fastcsv
            .write(jsonData, { headers: true })
            .on("finish", function() {
                console.log("Write to users.csv successfully!");
            })
            .pipe(ws);
    });
}

function exportItems(){
    con.query("SELECT * FROM items", function(error, data, fields) {
        if (error) throw error;
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        const ws = fs.createWriteStream("../csv_files/items.csv");
        fastcsv
            .write(jsonData, { headers: true })
            .on("finish", function() {
                console.log("Write to items.csv successfully!");
            })
            .pipe(ws);
    });
}

function exportOrderedItems(){
    con.query("SELECT * FROM ordered_items", function(error, data, fields) {
        if (error) throw error;
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        const ws = fs.createWriteStream("../csv_files/ordered_items.csv");
        fastcsv
            .write(jsonData, { headers: true })
            .on("finish", function() {
                console.log("Write to ordered_items.csv successfully!");
            })
            .pipe(ws);
    });
}


function exportOrders(){
    con.query("SELECT * FROM orders", function(error, data, fields) {
        if (error) throw error;
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        const ws = fs.createWriteStream("../csv_files/orders.csv");
        fastcsv
            .write(jsonData, { headers: true })
            .on("finish", function() {
                console.log("Write to orders.csv successfully!");
            })
            .pipe(ws);
    });
}

function exportRestaurants(){
    con.query("SELECT * FROM restaurants", function(error, data, fields) {
        if (error) throw error;
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        const ws = fs.createWriteStream("../csv_files/restaurants.csv");
        fastcsv
            .write(jsonData, { headers: true })
            .on("finish", function() {
                console.log("Write to restaurants.csv successfully!");
            })
            .pipe(ws);
    });
}

function exportRideShares(){
    con.query("SELECT * FROM ride_shares", function(error, data, fields) {
        if (error) throw error;
        const jsonData = JSON.parse(JSON.stringify(data));
        console.log("jsonData", jsonData);
        const ws = fs.createWriteStream("../csv_files/ride_shares.csv");
        fastcsv
            .write(jsonData, { headers: true })
            .on("finish", function() {
                console.log("Write to ride_shares.csv successfully!");
            })
            .pipe(ws);
    });
}

function exportUserRideData(){
    statDB.getUsersOrderedByRideSpending().then(r=>{
        const jsonData =r;
        const ws = fs.createWriteStream("../csv_files/userRide.csv");
        fastcsv
            .write(jsonData, { headers: true })
            .on("finish", function() {
                console.log("Write to ride_shares.csv successfully!");
            })
            .pipe(ws);
    })

}
function exportUserRestaurantData(){
    statDB.getUsersOrderedByRestaurantSpending().then(r=>{
        const jsonData =r;
        const ws = fs.createWriteStream("../csv_files/userRest.csv");
        fastcsv
            .write(jsonData, { headers: true })
            .on("finish", function() {
                console.log("Write to ride_shares.csv successfully!");
            })
            .pipe(ws);
    })

}
function exportUserTotalData(){
    statDB.getUsersOrderedByTotalSpending().then(r=>{
        const jsonData =r;
        const ws = fs.createWriteStream("../csv_files/userTotal.csv");
        fastcsv
            .write(jsonData, { headers: true })
            .on("finish", function() {
                console.log("Write to ride_shares.csv successfully!");
            })
            .pipe(ws);
    })

}
function exportTotalUsers(){
    statDB.getNumberOfUsersPerCounty().then(r=>{
        const jsonData =r;
        const ws = fs.createWriteStream("../csv_files/userCount.csv");
        fastcsv
            .write(jsonData, { headers: true })
            .on("finish", function() {
                console.log("Write to ride_shares.csv successfully!");
            })
            .pipe(ws);
    })

}
function exportRestaurantsProfit(){
    statDB.getRestaurantsOrderByProfit().then(r=>{
        const jsonData =r;
        const ws = fs.createWriteStream("../csv_files/restaurantsProfit.csv");
        fastcsv
            .write(jsonData, { headers: true })
            .on("finish", function() {
                console.log("Write to restaurantsProfit.csv successfully!");
            })
            .pipe(ws);
    })

}
function exportRestaurantDelivery(){
    statDB.getDeliveryByNrOfOrders().then(r=>{
        const jsonData =r;
        const ws = fs.createWriteStream("../csv_files/delivery.csv");
        fastcsv
            .write(jsonData, { headers: true })
            .on("finish", function() {
                console.log("Write to delivery.csv successfully!");
            })
            .pipe(ws);
    })

}

function aggregateExports() {
    exportUsers()
    exportItems()
    exportOrderedItems()
    exportOrders()
    exportRestaurants()
    exportRideShares()
    exportUserRideData()
    exportUserRestaurantData()
    exportUserRideData()
    exportUserTotalData()
    exportTotalUsers()
    exportRestaurantDelivery()
    exportRestaurantsProfit()
}
module.exports={
    aggregateExports
}

const mysql = require('mysql');
const fastcsv = require('fast-csv')
const fs = require('fs')
const statDB=require("../database/stats");
const {json} = require("express");

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

function exportUserData(){
    statDB.aggregateUserData().then(r=>{
        console.log("\n\n\n\n\n\n\n\n")
        console.log(r);
        const jsonData =JSON.parse(r);
        console.log("\n\n\n\n\n\n\n\n")

        console.log(jsonData)
        console.log("jsonData", jsonData);
        const ws = fs.createWriteStream("../csv_files/userData.csv");
        fastcsv
            .write(, { headers: true })
            .on("finish", function() {
                console.log("Write to ride_shares.csv successfully!");
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
    exportUserData()
}
module.exports={
    aggregateExports
}

let userStatsObj = {};
let restaurantStatsObj = {}
let xml = require("getXML");
let JSzip=require('jszip')
const JSZip = require("jszip");
xml.asdf();

async function getUserStats() {
    const data = {
        token: localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/admin/usersStats', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
            //wrongPassword()
            sent = false
        });
    if (response) {
        userStatsObj = JSON.parse(response);
        console.log(userStatsObj);
    }
}

async function getRestaurantStats() {
    const data = {
        token: localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/admin/restaurantStats', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
            //wrongPassword()
            sent = false
        });
    if (response) {
        restaurantStatsObj = JSON.parse(response);
        console.log(restaurantStatsObj);
    }
}

function showUsersStats() {
    let bigBox = document.getElementById('boxStat');
    let box = document.createElement("div");
    box.className = "boxScroll";

    let userBox = document.createElement('div');
    userBox.setAttribute("class", "stat");

    let title = document.createElement('div');
    title.className = "statTitle";
    title.innerHTML = `<h1>User stats:</h1>`;
    userBox.appendChild(title);

    let percentage = document.createElement('div');
    percentage.setAttribute("class", "statDetails");

    percentage.innerHTML += `
        <h1>Distributia procentuala a utilizatorilor</h1>
        <div class="infoStat">
        <p>${userStatsObj.consumer_provider.consumer_procent} consumers </p>
        <p> ${userStatsObj.consumer_provider.provider_procent} providers</p>
        </div>`;
    userBox.appendChild(percentage);

    /**
     * piechart
     */

    let countyDistribution = document.createElement('div');
    countyDistribution.setAttribute("class", "statDetails")
    countyDistribution.innerHTML += `<h1>Distributia pe judete a tuturor utilizatorilor:</h1>`
    let getCountyDistribution = document.createElement('div');
    getCountyDistribution.setAttribute("class", "infoStat")
    for (var element of userStatsObj.users_per_county)//de facut scroll down daca se poate
    {
        if (element.county !== undefined) {
            countyDistribution.innerHTML += `
            <div class="infoStat">
                <p>${element.county} </p>
                <p>${element.number_of_users}</p>
            </div>`
        }
    }
    countyDistribution.innerHTML += getCountyDistribution.innerHTML
    userBox.appendChild(countyDistribution);


    let consumerDistribution = document.createElement('div');
    consumerDistribution.setAttribute("class", "statDetails")
    consumerDistribution.innerHTML += `<h1>Distributia pe judete a consumatorilor:</h1>`
    let getConsumerDistribution = document.createElement('div')
    getConsumerDistribution.setAttribute("class", "infoStat");
    for (var element of userStatsObj.consumers_per_county)//de facut scroll down daca se poate
    {
        getConsumerDistribution.innerHTML += `
            <div class="infoStat">
                <p>${element.county} </p>
                <p>${element.number_of_consumers}</p>
            </div>`
    }
    consumerDistribution.innerHTML += getConsumerDistribution.innerHTML;
    userBox.appendChild(consumerDistribution);


    let providerDistribution = document.createElement('div');
    providerDistribution.setAttribute("class", "statDetails")
    providerDistribution.innerHTML += `<h1>Distributia pe judete a providerilor:</h1>`
    let getProviderDistribution = document.createElement('div');
    getProviderDistribution.setAttribute("class", "infoStat")
    for (var element of userStatsObj.providers_per_county)//de facut scroll down daca se poate
    {
        getProviderDistribution.innerHTML += `
            <div class="infoStat">
                <p>${element.county} </p>
                <p>${element.number_of_providers}</p>
            </div>`

    }
    providerDistribution.innerHTML += getProviderDistribution.innerHTML;
    userBox.appendChild(providerDistribution);


    let topRideSpender = document.createElement('div');
    topRideSpender.setAttribute("class", "statDetails");
    topRideSpender.innerHTML += `<h1>Cei care au platit rideshare cel mai mult</h1>`
    let getTopRideSpender = document.createElement('div');
    getTopRideSpender.setAttribute("class", "infoStat")
    for (var element of userStatsObj.users_by_ride_spending)//de facut scroll down daca se poate
    {
        getTopRideSpender.innerHTML += `
        <div class="infoStat">
            <p>${element.id} </p>
            <p>${element.email}</p>
            <p>${element.total}</p>
        </div>`

    }
    topRideSpender.innerHTML += getTopRideSpender.innerHTML;
    userBox.appendChild(topRideSpender);


    let topFoodSpender = document.createElement('div');
    topFoodSpender.setAttribute("class", "statDetails");
    topFoodSpender.innerHTML += `<h1>Cei care au platit food-delivery cel mai mult</h1>`
    let getTopFoodSpender = document.createElement('div');
    getTopFoodSpender.setAttribute("class", "infoStat")

    for (var element of userStatsObj.users_by_restaurant_spending) {
        getTopFoodSpender.innerHTML += `
        <div class="infoStat">
            <p>${element.id} </p>
            <p>${element.email}</p>
            <p>${element.total}</p>
        </div>`
    }
    topFoodSpender.innerHTML += getTopFoodSpender.innerHTML;
    userBox.appendChild(topFoodSpender);


    let topSpender = document.createElement('div');
    topSpender.setAttribute("class", "statDetails");
    topSpender.innerHTML += `<h1>Cei care au platit cel mai mult(toate serviciile la un loc)</h1>`
    let getTopSpender = document.createElement('div');
    getTopSpender.setAttribute("class", "infoStat")
    for (var element of userStatsObj.users_by_total_spending)//de facut scroll down daca se poate
    {
        getTopSpender.innerHTML += `
        <div class="infoStat">
            <p>${element.id} </p>
            <p>${element.email}</p>
            <p>${element.total}</p>
        </div>`
    }
    topSpender.innerHTML += getTopSpender.innerHTML;
    userBox.appendChild(topSpender);

    box.appendChild(userBox);
    bigBox.appendChild(box);
}

function showRestaurantStats() {
    let bigBox = document.getElementById('boxStat');
    let box = document.createElement("div");
    box.className = "boxScroll";

    let restaurantBox = document.createElement('div');
    restaurantBox.setAttribute("class", "stat");

    let title = document.createElement('div');
    title.className = "statTitle";
    title.innerHTML = `<h1>Restaurant stats:</h1>`;
    restaurantBox.appendChild(title);

    let restaurantsProfit = document.createElement('div');
    restaurantsProfit.setAttribute("class", "statDetails");

    restaurantsProfit.innerHTML += `<h1>Cele mai profitabile restaurante</h1>`
    let getRestaurantsProfit = document.createElement('div');
    getRestaurantsProfit.setAttribute("class", "infoStat")
    for (var element of restaurantStatsObj.restaurants_by_profit)//de facut scroll down daca se poate
    {
        restaurantsProfit.innerHTML += `
        <div class="infoStat">
            <p>${element.name} </p>
            <p>${element.total}</p>
        </div>`
    }
    restaurantsProfit.innerHTML += getRestaurantsProfit.innerHTML;
    restaurantBox.appendChild(restaurantsProfit);


    let delivery = document.createElement('div');
    delivery.setAttribute("class", "statDetails");
    delivery.innerHTML += `<h1>Cei mai buni livratori</h1>`
    let getDelivery = document.createElement('div');
    getDelivery.setAttribute("class", "infoStat")
    for (var element of restaurantStatsObj.delivery_by_orders)//de facut scroll down daca se poate
    {
        getDelivery.innerHTML += `
        <div class="infoStat">
            <p>${element.email} </p>
            <p>${element.nr_of_orders}</p>
        </div>`
    }
    delivery.innerHTML += getDelivery.innerHTML;
    restaurantBox.appendChild(delivery);

    box.appendChild(restaurantBox);
    bigBox.appendChild(box);
}

function showDeliveryStats() {
    let bigBox = document.getElementById('boxStat');

    let deliveryBox = document.createElement('div');
    deliveryBox.setAttribute("class", "stat");

    let title = document.createElement('div');
    title.className = "statTitle";
    title.innerHTML = `<h1>Ride-sharing stats:</h1>`;
    deliveryBox.appendChild(title);

    let restaurantBox = document.createElement('div');
    restaurantBox.setAttribute("class", "stat");

    bigBox.appendChild(deliveryBox);
}


function multiDownload() {
    var urls = [
        '../csv_files/delivery.csv',
        '../csv_files/items.csv',
        '../csv_files/ordered_items.csv',
        '../csv_files/restaurants.csv',
        '../csv_files/restaurantsProfit.csv',
        '../csv_files/ride_shares.csv',
        '../csv_files/userCount.csv',
        '../csv_files/userData.csv',
        '../csv_files/userRest.csv',
        '../csv_files/userRide.csv',
        '../csv_files/userTotal.csv',
        '../csv_files/users.csv',
        '../xml_files/delivery.xml',
        '../xml_files/items.xml',
        '../xml_files/ordered_items.xml',
        '../xml_files/restaurants.xml',
        '../xml_files/restaurantsRSS.xml',
        '../xml_files/restaurantsProfit.xml',
        '../database/stats/document.pdf',
        '../xml_files/ride_shares.xml',
        '../xml_files/userCount.xml',
        '../xml_files/userData.xml',
        '../xml_files/userRest.xml',
        '../xml_files/userRide.xml',
        '../xml_files/userTotal.xml',
        '../xml_files/users.xml',

    ]
// var urls=[`../csv_files/archive.zip`]
    var interval = setInterval(download, 300, urls);

    function download(urls) {
        var url = urls.pop();

        var a = document.createElement("a");
        a.setAttribute('href', url);
        a.setAttribute('download', '');
        a.setAttribute('target', '_blank');
        a.click();

        if (urls.length == 0) {
            clearInterval(interval);
        }
    }
}

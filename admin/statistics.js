let userStatsObj = {};

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

function showUsersStats() {
    let bigBox = document.getElementById('boxStat');

    let userBox = document.createElement('div');
    userBox.setAttribute("class", "stat");

    let percentage = document.createElement('div');
    percentage.setAttribute("class", "statDetails");

    percentage.innerHTML += `
    <p>Percentage distribution:</p>
    <div class="infoStat">
<p>${userStatsObj.consumer_provider.consumer_procent} consumers </p>
<p> ${userStatsObj.consumer_provider.provider_procent} providers</p>
</div>`;

    /**
     * piechart
     */
    let countyDistribution = document.createElement('div');
    countyDistribution.setAttribute("class", "statDetails")
    /**
     * asta sa fie  scroll
     */
    countyDistribution.innerHTML += `<p>Distributia pe judete a tuturor utilizatorilor:</p>`

    let getCountyDistribution=document.createElement('div');
    getCountyDistribution.setAttribute("class","infoStat")
    for (var element of userStatsObj.users_per_county)//de facut scroll down daca se poate
    {
        if (element.county !== undefined) {
            getCountyDistribution.innerHTML += `
<div class="infoStat">
<p>${element.county} </p>
            <p>${element.number_of_users}</p>
            </div>`
        }
    }
    countyDistribution.innerHTML+=getCountyDistribution.innerHTML

    let consumerDistribution = document.createElement('div');
    consumerDistribution.setAttribute("class", "statDetails")
    /**
     * asta sa fie  scroll
     */
    consumerDistribution.innerHTML += `<p>Distributia pe judete a consumatorilor:</p>`
    let getConsumerDistribution=document.createElement('div')
    getConsumerDistribution.setAttribute("class","infoStat");
    for (var element of userStatsObj.consumers_per_county)//de facut scroll down daca se poate
    {
            getConsumerDistribution.innerHTML += `
<div class="infoStat">
<p>${element.county} </p>
            <p>${element.number_of_consumers}</p>
            </div>`
    }
    consumerDistribution.innerHTML+=getConsumerDistribution.innerHTML;
    let providerDistribution = document.createElement('div');
    providerDistribution.setAttribute("class", "statDetails")
    /**
     * asta sa fie  scroll
     */
    providerDistribution.innerHTML += `<p>Distributia pe judete a providerilor:</p>`
    let getProviderDistribution=document.createElement('div');
    getProviderDistribution.setAttribute("class","infoStat")
    for (var element of userStatsObj.providers_per_county)//de facut scroll down daca se poate
    {
            getProviderDistribution.innerHTML += `
<div class="infoStat">
<p>${element.county} </p>
            <p>${element.providers_per_county}</p>
            </div>`

    }

    providerDistribution.innerHTML+=getProviderDistribution.innerHTML;

    let topRideSpender=document.createElement('div');
    topRideSpender.setAttribute("class","statDetails");
    topRideSpender.innerHTML+=`<p>Cei care au platit rideshare cel mai mult</p>`
    let getTopRideSpender=document.createElement('div');
    getTopRideSpender.setAttribute("class","infoStat")

    for (var element of userStatsObj.users_by_ride_spending)//de facut scroll down daca se poate
    {
        getTopRideSpender.innerHTML += `
<div class="infoStat">
<p>${element.id} </p>
            <p>${element.email}</p>
            <p>${element.total}</p>
            </div>`

    }
    topRideSpender.innerHTML+=getTopRideSpender.innerHTML;


    let topFoodSpender=document.createElement('div');
    topFoodSpender.setAttribute("class","statDetails");
    topFoodSpender.innerHTML+=`<p>Cei care au platit food-delivery cel mai mult</p>`
    let getTopFoodSpender=document.createElement('div');
    getTopFoodSpender.setAttribute("class","infoStat")

    for (var element of userStatsObj.users_by_restaurant_spending)//de facut scroll down daca se poate
    {
        getTopFoodSpender.innerHTML += `
<div class="infoStat">
<p>${element.id} </p>
            <p>${element.email}</p>
            <p>${element.total}</p>
            </div>`

    }
    topFoodSpender.innerHTML+=getTopFoodSpender.innerHTML;


    let topSpender=document.createElement('div');
    topSpender.setAttribute("class","statDetails");
    topSpender.innerHTML+=`<p>Cei care au platit cel mai mult(toate serviciile la un loc)</p>`
    let getTopSpender=document.createElement('div');
    getTopSpender.setAttribute("class","infoStat")

    for (var element of userStatsObj.users_by_total_spending)//de facut scroll down daca se poate
    {
        getTopSpender.innerHTML += `
<div class="infoStat">
<p>${element.id} </p>
            <p>${element.email}</p>
            <p>${element.total}</p>
            </div>`

    }
    topSpender.innerHTML+=getTopSpender.innerHTML;


    userBox.innerHTML += percentage.innerHTML;
    userBox.innerHTML += countyDistribution.innerHTML;
    userBox.innerHTML += consumerDistribution.innerHTML;
    userBox.innerHTML += providerDistribution.innerHTML;
    userBox.innerHTML+=topRideSpender.innerHTML;
    userBox.innerHTML+=topFoodSpender.innerHTML
    userBox.innerHTML+=topSpender.innerHTML;
    bigBox.innerHTML += userBox.innerHTML


}

function showRestaurantStats(){
    let bigBox = document.getElementById('boxStat');

    let restaurantBox = document.createElement('div');
    restaurantBox.setAttribute("class", "stat");

}
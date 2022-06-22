let userStatsObj={};
async function getUserStats()
{
    const data = {
        token:localStorage.getItem('token')
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
            sent=false
        });
    if (response) {
        userStatsObj=JSON.parse(response);
        console.log(userStatsObj);
    }
}
function showUsersStats(){
    let bigBox=document.getElementById('boxStat');

    let userBox=document.createElement('div');
    userBox.setAttribute("class","stat");

    let percentage=document.createElement('div');
    percentage.setAttribute("class","statDetails");

    percentage.innerHTML+=`
    <p>Percentage distribution:</p>
    <div class="infoStat">
<p>${userStatsObj.consumer_provider.consumer_procent} consumers </p>
<p> ${userStatsObj.consumer_provider.provider_procent} providers</p>
</div>`;

    /**
     * piechart
     */
    let countyDistribution=document.createElement('div');
    countyDistribution.setAttribute("class","statDetails")
    for(var element of userStatsObj.users_per_county)//de facut scroll down daca se poate
    {
        countyDistribution.innerHTML+=`
<div class="infoStat">
<p>${element.county} </p>
            <p>${element.number_of_users}</p>
            </div>`
    }

userBox.innerHTML+=percentage.innerHTML;
userBox.innerHTML+=countyDistribution.innerHTML;


  bigBox.innerHTML+=userBox.innerHTML


}
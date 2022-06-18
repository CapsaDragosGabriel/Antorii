function refreshRides()
{
    var x=document.getElementById("commandsList");
    x.innerHTML="";
}
function showRides(){
    var x=document.getElementById("commandsList");
    console.log(JSON.stringify(globalRides[0]));
    // console.log(newObj.start);
    for (let i=0;i<globalRides.length;i++)
{    var newObj=(globalRides[i]);

    var newCommand=document.createElement('div');
    // console.log("PLECAM DE LA "+currRide);
    newCommand.innerHTML=`<h1>De la ${newObj.start} la ${newObj.finish}.
</h1>`;
    newCommand.className="command";
    newCommand.innerHTML=newCommand.innerHTML+
        `<label>
            <p>Status comanda: ${newObj.status}</p>
           <!-- <select class="selectStatus" name="status">
                <option value="none" selected disabled hidden>Status</option>
                <option value="yes">Confirma</option>
                <option value="no">Refuza</option>
                <option value="done">Terminat</option>
            </select>-->
        </label>
        <button class="buttonaut" onclick="{
        console.log(${i})
        globalRides[${i}].status='claimed'
        console.log(globalRides[${i}]);
        refreshRides()
        showRides()
        }"
        }></button>        
`;
    x.appendChild(newCommand);
    var newRide=document.createElement('div')
    // console.log("una bucata ride"+currRide);
}
}
let globalRides;
async function getNewRides()
{
    const data = {
        token: localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/rides', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        // headers: {
        //     'Content-Type': 'application/json'
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
            //wrongPassword()

            sent = false
        });
 //   console.log("Raspunsul de la server esteeee : "+ response);
    globalRides=response;
    showRides()
    for(let iterator=0;iterator<response.length;iterator++)
    {
        // console.log(response[iterator]);
    }
    // const resultData = awa1it response.json();
    if (sent) {

        //  window.location.href='http://127.0.0.1:8000/startUser/startUser.html';
    }
    // username= JSON.stringify(response.body);
}
let username="";
async function changeUsername() {
    var x = document.getElementById("defaultTitle");
    var user=document.getElementById("username")
    if(x)
    x.innerHTML =
        `Bine ai revenit,${username}!`
        ;
    if(user)
    user.innerHTML=`${username} <a href="#user" style="padding: 0;"> detalii profil</a>`;

}
async function getUsername() {
    const data = {
        token: localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/username', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        // headers: {
        //     'Content-Type': 'application/json'
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
            //wrongPassword()
            sent = false
        });
    // const resultData = awa1it response.json();
    console.log(response);
    if (sent) {
        console.log(response.email);
        username = response.email;
        changeUsername();
        //  window.location.href='http://127.0.0.1:8000/startUser/startUser.html';
    }
    // username= JSON.stringify(response.body);
}
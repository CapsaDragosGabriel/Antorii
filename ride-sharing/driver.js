function refreshRides()
{
    var x=document.getElementById("commandsList");
    x.innerHTML="<h2 id=\"title\">Comenzi care te asteapta</h2>";

}
async function getClaimedRides()
{
    const data = {
        token: localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/claim/rides', {
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
    if (sent==true)
    {
        let length=globalRides.length;
        if(response)
        for (let i =0;i<response.length;i++)
            globalRides[length+i]=response[i];
        console.log("RASPUNSUL A FOST" + response)
        console.log("GLOBAL RIDES DUPA  GET CLAIMED RIDES" +globalRides);

        // console.log(globalRides);
    }
}
async function updateRide(id,status){
    const data = {
        id:id,
        status:status,
        token: localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/update/rides', {
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



}
function showRides(){
    var x=document.getElementById("commandsList");
    console.log(JSON.stringify(globalRides[0]));
    // console.log(newObj.start);
    for (let i=0;i<globalRides.length;i++)
{
    if (globalRides[i])
    {   var newObj=(globalRides[i]);

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
                    if (globalRides[${i}].status=='unclaimed')
                    {globalRides[${i}].status='claimed'
                    console.log(globalRides[${i}]);
                    
                    updateRide(globalRides[${i}].id,'claimed').then(()=>{
                      refreshRides()
                    showRides()}
                    )
                    }
                    }"}
                    >Preluata</button>     
                    <button class="buttonaut" onclick="
                    if (globalRides[${i}].status=='claimed')
                     {  console.log(${i})
                    globalRides[${i}].status='done'
                    console.log(globalRides[${i}]);

                    updateRide(globalRides[${i}].id,'done').then(()=>{
                      refreshRides()
                    showRides()
                    })
                    
                    }"
                    >Terminat</button>     
            `;
                x.appendChild(newCommand);
                var newRide=document.createElement('div')}
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
    console.log("GLOBAL RIDES DUPA  GET NEW RIDES" +globalRides);
    //showRides()

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

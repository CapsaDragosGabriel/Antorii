let username="";
let globalRides;
async function getOwnRides()
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
        globalRides=response;
        console.log("RASPUNSUL A FOST" + response)
        console.log("GLOBAL RIDES DUPA  GET CLAIMED RIDES" +globalRides);

        // console.log(globalRides);
    }
}
function refreshRides()
{
    var x=document.getElementById("commandsList");
    x.innerHTML="<h2 id=\"title\">Comenzile tale</h2>";

}
async function updateRide(id){
    const data = {
        id:id,
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
                    <button class="buttonaut" onclick="
                    if (globalRides[${i}].status!='done')
                     {  console.log(${i})
                    globalRides[${i}].status='done'
                    console.log(globalRides[${i}]);

                   updateRide(globalRides[${i}].id).then(()=>{
                     refreshRides()
                    showRides()
                   }
                    )
                    
                    }"
                    >Terminat</button>     
            `;
            x.appendChild(newCommand);
            // var newRide=document.createElement('div')
            }
        // console.log("una bucata ride"+currRide);
    }
}

async function getUsername()
{
    const data = {
        token:localStorage.getItem('token')
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
            sent=false
        });
    // const resultData = awa1it response.json();
    console.log(response);
    if(sent) {
        console.log(response.email);
        username=response.email;
        changeUsername();
        //  window.location.href='http://127.0.0.1:8000/startUser/startUser.html';
    }
    // username= JSON.stringify(response.body);
}
async function changeUsername()
{
    var x=document.getElementById("username");

    x.innerHTML=
        `
        ${username}
        `

}

async function comanda()
{
    var from= document.getElementById('from');
    var to=document.getElementById('to');
    const data = {
        from: from.value,
        to: to.value,
        service: "ride",
        token: localStorage.getItem('token')
    }
    let primit = true;

    const response = await fetch('http://localhost:8000/api/ride-sharing', {
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
            primit = false;
        });

    // const resultData = awa1it response.json();
    if(primit) {
        window.location.href='http://127.0.0.1:8000/startUser/startUser.html';
    }
    console.log(response);


}
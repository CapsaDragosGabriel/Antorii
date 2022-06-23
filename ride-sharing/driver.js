function refreshRides() {
    var x = document.getElementById("commandsList");
    x.innerHTML = "<h2 id=\"title\">Comenzi care te asteapta</h2>";
}

let globalRides;
let globalService = "";

async function getService() {
    const data = {
        token: localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/service', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
            sent = false
        });
    console.log(response);
    if (sent) {
        globalService = response.service;
        console.log(globalService);
    }
}

async function logout() {

    const data = {
        token: localStorage.getItem('token')
    }
    console.log(data.token);
    const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
        });
    localStorage.removeItem('token');

    window.location.href = "http://127.0.0.1:8000/mainHome/mainHome.html";
}

async function getClaimedRides() {
    const data = {
        token: localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/claim/rides', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
            sent = false
        });

    if (sent === true) {
        let length;
        if (globalRides)
            length = globalRides.length;
        else length = 0;
        if (response)
            for (let i = 0; i < response.length; i++)
                globalRides[length + i] = response[i];
        console.log("RASPUNSUL A FOST" + response)
        console.log("GLOBAL RIDES DUPA  GET CLAIMED RIDES" + globalRides);
    }
}

async function updateRide(id, status) {
    const data = {
        id: id,
        status: status,
        token: localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/update/rides', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
            sent = false
        });
}

function showRides() {
    var x = document.getElementById("commandsList");
    if (globalRides !== null) {
        for (let i = 0; i < globalRides.length; i++) {
            if (globalRides[i]) {
                var newObj = (globalRides[i]);
                var newCommand = document.createElement('div');
                newCommand.className = "detaliiCursa";
                var detalii = document.createElement("div");
                detalii.className = "command";
                detalii.innerHTML = `<h1>${newObj.start} - ${newObj.finish}
            </h1>`;
                detalii.innerHTML = detalii.innerHTML +
                    `<label>
                        <p>Status comanda: ${newObj.status}</p>
                    </label>
                    <p id="pretCursa">Pretul: ${newObj.price} RON</p>    
            `;
                var butoane = document.createElement("div");
                butoane.className = "divButoane";
                butoane.innerHTML = `<button class="buttonaut" onclick="{
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
                    >Terminat</button>`;
                newCommand.appendChild(detalii);
                newCommand.appendChild(butoane);
                if (globalRides[i].feedback)
                    newCommand.innerHTML = newCommand.innerHTML +
                        `<p id="feedback">Feedback de la client: ${globalRides[i].feedback}</p>`
                if (globalRides[i].rating)
                    newCommand.innerHTML = newCommand.innerHTML +
                        `<p id="feedback">Rating de la client: ${globalRides[i].rating}</p>`
                x.appendChild(newCommand);
            }
        }
    }
    else {
        var x = document.getElementById("commandsList");
        x.innerHTML = "<h2 id=\"title\">Comenzi care te asteapta</h2>" +
            "<p id='noCommands'>Nu ai primit nicio comanda!</p>";
    }
}


async function getNewRides() {
    const data = {
        token: localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/rides', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
            sent = false
        });
    //   console.log("Raspunsul de la server esteeee : "+ response);

    globalRides = response;
    console.log("GLOBAL RIDES DUPA  GET NEW RIDES" + globalRides);
    //showRides()

    // const resultData = awa1it response.json();
    if (sent) {

        //  window.location.href='http://127.0.0.1:8000/startUser/startUser.html';
    }
    // username= JSON.stringify(response.body);
}

let username = "";

async function changeUsername() {
    var x = document.getElementById("defaultTitle");
    var user = document.getElementById("username")
    if (x)
        x.innerHTML =
            `Bine ai revenit,
        ${username}!`
        ;
    if (user)
        user.innerHTML = `${username}`;

}

async function getUsername() {
    const data = {
        token: localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/username', {
        method: 'POST',
        body: JSON.stringify(data)
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

let username = "";
let globalRides;

async function getOwnRides() {
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
    if (sent == true) {
        globalRides = response;
        console.log("RASPUNSUL A FOST" + response)
        console.log("GLOBAL RIDES DUPA  GET CLAIMED RIDES" + globalRides);
    }
}

function refreshRides() {
    var x = document.getElementById("commandsList");
    x.innerHTML = "<h2 id=\"title\">Comenzile tale</h2>";

}

async function updateRide(id,i) {
    const data = {
        id: id,
        status:globalRides[i].status,
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

function deleteFeedback() {
    document.getElementById('myForm').style.display = 'none';
    // var x = document.getElementById("commandsList");
    // var y = document.getElementById("boxCommandId");
    // y.innerHTML = `<p>Multumim!</p>`;
    // x.appendChild(y);
}

function showRides() {
    var x = document.getElementById("commandsList");
    console.log(JSON.stringify(globalRides[0]));
    for (let i = 0; i < globalRides.length; i++) {
        if (globalRides[i]) {
            var newObj = (globalRides[i]);
            var newCommand = document.createElement('div');
            newCommand.className = "boxCommand";
            newCommand.id = "boxCommandId";
            newCommand.innerHTML =
                `<div class="command">
                <h1>${newObj.start} - ${newObj.finish}</h1>
                <label>
                    <p id="status">Status comanda: ${newObj.status}</p>
                       <!-- <select class="selectStatus" name="status">
                            <option value="none" selected disabled hidden>Status</option>
                            <option value="yes">Confirma</option>
                            <option value="no">Refuza</option>
                            <option value="done">Terminat</option>
                        </select>-->
                </label>
                <button class="butonStatus" onclick="
                    if (globalRides[${i}].status!='claimed'&&globalRides[${i}].status!='done'&&globalRides[${i}].status!='anulat'){  
                        console.log(${i})
                        globalRides[${i}].status='anulat'
                        console.log(globalRides[${i}]);
                        updateRide(globalRides[${i}].id,${i}).then(()=>{
                            refreshRides()
                            showRides()
                        })
                    }">Terminat</button>
                    </div>`;
            if (newObj.status === 'done') {
                newCommand.innerHTML = newCommand.innerHTML + `
  <div class="form-popup" id="myForm">
    <form class="form-container" action="ride-sharing.html">
        <label><b>Feedback</b></label>
        <input type="text" placeholder="Spune-ne parerea ta!" name="feedback" required>
        <div id="butonSend""><button class="btn" onclick="deleteFeedback()">Trimite</button></div>
    </form>
  </div>`
            }
            x.appendChild(newCommand);
        }
    }
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
            sent = false
        });
    console.log(response);
    if (sent) {
        console.log(response.email);
        username = response.email;
        changeUsername();
    }
}

async function changeUsername() {
    var x = document.getElementById("username");
    x.innerHTML =
        `
        ${username}
        `
}

async function comanda() {
    var from = document.getElementById('from');
    var to = document.getElementById('to');
    const data = {
        from: from.value,
        to: to.value,
        service: "ride",
        token: localStorage.getItem('token')
    }
    let primit = true;

    const response = await fetch('http://localhost:8000/api/ride-sharing', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
            primit = false;
        });
    if (primit) {
        window.location.href = 'http://127.0.0.1:8000/startUser/startUser.html';
    }
    console.log(response);
}
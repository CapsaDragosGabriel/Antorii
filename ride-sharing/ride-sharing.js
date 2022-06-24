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
    x.innerHTML = `<div class="title-back">
        <button id="back" onclick="backRideS()">Inapoi</button>
        <h2 id="titleC">Cursele tale</h2>
    </div>`;

}

async function updateRide(id, i) {
    const data = {
        id: id,
        status: globalRides[i].status,
        feedback: globalRides[i].feedback,
        rating: globalRides[i].rating,
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
                newCommand.className = "boxCommand";
                newCommand.id = "boxCommandId";
                newCommand.innerHTML =
                    `<div class="command">
                    <h1>${newObj.start} - ${newObj.finish}</h1>
                    <label>
                        <p id="status">Status comanda: ${newObj.status}</p>
                    </label>
                        <p id="pretCursa">Pret: ${newObj.price} RON</p>
                </div>
                    <div style="display: flex;
                                justify-content: right;
                                flex-direction: row;
                                margin-bottom: 2%;"><button class="btn" onclick="
                    if (globalRides[${i}].status!='claimed'&&globalRides[${i}].status!='done'&&globalRides[${i}].status!='anulat'){  
                        console.log(${i})
                        globalRides[${i}].status='anulat'
                        console.log(globalRides[${i}]);
                        updateRide(globalRides[${i}].id,${i}).then(()=>{
                            refreshRides()
                            showRides()
                        })
                    }">Anuleaza</button></div>`;
                if (newObj.status === 'done')
                    if (newObj.feedback == null || newObj.rating == null) {
                        newCommand.innerHTML = newCommand.innerHTML + `
          <div class="form-popup" id="myForm">
            <form method="post" class="form-container" onsubmit=" {
               getValue(${i});
                updateRide(globalRides[${i}].id,${i}).then(()=>{
                                    refreshRides()
                                    showRides()        })}
            
            ">
                `
                        if (globalRides[i].feedback == null) {
                            newCommand.innerHTML = newCommand.innerHTML + ` 
 <label><b>Feedback</b></label>
 <input type="text" placeholder="Spune-ne parerea ta!" onblur="getValue(${i})" name="feedback" id="feedback${i}" required><br>`

                        } else
                            newCommand.innerHTML = newCommand.innerHTML + ` 
 <div class="feedbackBox"
    <label>Feedback</label>
    <p style="margin: 0;">${newObj.feedback} </p>
</div>`
                        if (newObj.rating == 0) {
                            newCommand.innerHTML = newCommand.innerHTML + `
                
                    <div class="rate">
                        <input type="radio" id="star5" name="rate" value="5" onclick="globalRides[${i}].rating=5; console.log(5)"/>
                        <label for="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4" onclick="globalRides[${i}].rating=4;console.log(4)"/>
                        <label for="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3" onclick="globalRides[${i}].rating=3"/>
                        <label for="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2" onclick="globalRides[${i}].rating=2"/>
                        <label for="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1" onclick="globalRides[${i}].rating=1"/>
                        <label for="star1" title="text">1 star</label>
                    </div>
                    `


                        } else {
                            let valueRating = globalRides[i].rating
                            newCommand.innerHTML = newCommand.innerHTML + `
<div class="feedbackBox">
    <p style="margin: 0;">Ai acordat:</p>
    <p style="margin: 0;">${valueRating} stele</p>
</div>`;
                        }
                        newCommand.innerHTML = newCommand.innerHTML + `
                    <div id="butonSend">
                        <button class="btn" type="submit" onclick="
                        updateRide(globalRides[${i}].id,${i}).then(()=>{
                            refreshRides()
                            showRides()
                        }) ">Trimite</button>
                    </div>`

                        newCommand.innerHTML = newCommand.innerHTML + `
    </from>
  </div>`
                    } else {
                        newCommand.innerHTML = newCommand.innerHTML + `
            <div class="feedbackBoxSend">
              <div style="display: flex;
                          flex-direction: row;
                          justify-content: space-between;">
                <p style="margin: 0;">Feedback:</p>
                <p style="margin: 0;">${newObj.feedback}</p>
              </div>
              <div style="display: flex;
                          flex-direction: row;
                          justify-content: space-between;">
                <p style="margin: 0;">Rating:</p>
                <p style="margin: 0;">${newObj.rating} stele</p>
              </div>
            </div>
`
                    }
                x.appendChild(newCommand);
            }
        }
    } else {
        var x = document.getElementById("commandsList");
        x.innerHTML = `
    <div class="title-back">
        <button id="back" onclick="backRideS()">Inapoi</button>
        <h2 id="titleC">Cursele tale</h2>
    </div>
    <p id="noCommands">Nu ai nicio cursa!</p>`;
    }

}

function getValue(i) {
    var feedbackValue = document.getElementById(`feedback${i}`).value;
    globalRides[i].feedback = feedbackValue;
    console.log(i + " " + JSON.stringify(feedbackValue));
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
    if (data.from !== "" && data.to !== "") {
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
            window.location.href = 'http://127.0.0.1:8000/ride-sharing/ride-sharing.html';
        }
    }
}
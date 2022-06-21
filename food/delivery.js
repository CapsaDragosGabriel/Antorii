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
        user.innerHTML = `${username} <a href="#user" style="padding: 0;"> detalii profil</a>`;

}
let globalOrders;
function showOrders() {
    var x = document.getElementById("commandsList");
    console.log(JSON.stringify(globalOrders[0]));
    // console.log(newObj.start);
    for (let i = 0; i < globalOrders.length; i++) {
        if (globalOrders[i]) {
            var newObj = (globalOrders[i]);

            var newCommand = document.createElement('div');
            // console.log("PLECAM DE LA "+currorder);
            newCommand.innerHTML = `<h1>${newObj.start} - ${newObj.finish}
            </h1>`;
            newCommand.className = "command";
            newCommand.innerHTML = newCommand.innerHTML +
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
                    if (globalOrders[${i}].status=='unclaimed')
                    {globalOrders[${i}].status='claimed'
                    console.log(globalOrders[${i}]);
                    
                    updateorder(globalOrders[${i}].id,'claimed').then(()=>{
                      refreshorders()
                    showorders()}
                    )
                    }
                    }"}
                    >Preluata</button>     
                    <button class="buttonaut" onclick="
                    if (globalOrders[${i}].status=='claimed')
                     {  console.log(${i})
                    globalOrders[${i}].status='done'
                    console.log(globalOrders[${i}]);

                    updateorder(globalOrders[${i}].id,'done').then(()=>{
                      refreshorders()
                    showorders()
                    })
                    
                    }"
                    >Terminat</button>     
            `;
            if (globalOrders[i].feedback_provider)
                newCommand.innerHTML = newCommand.innerHTML +
                    `<br><p>Feedback de la client: ${globalOrders[i].feedback_provider}</p>`

            x.appendChild(newCommand);
            // var neworder = document.createElement('div')
        }
        // console.log("una bucata order"+currorder);
    }
}

async function getClaimedOrders() {
    const data = {
        token: localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/claim/orders', {
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
    if (globalOrders)
        globalOrders = response;
    else globalOrders=[];
    console.log("GLOBAL orderS DUPA  GET NEW orderS" + globalOrders);
    //showorders()

    // const resultData = awa1it response.json();
    if (sent) {

        //  window.location.href='http://127.0.0.1:8000/startUser/startUser.html';
    }
    // username= JSON.stringify(response.body);
}

async function getNewOrders() {
    const data = {
        token: localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/orders', {
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
    if (globalOrders)
        globalOrders = response;
    else globalOrders=[];
    console.log("GLOBAL orderS DUPA  GET NEW orderS" + globalOrders);
    //showorders()

    // const resultData = awa1it response.json();
    if (sent) {

        //  window.location.href='http://127.0.0.1:8000/startUser/startUser.html';
    }
    // username= JSON.stringify(response.body);
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
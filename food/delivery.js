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
let providerID
async function updateOrder(id, i) {
console.log(globalOrders[i].status);
    const data = {
        id: globalOrders[i].orderID,
        status: globalOrders[i].status,
        token: localStorage.getItem('token')
    }
    let sent = true;
    console.log("TRANSMIT: " + JSON.stringify(data));
    console.log("ID-UL ESTE : "+id);
    const response = await fetch('http://localhost:8000/api/update/order', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
            sent = false
        });
}

function showOrders() {
    var x = document.getElementById("commandsList");
    console.log(JSON.stringify(globalOrders[0]));
    // console.log(newObj.start);
    for (let i = 0; i < globalOrders.length; i++) {
        if (globalOrders[i]) {
            var newObj = (globalOrders[i]);

            var newCommand = document.createElement('div');
            // console.log("PLECAM DE LA "+currorder);
            newCommand.innerHTML = `<h1>La ${newObj.address}
            </h1>`;
            newCommand.className = "command";
            newCommand.innerHTML = newCommand.innerHTML+`<ul>`

            for (var item of newObj.food.items){
                if(item.quantity)
            newCommand.innerHTML = newCommand.innerHTML+
                `
            <li>${item.name} x ${item.quantity}</li>
            `}
            newCommand.innerHTML = newCommand.innerHTML+`</ul>`

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
                    updateOrder(globalOrders[${i}].id,${i}).then(()=>{
                    refreshOrders()
                    showOrders()}
                    )
                    }
                    }"}
                    >Preluata</button>     
                    <button class="buttonaut" onclick="
                    if (globalOrders[${i}].status=='claimed')
                     {  console.log(${i})
                    globalOrders[${i}].status='done'
                    console.log(globalOrders[${i}]);
                    updateOrder(globalOrders[${i}].id,${i}).then(()=>{
                      refreshOrders()
                    showOrders()
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
function refreshOrders() {
    var x = document.getElementById("commandsList");
    x.innerHTML = "<h2 id=\"title\">Comenzi care te asteapta</h2>";

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

    if (sent == true) {
        let length;
        if(globalOrders)
            length= globalOrders.length;
        else length=0;
        if (response)
            for (let i = 0; i < response.length; i++)
                globalOrders[length + i] = response[i];
        console.log("RASPUNSUL A FOST" + response)
        console.log("GLOBAL ORDERS DUPA  GET CLAIMED ORDERS" + globalOrders);

        // console.log(globalOrders);
    }
    //   console.log("Raspunsul de la server esteeee : "+ response);
        //globalOrders = response;
        
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
        globalOrders = response;
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
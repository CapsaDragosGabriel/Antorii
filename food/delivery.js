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
    console.log("ID-UL ESTE : " + id);
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
    if(globalOrders!==null) {
        for (let i = 0; i < globalOrders.length; i++) {
            if (globalOrders[i]) {
                var newObj = (globalOrders[i]);

                var newCommand = document.createElement('div');
                newCommand.className = "commandBox";

                var detaliiComanda = document.createElement("div");
                detaliiComanda.className = "command";
                detaliiComanda.innerHTML = `<h1 style="margin-bottom: 0;">La ${newObj.address}</h1>`;
                detaliiComanda.innerHTML +=`<p>Pretul:${newObj.food.cost} RON`
                var lista = document.createElement("ul");

                for (var item of newObj.food.items) {
                    if (item.quantity)
                        lista.innerHTML = lista.innerHTML + `<li>${item.name} x ${item.quantity}</li>`
                }
                detaliiComanda.innerHTML = detaliiComanda.innerHTML +
                    `<label>
                    <p>Status comanda: ${newObj.status}</p>
                 </label>     
            `;

                var butoane = document.createElement("div");
                butoane.className = "butoaneDiv"
                butoane.innerHTML = `<button class="buttonaut" onclick="{
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
                    >Terminat</button>`;

                newCommand.appendChild(detaliiComanda);
                newCommand.appendChild(lista);
                newCommand.appendChild(butoane);

                if (globalOrders[i].feedback_provider)
                    newCommand.innerHTML = newCommand.innerHTML +
                        `<p id="feedback">Feedback de la client: ${globalOrders[i].feedback_provider}</p>`
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
        if (globalOrders)
            length = globalOrders.length;
        else length = 0;
        if (response)
            for (let i = 0; i < response.length; i++)
                globalOrders[length + i] = response[i];
        console.log("RASPUNSUL A FOST" + response)
        console.log("GLOBAL ORDERS DUPA  GET CLAIMED ORDERS" + globalOrders);
    }
    console.log("GLOBAL orderS DUPA  GET NEW orderS" + globalOrders);
    if (sent) {

        //  window.location.href='http://127.0.0.1:8000/startUser/startUser.html';
    }
}

async function getNewOrders() {
    const data = {
        token: localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
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
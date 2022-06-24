// var striptags = require('striptags');
function createPriceDiv() {
    var x = document.getElementById("box");
    x.innerHTML = x.innerHTML + `<div id="totalPrice"></div>`;
}

let globalOrders = [];

async function getOrders() {
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
            //wrongPassword()
            sent = false
        });
    console.log("Raspunsul:" + response);
    globalOrders = response;
    showOrders()
}

let ok = "";

function refreshOrders() {
    var x = document.getElementById("commandsList");
    x.innerHTML = `<div class="title-back">
        <button id="back" onclick="backFood(); ok='deja'; ">Inapoi</button>
        <h2 id="title" >Comenzile tale</h2>
    </div>`;

}

/**Obiectele au forma:
 * [{
 *   food: { items: [ [Object], [Object] ], cost: 51 },
 *   address: 'pepega',
 *   feedback_restaurant: null,
 *   feedback_provider: null
 * },
 * {
 *   food: { items: [ [Object], [Object] ], cost: 51 },
 *   address: 'pepega',
 *   feedback_restaurant: null,
 *   feedback_provider: null
 * },
 * ]
 */
async function updateOrder(id, i) {
    const data = {
        id: id,
        feedback_restaurant: globalOrders[i].feedback_restaurant,
        feedback_provider: globalOrders[i].feedback_provider,
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

function getValueLiv(i) {

    var feedbackValue =  document.getElementById(`feedbackliv${i}`).value.replace(/(<([^>]+)>)/ig,"");
    globalOrders[i].feedback_provider = feedbackValue;
    console.log(i + " " + JSON.stringify(feedbackValue));
}

function getValueRes(i) {
    var feedbackValue =  document.getElementById(`feedbackres${i}`).value.replace(/(<([^>]+)>)/ig,"");
    globalOrders[i].feedback_restaurant = feedbackValue;
    console.log(i + " " + JSON.stringify(feedbackValue));
}

function showOrders() {
    var x = document.getElementById("commandsList");
    if (globalOrders !== null) {
        for (let i = 0; i < globalOrders.length; i++) {
            if (globalOrders[i]) {
                var currOrderDiv = document.createElement("div");
                currOrderDiv.setAttribute("class", "boxCommand");
                var newObj = (globalOrders[i]); ///asta e o acolada mare
                console.log("new OBJ" + JSON.stringify(newObj))
                currOrderDiv.innerHTML = currOrderDiv.innerHTML + `<h1>Comanda la adresa ${newObj.address}</h1>`
                var foodObj = newObj.food; //asta e food
                var comandaActuala = document.createElement("div");
                comandaActuala.className = "command";
                for (var item of foodObj.items) {
                    //item e fiecare chestie din food items
                    if (item.quantity)
                        comandaActuala.innerHTML += `<p>${item.name} x ${item.quantity}</p>`
                }
                //foodObj.cost e costul
                //newObj.feedback... sunt feedbacks
                comandaActuala.innerHTML = comandaActuala.innerHTML + `
<div style="border-top: 1px solid rgb(0 0 0 / 65%); 
            display: flex; 
            justify-content: space-between;
            margin: 0 5%;">
    <p style="margin-top: 10px;">Total de plata:</p>
    <p style="margin-top: 10px;">${foodObj.cost} RON</p>
</div>`
                currOrderDiv.appendChild(comandaActuala);
                if (true) {
                    var detalii = document.createElement("div");
                    detalii.className = "commandDetails";
                    if (newObj.providerID)
                        detalii.innerHTML = `
<div class="infoComanda"">
    <p> Livrator: </p>
    <p> ${newObj.providerID}</p>
</div> `;
                    else
                        detalii.innerHTML = `
<div class="infoComanda">
    <p> Livrator:</p>
    <p>  - </p>
</div>`;

                    detalii.innerHTML = detalii.innerHTML + `
<div class="infoComanda">
    <p> Status:</p>
    <p> ${newObj.status}</p>
</div>`;
                    detalii.innerHTML = detalii.innerHTML + `
<div class="infoComanda">
    <p> Ora aproximativa a livrarii:</p>
    <p> ${newObj.estimated}</p>
</div>`;
                    currOrderDiv.appendChild(detalii);
                    if (newObj.status === 'done') {

                        if (newObj.feedback_provider) {
                            currOrderDiv.innerHTML = currOrderDiv.innerHTML + `<p class="feedbackBoxSend" style="margin:2% 0 0 0;">Feedback livrator: ${newObj.feedback_provider}</p> `;
                        } else {
                            var feedbackBox = document.createElement("div");
                            feedbackBox.className = "feedbackBox";
                            feedbackBox.innerHTML = `<p>Feedback livrator: </p> `;
                            feedbackBox.innerHTML = feedbackBox.innerHTML + `<input class="inputFeedback" type="text" placeholder="Spune-ne parerea ta!" name="feedbackliv${i}" id="feedbackliv${i}"  required>`
                            feedbackBox.innerHTML = feedbackBox.innerHTML +
                                `<div id="butonSend"> <button class="btn" onclick="
                            {getValueLiv(${i});
                            updateOrder(globalOrders[${i}].orderID,${i}).then(()=>{
                            refreshOrders()
                            showOrders()})
                            
                            }">Trimite</button></div>`;
                            currOrderDiv.appendChild(feedbackBox);
                        }

                        if (newObj.feedback_restaurant) {
                            currOrderDiv.innerHTML = currOrderDiv.innerHTML + `<p class="feedbackBoxSend" style="margin: 0;">Feedback restaurant: ${newObj.feedback_restaurant}</p> `;
                        } else {
                            var feedbackRestaurant = document.createElement("div");
                            feedbackRestaurant.className = "feedbackBox";
                            feedbackRestaurant.innerHTML = `<p>Feedback restaurant: </p> `;
                            feedbackRestaurant.innerHTML = feedbackRestaurant.innerHTML + `<input class="inputFeedback" type="text" placeholder="Spune-ne parerea ta!" name="feedbackres${i}" id="feedbackres${i}" required>`
                            feedbackRestaurant.innerHTML = feedbackRestaurant.innerHTML +
                                `<div id="butonSend"><button id="butonSend" class="btn" onclick="
                            {getValueRes(${i});
                            updateOrder(globalOrders[${i}].orderID,${i}).then(()=>{
                            refreshOrders()
                            showOrders()})}">Trimite</button></div>`;
                            currOrderDiv.appendChild(feedbackRestaurant);
                        }
                    }
                    if (newObj.status === 'unclaimed') {
                        currOrderDiv.innerHTML = currOrderDiv.innerHTML + `
                <div style="display: flex;
                            flex-direction: row;
                            justify-content: right;
                            margin-top: 2%;"><button class="btn" onclick="
                    if (globalOrders[${i}].status!=='claimed'&&globalOrders[${i}].status!=='done'&&globalOrders[${i}].status!=='anulat'){  
                        globalOrders[${i}].status='anulat'
                        updateOrder(globalOrders[${i}].orderID,${i}).then(()=>{
                            refreshOrders()
                            showOrders()        
                        })
                    }">Anuleaza</button></div>`;
                    }
                }
                x.appendChild(currOrderDiv);
            }
        }
    } else {
        var x = document.getElementById("commandsList");
        x.innerHTML = `
    <div class="title-back">
        <button id="back" onclick="backFood(); ok='deja'; ">Inapoi</button>
        <h2 id="title" >Comenzile tale</h2>
    </div>
    <p id="noCommands">Nu aveti nicio comanda!</p>`;
    }
}

let numeRestaurant = "";

function resetOrder() {
    for (let i = 0; i < prices.length; i++) {
        quantities[i] = 0;
    }
}

let username = "";

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

var changeDisplay = function () {

    if (!display.startsWith(`review`) && display !== 'comanda') {
        numeRestaurant = display;
        var x = document.getElementById("box");
        x.innerHTML = `
        <a href="food.html" id="back">Inapoi</a>`;
    } else if (display === 'comanda') {
        var x = document.getElementById("box");
        x.innerHTML = `
        <a id="back" href="#" onclick="let ok=0;
                for (let i=0;i<quantities.length;i++)
                    if (quantities[i]!==0) display=numeRestaurant;
                changeDisplay();ok=false; console.log(display);" >Inapoi
        </a>
        <div id="adresaLivrare" ></div>
        <div id="comanda" ></div>
        <div id="totalPrice" ></div>
        <div id="delete_back">
            <a id="delete" href="food.html" >Anuleaza comanda</a>
        </div>`;
        totalCost();
    }
    if (!display.startsWith(`review`) && display !== 'comanda')
        getMenu();
    else if (!display.startsWith(`review`)) {
        var x = document.getElementById("adresaLivrare");
        x.innerHTML = `
        <form method="post" action="food.html" onsubmit="{comanda();return false;}">
            <input class="inputComanda" style="width:250px;"  required id="inputAddress" name="inputAddress" placeholder="Adresa de livrare">
            <button class="trimite" type="submit">Trimite comanda</button>
        </form>   `
        rezumatComanda();
    } else {
        var x = document.getElementById("box");
        x.innerHTML = ``;
        console.log("DISPALY IS: " + display.length);
        let k = 0;
        let sir = "";
        sir = display;
        getReviews()
    }
}

async function getReviews() {
    let data = {
        token: localStorage.getItem('token'),
        restaurantName: display.substring(6, display.length)
    }

    // console.log("TRIMIT NUMELE: " + data.restaurantName);
    response = await fetch('http://localhost:8000/api/reviews', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r => r.json()).catch(e => {
        console.log(e);
    })
    let jsondata = response
    console.log("AM PRIMIT " + response);
    globalReviews = response;
    showReviews()
    console.log(globalReviews[0].feedback_restaurant);
}

function showReviews() {
    var x = document.getElementById("box");
    x.setAttribute("class", "commandsList");
    if (globalReviews.length !== 0) {
        x.innerHTML += `
    <div class="title-back">
        <a href="food.html" id="back">Inapoi</a>
        <h2 id="title" >Reviews pentru ${display.substring(6, display.length)}</h2>
    </div>`
    }
    else {
        x.innerHTML += `
    <div class="title-back">
        <a href="food.html" id="back">Inapoi</a>
        <h2 id="title" >Nu exista recenzii!</h2>
    </div>`
    }

    for (let i = 0; i < globalReviews.length; i++) {
        let newReview = document.createElement('div')
        newReview.setAttribute("class", "infoComanda");
        newReview.innerHTML += `
        <div class="divDiv">
            <div class="reviewBox" 
                <h2>Anonim</h2>
                <p style="border-top: 1px solid white; padding-top: 5px;">${globalReviews[i].feedback_restaurant}</p>
            </div>
        </div>`
        x.innerHTML += newReview.innerHTML;
    }

}

let globalReviews = [];

async function comanda() {
    var adresa = document.getElementById('inputAddress');
    const data = {
        adresa:adresa.value.replace(/(<([^>]+)>)/ig,""),
        quantities: quantities,
        items: items,
        numeRestaurant: numeRestaurant,
        prices: prices,
        service: "food",
        token: localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/food', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
            sent = false;
        });
    if (sent) {
        window.location.href = 'http://127.0.0.1:8000/food/food.html';
    }
    console.log(response)
    window.onbeforeunload = function () {
        localStorage.removeItem('token');
    }
}

function rezumatComanda() {
    var x = document.getElementById("comanda");
    for (i = 0; i <= prices.length; i++) {
        if (quantities[i] > 0) {
            let qt = quantities[i];
            let itm = items[i];
            x.innerHTML = x.innerHTML + `<p>${itm} x ${qt} </p>`
        }
    }
}

function totalCost() {
    let sum = 0;
    for (let i = 0; i <= prices[i]; i++) {
        sum += prices[i] * quantities[i];
    }
    document.getElementById("totalPrice").style.display = 'block';
    var x = document.getElementById("totalPrice");
    x.innerHTML = `<p id="totalCost" style="font-weight: bold" >Costul total al comenzii este: ${sum} lei </p>`;
}

function adjustQTplus(name) {
    let i = `${name}`;
    let id = items[i];
    var x = document.getElementById(`${id}`);
    quantities[name] = quantities[name] + 1;
    x.innerHTML = `<p id='id'>${quantities[name]}</p> `
}

function adjustQTminus(name) {
    let i = `${name}`;
    let id = items[i];
    var x = document.getElementById(`${id}`);
    if (quantities[name] >= 1)
        quantities[name] = quantities[name] - 1;
    x.innerHTML = `<p style="text-align:right; display: inline-block;" id='id'>${quantities[name]}</p> `
}

let quantities = [];
let items = [];
let prices = [];

async function getMenu() {
    let data = {
        restaurantName: display
    }
    console.log("TRIMIT NUMELE: " + data.restaurantName);
    response = await fetch('http://localhost:8000/api/menu', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r => r.json()).catch(e => {
        console.log(e);
    })
    let jsondata = response
    console.log("AM PRIMIT " + response);
    var x = document.getElementById("box");
    x.setAttribute("style", "text-align:left; padding: 3.5%;")
    for (let i = 0; i < jsondata.length; i++) {
        let obj = jsondata[i];
        quantities[i] = 0;
        items[i] = obj.name;
        prices[i] = obj.price;
        x.innerHTML = x.innerHTML + `` +
            `<h1>${obj.name}</h1>
            <p>${obj.description}</p>
            <p id="pret" style="display: inline-block; font-weight: bold">Pret/buc:${obj.price} lei</p>
            <div id="addProduct" style="flex-direction: row;text-align: right">
                <button style="text-align:right;" onclick=' adjustQTminus(${i}) ;totalCost();
                    console.log(quantities[${i}]); ' >-</button>
                <p style="text-align:right; display: inline-block;" id='${obj.name}'>${quantities[i]}</p>
                <button style="text-align:right;"  onclick='adjustQTplus(${i}) ; totalCost(); 
                    console.log(quantities[${i}]); ' >+</button>
            </div>`;
    }
    createPriceDiv();
    var buton = document.createElement("div");
    buton.id = "buton";
    buton.innerHTML = `<button id="sendCommand" onclick="let ok=0;
        for (let i=0;i<quantities.length;i++)
            if (quantities[i]!==0)display='comanda';
        changeDisplay(); console.log(display) " >Plaseaza comanda
        </button>`;
    x.appendChild(buton);
}
function createPriceDiv() {
    var x = document.getElementById("box");
    x.innerHTML = x.innerHTML + `<div id="totalPrice"></div>
    <div id="buton">
        <button id="sendCommand" onclick="let ok=0;
        for (let i=0;i<quantities.length;i++)
            if (quantities[i]!==0)display='comanda';
        changeDisplay(); console.log(display) " >Plaseaza comanda
        </button>
    </div>`;
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
let ok="";
function refreshOrders() {
    var x = document.getElementById("commandsList");
    x.innerHTML = "<h2 id=\"title\">Comenzile tale</h2>";

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
async function updateOrder(id,i) {
    const data = {
        id: id,
        status:globalOrders[i].status,
        token: localStorage.getItem('token')
    }
    let sent = true;
    console.log("TRANSMIT: "+JSON.stringify(data));
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
    for (let i = 0; i < globalOrders.length; i++) {
        if (globalOrders[i]) {
            var currOrderDiv=document.createElement("div");
            //currOrderDiv.chan
            currOrderDiv.setAttribute("class","boxCommand");
            // currOrderDiv.setAttribute("id","boxCommandId");
            var newObj = (globalOrders[i]);///asta e o acolada mare
            // console.log("NEW OBJ ARATA ASA:"+JSON.stringify(newObj))
            currOrderDiv.innerHTML=currOrderDiv.innerHTML+`<h1>Comanda la adresa ${newObj.address}</h1>`

                console.log("CURRENT ITEM ISSS:"+ JSON.stringify( newObj));
                var foodObj=newObj.food;//asta e food

                // console.log("The food is getting prepped, and it is: "+JSON.stringify(foodObj));
                for (var item of foodObj.items)
                {//item e fiecare chestie din food items
                    // console.log(JSON.stringify(item));
                    if(item.quantity!=0)
                    currOrderDiv.innerHTML=currOrderDiv.innerHTML+`<p>${item.name} x ${item.quantity}</p>`
                    // console.log("This food item is:"+item.name + " and you got "+ item.quantity+" of them");

                }
                //foodObj.cost e costul
            //newObj.feedback... sunt feedbacks
                currOrderDiv.innerHTML=currOrderDiv.innerHTML+`<p style="text-align:right"><b>${foodObj.cost} </b></p>`
            if(newObj.provider)
            currOrderDiv.innerHTML=currOrderDiv.innerHTML+`<p> Livrator: ${newObj.provider}</p> `;
            else
                currOrderDiv.innerHTML=currOrderDiv.innerHTML+`<p> Livrator: - </p> `;

            currOrderDiv.innerHTML=currOrderDiv.innerHTML+`<p> Status: ${newObj.status}</p> `;
            currOrderDiv.innerHTML=currOrderDiv.innerHTML+`<p> Ora aproximativa a livrarii: ${newObj.estimated}</p> `;
            currOrderDiv.innerHTML=currOrderDiv.innerHTML+`
                <button class="butonStatus" onclick="
                    if (globalOrders[${i}].status!='claimed'&&globalOrders[${i}].status!='done'&&globalOrders[${i}].status!='anulat'){  
                        // console.log(${i})
                        globalOrders[${i}].status='anulat'
                        // console.log(globalOrders[${i}]);
                        updateOrder(globalOrders[${i}].id,${i}).then(()=>{
                            refreshOrders()
                            showOrders()        
                        })
                    }">Anuleaza</button>`;
            
            x.appendChild(currOrderDiv);



                /* newCommand.innerHTML = `<div class="command">
                 <h1>${newObj.start} - ${newObj.finish}</h1>
                 <label>
                     <p id="status">Status comanda: ${newObj.status}</p>
                 </label>
                 <button class="butonStatus" onclick="
                     if (globalOrders[${i}].status!='done'){
                         console.log(${i})
                         globalOrders[${i}].status='done'
                         console.log(globalOrders[${i}]);
                         updateRide(globalOrders[${i}].id).then(()=>{
                             refreshOrders()
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
 }*/

        }
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

    if (display == 'McDonalds') {
        numeRestaurant = display;
        var x = document.getElementById("box");
        x.innerHTML = `
        <a href="food.html" id="back">Inapoi</a>`;
    } else if (display == 'KFC') {
        numeRestaurant = display;
        var x = document.getElementById("box");
        x.innerHTML = `
        <a href="food.html" id="back">Inapoi</a>`;
    } else if (display == 'comanda') {
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
    if (display != 'comanda')
        getMenu();
    else {
        var x = document.getElementById("adresaLivrare");
        x.innerHTML = `
        <form method="post" action="food.html" onsubmit="{comanda();return false;}">
            <input style="width:250px;"  required id="inputAddress" name="inputAddress" placeholder="Adresa de livrare">
            <button class="trimite" type="submit">Trimite comanda</button>
        </form>   `
        rezumatComanda();
    }
}

async function comanda() {
    var adresa = document.getElementById('inputAddress');
    const data = {
        adresa: adresa.value,
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
        window.location.href = 'http://127.0.0.1:8000/startUser/startUser.html';
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
        createPriceDiv();
    }
}
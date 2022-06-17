function createPriceDiv()
{
    var x=document.getElementById("box");
    x.innerHTML=x.innerHTML+`<div id="totalPrice"></div>
<button onclick="display='comanda'; changeDisplay(); console.log(display) " >Plaseaza comanda</button>`;
}
let numeRestaurant="";
function resetOrder()
{
    for (let i =0 ;i<prices.length;i++)
    {
        quantities[i]=0;
    }
}
let username="";

async function getUsername()
{
    const data = {
        token:localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/username', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        // headers: {
            "Content-Type": 'application/json',
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
          // console.log(response.email);
            sent = false;
        });
    console.log(response.email);
    // username= JSON.stringify(response.body);
}
var changeDisplay=function()
{

    if (display=='McDonalds'){
        numeRestaurant=display;
        var x=document.getElementById("box");
        x.innerHTML=`
        <a href="food.html">Inainte era mai bine</a>`;
    }
    else if (display=='KFC')
    {
        numeRestaurant=display;
        var x=document.getElementById("box");
        x.innerHTML=`
        <a href="food.html">Inainte era mai bine</a>`;
    }
    else if (display=='comanda'){
        var x=document.getElementById("box");
        x.innerHTML=`
        <a   href="food.html" >Anuleaza comanda</a>
        <div id="adresaLivrare" ></div>
        <div id="comanda" ></div>
                <div id="totalPrice" ></div>`;
        totalCost();
    }
    if(display!='comanda')
    getMenu();
    else {
        var x=document.getElementById("adresaLivrare");
        x.innerHTML=`
        <form method="post" action="food.html" onsubmit="{
        comanda();
        return false;}"
        >
        <input style="width:250px;"  required id="inputAddress" name="inputAddress" placeholder="Adresa de livrare">
        <button class="buttonaut" type="submit">Trimite comanda</button>
      </form>   `
        rezumatComanda();
    }
}
async function comanda()
{
    var adresa= document.getElementById('inputAddress');

    //console.log(adresa.value);
    const data = {
        adresa: adresa.value,
        quantities: quantities,
        items:items,
        numeRestaurant:numeRestaurant,
        prices:prices,
        service:"food",
        token:localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/food', {
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
            sent = false;
        });

    // const resultData = awa1it response.json();
    if(sent) {
        window.location.href='http://127.0.0.1:8000/startUser/startUser.html';
    }
    console.log(response)
    window.onbeforeunload=function(){
        localStorage.removeItem('token');
    }

}
function rezumatComanda(){
    var x=document.getElementById("comanda");
    for (i=0;i<=prices.length;i++)
    {
        if(quantities[i]>0)
        {
            let qt=quantities[i];
            let itm=items[i];

        x.innerHTML=x.innerHTML+ `<p>${itm} x ${qt} </p> 
    `}
    }

}
function totalCost()
{
    let sum=0;
    for (let i =0; i<=prices[i];i++)
    {
        sum+=prices[i]*quantities[i];
    }
    var x=document.getElementById("totalPrice");
    x.innerHTML=`<p style="font-weight: bold" >Costul total al comenzii este: ${sum} lei </p>`;
}
function adjustQTplus(name)
{
    console.log("help me pls i m dying inside"+`${name}`);
    let i=`${name}`;
    console.log(i);
    let id=items[i];
    console.log(id);
    var x= document.getElementById(`${id}`);

    quantities[name]=quantities[name]+1;
        x.innerHTML=`<p id='id'>${quantities[name]}</p> `
}
function adjustQTminus(name)
{
    console.log("help me pls i m dying inside"+`${name}`);
    let i=`${name}`;
    console.log(i);
    let id=items[i];
    console.log(id);
    var x= document.getElementById(`${id}`);
if (quantities[name]>=1)
    quantities[name]=quantities[name]-1;
    x.innerHTML=`<p style="text-align:right; display: inline-block;" id='id'>${quantities[name]}</p> `
}
let quantities=[];
let items=[];
let prices=[];
function getMenu()
{
    fetch(`./${display}.json`)
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            var x = document.getElementById("box");
            x.setAttribute("style","text-align:left; padding: 3.5%;" )
            for (let i = 0; i < jsondata.length; i++) {
                let obj = jsondata[i];
                quantities[i]=0;
                //quantities[${i}]=quantities[${i}]+1;
                // let nume=obj.name;
                items[i]=obj.name;
                prices[i]=obj.price;
                x.innerHTML = x.innerHTML + `` +
                    `<h1>${obj.name}</h1>
<p>${obj.description}</p>
<p style="display: inline-block; font-weight: bold">Pret/buc:${obj.price} lei</p>
<div style="flex-direction: row;text-align: right">
<button style="text-align:right;" onclick=' adjustQTplus(${i}) ;totalCost();
console.log(quantities[${i}]); ' >+</button>
<p style="text-align:right; display: inline-block;" id='${obj.name}'>${quantities[i]}</p>
<button style="text-align:right;"  onclick='adjustQTminus(${i}) ; totalCost(); 
console.log(quantities[${i}]); ' >-</button></div>`;

}
            createPriceDiv();
        })
}
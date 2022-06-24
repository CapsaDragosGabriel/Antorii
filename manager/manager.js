const striptags = require("striptags");

async function trimiteRestaurant()
{
    var numeRestaurant= document.getElementById('numeRestaurant');
    var linkPoza=document.getElementById('linkPoza');

    var data={
        token:localStorage.getItem('token'),
        numeRestaurant:numeRestaurant.value.replace(/(<([^>]+)>)/ig,""),
        linkPoza:linkPoza.value.replace(/(<([^>]+)>)/ig,""),
    }
    console.log(data);

    const response = await fetch('http://localhost:8000/api/manager/insertRestaurant', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r=>r.json());


    if(response.raspuns==="not good") {
        notGood("raspunsRestaurant")
        setTimeout(() => {
            const error = document.getElementById("raspunsRestaurant");
            const errorP = document.getElementById("error");
            error.removeChild(errorP);
        }, 1000);
    }
}
async function valabilitateRestaurant()
{
    var numeRestaurant= document.getElementById('numeRestaurant3');
    var disponibilitate=document.getElementById('dispRest');


    // var availability=disponibilitate. ?'y':'n';
    var data={
        token:localStorage.getItem('token'),
        numeRestaurant:striptags(numeRestaurant.value.replace(/(<([^>]+)>)/ig,"")),
        availability: striptags(disponibilitate.value.replace(/(<([^>]+)>)/ig,""))
    }
    console.log(data);

    const response = await fetch('http://localhost:8000/api/manager/restaurantAvailability', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r=>r.json());


    if(response.raspuns==="not good") {
        notGood("raspunsRestaurant")
        setTimeout(() => {
            const error = document.getElementById("raspunsRestaurant");
            const errorP = document.getElementById("error");
            error.removeChild(errorP);
        }, 1000);
    }
}
async function valabilitateProdus()
{
    var numeProdus= document.getElementById('numeProdus2');
    var disponibilitate=document.getElementById('dispProdus');

    // var availability=disponibilitate. ?'y':'n';
    var data={
        token:localStorage.getItem('token'),
        numeProdus:striptags(numeProdus.value.replace(/(<([^>]+)>)/ig,"")),
        availability: striptags(disponibilitate.value.replace(/(<([^>]+)>)/ig,""))
    }
    console.log(data);

    const response = await fetch('http://localhost:8000/api/manager/itemAvailability', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r=>r.json());


    if(response.raspuns==="not good") {
        notGood("raspunsRestaurant")
        setTimeout(() => {
            const error = document.getElementById("raspunsRestaurant");
            const errorP = document.getElementById("error");
            error.removeChild(errorP);
        }, 1000);
    }
}
async function trimiteProdus()
{
    var numeRestaurant= document.getElementById('numeRestaurant2');
    var jsonItem;
    var nume=document.getElementById('numeProdus')
    var descriere=document.getElementById('descriereProdus')
    var pret=document.getElementById('pretProdus')
    jsonItem={
        name:striptags(nume.value.replace(/(<([^>]+)>)/ig,"")),
        description:striptags(descriere.value.replace(/(<([^>]+)>)/ig,"")),
        price:striptags(pret.value.replace(/(<([^>]+)>)/ig,"")),
    }
    let meniu=jsonItem;

    var data={
        token:localStorage.getItem('token'),
        numeRestaurant:striptags(numeRestaurant.value.replace(/(<([^>]+)>)/ig,"")),
        jsonItem:meniu
    }
    console.log(data);

    const response = await fetch('http://localhost:8000/api/manager/insertProdus', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r => r.json()).then(f=>
    {
        if (f.raspuns==="not good")
        {
            console.log(f.raspuns);
            notGood("raspunsProdus")
            setTimeout(() => {
                const error = document.getElementById("raspunsProdus");
                const errorP = document.getElementById("error");
                error.removeChild(errorP);
            }, 1000);
        }
    })
}
function notGood(where){
    var x=document.getElementById(where);
    x.innerHTML+=`<p id="error">Inregistrat!</p>`;
}
async function trimiteRestaurant()
{
    var numeRestaurant= document.getElementById('numeRestaurant');
    var linkPoza=document.getElementById('linkPoza');
    var jsonMenu=document.getElementById('jsonMenu');
    let meniu;
    try {
        meniu=JSON.parse(jsonMenu.value);

    }catch (e){
        console.log("json incorect");
    }
    var data={
        token:localStorage.getItem('token'),
        numeRestaurant:numeRestaurant.value,
        linkPoza:linkPoza.value,
        jsonMenu:meniu
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
        numeRestaurant:numeRestaurant.value,
        availability: disponibilitate.value
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
        numeProdus:numeProdus.value,
        availability: disponibilitate.value
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
        name:nume.value,
        description:descriere.value,
        price:pret.value,
    }
    let meniu=jsonItem;

    var data={
        token:localStorage.getItem('token'),
        numeRestaurant:numeRestaurant.value,
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
    x.innerHTML+=`<p id="error">Format incorect pentru Json sau exista deja!</p>`;
}
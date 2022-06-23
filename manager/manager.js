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
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        // headers: {
        //     'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(r=>r.json());


    if(response.raspuns=="not good") {
        console.log("you fucked up");
        notGood("raspunsRestaurant")
    }
}

async function trimiteProdus()
{
    var numeRestaurant= document.getElementById('numeRestaurant2');
    var jsonItem=document.getElementById('jsonItem');
    let meniu=jsonItem.value;
    try {
        meniu=JSON.parse(jsonItem.value);

    }catch (e){
        console.log("json incorect");
    }
    var data={
        token:localStorage.getItem('token'),
        numeRestaurant:numeRestaurant.value,
        jsonItem:meniu
    }
    console.log(data);

    const response = await fetch('http://localhost:8000/api/manager/insertProdus', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        // headers: {
        //     'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(r => r.json()).then(f=>
    {
        if (f.raspuns=="not good")
        {console.log("you fucked up again");
            notGood("raspunsProdus")
        }

    })

}
function notGood(where){
    var x=document.getElementById(where);
    x.innerHTML+=`<p>Format incorect ptr json sau exista deja</p>`;

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
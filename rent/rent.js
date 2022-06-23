function adForm() {
    if (document.getElementById("main-div")) {
        console.log("hello")
    }
    document.getElementById("main-div").style.display = 'none';

    document.getElementById("adDiv").style.display = 'flex';

}

function showAds() {
    if (document.getElementById("adDiv")) {
        document.getElementById("adDiv").style.display = 'none';
        document.getElementById("main-div").style.display = 'flex';
    }
}
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

async function sendDates()
{
var from=document.getElementById("from");
var to=document.getElementById("to");
let data= {
    from:from.value,
    to:to.value,
    token:localStorage.getItem('token')
}
    let sent = true;
    const response = await fetch('http://localhost:8000/api/rent', {
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
}



async function postNews()
{
    var type=document.getElementById("type");
    var description=document.getElementById("description");
    var location=document.getElementById("location");
    var price=document.getElementById("price");


    let data= {
       type:type.value,
        description:description.value,
        location:location.value,
        price:price.value,
        token:localStorage.getItem('token')
    }
    console.log(data);
    let sent = true;

    const response = await fetch('http://localhost:8000/api/rent', {
        method: 'POST',
        // mode:'no-cors',
        body: JSON.stringify(data)
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
            //wrongPassword()
            sent = false
        });
    if(response.raspuns=="already")
        showAlready();

    console.log(response);



}
let showing=false;
function showAlready(){
    var x=document.getElementById('ad-form');
   if (!showing) x.innerHTML+=`<label style="position: center; color:darkred">Acest anunt a fost deja plasat</label>`;
    showing=true;
}
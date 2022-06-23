function adForm() {
    if (document.getElementById("main-div")) {
        document.getElementById("main-div").style.display = 'none';
        document.getElementById("adDiv").style.display = 'flex';
    }
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

function sendDates()
{
var from=document.getElementById("from");
var to=document.getElementById("to");
let data= {
    from:from.value,
    to:to.value,
    token:localStorage.getItem('token')
}

}
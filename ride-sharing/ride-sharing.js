let username="";

async function getUsername()
{
    const data = {
        token:localStorage.getItem('token')
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
            sent=false
        });
    // const resultData = awa1it response.json();
    console.log(response);
    if(sent) {
        console.log(response.email);
        username=response.email;
        changeUsername();
        //  window.location.href='http://127.0.0.1:8000/startUser/startUser.html';
    }
    // username= JSON.stringify(response.body);
}
async function changeUsername()
{
    var x=document.getElementById("username");

    x.innerHTML=
        `
        ${username}
        `

}

async function comanda()
{
    var from= document.getElementById('from');
    var to=document.getElementById('to');
    const data = {
        from: from.value,
        to: to.value,
        service: "ride",
        token: localStorage.getItem('token')
    }
    let primit = true;

    const response = await fetch('http://localhost:8000/api/ride-sharing', {
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
            primit = false;
        });

    // const resultData = awa1it response.json();
    if(primit) {
        window.location.href='http://127.0.0.1:8000/startUser/startUser.html';
    }
    console.log(response);


}
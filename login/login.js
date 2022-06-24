
// const striptags = require(["striptags"], function (striptags){});
document.addEventListener('DOMContentLoaded', (event) => {


   // log.textContent = log.textContent + `DOMContentLoaded\n`;
});
function wrongPassword(){
    var wrong=document.getElementById('wrong');
    wrong.innerHTML=`<p style="color:darkred; text-align: center" >Ai introdus o parola gresita <br>sau<br> contul este deja conectat</p>`;
}
async function login()
{
    var email= document.getElementById('email');
    var pw=document.getElementById('password');
    // console.log(stremail.value + " "+ pw.value);
    const data = {
        email: email.value.replace(/(<([^>]+)>)/ig,""),
        password: pw.value.replace(/(<([^>]+)>)/ig,"")
    }
    let loggedIn = true;

    const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        // headers: {
        //     'Content-Type': 'application/json'
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(r => r.json())
        .catch(e => {
        //    console.log('error');
        //    console.log(e);
            loggedIn = false;
wrongPassword();
        });
    // const resultData = awa1it response.json();
    if(loggedIn) {
        localStorage.setItem('token', response.token);
        window.location.href='http://127.0.0.1:8000/startUser/startUser.html';
    }
    // console.log(response)

}
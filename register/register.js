document.addEventListener('DOMContentLoaded', (event) => {


    // log.textContent = log.textContent + `DOMContentLoaded\n`;
});

async function register()
{
    var email= document.getElementById('email');
    var pw=document.getElementById('password');
    var prenume=document.getElementById('prenume');
    var nume=document.getElementById('nume');
    var telefon=document.getElementById('tel');
    var judet=document.getElementById('judet');
    var oras=document.getElementById('oras');
    var adresa=document.getElementById('adresa');
    console.log(email.value + " "+ pw.value);
    let returnat=true;
    const data = {
        email: email.value,
        prenume: prenume.value,
        nume: nume.value,
        telefon:  telefon.value,
        judet: judet.value,
        oras: oras.value,
        adresa: adresa.value,
        password: pw.value
    }

    const response = await fetch('http://localhost:8000/api/register', {
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
            returnat=false;
        });
    if (returnat)
        window.location.href="http://127.0.0.1:8000/mainHome/mainHome.html"
    // const resultData = await response.json();
        console.log(response)

}
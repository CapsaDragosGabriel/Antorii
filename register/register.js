document.addEventListener('DOMContentLoaded', (event) => {


    // log.textContent = log.textContent + `DOMContentLoaded\n`;
});
var existing=0;
function alreadyRegistered(){
    var wrong=document.getElementById('already');
    wrong.innerHTML=`<p style="color:darkred; text-align: center" >Acest email este deja folosit.</p>`;
}
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
    // console.log(striptags(email.value) + " "+ striptags(pw.value));
    let returnat=true;
    const data = {
        email: (email.value.replace(/(<([^>]+)>)/ig,"")),
        prenume:(prenume.value.replace(/(<([^>]+)>)/ig,"")),
        nume: (nume.value.replace(/(<([^>]+)>)/ig,"")),
        telefon:  (telefon.value.replace(/(<([^>]+)>)/ig,"")),
        judet: (judet.value.replace(/(<([^>]+)>)/ig,"")),
        oras: (oras.value.replace(/(<([^>]+)>)/ig,"")),
        adresa: (adresa.value.replace(/(<([^>]+)>)/ig,"")),
        password: (pw.value.replace(/(<([^>]+)>)/ig,""))
    }

    const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        // headers: {
        //     'Content-Type': 'application/json'
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(r => { r.json()}
    )
        .catch(e => {
          //  console.log('error');
           // console.log(e);
            returnat=false;
            alreadyRegistered();
        });
    if (returnat)
        window.location.href="http://127.0.0.1:8000/mainHome/mainHome.html"
    else{
        //exista deja
    }
    // const resultData = await response.json();
        //console.log(response)

}
/*async function registerTeam()
{
    var email= document.getElementById('email');
    var pw=document.getElementById('password');
    var prenume=document.getElementById('prenume');
    var nume=document.getElementById('nume');
    var telefon=document.getElementById('tel');
    var oras=document.getElementById('oras');
    var service=document.getElementById('services');
  //  console.log(email.value + " "+ pw.value);
    let returnat=true;
    const data = {
        email: email.value,
        prenume: prenume.value,
        nume: nume.value,
        telefon:  telefon.value,
        oras: oras.value,
        service: service.value,
        password: pw.value
    }
    console.log(JSON.stringify(data));
    const response = await fetch('http://localhost:8000/api/team', {
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

    if (returnat){
        window.location.href="http://127.0.0.1:8000/mainHome/mainHome.html"

    }
   //     window.location.href="http://127.0.0.1:8000/mainHome/mainHome.html"
    // const resultData = await response.json();
   // console.log(response)

}*/
function alreadyRegistered(){
    var wrong=document.getElementById('already');
    wrong.innerHTML=`<p style="color:darkred; text-align: center" >Acest email este deja folosit.</p>`;
}
async function registerTeam()
{
    var email= document.getElementById('email');
    var pw=document.getElementById('password');
    var prenume=document.getElementById('prenume');
    var nume=document.getElementById('nume');
    var telefon=document.getElementById('tel');
    var oras=document.getElementById('oras');
    var service=document.getElementById('services');
    // console.log(email.value + " "+ pw.value);

    let returnat=true;
    const data = {
        email: email.value,
        prenume: prenume.value,
        nume: nume.value,
        telefon:  telefon.value,
        oras: oras.value,
        service: service.value,
        password: pw.value
    }
    console.log(JSON.stringify(data))

    const response = await fetch('http://localhost:8000/api/team', {
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
           // console.log('error');
           // console.log(e);
            returnat=false;
            alreadyRegistered()

        });
   // alreadyRegistered()
    if (returnat)
        window.location.href="http://127.0.0.1:8000/mainHome/mainHome.html"
    else{
        //exista deja
    }
    // const resultData = await response.json();
    console.log(response)

}
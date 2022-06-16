function loggedHeader(isLogged) {
    let headerDiv = document.getElementById("navbar");
    if(isLogged===true) {
        let a1 = document.createElement("a");
        a1.setAttribute("href","../login/login.html");
        a1.setAttribute("class","link");
        a1.innerText="Deconectare";
        headerDiv.appendChild(a1);
    }
    else {
        let a1 = document.createElement("a");
        a1.setAttribute("href","../login/login.html");
        a1.setAttribute("class","link");
        a1.innerText="Autentificare";
        let a2 = document.createElement("a");
        a2.setAttribute("href","../register/register.html");
        a2.setAttribute("class","link");
        a2.innerText="Inregistrare";
        headerDiv.appendChild(a1);
        headerDiv.appendChild(a2);
    }
}
//loggedHeader(true);
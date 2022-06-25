function adForm() {
    if (document.getElementById("main-div")) {
        console.log("hello")
        document.getElementById("main-div").style.display = 'none';
        document.getElementById("adDiv").style.display = 'flex';
    }
    if(document.getElementById("rentADS")) {
        document.getElementById("rentADS").style.display = 'none';

        if(document.getElementById("rentAdRowId"))
        document.getElementById("rentAdRowId").remove();
    }
}

function adFormMobil() {
    document.getElementById("myNav").style.height = "0%"
    if (document.getElementById("main-div")) {
        console.log("hello")
    }
    document.getElementById("main-div").style.display = 'none';

    document.getElementById("adDiv").style.display = 'flex';
    if(document.getElementById("rentADS")) {
        document.getElementById("rentADS").style.display = 'none';
        if(document.getElementById("rentAdRowId"))
        document.getElementById("rentAdRowId").remove();
    }
}

function showAds() {
    if (document.getElementById("adDiv")) {
        document.getElementById("adDiv").style.display = 'none';
        document.getElementById("main-div").style.display = 'flex';
    }
    if(document.getElementById("rentADS")) {
        document.getElementById("rentADS").style.display = 'none';
        if(document.getElementById("rentAdRowId"))
        document.getElementById("rentAdRowId").remove();
    }
}

function showAdsMobil() {
    document.getElementById("myNav").style.height = "0%"
    if (document.getElementById("adDiv")) {
        document.getElementById("adDiv").style.display = 'none';
        document.getElementById("main-div").style.display = 'flex';
    }
    if(document.getElementById("rentADS")) {
        document.getElementById("rentADS").style.display = 'none';
        if(document.getElementById("rentAdRowId"))
        document.getElementById("rentAdRowId").remove();
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
            sent = false
        });
    console.log(response);
    if (sent) {
        console.log(response.email);
        username = response.email;
        changeUsername();
    }
}

let globalFrom;
let globalTO

async function sendDates() {
    var from = document.getElementById("from");
    var to = document.getElementById("to")
    var type = document.getElementById("typeWanted");
    globalFrom = from.value.replace(/(<([^>]+)>)/ig,"");
    globalTO = to.value.replace(/(<([^>]+)>)/ig,"");
    let data = {
        from: from.value.replace(/(<([^>]+)>)/ig,""),
        to: to.value.replace(/(<([^>]+)>)/ig,""),
        type: type.value.replace(/(<([^>]+)>)/ig,""),
        token: localStorage.getItem('token')
    }
    let sent = true;
    const response = await fetch('http://localhost:8000/api/getRent', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
            //wrongPassword()
            sent = false
        });
    if (response)
        showRents(response)
}

function showRents(response) {
    document.getElementById("main-div").style.display = 'none';
    document.getElementById("rentADS").style.display = 'flex';


    var rentAdRowAux

    var counter = 1;
    for (var itemm of response) {
        if (counter % 3 === 1) {
            var rentAdRow = document.createElement('div');
            rentAdRow.setAttribute("class", "rentAdRow");
            rentAdRow.setAttribute("id","rentAdRowId");
            rentAdRowAux = rentAdRow;
        }
        counter++;
        var div = document.createElement('div');
        div.className = "rentBox";

        div.innerHTML = `
        <h1>Se inchiriaza ${itemm.type}</h1>
        <p class="price">${itemm.price_per_day} RON/zi</p>
        <p>${itemm.description}</p>
        <p>${itemm.location}</p>
        <p>
            <button onclick="rentItem(${itemm.id})" >Inchiriaza</button>
        </p>
        `
        rentAdRowAux.appendChild(div);
        var x = document.getElementById('rentADS');
        x.appendChild(rentAdRowAux);
    }
}

async function rentItem(productID) {

    let sent = true;
    let data = {
        token: localStorage.getItem('token'),
        from: globalFrom,
        to: globalTO,
        id: productID
    }
    console.log(data);
    const response = await fetch('http://localhost:8000/api/doRent', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
            //wrongPassword()
            sent = false
        });
    if (sent == true) {
        console.log(response);
    }
}

async function postNews() {
    var type = document.getElementById("type");
    var description = document.getElementById("description");
    var location = document.getElementById("location");
    var price = document.getElementById("price");


    let data = {
        type: type.value.replace(/(<([^>]+)>)/ig,""),
        description: description.value.replace(/(<([^>]+)>)/ig,""),
        location: location.value.replace(/(<([^>]+)>)/ig,""),
        price: price.value.replace(/(<([^>]+)>)/ig,""),
        token: localStorage.getItem('token')
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
    if (response.raspuns == "already")
        showAlready();

    console.log(response);


}

let showing = false;

function showAlready() {
    var x = document.getElementById('ad-form');
    if (!showing) x.innerHTML += `<label id="butonAdPost" class="adPost">Anuntul a fost publicat!</label>`;
    showing = true;

    setTimeout(() => {
        const postBox = document.getElementById("ad-form");
        const post = document.getElementById("butonAdPost");
        postBox.removeChild(post);
    }, 1000);
}
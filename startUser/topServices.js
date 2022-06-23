const globalRestaurants = ["Veggie", "Mamma Mia", "Spartan", "Chinese", "Friday"];
const globalRestaurantsFirsts = ["McDonalds", "KFC", "Mesopotamia", "Burger King", "Subway", "SaladBox"];

async function getTop() { //i guess ca asta trebuie?
    const data = {
        token: localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/getTopRestaurant', { //TO DO
        method: 'POST',
        body: JSON.stringify(data)
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
            sent = false
        });
    if (sent === true) {
        //globalRestaurants = response;
        console.log("RASPUNSUL A FOST" + response)
    }
}

var counter = 0;

function showSlidesPrev() {
    if (counter <= 4) {
        const top1 = document.getElementById("top1");
        const top2 = document.getElementById("top2");
        const top3 = document.getElementById("top3");
        const top4 = document.getElementById("top4");
        const top5 = document.getElementById("top5");
        const top6 = document.getElementById("top6");

        top1.innerText = top2.textContent;
        top2.innerText = top3.textContent;
        top3.innerText = top4.textContent;
        top4.innerText = top5.textContent;
        top5.innerText = top6.textContent;
        top6.innerText = globalRestaurants[counter];
        counter++;
    }
}

function showSlidesNext() {
    if (counter > 0) {
        const top1 = document.getElementById("top1");
        const top2 = document.getElementById("top2");
        const top3 = document.getElementById("top3");
        const top4 = document.getElementById("top4");
        const top5 = document.getElementById("top5");
        const top6 = document.getElementById("top6");

        top6.innerText = top5.innerText
        top5.innerText = top4.textContent;
        top4.innerText = top3.textContent;
        top3.innerText = top2.textContent;
        top2.innerText = top1.textContent;
        top1.innerText = globalRestaurantsFirsts[counter-1];
        counter--;
    }
}
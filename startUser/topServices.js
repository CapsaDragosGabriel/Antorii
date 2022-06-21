let globalRestaurants;

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
        globalRestaurants = response;
        console.log("RASPUNSUL A FOST" + response)
    }
}

async function setTopRestaurants() {
    const top1 = document.getElementById("top1");
    const top2 = document.getElementById("top2");
    const top3 = document.getElementById("top3");
    const top4 = document.getElementById("top4");
    const top5 = document.getElementById("top5");

    top1.innerText = globalRestaurants[0];
    top2.innerText = globalRestaurants[1];
    top3.innerText = globalRestaurants[2];
    top4.innerText = globalRestaurants[3];
    top5.innerText = globalRestaurants[4];
}

let indexRestaurant = 4;

function showSlidesPrev(index) {
    if (indexRestaurant + index <= 8) {
        indexRestaurant += index;
        const top1 = document.getElementById("top1");
        const top2 = document.getElementById("top2");
        const top3 = document.getElementById("top3");
        const top4 = document.getElementById("top4");
        const top5 = document.getElementById("top5");

        top1.innerText = top2.textContent;
        top2.innerText = top3.textContent;
        top3.innerText = top4.textContent;
        top4.innerText = top5.textContent;
        top5.innerText = globalRestaurants[indexRestaurant];
    }
}
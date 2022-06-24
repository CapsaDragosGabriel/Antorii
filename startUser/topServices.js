let globalRestaurants = ["Veggie", "Mamma Mia", "Spartan", "Chinese", "Friday"];
const globalRestaurantsFirsts = ["McDonalds", "KFC", "Mesopotamia", "Burger King", "Subway", "SaladBox"];
getTop().then(r=>{
    globalRestaurants=r;
}).then()
/*function showTop()
{var x=document.getElementById('caption-container');
   x.innerHTML= `<a className="prev" onClick="showSlidesNext()">❮</a>`
x.innerHTML+=`<div className="row">`
    for(var x of globalRestaurants)
    {
        var restaurant=document.createElement('div')
        restaurant.setAttribute('className','column')
        restaurant.innerHTML+=
    }

        <div className="columnStart">
            <p id="top1" style="width:100%">McDonalds</p>
        </div>
        <div className="column">
            <p id="top2" style="width:100%">KFC</p>
        </div>
        <div className="column">
            <p id="top3" style="width:100%">Mesopotamia</p>
        </div>
        <div className="column">
            <p id="top4" style="width:100%">Burger King</p>
        </div>
        <div className="column">
            <p id="top5" style="width:100%">Subway</p>
        </div>
        <div className="columnEnd">
            <p id="top6" style="width:100%">SaladBox</p>
        </div>
    x.innerHTML+=</div>

    x.innerHTML+=`<a className="next" onClick="showSlidesPrev()">❯</a>`

}*/
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
       return response
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
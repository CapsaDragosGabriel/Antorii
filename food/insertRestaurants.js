//document.getElementById("restaurantOptions").innerHTML=`<option value="McDonalds"> McDonalds</option>`;
//document.body.innerHTML="EYO";
//import restaurantsList from './restaurants.json' assert {type: "application/json"};
let display = "";

async function getRestaurants() {
    const response = await fetch('http://localhost:8000/api/restaurants', {
        method: 'POST',
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
        });
    let jsondata = response;
    var x = document.getElementById("box");
    for (let i = 0; i < jsondata.length; i++) {
        let obj = jsondata[i];
        x.innerHTML = x.innerHTML + `` +
            `<a onclick="display='${obj.name}'; console.log(${display}); changeDisplay()">${obj.name}<br>
<img src=${obj.photo}> </a>
<div class="reviewDiv">
<a id="review" onclick="display='review${obj.name}'; 
                        console.log(display); 
                        changeDisplay()">⭐ Reviews ${obj.name}
</a>
 </div>
 <br>`
    }
}

/*function getRestaurants() {
    fetch("./restaurants.json")
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            var x = document.getElementById("box");

            for (let i = 0; i < jsondata.length; i++) {
                let obj = jsondata[i];
               // let nume=obj.name;
                x.innerHTML = x.innerHTML + `` +
                    `<a onclick="display='${obj.name}'; console.log(${display}); changeDisplay()">${obj.name}<br>
<img src=${obj.photo}> </a><br>`
            }
            // console.log(jsondata)
        });
}*/
getRestaurants();


//document.getElementById("restaurantOptions").innerHTML=`<option value="McDonalds"> McDonalds</option>`;
//document.body.innerHTML="EYO";
//import restaurantsList from './restaurants.json' assert {type: "application/json"};
let display="";
 async function getRestaurants(){
     // console.log("ce dracu bre")

     const response = await fetch('http://localhost:8000/api/restaurants', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        //mode: 'no-cors', // no-cors, *cors, same-origin
        //headers: {
            //'Content-Type': 'application/json'
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        //},
        //body: JSON.stringify(data)// body data type must match "Content-Type" header
    }).then(r => r.json())
         .catch(e => {
             console.log('error');
             console.log(e);
         });
       //console.log("\n\n\n\n"+response);
        //console.log("AM PRIMIT DE LA SERVER:"+response);
           // return response.json();
        //console.log(JSON.stringify(response));
            let jsondata = response;
            var x = document.getElementById("box");
            for (let i = 0; i < jsondata.length; i++) {
                let obj = jsondata[i];
                // let nume=obj.name;
                x.innerHTML = x.innerHTML + `` +
                    `<a onclick="display='${obj.name}'; console.log(${display}); changeDisplay()">${obj.name}<br>
<img src=${obj.photo}> </a><br>`
            }
            // console.log(jsondata)

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


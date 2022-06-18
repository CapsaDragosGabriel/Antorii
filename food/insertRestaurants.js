//document.getElementById("restaurantOptions").innerHTML=`<option value="McDonalds"> McDonalds</option>`;
//document.body.innerHTML="EYO";
//import restaurantsList from './restaurants.json' assert {type: "application/json"};
let display="";
 async function getRestaurants(){
     // console.log("ce dracu bre")

     const response = await fetch('http://localhost:8000/api/restaurants', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        headers: {
            'Content-Type': 'application/json'
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // body: // body data type must match "Content-Type" header
    })
       //console.log("\n\n\n\n"+response);
        console.log("AM PRIMIT DE LA SERVER:"+response);
           // return response.json();
        console.log(JSON.stringify(response));
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
/* var anchor=document.createElement("a");
 var text=document.createTextNode(obj.name);
 var img=document.createElement("img");
 img.setAttribute("src",obj.photo);
 //img.setAttribute("href",obj.link);
// anchor.setAttribute("href",obj.link);
 anchor.setAttribute("onclick","{display =1;console.log(`${display}`);}");
// anchor.addEventListener("click",changeDisplay,true);
// console.log(`${display}`);
 anchor.appendChild(text);
 x.appendChild(document.createElement("br"));
 var anchor2=document.createElement("a");
 anchor2.setAttribute("href",obj.link);
 x.appendChild(anchor);
 x.appendChild(document.createElement("br"));
 anchor2.appendChild(img);
 x.appendChild(anchor2);
 console.log(obj.name);*/

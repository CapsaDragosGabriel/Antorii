//document.getElementById("restaurantOptions").innerHTML=`<option value="McDonalds"> McDonalds</option>`;
//document.body.innerHTML="EYO";
//import restaurantsList from './restaurants.json' assert {type: "application/json"};
fetch("./restaurants.json")
    .then(response => {
            return response.json();
    })
    .then(jsondata => {
        var x=document.getElementById("box");

        for (let i=0;i<jsondata.length;i++)
        {
            let obj=jsondata[i];
            var anchor=document.createElement("a");
            var text=document.createTextNode(obj.name);
            var img=document.createElement("img");
            img.setAttribute("src",obj.photo);
            img.setAttribute("width","300px");
            img.setAttribute("height","120px");
            img.setAttribute("href",obj.link);
            anchor.setAttribute("href",obj.link);
            anchor.appendChild(text);
            x.appendChild(document.createElement("br"));
            var anchor2=document.createElement("a");
            anchor2.setAttribute("href",obj.link);
            x.appendChild(anchor);
            x.appendChild(document.createElement("br"));
            anchor2.appendChild(img);
            x.appendChild(anchor2);
            console.log(obj.name);
        }
       // console.log(jsondata)
    });
/*
// const restaurantsList=require('./restaurants.json');
var x= document.getElementById("restaurant");
var option= document.createElement("option")

option.text="Trufandale";
//x.add(option);*/

//m-am prins cat de cat cum se introduc elemente noi(DOM), acum e nevoie de baza de date cu care sa lucram
// for (let i=0;i<restaurantsList.length;i++)
// {
//         let obj=restaurantsList[i];
//         console.log(obj.name);
// }
/*
for (const rest of Object.keys(restaurantsList)) {
        for (const nume of Object.keys(rest)) {
                var optionN = document.createElement("option");
                optionN.text = `${restaurantsList[rest[nume]]}`;
                x.add(optionN);
        }
}*/
//document.getElementById("restaurantOptions").innerHTML=`<option value="McDonalds"> McDonalds</option>`;
//document.body.innerHTML="EYO";
import restaurantsList from './restaurants.json' assert {type: "json"};

var x= document.getElementById("restaurant");
var option= document.createElement("option")

option.text="Trufandale";
x.add(option);

//m-am prins cat de cat cum se introduc elemente noi(DOM), acum e nevoie de baza de date cu care sa lucram
for (const rest of Object.keys(restaurantsList)) {
        for (const nume of Object.keys(rest)) {
                var optionN = document.createElement("option");
                optionN.text = `${restaurantsList[rest[nume]]}`;
                x.add(optionN);
        }
}

var changeDisplay=function()
{

    if (display=='McDonalds'){
        var x=document.getElementById("box");
        x.innerHTML=`
        <a href="food.html">Inainte era mai bine</a>



`;

        //window.location.reload();
    }
    getMenu();
}
function adjustQTplus(name)
{
    console.log("help me pls i m dying inside"+`${name}`);
    let i=`${name}`;
    console.log(i);
    let id=items[i];
    console.log(id);
    var x= document.getElementById(`${id}`);

    quantities[name]=quantities[name]+1;
        x.innerHTML=`<p id='id'>${quantities[name]}</p> `
}
function adjustQTminus(name)
{
    console.log("help me pls i m dying inside"+`${name}`);
    let i=`${name}`;
    console.log(i);
    let id=items[i];
    console.log(id);
    var x= document.getElementById(`${id}`);
if (quantities[name]>=1)
    quantities[name]=quantities[name]-1;
    x.innerHTML=`<p id='id'>${quantities[name]}</p> `
}
let quantities=[];
let items=[];
function getMenu()
{
    fetch(`./${display}.json`)
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            var x = document.getElementById("box");
            x.setAttribute("style","text-align:left; padding: 3.5%;" +
                "flex-direction:row;")
            for (let i = 0; i < jsondata.length; i++) {
                let obj = jsondata[i];
                quantities[i]=0;
                //quantities[${i}]=quantities[${i}]+1;
                // let nume=obj.name;
                items[i]=obj.name;
                x.innerHTML = x.innerHTML + `` +
                    `<h1>${obj.name}</h1>
<p>${obj.description}</p>
<button onclick=' adjustQTplus(${i}) 
console.log(quantities[${i}]); ' >+</button>
<p id='${obj.name}'>${quantities[i]}</p>
<button onclick=' adjustQTminus(${i}) 
console.log(quantities[${i}]); ' >-</button>`;
}
        })
}
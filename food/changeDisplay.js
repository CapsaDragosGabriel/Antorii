function createPriceDiv()
{
    var x=document.getElementById("box");
    x.innerHTML=x.innerHTML+`<div id="totalPrice"></div>
<button onclick="display='comanda'; changeDisplay(); console.log(display) " >Plaseaza comanda</button>`;
}
function resetOrder()
{
    for (let i =0 ;i<prices.length;i++)
    {
        quantities[i]=0;
    }
}
var changeDisplay=function()
{

    if (display=='McDonalds'){
        var x=document.getElementById("box");
        x.innerHTML=`
        <a href="food.html">Inainte era mai bine</a>`;
    }
    else if (display=='comanda'){
        var x=document.getElementById("box");
        x.innerHTML=`
        <a   href="food.html" >Anuleaza comanda</a>
        <div id="adresaLivrare" ></div>
        <div id="comanda" ></div>
                <div id="totalPrice" ></div>`;
        totalCost();
    }
    if(display!='comanda')
    getMenu();
    else rezumatComanda();




}
function rezumatComanda(){
    var x=document.getElementById("comanda");
    for (i=0;i<=prices.length;i++)
    {
        if(quantities[i]>0)
        {
            let qt=quantities[i];
            let itm=items[i];

        x.innerHTML=x.innerHTML+ `<p>${itm} x ${qt} </p> 
    `}
    }

}
function totalCost()
{
    let sum=0;
    for (let i =0; i<=prices[i];i++)
    {
        sum+=prices[i]*quantities[i];
    }
    var x=document.getElementById("totalPrice");
    x.innerHTML=`<p style="font-weight: bold" >Costul total al comenzii este: ${sum} lei </p>`;
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
    x.innerHTML=`<p style="text-align:right; display: inline-block;" id='id'>${quantities[name]}</p> `
}
let quantities=[];
let items=[];
let prices=[];
function getMenu()
{
    fetch(`./${display}.json`)
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            var x = document.getElementById("box");
            x.setAttribute("style","text-align:left; padding: 3.5%;" )
            for (let i = 0; i < jsondata.length; i++) {
                let obj = jsondata[i];
                quantities[i]=0;
                //quantities[${i}]=quantities[${i}]+1;
                // let nume=obj.name;
                items[i]=obj.name;
                prices[i]=obj.price;
                x.innerHTML = x.innerHTML + `` +
                    `<h1>${obj.name}</h1>
<p>${obj.description}</p>
<p style="display: inline-block; font-weight: bold">Pret/buc:${obj.price} lei</p>
<div style="flex-direction: row;text-align: right">
<button style="text-align:right;" onclick=' adjustQTplus(${i}) ;totalCost();
console.log(quantities[${i}]); ' >+</button>
<p style="text-align:right; display: inline-block;" id='${obj.name}'>${quantities[i]}</p>
<button style="text-align:right;"  onclick='adjustQTminus(${i}) ; totalCost(); 
console.log(quantities[${i}]); ' >-</button></div>`;

}
            createPriceDiv();
        })
}
import fetch from "node-fetch";
async function loadNames() {


    const response = await fetch('https://raw.githubusercontent.com/virgil-av/judet-oras-localitati-romania/master/judete.json');
    const judete = await response.json();
    return judete;
    // logs [{ name: 'Joker'}, { name: 'Batman' }]
}


module.exports={
    loadNames
}

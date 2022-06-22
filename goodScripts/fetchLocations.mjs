export function getJudete() {
    fetch("https://raw.githubusercontent.com/virgil-av/judet-oras-localitati-romania/master/judete.json")
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            return jsondata;
            // console.log(jsondata)
        });
}
getJudete()
import fetch from "node-fetch";

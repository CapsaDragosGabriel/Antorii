var csvs = require("../database/export_to_csv")
const Papa = require("nodemailer/lib/fetch/cookies");
var xml2js = require('xml2js');
// const RSS=require('RSS')
function asdf() {

    csvs.aggregateExports();
    getFileXML('items');
    getFileXML('orders');
    getFileXML('ordered_items');
    getFileXML('restaurants');
    getFileXML('ride_shares');
    getFileXML('users');
    getFileXML('userRide');
    getFileXML('userRest');
    getFileXML('userData');
    getFileXML('userTotal');
    getFileXML('userCount');
    getFileXML('restaurantsProfit');
    getFileXML('delivery');
    getFileRSS('restaurants');


}

function getFileXML(file) {
    readCSV(file).then
    (r =>translate(r,file) )
}
function getFileRSS(file) {
    readCSV(file).then
    (r =>createRSS(r,file) )
}
function translate(csv,folder){
    {
        csvData = csv
        csvData = csvData.split('\n').map(row => row.trim())

        let headings = csvData[0].split(',')

        let xml = ``
        xml+=`<?xml version="1.0" encoding="UTF-8" ?>\n`
        xml+=`<${folder}>\n`
        for (let i = 1; i < csvData.length; i++) {
            let details = csvData[i].split(',')
            xml += "<stat>\n"
            for (let j = 0; j < headings.length; j++) {
                xml += `<${headings[j]}>${details[j]}</${headings[j]}>
    `;
            }
            xml += "</stat>\n"
        }
        xml+=`</${folder}>`

        // parseXml(xml).then(r => {
        // console.log(xml)
        const ws = fs.createWriteStream(`../xml_files/${folder}.xml`);
        ws.write(xml)




        // })


        console.log(xml);
    }
}

function createRSS(csv,folder){
    csvData = csv
    csvData = csvData.split('\n').map(row => row.trim())

    let headings = csvData[0].split(',')

    let xml = ``
    xml+=`<?xml version="1.0" encoding="UTF-8" ?>\n`
    xml+=`<rss version="2.0">`
    xml+=`<channel>`
    xml+=`<${folder}>\n`
    xml+=`<title>Restaurants</title>\n`
    xml+=` <link>http://127.0.0.1:8000/mainHome/mainHome.html</link>\n`
    xml+=`<description>Restaurante Antorii</description>\n`
    xml+=`<language>en-us</language>\n`
    for (let i = 1; i < csvData.length; i++) {
        let details = csvData[i].split(',')
        xml += "<stat>\n"
        for (let j = 0; j < headings.length; j++) {
            xml += `<${headings[j]}>${details[j]}</${headings[j]}>
    `;
        }
        xml += "</stat>\n"
    }
    xml+=`</${folder}>\n`
    xml+=`</channel>\n`
    xml+=`</rss>\n`

    // parseXml(xml).then(r => {
    // console.log(xml)
    const ws = fs.createWriteStream(`../xml_files/${folder}RSS.xml`);
    ws.write(xml)




    // })


    console.log(xml);

}





const fs = require('fs');
async function readCSV(file) {
    return new Promise((resolve) =>
        fs.readFile(`E:\\AN2\\tw consultatii\\Antorii\\csv_files\\${file}.csv`, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            // console.log(data);
            resolve(data);
        })
    )
}

// items().then(r=>console.log(r))
module.exports = {
    // downloadCsv,
    asdf
}

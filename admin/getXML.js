var csvs = require("../database/export_to_csv")
const Papa = require("nodemailer/lib/fetch/cookies");
var xml2js = require('xml2js');

function asdf() {
    csvs.aggregateExports();
    getFileXML('items');
    getFileXML('orders');
    getFileXML('ordered_items');
    getFileXML('restaurants');
    getFileXML('ride_shares');
    getFileXML('users');
    getFileXML('userData');

}

function getFileXML(file) {
    readCSV(file).then
    (r =>translate(r,file) )
}
function translate(csv,folder){
    {
        csvData = csv
        csvData = csvData.split('\n').map(row => row.trim())

        let headings = csvData[0].split(',')

        let xml = ``

        for (let i = 1; i < csvData.length; i++) {
            let details = csvData[i].split(',')
            xml += "<productData>\n"
            for (let j = 0; j < headings.length; j++) {
                xml += `<${headings[j]}>${details[j]}</${headings[j]}>
    `;
            }
            xml += "</productData>\n"
        }

        // parseXml(xml).then(r => {
        // console.log(xml)
        const ws = fs.createWriteStream(`../xml_files/${folder}.xml`);
        ws.write(xml)




        // })


        console.log(xml);
    }
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

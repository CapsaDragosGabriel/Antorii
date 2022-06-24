const fs = require('fs');
const stats = require('../stats.js')
const PDFDocument = require("pdfkit-table");
const chartGenerator = require('./chartGenerator.js')

let doc = new PDFDocument({margin: 10, size: 'A4'});


async function createTable(table, type) {

    var cs = [];
    if (type === 'user') {
        cs = [60, 60, 130, 60, 60, 100, 60]
    } else if (type === 'restaurant') {
        cs = [60, 60]
    }
    await doc.table(table, {
        columnsSize: cs, prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
            doc.font("Helvetica").fontSize(10);
            indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
        }
    });

}


function generatePDF() {

    chartGenerator.getUsersPerCountyChart().then(() => {
        chartGenerator.getConsumerProviderPieChart().then(() => {
            chartGenerator.getServicesPieChart().then(() => {

                doc.pipe(fs.createWriteStream("./document.pdf"));

                doc.moveDown(0.5)
                doc
                    .font('Times-Roman')
                    .fontSize(35)
                    .text("Statistici", {
                        align: 'center',
                    })


                doc.moveDown(1)


                doc.image('users_per_county.jpg', {
                    align: 'center',
                    valign: 'center'
                })

                doc.addPage()

                doc.moveDown(2)
                doc.image('producer-consumer-piechart.jpg', {
                    align: 'center',
                    valign: 'center'
                })


                stats.getUsersOrderedByRideSpending().then(r => {

                    var arr = [];
                    var i = 0;
                    for (i = 0; i < r.length; i++) {
                        arr.push([r[i].last_name, r[i].first_name, r[i].email, r[i].city, r[i].county, r[i].localization, r[i].total])
                    }

                    const table = {
                        title: 'Top utilizatori consumatori de serviciul de ride-sharing',
                        headers: ['Nume', 'Prenume', 'Email', 'Oras', 'Judet', 'Locatie', 'Suma cheltuita'],
                        rows: arr,
                    };

                    createTable(table, 'user')
                    doc.moveDown(15)

                    stats.getUsersOrderedByRestaurantSpending().then(r => {
                        var arr = [];
                        var i = 0;
                        for (i = 0; i < r.length; i++) {
                            arr.push([r[i].last_name, r[i].first_name, r[i].email, r[i].city, r[i].county, r[i].localization, r[i].total])
                        }

                        const table = {
                            title: 'Top utilizatori consumatori de serviciul de food-delivery',
                            headers: ['Nume', 'Prenume', 'Email', 'Oras', 'Judet', 'Locatie', 'Suma cheltuita'],
                            rows: arr,
                        };

                        createTable(table, 'user')
                        doc.moveDown(5)

                        stats.getRestaurantsOrderByProfit().then(r => {
                            var arr = [];
                            var i = 0;
                            for (i = 0; i < r.length; i++) {
                                arr.push([r[i].name, r[i].total])
                            }

                            const table = {
                                title: 'Top restaurante profitabile',
                                headers: ['Nume', 'Profit'],
                                rows: arr,
                            };

                            createTable(table, 'restaurant')
                            doc.moveDown(5)


                            stats.getDeliveryByNrOfOrders().then(r => {
                                var arr = [];
                                var i = 0;
                                for (i = 0; i < r.length; i++) {
                                    arr.push([r[i].last_name, r[i].first_name, r[i].email, r[i].city, r[i].county, r[i].localization, r[i].nr_of_orders])
                                }

                                const table = {
                                    title: 'Top livratori harnici (dupa numarul de comenzi livrate)',
                                    headers: ['Nume', 'Prenume', 'Email', 'Oras', 'Judet', 'Locatie', 'Comenzi livrate'],
                                    rows: arr,
                                };

                                createTable(table, 'user')
                                doc.moveDown(5)

                                stats.getDriversByNrOfTrips().then(r => {
                                    var arr = [];
                                    var i = 0;
                                    for (i = 0; i < r.length; i++) {
                                        arr.push([r[i].last_name, r[i].first_name, r[i].email, r[i].city, r[i].county, r[i].localization, r[i].trips])
                                    }

                                    const table = {
                                        title: 'Top soferi harnici (dupa numarul de trasee finalizate)',
                                        headers: ['Nume', 'Prenume', 'Email', 'Oras', 'Judet', 'Locatie', 'Trasee finalizate'],
                                        rows: arr,
                                    };

                                    createTable(table, 'user')
                                    doc.moveDown(5)

                                    stats.getDriversByRating().then(r => {
                                        var arr = [];
                                        var i = 0;
                                        for (i = 0; i < r.length; i++) {
                                            arr.push([r[i].last_name, r[i].first_name, r[i].email, r[i].city, r[i].county, r[i].localization, r[i].rating])
                                        }

                                        const table = {
                                            title: 'Top soferi apreciati (dupa ratingul primit)',
                                            headers: ['Nume', 'Prenume', 'Email', 'Oras', 'Judet', 'Locatie', 'Rating'],
                                            rows: arr,
                                        };
                                        // console.log("CARTOFIORI")
                                        console.log(table);
                                        createTable(table, 'user')
                                        doc.moveDown(5)
                                        doc.addPage()
                                        // console.log("CARTOF\n")

                                        doc.image('services.jpg', {
                                            align: 'center',
                                            valign: 'center'
                                        })

                                        doc.end();
                                        // console.log("CARTOF\n")

                                    })
                                })


                            })


                        })

                    })


                })
            })
        })
    })


}

function exportPDF() {
    chartGenerator.getUsersPerCountyChart().then(() => {
        chartGenerator.getServicesPieChart().then(() => {
            chartGenerator.getConsumerProviderPieChart().then(() => {
                setTimeout(generatePDF, 2000)

            })
        })
    })
}
module.exports={
    exportPDF,
        generatePDF
}
// generatePDF()

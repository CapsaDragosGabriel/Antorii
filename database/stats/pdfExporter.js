const fs = require('fs');
const stats = require('../stats.js')

// console.log(stats)

const GoogleChartsNode = require('google-charts-node');


var drawChart;

async function render(width, height, name, drawChart) {

    const image = await GoogleChartsNode.render(drawChart, {
        width: width, //400
        height: height,//250
    });

    fs.writeFileSync(name, image);
}

//
// stats.getConsumerProviderUserProcent().then(r => {
//
//     drawChart = `
//     // Create the data table.
//     var data = new google.visualization.DataTable();
//     data.addColumn('string', 'type');
//     data.addColumn('number', 'procent');
//     data.addRows([
//       ['Consumers', ${r.consumer_procent.slice(0,-1)}],
//       ['Providers', ${r.provider_procent.slice(0,-1)}],
//     ]);
//     // Set chart options
//     var options = { title: 'Procent of consumers and providers' };
//     // Instantiate and draw our chart, passing in some options.
//     var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
//     chart.draw(data, options);
//   `;
//
//
//     render(400,250,'producer-consumer-piechart.png',drawChart)
// })

async function selectConsumersForCounty(county, pairArray) {
    return new Promise((resolve, reject) => {

        for (var i = 0; i < pairArray.length; i++) {
            if (pairArray[i].county.localeCompare(county) == 0) {
                resolve(pairArray[i].number_of_consumers)
            }
        }
        resolve(0)
    })
}

var array = [];
stats.getNumberOfUsersPerCounty().then(r => {

    var numberOfUsersPerCounty = r;
    // console.log(numberOfUsersPerCounty[0].county)


    stats.getNumberOfConsumersPerCounty().then(r => {
        return new Promise((resolve)=>{


        var numberOfConsumersPerCounty = r;
        array.push(['County', 'Nr of consumers', 'Nr of providers'])

        async function todo() {
            return new Promise((resolve) => {
                for (var i = 0; i < numberOfUsersPerCounty.length; i++) {
                    // console.log(i)
                    let x = i;
                    selectConsumersForCounty(numberOfUsersPerCounty[x].county, numberOfConsumersPerCounty).then(r => {
                        // console.log(x)
                        //console.log(numberOfUsersPerCounty[x].county)
                        // console.log("County: " + numberOfUsersPerCounty[x].county+ " Number of users: " + numberOfUsersPerCounty[x].number_of_users+" Number of consumers: " + r
                        // +" Number of providers: " + (numberOfUsersPerCounty[x].number_of_users-r)+"\n");
                        array.push([numberOfUsersPerCounty[x].county, r, numberOfUsersPerCounty[x].number_of_users - r])
                        // console.log(array);
                        if (x == numberOfUsersPerCounty.length - 1) {
                            resolve(array)
                        }
                        ;
                    })
                }
                console.log("reeee" + array);
            })

        }

        todo().then((f) => {
            // console.log(f);
            resolve(f);
        })
        })
    }).then(p=>{
        console.log(p)
        drawChart = `
        var data = google.visualization.arrayToDataTable(${JSON.stringify(p)});

        var options = {
          title: 'Distributia userilor pe judete',
          chartArea: {width: '50%'},
          hAxis: {
            title: 'Toti utilizatorii',
            minValue: 0
          },
          vAxis: {
            title: 'Judet'
          }
        };

        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    `;
        console.log(drawChart)

        render(400, 250, 'test.png', drawChart)
    })



})

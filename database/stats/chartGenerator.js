const stats = require('../stats.js')

// console.log(stats)

const GoogleChartsNode = require('google-charts-node');
const fs = require("fs");


var drawChart;

async function render(width, height, name, drawChart) {

    const image = await GoogleChartsNode.render(drawChart, {
        width: width, //400
        height: height,//250
    });

    fs.writeFileSync(name, image);
}


async function getConsumerProviderPieChart() {
    return new Promise(resolve => {


        stats.getConsumerProviderUserProcent().then(r => {

            drawChart = `
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'type');
    data.addColumn('number', 'procent');
    data.addRows([
      ['Consumatori', ${r.consumer_procent.slice(0, -1)}],
      ['Furnizori', ${r.provider_procent.slice(0, -1)}],
    ]);
    // Set chart options
    var options = { title: 'Procent de consumatori si furnizori' };
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  `;


            render(375, 250, 'producer-consumer-piechart.jpg', drawChart)
        })
        resolve(null)
    })
}


async function getServicesPieChart() {
    return new Promise(resolve => {


        stats.getServicesCount().then(r => {

            drawChart = `
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'type');
    data.addColumn('number', 'count');
    data.addRows([
      ['Livratori', ${r.delivery}],
      ['Soferi', ${r.ride_share}],
      ['Proprietari', ${r.rents}],
    ]);
    // Set chart options
    var options = { title: 'Procent de servicii practicate de furnizori' };
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  `;


            render(375, 250, 'services.jpg', drawChart)
        })
        resolve(null)
    })
}

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

// users/county
async function getUsersPerCountyChart() {
    return new Promise(resolve => {

        stats.maxNumberOfUsersInCounty().then(r => {
            var maxNumberOfUsersInCounty = r;


            var array = [];
            stats.getNumberOfUsersPerCounty().then(r => {

                var numberOfUsersPerCounty = r;
                // console.log(numberOfUsersPerCounty[0].county)


                stats.getNumberOfConsumersPerCounty().then(r => {
                    return new Promise((resolve) => {


                        var numberOfConsumersPerCounty = r;
                        array.push(['County', 'Nr de consumatori', 'Nr de furnizori'])

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
                }).then(p => {
                    console.log(p)
                    drawChart = `
                    var data = google.visualization.arrayToDataTable(${JSON.stringify(p)});
            
                    var options = {
                      title: 'Distributia utilizatorilor pe judete',
                      isStacked: true,
                      chartArea: {width: '55%', height: '90%'},
                      hAxis: {
                        title: 'Toti utilizatorii',
                        maxValue: ${maxNumberOfUsersInCounty},
                        minValue: 0,
                      },
                      vAxis: {
                        title: 'Judet'
                      }
                    };
            
                    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
                    chart.draw(data, options);
                `;
                    // console.log(drawChart)

                    render(600, 700, 'users_per_county.jpg', drawChart)
                })


            })
            resolve(null)
        })
    })
}


getUsersPerCountyChart()
getConsumerProviderPieChart()
getServicesPieChart()

module.exports={
    getUsersPerCountyChart,
    getConsumerProviderPieChart,
    getServicesPieChart,

}

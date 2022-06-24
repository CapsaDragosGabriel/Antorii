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

stats.getConsumerProviderUserProcent().then(r => {

    drawChart = `
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'type');
    data.addColumn('number', 'procent');
    data.addRows([
      ['Consumers', ${r.consumer_procent.slice(0,-1)}],
      ['Providers', ${r.provider_procent.slice(0,-1)}],
    ]);
    // Set chart options
    var options = { title: 'Procent of consumers and providers' };
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  `;


    render(400,250,'producer-consumer-piechart.png',drawChart)
})

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


stats.getNumberOfUsersPerCounty().then(r => {

    var numberOfUsersPerCounty = r;
    // console.log(numberOfUsersPerCounty[0].county)


    stats.getNumberOfConsumersPerCounty().then(r => {
        var numberOfConsumersPerCounty = r;

        // console.log(numberOfUsersPerCounty)
        // console.log(numberOfConsumersPerCounty)

        // var i =0;

        for(var i = 0; i<numberOfUsersPerCounty.length ; i++){
            // console.log(i)

            selectConsumersForCounty(numberOfUsersPerCounty[i].county, numberOfConsumersPerCounty).then(r => {

                console.log(i)
                console.log(numberOfUsersPerCounty)

                console.log("County: " + numberOfUsersPerCounty[i].county + " Number of users: " + numberOfUsersPerCounty[i].number_of_users +
                " Number of consumers: " + r + " Number of providers: " + numberOfUsersPerCounty.number_of_users - r)

            })

        }
    })


    //   drawChart = `
    //     var data = google.visualization.arrayToDataTable([
    //       ['County', 'Nr of consumers', 'Nr of providers'],
    //       ['New York City, NY', 8175000, 8008000],
    //       ['Los Angeles, CA', 3792000, 3694000],
    //       ['Chicago, IL', 2695000, 2896000],
    //       ['Houston, TX', 2099000, 1953000],
    //       ['Philadelphia, PA', 1526000, 1517000]
    //     ]);
    //
    //     var options = {
    //       title: 'Population of Largest U.S. Cities',
    //       chartArea: {width: '50%'},
    //       hAxis: {
    //         title: 'Total Population',
    //         minValue: 0
    //       },
    //       vAxis: {
    //         title: 'City'
    //       }
    //     };
    //
    //     var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    //     chart.draw(data, options);
    // `;
    //
    //
    //   render(400,250,'test.png',drawChart)
})

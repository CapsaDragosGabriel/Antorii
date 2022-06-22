/*const fs = require("fs");

function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if(err) {
            console.log(err)
        }
    })
}
function logout()
{
    localStorage.removeItem('token');
    window.location.href="http://127.0.0.1:8000/mainHome/mainHome.html";
}
function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(error)
        }
    })
}
*/

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
}
async function getServiceReturned()
{
    const data = {
        token:localStorage.getItem('token')
    }
    let sent = true;

    const response = await fetch('http://localhost:8000/api/service', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        // headers: {
        //     'Content-Type': 'application/json'
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(r => r.json())
        .catch(e => {
            console.log('error');
            console.log(e);
            //wrongPassword()
            sent=false
        });
    // const resultData = awa1it response.json();
    console.log(response);
    let service;
    if (sent) {
        // console.log(response.service);
        // username = response.service;
        // service = response.service;
        // console.log(response.service);
        return response.service;
        //globalService=response.service;
       // console.log(globalService);
        //  window.location.href='http://127.0.0.1:8000/startUser/startUser.html';
    }
    // username= JSON.stringify(response.body);
}
module.exports = {
    getRandomInt,
    getRandomFloat,
    getServiceReturned
}
    /*
    logout,
    writeDataToFile,
    getPostData
    */
//}
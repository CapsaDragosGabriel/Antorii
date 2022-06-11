const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
  //  res.end('Hello, World!\n');
    fs.createReadStream('../Antorii/mainHome/mainHome.html').pipe(res);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


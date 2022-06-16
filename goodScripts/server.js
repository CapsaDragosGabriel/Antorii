const http = require('http')
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, getPage} = require('./controllers/productController')
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const server = http.createServer((req, res) => {
   /* const cookies = parseCookies(req.headers.cookie);
    if(req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 1);
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)};Expires=${expires.toGMTString()};HttpOnly; Path=/`,
        });
        res.end();
    } else if (cookies.name) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
        fs.readFile('../mainHome/mainHome.html', (error,data) => {

            res.end(data);
        });
        //res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
        res.end(`Welcome ${cookies.name}`)
    } else {
        fs.readFile('../server4.html', (error,data) => {

            res.end(data);
        });
    }
*/

    if(req.url.startsWith('/api')) {
        getPage(req,res).then();
        console.log('API called');
    } else {
        getPage(req,res).then();
        console.log('page called');
    }

    return;
/*
    console.log(`url here: ${req.url}`)
    if(req.url === '/api/products' && req.method === 'GET') {
        //getProducts(req, res)
        getPage(req,res).then();
    }else
    if(req.url === '/' && req.method === 'GET') {
        //getProducts(req, res)
        getPage(req,res).then();
        console.log("fuck");
    }
    else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getProduct(req, res, id)
    } else if(req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res)
    } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    } else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        deleteProduct(req, res, id)
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }*/
})

const PORT =  process.env.PORT || 8000

server.listen(PORT, () => console.log(`Server running at http://127.0.0.1:${PORT}`))

module.exports = server;
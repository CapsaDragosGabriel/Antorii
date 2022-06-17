process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
var promise = import("../database/userManager.js");
const http = require('http');

const nodemailer= require('nodemailer');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getPage, getLoggedPage
} = require('./controllers/productController')
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

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
    const cookies = parseCookies(req.headers.cookie);
    /*
    if(req.url.startsWith('/login')) {
       /* const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 1);
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)};Expires=${expires.toGMTString()};HttpOnly; Path=/`,
        });
        res.end();
    } else
        */
    console.log('TEST server called')
    if (cookies.name) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        fs.readFile('../mainHome/mainHome.html', (error, data) => {

            res.end(data);
        });
        //res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
        res.end(`Welcome ${cookies.name}`)
    }
    else

    //console.log('TEST server called')
    // const cookies = parseCookies(req.headers.cookie);
    if (req.url.startsWith('/api/login')) {
        console.log('API called');
        //if ( localStorage.getItem('token')!=null)


            let data = '';
            req.on('data', chunk => {
                data += chunk;
                console.log('data chunk added ' + data)
            })
            //aici lucrez cu email-ul si parola primite
            req.on('end', () => {
                data = JSON.parse(data);
                console.log('data chunk finished ' + data.email)
                 const result = {
                    email: data.email,
                    parola: data.password,
                    token: makeid(16)
                };
                //daca nu e in baza de date:
                if (result.email != 'capsadragos@gmail.com')
                {console.log("NU AVEM MATCH")
                    res.end();

                }
                else{

                const {query} = url.parse(req.url);
                const {name} = qs.parse(query);
                const expires = new Date();
                expires.setMinutes(expires.getMinutes() + 1);
                console.log(JSON.stringify(result));

                res.setHeader('Set-Cookie', `name=test;Expires=${expires.toGMTString()};HttpOnly;Path=/`)
                res.writeHead(302, {
                    'Access-Control-Allow-Origin': '*',
                    'mode': 'no-cors',
                    'Content-Type': 'application/json',
                    // 'Location': '/mainHome/mainHome.html',
                });

                res.end(JSON.stringify(result), 'utf-8');}
                // res.end(JSON.stringify({}), 'utf-8');
                //  return;
                /*
                            res.writeHead(200, {
                                'Access-Control-Allow-Origin': '*',
                                'Content-Type': 'application/json'
                            });
                            //aici se adauga verificarea datelor
                            if (data.email == 'dragos.capsa@info.uaic.ro') {
                                //aici se adauga ce se face daca exista match
                                console.log(JSON.stringify(result));

                                // getPage(req, res).then();
                            }
                            res.end(JSON.stringify(result), 'utf-8');*/
            })}

    else  if (req.url.startsWith('/api/ride-sharing')) {

        console.log('API RIDE');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            data = JSON.parse(data);
            console.log('data chunk finished ' + data.email)

            const result = {
               from: data.from,
                to:data.to,
                token: data.token
            };
            res.writeHead(201, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            //aici se adauga verificarea datelor
            //aici se adauga introducerea datelor in baza de date
            console.log(result);
            //getPage(req, res).then();
            res.end(JSON.stringify(result), 'utf-8');
        })

    }
      else  if (req.url.startsWith('/api/register')) {

            console.log('API called');
            let data = '';
            req.on('data', chunk => {
                data += chunk;
                console.log('data chunk added ' + data)
            })
            //aici lucrez cu email-ul si parola primite
            req.on('end', () => {
                data = JSON.parse(data);
                console.log('data chunk finished ' + data.email)

                const result = {
                    email: data.email,
                    prenume: data.prenume,
                    nume: data.nume,
                    telefon: data.telefon,
                    judet: data.judet,
                    oras: data.oras,
                    adresa: data.adresa,
                    password: data.password
                };
                res.writeHead(201, {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                });
                //aici se adauga verificarea datelor
                //aici se adauga introducerea datelor in baza de date
                var transporter= nodemailer.createTransport({
                service:'yahoo',
                    auth:{
                    user: 'capsadragos@yahoo.com',
                        pass:'uexfqagcautdpqxn'
                    }
                })
                var mailOptions={
                    from: 'capsadragos@yahoo.com',
                    to: result.email,
                    subject:'Welcome mate!',
                    text:`Here's your password, in case you forget it: ${result.password}`
                }
                transporter.sendMail(mailOptions,function(error,info)
                {
                  if (error){
                      console.log(error);
                      console.log('N-AM PUTUT TRIMITE MAIL-UL')
                  }
                  else {
                      console.log('Email sent '+ info.response);
                  }
                })
                //getPage(req, res).then();
                res.end(JSON.stringify(result), 'utf-8');
            })

        }
        else if (req.url.startsWith('/api/food'))
        {
            console.log('API FOOD');
            let data = '';
            req.on('data', chunk => {
                data += chunk;
                console.log('data chunk added ' + data)
            })
            //aici lucrez cu comanda primita
            req.on('end', () => {
                data = JSON.parse(data);
                const result = {
                    token: data.token,
                    quantities: data.quantities,
                    numeRestaurant: data.numeRestaurant,
                    items: data.items,
                    adresa: data.adresa,
                    prices: data.prices
                };


                res.writeHead(201, {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                });
                console.log(JSON.stringify(result));
                //verific daca tokenul este in baza de date
                //daca da pun comanda in baza de date

                //getPage(req, res).then();
                 res.end(JSON.stringify(result), 'utf-8');
       // res.end("ok");
       })

}
        else if (cookies.name) {

        } else {

            getPage(req, res).then();
        }

        //  console.log('page called');


})

const PORT = process.env.PORT || 8000

server.listen(PORT, () => console.log(`Server running at http://127.0.0.1:${PORT}`))

module.exports = server;

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
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
let userDB = require("../database/userManager.js");
let rideDB = require("../database/rideManager");
let restaurantDB = require("../database/restaurantManager");
let orderDB = require("../database/orderManager");
let itemDB = require("../database/itemManager")
let statsDB = require("../database/stats");
let rentDB = require("../database/rentManager");
let XMLs=require("../admin/getXML");
let pdfExporter=require("../database/stats/pdfExporter")

const http = require('http');

const nodemailer = require('nodemailer');
const {
    getPage
} = require('./controllers/productController')


//
function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const server = http.createServer((req, res) => {
    if (req.url.startsWith('/api/login')) {
        console.log('API LOGIN');

        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            data = JSON.parse(data);
            //console.log('data chunk finished ' + data.email)
            const result = {
                email: data.email,
                parola: data.password,
                token: makeid(16)
            };
            //daca nu e in baza de date:
            userDB.getTokenByEmail(result.email).then(r => {
                //console.log("\n\n\n\n\n\n ")
                console.log(JSON.stringify(r));
                if (r != null) {
                    res.writeHead(302, {
                        'Access-Control-Allow-Origin': '*',
                        'mode': 'no-cors',
                        'Content-Type': 'application/json',
                        // 'Location': '/mainHome/mainHome.html',
                    });
                    res.end('{}');
                } else {

                    userDB.checkLogin(result.email, result.parola).then(r => {
                        if (r == "nu") {
                            console.log("NU AVEM MATCH")
                            // res.setHeader('Set-Cookie', `name=test;Expires=;HttpOnly;Path=/`)
                            res.writeHead(302, {
                                'Access-Control-Allow-Origin': '*',
                                'mode': 'no-cors',
                                'Content-Type': 'application/json',
                                // 'Location': '/mainHome/mainHome.html',
                            });
                            res.end();

                        } else {
                            userDB.updateTokenByEmail(result.email, result.token);
                            res.writeHead(302, {
                                'Access-Control-Allow-Origin': '*',
                                'mode': 'no-cors',
                                'Content-Type': 'application/json',
                                // 'Location': '/mainHome/mainHome.html',
                            });

                            res.end(JSON.stringify(result), 'utf-8');
                        }
                    })
                }
            });


        })

    } else if (req.url.startsWith('/api/username')) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            data = JSON.parse(data);
            //console.log('data chunk finished ' + data.token)
            const result = {
                token: data.token
            }

            userDB.getEmailByToken(result.token).then(r => {
                // console.log(r);
                // console.log("NUMELE MEU ESTE" +r);
                let toSend = {
                    email: r
                }
                console.log(JSON.stringify(toSend));
                res.writeHead(200, {
                    'Access-Control-Allow-Origin': '*',
                    'mode': 'no-cors',
                    'Content-Type': 'application/json',
                    // 'Location': '/mainHome/mainHome.html',
                });
                console.log("NUMELE MEU ESTE" + JSON.stringify(toSend));

                // res.write('{"aaaa":7}', 'utf-8');
                // res.end();
                res.end(JSON.stringify(toSend), 'utf-8');
            })
            //  console.log(res=>res.json());
            // console.log(toSend)
            // console.log(res.body);
            //res.write()
        })
        // res.end();
    } else if (req.url.startsWith('/api/service')) {
        console.log("API SERVICE")
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            data = JSON.parse(data);
            //console.log('data chunk finished ' + data.token)
            const result = {
                token: data.token
            }

            userDB.getServiceByToken(result.token).then(r => {
                // console.log(r);
                // console.log("NUMELE MEU ESTE" +r);
                let toSend = {
                    service: r
                }
                console.log(JSON.stringify(toSend));
                res.writeHead(200, {
                    'Access-Control-Allow-Origin': '*',
                    'mode': 'no-cors',
                    'Content-Type': 'application/json',
                    // 'Location': '/mainHome/mainHome.html',
                });
                console.log("serviciul MEU ESTE" + JSON.stringify(toSend));

                // res.write('{"aaaa":7}', 'utf-8');
                // res.end();
                res.end(JSON.stringify(toSend), 'utf-8');
            })
            //  console.log(res=>res.json());
            // console.log(toSend)
            // console.log(res.body);
            //res.write()
        })
        // res.end();
    }//get token service
    else if (req.url.startsWith('/api/logout')) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            // //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            data = JSON.parse(data);
            // //console.log('data chunk finished ' + data.email)
            const result = {
                token: data.token
            }
            userDB.getEmailByToken(result.token).then(r => {
                userDB.removeTokenByEmail(r);
            })
            res.end('{}');
        })
    }//delete token
    else if (req.url.startsWith('/api/register')) {

        console.log('API called');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            data = JSON.parse(data);
            //console.log('data chunk finished ' + data.email)

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
            let sendEmail = false;
            userDB.checkUserExistence(data.email).then(r => {
                if (r == "da") {
                    console.log("EXISTA DEJA ACEST USER IN BAZA DE DATE");
                    res.end();
                } else {
                    // console.log(result+"\n\n\n\n\n\n\n");
                    res.writeHead(201, {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    });

                    //aici se adauga verificarea datelor
                    //aici se adauga introducerea datelor in baza de date
                    userDB.insertUser(result.prenume, result.nume, result.telefon, result.email, result.password, result.oras, result.judet, result.adresa, "consumer");


                    let transporter = nodemailer.createTransport({
                        service: 'yahoo',
                        auth: {
                            user: 'capsadragos@yahoo.com',
                            pass: 'uexfqagcautdpqxn'
                        }
                    })
                    let mailOptions = {
                        from: 'capsadragos@yahoo.com',
                        to: result.email,
                        subject: 'Welcome mate!',
                        text: `Here's your password, in case you forget it: ${result.password}`
                    }
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            console.log('N-AM PUTUT TRIMITE MAIL-UL')
                        } else {
                            console.log('Email sent ' + info.response);
                        }
                    })
                    //getPage(req, res).then();
                    res.end(JSON.stringify(result), 'utf-8');
                }
            });


        })

    }//register
    else if (req.url.startsWith('/api/team')) {

        console.log('API TEAM');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            data = JSON.parse(data);
            //console.log('data chunk finished ' + data.email)

            const result = {
                email: data.email,
                prenume: data.prenume,
                nume: data.nume,
                telefon: data.telefon,
                oras: data.oras,
                password: data.password,
                service: data.service
            };
            let sendEmail = false;
            userDB.checkUserExistence(data.email).then(r => {
                if (r == "da") {
                    console.log("EXISTA DEJA ACEST USER IN BAZA DE DATE");
                    res.end();
                    /*res.writeHead(
                        400, {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                            mode:'no-cors'
                    });*/
                    // res.end();
                } else {
                    // console.log(result+"\n\n\n\n\n\n\n");
                    res.writeHead(201, {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    });

                    //aici se adauga verificarea datelor
                    //aici se adauga introducerea datelor in baza de date
                    userDB.insertUser(result.prenume, result.nume, result.telefon, result.email, result.password, result.oras, result.judet, result.adresa, result.service);


                    let transporter = nodemailer.createTransport({
                        service: 'yahoo',
                        auth: {
                            user: 'capsadragos@yahoo.com',
                            pass: 'uexfqagcautdpqxn'
                        }
                    })
                    let mailOptions = {
                        from: 'capsadragos@yahoo.com',
                        to: result.email,
                        subject: 'Welcome mate!',
                        text: `Here's your password, in case you forget it: ${result.password}`
                    }
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            console.log('N-AM PUTUT TRIMITE MAIL-UL')
                        } else {
                            console.log('Email sent ' + info.response);
                        }
                    })
                    //getPage(req, res).then();
                    res.end(JSON.stringify(result), 'utf-8');
                }
            });


        })

    }//register as service provider
    else if (req.url.startsWith('/api/ride-sharing')) {

        console.log('API RIDE');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            data = JSON.parse(data);
            // //console.log('data chunk finished ' + data.email)

            const result = {
                from: data.from,
                to: data.to,
                token: data.token
            };
            res.writeHead(201, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            //aici se adauga verificarea datelor
            userDB.getEmailByToken(result.token).then(r => {
                // console.log(JSON.stringify(r));
                let email = JSON.parse(JSON.stringify(r));
                console.log(email);
                userDB.getIDByEmail(email).then(f => {
                    if (f != null) {
                        console.log(result.from)
                        console.log(result.to);
                        console.log(f);
                        rideDB.insertRide(result.from, result.to, f);
                    }
                })

            })
            //aici se adauga introducerea datelor in baza de date
            console.log(result);
            //getPage(req, res).then();
            res.end(JSON.stringify(result), 'utf-8');
        })

    }//give ride request
    else if (req.url.startsWith('/api/rides')) {

        console.log('API RIDEs');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            console.log("PANA AICI AM AJUNS SI TOKENUL E:")

            data = JSON.parse(data);
            // //console.log('data chunk finished ' + data.email)

            const result = {
                token: data.token
            };
            res.writeHead(201, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            //aici se adauga verificarea datelor
            console.log(result.token);
            userDB.getEmailByToken(result.token).then(r => {
                // console.log(JSON.stringify(r));
                if (r) {
                    console.log(JSON.stringify(r));
                    // let email = JSON.parse(JSON.stringify(r));
                    // console.log(r.email);
                    rideDB.getUnclaimed().then(f => {
                        let rides = JSON.parse(JSON.stringify(f));
                        //console.log(rides);
                        let response = rides;

                        /* for(let i=0;i<rides.length;i++) {
                             response[i].start=JSON.stringify(rides[i].start);
                             // response[i].start=rides[i].finish;
                             // response[i].start=rides[i].status;
  console.log(JSON.stringify(rides[i].start));
                             // console.log(rides[i].start);
                             // console.log(rides[i].to.value);
                         }*/
                        console.log(response);
                        res.end(JSON.stringify(response));
                    })


                }
            })
            //aici se adauga introducerea datelor in baza de date
            //console.log(result);
            //getPage(req, res).then();

        })

    } else if (req.url.startsWith('/api/update/rides')) {
        console.log('API UPDATE RIDES');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            console.log("PANA AICI AM AJUNS SI TOKENUL E:")

            data = JSON.parse(data);
            // //console.log('data chunk finished ' + data.email)

            let result = {
                id: data.id,
                token: data.token,
                feedback: data.feedback,
                rating: data.rating,
                status: data.status
            };

            console.log("\nRESULT IS : " + result);
            res.writeHead(201, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            // console.log(data);
            if (result.token)
                userDB.getServiceByToken(result.token).then(p => {
                    console.log(p)
                    if (p == "ride-sharing") {
                        if (result.token)
                            userDB.getIDByToken(result.token).then(r => {
                                    //  console.log(r);
                                    // console.log(r);
                                    if (r)
                                        rideDB.changeRideStatus(result.id, result.status, r);
                                }
                            )
                    } else {
                        console.log("ASTA A AJUNS LA SERVER" + result)
                        if (p) {
                            if (result.status == 'anulat')
                                rideDB.changeRideStatus(result.id, result.status, null)
                            else {
                                if (result.feedback)
                                    rideDB.setFeedback(result.feedback, result.id)
                                if (result.rating)
                                    rideDB.setRating(result.rating, result.id)
                            }
                        }
                    }

                })

            res.end('{}');
        })
    } else if (req.url.startsWith('/api/update/order')) {
        console.log('API ORDERS');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            console.log("PANA AICI AM AJUNS SI TOKENUL E:")

            data = JSON.parse(data);
            // //console.log('data chunk finished ' + data.email)

            let result = {
                id: data.id,
                food: data.food,
                address: data.address,
                feedback_provider: data.feedback_provider,
                feedback_restaurant: data.feedback_restaurant,
                token: data.token,
                status: data.status
            };
            res.writeHead(201, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            console.log(data);
            // result=JSON.parse(JSON.stringify(result));
            console.log(result.token);
            if (result.token)
                userDB.getServiceByToken(result.token).then(p => {
                    console.log(p)
                    if (p == "food") {
                        if (result.token)
                            userDB.getIDByToken(result.token).then(r => {
                                    //  console.log(r);
                                    // console.log(r);
                                    // rideDB.changeRideStatus()
                                    console.log("\n\n\n MY id is :" + r)
                                    orderDB.changeStatusForOrder(result.id, result.status, r);
                                }
                            )
                    } else {
                        // console.log("\N\N\N\NAM AJUNS AICI SI AM ANULAT COMANDA")
                        if (result.status == 'anulat')
                            orderDB.changeStatusForOrder(result.id, result.status, null);
                        else {
                            if (result.feedback_provider)
                                orderDB.setFeedbackForProvider(result.feedback_provider, result.id)
                            if (result.feedback_restaurant)
                                orderDB.setFeedbackForRestaurant(result.feedback_restaurant, result.id)

                        }
                    }

                })

            res.end('{}');
        })
    } else if (req.url.startsWith('/api/claim/rides')) {
        console.log('API RIDEs');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            console.log("PANA AICI AM AJUNS SI TOKENUL E:")

            data = JSON.parse(data);
            // //console.log('data chunk finished ' + data.email)

            const result = {
                id: data.id,
                token: data.token,
                status: data.status
            };
            res.writeHead(201, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            if (result.token)
                userDB.getServiceByToken(result.token).then(p => {
                    console.log(p)
                    if (p == "ride-sharing") {
                        console.log(data);
                        if (result.token)
                            userDB.getIDByToken(result.token).then(r => {
                                    // console.log(r);
                                    rideDB.getClaimed(r).then(fn => {
                                        console.log("CLAIMED RIDES ARE " + JSON.stringify(fn));
                                        res.end(JSON.stringify(fn));
                                    });
                                }
                            )
                    } else {
                        console.log(data)
                        if (p)
                            if (result.token)
                                userDB.getIDByToken(result.token).then(r => {
                                    console.log(r);
                                    if (r)
                                        rideDB.getOwn(r).then(fn => {
                                            console.log("your rides are" + JSON.stringify(fn));
                                            res.end(JSON.stringify(fn));
                                        })
                                })

                    }
                })


        })
    }//get own rides (driver/consumer)
    else if (req.url.startsWith('/api/claim/orders')) {
        console.log('API ORDERS');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            console.log("PANA AICI AM AJUNS SI TOKENUL E:")

            data = JSON.parse(data);
            // //console.log('data chunk finished ' + data.email)

            const result = {
                id: data.id,
                token: data.token,
                status: data.status
            };
            res.writeHead(201, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            if (result.token)
                userDB.getServiceByToken(result.token).then(p => {
                    console.log(p)
                    if (p == "food") {
                        console.log(data);
                        if (result.token)
                            userDB.getIDByToken(result.token).then(r => {
                                    //  console.log(r);
                                    // console.log(r);
                                    console.log("MY PROVIDER ID IS: " + r);
                                    if (r)
                                        orderDB.getCompleteOrdersByProviderID(r).then(fn => {
                                            console.log("CLAIMED ORDERS ARE " + fn);
                                            res.end(JSON.stringify(fn));
                                        });
                                }
                            )
                    } else {
                        console.log(data)
                        if (p)
                            if (result.token)
                                userDB.getIDByToken(result.token).then(r => {
                                    console.log(r);
                                    if (r)
                                        orderDB.getCompleteOrdersByID(r).then(fn => {
                                            // console.log("your rides are losdloas"+fn);
                                            if (fn)
                                                res.end(JSON.stringify(fn));
                                        })
                                })

                    }
                })


        })
    }//get own orders (driver/consumer)
    else if (req.url.startsWith('/api/orders')) {

        console.log('API ORDERS');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            console.log("PANA AICI AM AJUNS SI TOKENUL E:")

            data = JSON.parse(data);
            // //console.log('data chunk finished ' + data.email)

            const result = {
                token: data.token
            };
            res.writeHead(201, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            //aici se adauga verificarea datelor
            console.log(result.token);

            if (result.token)
                userDB.getServiceByToken(result.token).then(p => {
                    console.log(p)
                    if (p == "food") {
                        console.log(data);
                        if (result.token)
                            userDB.getIDByToken(result.token).then(r => {
                                    // console.log(r);
                                    if (r)
                                        orderDB.getCompleteOrdersUnclaimed().then(fn => {
                                            console.log("unclaimed ORDERS ARE " + JSON.stringify(fn[0]));
                                            res.end(JSON.stringify(fn));
                                        });
                                }
                            )
                    }


                })
            //aici se adauga introducerea datelor in baza de date
            //console.log(result);
            //getPage(req, res).then();

        })

    } else if (req.url.startsWith('/api/restaurants')) {
        console.log('API restaurants');

        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            // data = JSON.parse(data);
            // //console.log('data chunk finished ' + data.token)
            console.log(data);

            restaurantDB.getAllRestaurants().then(r => {
                // r.json();
                let restaurants = {};
                for (let i = 0; i < r.length; i++) {
                    restaurants[i] = r[i];
                }
                // console.log("DIN BAZA DE DATE AM LUAT SMECHERIA ASTA:" + JSON.stringify(restaurants))
                res.writeHead(200, {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                });
                // console.log(JSON.stringify(r));
                //verific daca tokenul este in baza de date
                //daca da pun comanda in baza de date
                // res.write(JSON.stringify(restaurants),'utf-8');
                // res.end("");
                // console.log(JSON.stringify(restaurants));
                res.end(JSON.stringify(r), 'utf-8');
                //getPage(req, res).then();
                // console.log(res)
            })
        })
    }//get restaurants from db
    else if (req.url.startsWith('/api/reviews')) {
        console.log('API restaurants');

        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            data = JSON.parse(data);
            //console.log('data chunk finished ' + data.restaurantName)
            console.log(data);
            let result = {
                token: data.token,
                restaurantName: data.restaurantName
            }
            console.log(JSON.stringify(result));
            if (result.token) {
                userDB.getServiceByToken(result.token).then(r => {
                    if (r == "consumer") {
                        // console.log("NUME rest"+restaurantDB)
                        restaurantDB.getRestaurantByName(result.restaurantName).then(f => {
                            restaurantDB.getReviewsRestaurant(f.id).then(r => {
                                    res.writeHead(201, {
                                        'Access-Control-Allow-Origin': '*',
                                        'Content-Type': 'application/json'
                                    });
                                    res.end(JSON.stringify(r), 'utf-8');
                                }
                            )
                        })

                    }
                })

            }
        })
    }//get menu from db
    else if (req.url.startsWith('/api/rent')) {
        console.log('API rent');

        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            data = JSON.parse(data);
            //console.log('data chunk finished ' + data.restaurantName)
            console.log(data);
            let result = {
                type: data.type,
                description: data.description,
                location: data.location,
                price: data.price,
                token: data.token,
            }
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            console.log(JSON.stringify(result));
            userDB.getServiceByToken(result.token).then(r => {
                if (r == "consumer") {
                    userDB.getIDByToken(result.token).then(f => {
                        let rent = {
                            type: result.type,
                            location: result.location,
                            agentID: JSON.stringify(f),
                            price_per_day: result.price,
                            description: result.description
                        }
                        let raspuns = {
                            raspuns: "already"
                        }
                        console.log("ABOUT TO DO RENT ADD" + JSON.stringify(rent));
                        rentDB.selectRent(JSON.parse(JSON.stringify(rent))).then(p => {
                            console.log(p);
                            if (p == false) {
                                rentDB.insertRent(rent);
                                raspuns.raspuns = "done";
                                res.end(JSON.stringify(raspuns));
                            } else res.end(JSON.stringify(raspuns));

                        })
                        res.end(JSON.stringify(raspuns));
                    })

                }
            })

        })
    }//get rents from db
    else if (req.url.startsWith('/api/getRent')) {
        console.log('API getrent');

        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            data = JSON.parse(data);
            //console.log('data chunk finished ' + data.restaurantName)
            console.log(data);
            let result = {
                type: data.type,
                from: data.from,
                to: data.to,
                token: data.token,
            }
            console.log(JSON.stringify(result));
            userDB.getServiceByToken(result.token).then(r => {
                if (r == "consumer") {
                    rentDB.getRentsAvailableInPeriodType(result.from, result.to, result.type).then(f => {
                            console.log(f);
                            res.end(JSON.stringify(f));
                        }
                    )

                }
            })

        })
    }//get rents from db
    else if (req.url.startsWith('/api/doRent')) {
        console.log('API dorent');

        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            data = JSON.parse(data);
            //console.log('data chunk finished ' + data.restaurantName)
            console.log(data);
            let result = {
                id: data.id,
                token: data.token,
                from:data.from,
                to:data.to
            }
            console.log(JSON.stringify(result));
            userDB.getServiceByToken(result.token).then(r => {
            let notGood={
                raspuns:"not good"
            }
                if (r == "consumer") {
                    userDB.getIDByToken(result.token).then(f => {
                        let reservation = {
                            rentID: result.id,
                            consumerID: f,
                            rental_date:result.from,
                            expiration_date:result.to,
                        }
                        rentDB.checkReservation(reservation.rentID,reservation.rental_date,reservation.expiration_date).then(r=>{

                            if(r=="nu")
                            {
                                rentDB.makeReservation(reservation)
                                let raspuns={raspuns:"done"};
                                res.end(JSON.stringify(raspuns));
                            }
                            else res.end(JSON.stringify(notGood));
                        })

                    })

                }
            })

        })
    }//get rents from db

    else if (req.url.startsWith('/api/menu')) {
        console.log('API restaurants');

        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        //aici lucrez cu email-ul si parola primite
        req.on('end', () => {
            data = JSON.parse(data);
            //console.log('data chunk finished ' + data.restaurantName)
            console.log(data);
            let result = {
                restaurantName: data.restaurantName
            }
            console.log(JSON.stringify(result));
            restaurantDB.getItemsFromRestaurantByName(result.restaurantName).then(r => {
                    res.writeHead(201, {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify(r), 'utf-8');
                }
            )

        })
    }//get menu from db
    else if (req.url.startsWith('/api/food')) {
        console.log('API FOOD');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
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
            let items = [];
            for (let i = 0; i < result.items.length; i++) {
                let quantity;
                let id;
                quantity = result.quantities[i];
                id = result.items[i];
                let obj = {
                    id: id,
                    quantity: quantity
                }

                items[i] = obj;


            }
            console.log("iteme transmise" + JSON.stringify((items)));

            restaurantDB.getRestaurantByName(result.numeRestaurant).then(r => {
                if (r && result.token)
                    userDB.getIDByToken(result.token).then(f => {
                        if (f) {
                            let order = {
                                restaurantID: r.id,
                                consumerID: f,
                                adress: result.adresa,
                                items: items
                            }
                            console.log(order);
                            orderDB.insertOrder(order);
                        }
                    })
            })


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

    }//
    else if (req.url.startsWith('/api/claim/orders')) {
        console.log('API ORDERS');
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        req.on('end', () => {
            console.log("PANA AICI AM AJUNS SI TOKENUL E:")

            data = JSON.parse(data);
            // //console.log('data chunk finished ' + data.email)

            const result = {
                id: data.id,
                token: data.token,
                status: data.status
            };
            res.writeHead(201, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            if (result.token)
                userDB.getServiceByToken(result.token).then(p => {
                    console.log(p)
                    if (p == "food") {
                        console.log(data);
                        if (result.token)
                            userDB.getIDByToken(result.token).then(r => {
                                    //  console.log(r);
                                    // console.log(r);
                                    orderDB.getCompleteOrdersByProviderID(r).then(fn => {
                                        console.log("CLAIMED orders ARE " + fn);
                                        res.end(JSON.stringify(fn));
                                    });
                                }
                            )
                    } else {
                        console.log(data)
                        if (p && result.token)
                            userDB.getIDByToken(result.token).then(r => {
                                console.log(r);
                                orderDB.getCompleteOrdersByID(r).then(fn => {
                                    console.log("your orders are" + fn);
                                    res.end(JSON.stringify(fn));
                                })
                            })

                    }
                })


        })
    }//get own rides (driver/consumer)
    else if (req.url.startsWith('/api/admin/usersStats')) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        req.on('end', () => {

            data = JSON.parse(data);
            // //console.log('data chunk finished ' + data.email)

            const result = {
                token: data.token,
            };
            res.writeHead(201, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            if (result.token)
                userDB.getServiceByToken(result.token).then(p => {
                    if (p == "admin") {
                        statsDB.aggregateUserData().then(p => {
                            XMLs.asdf();
                            pdfExporter.exportPDF();
                            // XMLs.downloadCsv();
                            res.end(JSON.stringify(p))
                        });

                    }


                })


        })
    } else if (req.url.startsWith('/api/admin/restaurantStats')) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            //console.log('data chunk added ' + data)
        })
        req.on('end', () => {

            data = JSON.parse(data);
            // //console.log('data chunk finished ' + data.email)

            const result = {
                token: data.token,
            };
            res.writeHead(201, {
                'Access-Control-Allow-Origin': '*',
                'mode': 'no-cors',
                'Content-Type': 'application/json'
            });
            if (result.token)
                userDB.getServiceByToken(result.token).then(p => {
                    if (p == "admin") {
                        statsDB.aggregateRestaurantData().then(p => {
                            res.end(JSON.stringify(p))
                        });

                    }


                })


        })
    } else if (req.url.startsWith('/api/manager/insertRestaurant')) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            console.log('data chunk added ' + data)
        });

        req.on('end', () => {
            try {
                console.log(data);
                data = JSON.parse(data);
            } catch (e) {
                console.log("not doable");
            }
            // console.log('data chunk finished ' + data.email)

            const result = {
                token: data.token,
                numeRestaurant: data.numeRestaurant,
                linkPoza: data.linkPoza,
            };
            res.writeHead(201, {
                'Access-Control-Allow-Origin': '*',
                'mode': 'no-cors',
                'Content-Type': 'application/json'
            });
            let notGood = {
                raspuns: "not good"
            }
            if (result.token)
                userDB.getServiceByToken(result.token).then(p => {
                    if (p == "manager") {
                        restaurantDB.getRestaurantByName(result.numeRestaurant).then(r=>
                        {
                            if(r==undefined) {
                                restaurantDB.insertRestaurant(result.numeRestaurant, result.linkPoza);
                                userDB.getAllUsers().then(r => {
                                    for (let user of r) {

                                    let transporter = nodemailer.createTransport({
                                        service: 'yahoo',
                                        auth: {
                                            user: 'capsadragos@yahoo.com',
                                            pass: 'uexfqagcautdpqxn'
                                        }
                                    })
                                    let mailOptions = {
                                        from: 'capsadragos@yahoo.com',
                                        to: user.email,
                                        subject: 'Welcome mate!',
                                        text: `S-a bagat mare restaurant, hai si vezi: ${result.numeRestaurant}`
                                    }

                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                            console.log('N-AM PUTUT TRIMITE MAIL-UL')
                                        } else {
                                            console.log('Email sent ' + info.response);
                                        }
                                    })
                                }
                                })
                            }
                        else{
                                console.log(r);
                            }
                        })


                    }
                })
        })
    }
    else if(req.url.startsWith("/api/getTopRestaurant"))
    {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            console.log('data chunk added ' + data)
        });

        req.on('end', () => {
            try {
                console.log(data);
                data = JSON.parse(data);
            } catch (e) {
                console.log("not doable");
            }
            // console.log('data chunk finished ' + data.email)

            const result = {
                token: data.token,
            };
            res.writeHead(201, {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            });
            let notGood = {
                raspuns: "not good"
            }

            if (result.token) {
                userDB.getServiceByToken(result.token).then(p => {
                    if (p == "consumer") {
                        statsDB.getRestaurantsOrderByProfit().then(f => {
                            console.log("YO");
                           res.end(JSON.stringify(JSON.stringify(f)));

                        })
                    }
                })
            }
        })
    }
    else if (req.url.startsWith('/api/manager/insertProdus')) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            console.log('data chunk added ' + data)
        });

        req.on('end', () => {
            try {
                console.log(data);
                data = JSON.parse(data);
            } catch (e) {
                console.log("not doable");
            }
            // console.log('data chunk finished ' + data.email)

            const result = {
                token: data.token,
                numeRestaurant: data.numeRestaurant,
                jsonItem: data.jsonItem
            };
            res.writeHead(201, {
                'Access-Control-Allow-Origin': '*',
                'mode': 'no-cors',
                'Content-Type': 'application/json'
            });

            let notGood = {
                raspuns: "not good"
            }
            let allGood = {
                raspuns: "all good"
            }

            console.log(result);
            if (result.token)
                userDB.getServiceByToken(result.token).then(p => {
                    if (p == "manager") {
                        try {
                            let menu = result.jsonItem;

                            console.log(menu);
                            if (menu.name == undefined || menu.description == undefined || menu.price == undefined) {
                                console.log("s-a stricat jsonu patroane")
                                throw new Error("not good");
                            }
                            itemDB.insertItem(result.numeRestaurant, menu).then(r => {
                                if (r == 1) {
                                    console.log(r);
                                    res.end(JSON.stringify(allGood));
                                } else {
                                    console.log("S-A AJUNS AICI BAROSANE")
                                    console.log(r);
                                    res.end(JSON.stringify(notGood));
                                }
                            })
                        } catch (err) {
                            console.log("S-A AJUNS AICI sefanule")

                            console.log("not good")
                            console.log(notGood);
                            res.end(JSON.stringify(notGood));
                        }
                    }
                })
        })
    } else if (req.url.startsWith('/api/manager/restaurantAvailability')) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            console.log('data chunk added ' + data)
        });

        req.on('end', () => {
            try {
                console.log(data);
                data = JSON.parse(data);
            } catch (e) {
                console.log("not doable");
            }
            // console.log('data chunk finished ' + data.email)

            const result = {
                token: data.token,
                availability: data.availability,
                numeRestaurant: data.numeRestaurant,
            };
            res.writeHead(201, {
                'Access-Control-Allow-Origin': '*',
                'mode': 'no-cors',
                'Content-Type': 'application/json'
            });
            let notGood = {
                raspuns: "not good"
            }
            if (result.token)
                userDB.getServiceByToken(result.token).then(p => {
                    if (p == "manager") {
                        restaurantDB.restaurantAvailability(result.numeRestaurant, result.availability)
                    }
                })
        })
    } else if (req.url.startsWith('/api/manager/itemAvailability')) {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
            console.log('data chunk added ' + data)
        });

        req.on('end', () => {
            try {
                console.log(data);
                data = JSON.parse(data);
            } catch (e) {
                console.log("not doable");
            }
            // console.log('data chunk finished ' + data.email)

            const result = {
                token: data.token,
                availability: data.availability,
                numeProdus: data.numeProdus,
            };
            res.writeHead(201, {
                'Access-Control-Allow-Origin': '*',
                'mode': 'no-cors',
                'Content-Type': 'application/json'
            });
            let notGood = {
                raspuns: "not good"
            }
            let allGood = {
                raspuns: "all good"
            }
            if (result.token)
                userDB.getServiceByToken(result.token).then(p => {
                    if (p == "manager") {
                        restaurantDB.itemAvailability(result.numeProdus, result.availability)
                    }
                })
        })
    }

        // else if (req.url.startsWith('/api/judete')){
        //     let data = '';
        //     req.on('data', chunk => {
        //         data += chunk;
        //         //console.log('data chunk added ' + data)
        //     })
        //     req.on('end', () => {
        //
        //         data = JSON.parse(data);
        //         // //console.log('data chunk finished ' + data.email)
        //
        //         const result = {
        //             token: data.token,
        //         };
        //         res.writeHead(201, {
        //             'Access-Control-Allow-Origin': '*',
        //             'Content-Type': 'application/json'
        //         });
        //         getJudete().then(r=> console.log(r))
        //     })
    // }

    else {

        getPage(req, res).then();
    }

    //  console.log('page called');


})

const PORT = process.env.PORT || 8000

server.listen(PORT, () => console.log(`Server running at http://127.0.0.1:${PORT}`))

module.exports = server;


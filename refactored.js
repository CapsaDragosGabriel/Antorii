const http = require('http');
const path = require("path");
const fs = require("fs");

const hostname = '127.0.0.1';
var wallets = {
    wallet0: {
        RON: { value: 10 },
        EUR: { value: 0 },
    },
    wallet1: {
        RON: { value: 0 },
        EUR: { value: 50 },
    },
};

const default_404 = function(req, res) {
    res.writeHead(404);
    res.write(`Page ${req.method} ${req.url} not found`);
};

const getRequestBody = async function(req) {
    const buffer = [];
    for await (const chunks of req) {
        buffer.push(chunks);
    }
    return Buffer.concat(buffer).toString();
};

const controllers = [

    {
        name: "index",
        url_match: function(url) {
            return url === "/";
        },
        GET: function(_, res) {
            //loadEverything(_,res);

            res.writeHead(200);
            res.write("Wallet API");
        }
    },
    {
        name: "wallets",
        url_match: function(url) {
            return url === "/wallets";
        },
        GET: function(_, res) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            let wallet_names = Object.keys(wallets);
            res.write(JSON.stringify(wallet_names));
        }
    },
    {
        name: "wallets_id",
        url_match: function(url) {
            // /wallets/<id>
            let regex = /\/wallets\/\w+$/;
            return regex.test(url);
        },
        GET: function(req, res) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            let regex = /\/wallets\/(\w+)/;
            let wallet_name = req.url.match(regex)[1];
            if (wallets[wallet_name]) {
                res.write(JSON.stringify(
                    Object.keys(wallets[wallet_name])
                ));
            } else {
                default_404(req, res);
            }
        }
    },
    {
        name: "wallets_id_currency",
        url_match: function(url) {
            // /wallets/<w_id>/currencies/<c_id>
            let regex = /\/wallets\/\w+\/currencies\/\w+$/;
            return regex.test(url);
        },
        GET: function(req, res) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            let regex = /\/wallets\/(\w+)\/currencies\/(\w+)/;
            let wallet_name = req.url.match(regex)[1];
            let currency_name = req.url.match(regex)[2];
            console.log(wallet_name, currency_name, req.url.match(regex));

            let wallet = wallets[wallet_name];
            if (!wallet) {
                default_404(req, res);
                return
            };

            let currency = wallet[currency_name];
            if (!currency) {
                default_404(req, res);
                return
            }
            res.write(JSON.stringify(currency));
        },
        POST: async function(req, res) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            let regex = /\/wallets\/(\w+)\/currencies\/(\w+)/;
            let wallet_name = req.url.match(regex)[1];
            let currency_name = req.url.match(regex)[2];
            console.log(wallet_name, currency_name, req.url.match(regex));

            let wallet = wallets[wallet_name];
            if (!wallet) {
                default_404(req, res);
                return
            };
            wallet[currency_name] = JSON.parse(
                await getRequestBody(req)
            );
        },
        DELETE: async function(req, res) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            let regex = /\/wallets\/(\w+)\/currencies\/(\w+)/;
            let wallet_name = req.url.match(regex)[1];
            let currency_name = req.url.match(regex)[2];
            console.log(wallet_name, currency_name, req.url.match(regex));

            let wallet = wallets[wallet_name];
            if (!wallet) {
                default_404(req, res);
                return
            };
            wallet[currency_name] = null;
        },
    },
    {
        name: "404",
        url_match: function(_) {
            return true
        },
    },
];

const handle = async function(req, res) {
    let controller = controllers.find(function(c) {
        return c.url_match(req.url)
    });
    console.log(`Handle ${req.method} ${req.url} by ${controller.name}`);
    let view = controller[req.method] || default_404;
    await view(req, res);
    res.end('');
}

const server = http.createServer(handle);

server.listen(8000,hostname,() => {
    console.log(`Server running at http://${hostname}:8000/`);
});
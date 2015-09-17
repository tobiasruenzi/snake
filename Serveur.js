var fs = require('fs');
var express = require('express');
var https = require('https');
var key = fs.readFileSync('private/key.pem');
var cert = fs.readFileSync('private/cert.pem')
var https_options = {
    key: key,
    cert: cert
};
var PORT = 8000;
var HOST = 'localhost';
app = express();

app.configure(function(){
    app.use(app.router);
});

server = https.createServer(https_options, app).listen(PORT, HOST);
console.log('HTTPS Server listening on %s:%s', HOST, PORT);

app.get('/', function(req, res) {
    res.sendfile('public/index.html');
});

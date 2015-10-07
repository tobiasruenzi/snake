
var https = require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync('private/key.pem'),
    cert: fs.readFileSync('private/cert.pem')
};
// Chargement du fichier html affiché au client
var server = https.createServer(options,function(req, res) {
    fs.readFile('./public/Index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
}).listen(8666);
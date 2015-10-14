
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

var WebSocketServer = require('ws').Server
, wss = new WebSocketServer({port: 8667});
wss.on('connection', function(ws) {
  ws.on('message', function(message) {
	  var point = JSON.parse(message);
      console.log('received: %s', point);
      var x0= point.X[0];
      var y0= point.Y[0];
      console.log('point1 %s,%s', x0, y0);
      x0++;
     
      console.log('point1 modifié %s,%s', x0, y0);
  });
  ws.send('Hello');
});


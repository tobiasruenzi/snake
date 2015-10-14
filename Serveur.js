
var https = require('https');
var fs = require('fs');
var Model = require('./Modele');

var options = {
		key: fs.readFileSync('private/key.pem'),
		cert: fs.readFileSync('private/cert.pem')
};
//Chargement du fichier html affiché au client
var server = https.createServer(options,function(req, res) {
	fs.readFile('./public/Index.html', 'utf-8', function(error, content) {
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(content);
	});
}).listen(8666);

var WebSocketServer = require('ws').Server
, wss = new WebSocketServer({ port:8667});
var Joueurs = new Array(2);

if(Joueurs.length!=(Joueurs[0]+1)){
wss.on('connection', function(ws) {
	
	
		
		var posx= Math.random()*430+200;
		var posy= Math.random()*260+200;
		var Point1= new Model.Point(posx, posy);
		var Point2 =new Model.Point(posx, posy+50);
		var Point3 = new Model.Point(posx, posy+100);
		var Serpent= new Model.Serpent(Point1, Point2, Point3);
		var Joueur= new Model.Joueur(Serpent, ws);
		Joueurs.push(Joueur);
		console.log('attendu %s %s', posx,posy);
		console.log(' Joueur x et y %s %s',Joueur.Serpent.Tableau[0].x, Joueur.Serpent.Tableau[0].y);
	


	
});
}


/*
		  var point = JSON.parse(message);
	      console.log('received: %s', point);
	      var x0= point.X[0];
	      var y0= point.Y[0];
	      console.log('point1 %s,%s', x0, y0);
	      x0++;

	      console.log('point1 modifié %s,%s', x0, y0);
	  });
 */


var Jeu= Model.Jeu(Joueurs[0],Joueurs[1]);



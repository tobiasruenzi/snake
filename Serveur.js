var https = require('https');
var fs = require('fs');
var Model = require('./Modele');
var express = require('express');

var key = fs.readFileSync('private/key.pem');
var cert = fs.readFileSync('private/cert.pem');
var options = {
		key: key,
		cert: cert
};
var PORT = 8999;
var HOST = 'localhost';
var app = express();

app.configure(function(){
	app.use(app.router);
});

var server = https.createServer(options, app).listen(PORT, HOST);
console.log('HTTPS Server listening on %s:%s', HOST, PORT);

app.get('/', function(req, res) {
	res.sendfile('public/index.html');
});
app.configure(function() {
	app.use(express.static('./public'));
});



var WebSocketServer = require('ws').Server
, wss = new WebSocketServer({ server:server});
var Joueurs = [];
var i=0;

wss.on('connection', function(ws) {
	if(Joueurs.length<2){


		var posx= Math.random()*430+200;
		var posy= Math.random()*260+200;
		var Point1= new Model.Point(posx, posy);
		var Point2 =new Model.Point(posx, posy+50);
		var Point3 = new Model.Point(posx, posy+100);
		var Serpent= new Model.Serpent(Point1, Point2, Point3);
		var Joueur= new Model.Joueur(Serpent, ws);


		console.log('nombre de Joueurs deja present  %s',Joueurs.length);
		Joueurs.push(Joueur);
		console.log('nouveau joueur x et y %s %s',Joueurs[i].Serpent.Tableau[0].x, Joueurs[i].Serpent.Tableau[0].y);
		i++;
		begin(Joueurs);
	}
	else{
		console.log('deja deux joueurs');
		ws.close();
	}

});


function begin(tableau){
	if(tableau.length==2){
		var Jeu= new Model.Jeu(Joueurs[0],Joueurs[1])
		console.log('Jeu cree');

	}
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



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
console.log('HTTPS Server listening on https://%s:%s', HOST, PORT);

app.get('/', function(req, res) {
	res.sendfile('public/index.html');
});
app.configure(function() {
	app.use(express.static('./public'));
});



var WebSocketServer = require('ws').Server
, wss = new WebSocketServer({ server:server});
var Joueurs = [];

var taille=50;
var ws1;
var ws2;
wss.on('connection', function(ws) {
	if(Joueurs.length==0){

		ws1=ws;
		var posx= 550;
		var posy= 600;
		var Point1= new Model.Point(posx, posy);
		var Serpent= new Model.Serpent(Point1);
		for(var t=0; t<taille;t++){
			var Point= new Model.Point(posx, posy-t*2);
			Serpent.Tableau.push(Point);
		}
		var Joueur= new Model.Joueur(Serpent, ws);

		Joueurs.push(Joueur);
		console.log('premier joueur connecté, attente du second');
		
		
	}
	else if(Joueurs.length==1){

		ws2=ws;
		var posx= 950;
		var posy= 600;
		var Point1= new Model.Point(posx, posy);
		var Serpent= new Model.Serpent(Point1);
		for(var t=0; t<taille;t++){
			var Point= new Model.Point(posx, posy-t*2);
			Serpent.Tableau.push(Point);
		}
		var Joueur= new Model.Joueur(Serpent, ws);

		Joueurs.push(Joueur);
		console.log('second joueur connecté, lancement');
		
		
		begin(Joueurs);
	}
	else{
		console.log('deja deux joueurs');
		ws.close();
	}

});


function begin(tableau){
	if(tableau.length==2){
		var Jeu= new Model.Jeu(tableau[0],tableau[1])
		console.log('Jeu cree');
		console.log('serpent1 %s', Jeu.Joueur1.Serpent.Tableau);
		var message1 = { 
				type : "creeserpents",
				Serpent1 : Jeu.Joueur1.Serpent.Tableau,
				Serpent2 : Jeu.Joueur2.Serpent.Tableau
		};
		ws1.send(JSON.stringify(message1));
		console.log('serpent2 %s', Jeu.Joueur2.Serpent.Tableau);
		var message2 = { 
				type : "creeserpents",
				Serpent1 : Jeu.Joueur2.Serpent.Tableau,
				Serpent2 : Jeu.Joueur1.Serpent.Tableau
		};
		ws2.send(JSON.stringify(message2));
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



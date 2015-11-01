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
var nexttete1= [0, 5];
var nexttete2= [0, 5];
var taille=50;
var ws1;
var ws2;
wss.on('connection', function(ws) {
	if(Joueurs.length===0){

		ws1=ws;
		var posx1= 550;
		var posy1= 600;
		var Point1= new Model.Point(posx1, posy1);
		var Serpent1= new Model.Serpent(Point1);
		for(var t=0; t<taille;t++){
			var Point11= new Model.Point(posx1, posy1-t*2);
			Serpent1.Tableau.push(Point11);
		}
		var Joueur1= new Model.Joueur(Serpent1, ws);

		Joueurs.push(Joueur1);
		console.log('premier joueur connecté, attente du second');
		
		
	}
	else if(Joueurs.length===1){

		ws2=ws;
		var posx2= 950;
		var posy2= 600;
		var Point2= new Model.Point(posx2, posy2);
		var Serpent2= new Model.Serpent(Point2);
		for(var t1=0; t1<taille;t1++){
			var Point22= new Model.Point(posx2, posy2-t1*2);
			Serpent2.Tableau.push(Point22);
		}
		var Joueur2= new Model.Joueur(Serpent2, ws);

		Joueurs.push(Joueur2);
		console.log('second joueur connecté, lancement');
		
		
		begin(Joueurs);
	}
	else{
		console.log('deja deux joueurs');
		ws.close();
	}
	
	ws.on('message', function message(event) 
	{
		var msg = JSON.parse(event);
		
		switch(msg.type)
		{				
			case "tete" :
				console.log("maj tete recu %s %s", msg.x, msg.y);
				if (ws===ws1)
					{
						nexttete1=[msg.x,msg.y];
					}
				else if (ws===ws2)
					{
						nexttete2=[msg.x,msg.y];
					}
				
				break;
		}		
		
		
		
	});
	
	
	
	
	
	
	
	
});


function begin(Joueurs){
	if(Joueurs.length===2){
		
		console.log('serpent1 %s %s', Joueurs[0].Serpent.Tableau[0].x, Joueurs[0].Serpent.Tableau[0].y);
		var message1 = { 
				type : "creeserpents",
				Serpent1 : Joueurs[0].Serpent.Tableau,
				Serpent2 : Joueurs[1].Serpent.Tableau
		};
		ws1.send(JSON.stringify(message1));
		console.log('serpent2 %s %s', Joueurs[1].Serpent.Tableau[0].x, Joueurs[1].Serpent.Tableau[0].y);
		var message2 = { 
				type : "creeserpents",
				Serpent1 : Joueurs[1].Serpent.Tableau,
				Serpent2 : Joueurs[0].Serpent.Tableau
		};
		ws2.send(JSON.stringify(message2));
		setInterval(onFrame, 10);
		function onFrame() 
		{
			update();
		}
	}
}
function update(){
	console.log('calcul');
	
	console.log('update serpent 1 %s %s', Joueurs[0].Serpent.Tableau[0].x, Joueurs[0].Serpent.Tableau[0].y);
	console.log('update serpent 2 %s %s', Joueurs[1].Serpent.Tableau[0].x, Joueurs[1].Serpent.Tableau[0].y);
	for (var i = Joueurs[0].Serpent.Tableau[0].length - 1; i > 0; i--) {
		Joueurs[0].Serpent.Tableau[i]= Joueurs[0].Serpent.tableau[i-1];
		Joueurs[1].Serpent.Tableau[i]= Joueurs[1].Serpent.tableau[i-1];
	}
	Joueurs[0].Serpent.Tableau[0].x += nexttete1[0];
	Joueurs[0].Serpent.Tableau[0].y += nexttete1[1];
	Joueurs[1].Serpent.Tableau[0].x += nexttete2[0];
	Joueurs[1].Serpent.Tableau[0].y += nexttete2[1];
	
	
	console.log('update serpent 1 %s %s', Joueurs[0].Serpent.Tableau[0].x, Joueurs[0].Serpent.Tableau[0].y);
	console.log('update serpent 2 %s %s', Joueurs[1].Serpent.Tableau[0].x, Joueurs[1].Serpent.Tableau[0].y);
	var message1 = { 
			type : "majserpents",
			Serpent1 : Joueurs[0].Serpent.Tableau,
			Serpent2 :Joueurs[1].Serpent.Tableau
	};
	ws1.send(JSON.stringify(message1));
	
	var message2 = { 
			type : "majserpents",
			Serpent1 : Joueurs[1].Serpent.Tableau,
			Serpent2 : Joueurs[0].Serpent.Tableau
	};
	ws2.send(JSON.stringify(message2));
}










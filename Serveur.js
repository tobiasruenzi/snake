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

var server = https.createServer(options, app).listen(PORT);
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
var nexttetebase= [0,5];
var taille=50;

setInterval(onFrame, 10);

wss.on('connection', function(ws) {	
	console.log("Nouveau Joueur")
	var posx= Math.floor((Math.random() * 1150) + 50);
	var posy= Math.floor((Math.random() * 600) + 50);
	var Point= new Model.Point(posx, posy);

	var Joueur =new Model.Joueur(Point, ws, nexttetebase);
	for(var t=1; t<taille;t++){
		Joueur.grandir(new Model.Point(posx, posy-t*2));
	}


	Joueurs.push(Joueur);



	begin(Joueurs);




	ws.on('message', function message(event) 
	{
		var msg = JSON.parse(event);

		switch(msg.type)
		{				
			case "tete" :
				for(var q=0;q<Joueurs.length;q++){
					if(ws===Joueurs[q].ws){
						Joueurs[q].nexttete=[msg.x,msg.y];
					}
				}
				break;
		}		



	});


});

function onFrame() 
{
	update();
}
function begin(Joueurs){
	var TabSerpent=[];
	for(var i=0;i<Joueurs.length;i++){
		TabSerpent.push(Joueurs[i].Serpent);
	}
	for(var y=0;y<Joueurs.length;y++){
		var message = { 
				type : "majserpents",
				Serpent : TabSerpent,
				index : y
		};
		try { 
			Joueurs[y].ws.send(JSON.stringify(message));
		}
		catch (e) { 
			deleteplayer(y);
		}
	}	
}
function deleteplayer(o){
	Joueurs[o].ws.close();
	console.log("Joueur %s deconnecté, %s joueurs restant", o , Joueurs.length);
	Joueurs.splice(o,1); 
	console.log("Joueur %s deconnecté, %s joueurs restant", o , Joueurs.length);
	for(var y=0;y<Joueurs.length;y++){
		var message = { 
				type : "delserpents",
				Serpent : TabSerpent,
				index : y
		};
		try { 
			Joueurs[y].ws.send(JSON.stringify(message));
		}
		catch (e) { 
			deleteplayer(y);
		}
	}
}
function update(){


	for (var i = taille-1 ; i > 0 ; i--) {
		for(var y=0;y<Joueurs.length;y++){

			var ax= Joueurs[y].Serpent[i-1].x;
			var ay= Joueurs[y].Serpent[i-1].y;

			Joueurs[y].Serpent[i].x= ax;
			Joueurs[y].Serpent[i].y= ay;
		}
	}

	for(var e=0;e<Joueurs.length;e++){
		Joueurs[e].Serpent[0].x += Joueurs[e].nexttete[0];
		Joueurs[e].Serpent[0].y += Joueurs[e].nexttete[1];
	}



	var TabSerpent=[];
	for(var r=0;r<Joueurs.length;r++){
		TabSerpent.push(Joueurs[r].Serpent);
	}

	for(var t=0;t<Joueurs.length;t++){
		var message = { 
				type : "majserpents",
				Serpent : TabSerpent,
				index : t
		};
		try { 
			Joueurs[t].ws.send(JSON.stringify(message));
		}
		catch (e) { 
			deleteplayer(t);
		}

	}
}










var Model = require('./Modele');
var WebSocket = require('ws');

ws = new WebSocket('ws://localhost:8667');

ws.on('open', function() {
	console.log('Connecte au server');
	


});
/*
ws.on('message', function(message) {
	var point = JSON.parse(message);


};
ws.send(JSON.stringify(serpent));
});*/

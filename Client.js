var WebSocket = require('ws');

ws = new WebSocket('ws://localhost:8667');

ws.on('open', function() {
    ws.send('something');
});
ws.on('message', function(message) {
    console.log('received: %s', message);
});
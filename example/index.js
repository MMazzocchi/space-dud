const HOST = '0.0.0.0';
const PORT = 3000;

// Set up the express app and space-dud.
var express = require('express');
var app = express();
var http = require('http').Server(app);
var space_dud = require('space-dud')(http);

// On every event, pass it on to any connected consumers
var game = space_dud.getGame();
game.on('player_ready', function(player) {
  player.on('controller_event', player.sendEventToConsumers);
});

// Start the game server
space_dud.start();

// Serve the static client files.
app.use('/controller.html', express.static(__dirname+'/controller.html'));
app.use('/display.html', express.static(__dirname+'/display.html'));

// Start the server.
http.listen(PORT, HOST, function(){
  console.log('listening on '+HOST+':'+PORT);
});

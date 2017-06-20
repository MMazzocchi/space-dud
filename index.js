var HOST = '0.0.0.0';
var PORT = 3000;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/controller', express.static(__dirname + '/controller_client'));
app.use('/css', express.static(__dirname + '/controller_client/css'));
app.use('/js', express.static(__dirname + '/controller_client/js'));

app.use('/display', express.static(__dirname + '/display_client'));
app.use('/css', express.static(__dirname + '/display_client/css'));
app.use('/js', express.static(__dirname + '/display_client/js'));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); 
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); 
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); 
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 

var Game = require('./server/Game.js');
var Player = require('./server/Player.js');
var ControllerClient = require('./server/ControllerClient.js');
var DisplayClient = require('./server/DisplayClient.js');

var game = new Game();

app.get('/', function(req, res){
  console.log("Request for /");
  res.sendFile(__dirname + '/html/index.html');
});

http.listen(PORT, HOST, function(){
  console.log('listening on '+HOST+':'+PORT);
});

io.on('connection', function(socket) {
  console.log("User connected.");

  socket.on('set_role', function(role) {
    if(role == 'controller') {
      var player = new Player();
      var client = new ControllerClient(socket);
      player.setControllerClient(client);

      var player_id = game.addPlayer(player);
      socket.emit('player_id', player_id);

    } else if(role == 'display') {
      socket.on('choose_player', function(player_id) {
        var player = game.getPlayer(player_id);
        var client = new DisplayClient(socket);
        player.setDisplayClient(client);
      });

      socket.emit('player_list', game.getPlayerList());
    }
  });
});

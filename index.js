var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); 
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); 
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); 
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 

app.use('/js', express.static(__dirname + '/js')); 
app.use('/css', express.static(__dirname + '/css'));

var Game = require('./server/Game.js');
var Player = require('./server/Player.js');

var game = new Game();

app.get('/', function(req, res){
  console.log("Request for /");
  res.sendFile(__dirname + '/html/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket) {
  console.log("User connected.");
  socket.emit('game_data', game);

  socket.on('add_player', function() {
    var player = new Player();
    game.addPlayer(player);
    socket.emit('game_data', game);
  });

  socket.on('choose_role', function(data) {
    console.log("Role chosen.");
    console.log(JSON.stringify(data));

    var role = data.role;

    if(role == 'player') {
      var player_id = data.player_id;
      var part = data.part;

      var player = game.getPlayer(player_id);
      if(part == "display") {
        console.log("Chose player "+player_id+" display");
      } else if(part == "controller") {
        console.log("Chose player "+player_id+" controller");
      }
    } else if(role == "manager") {
      console.log("Chose manager");
    }
  });
});

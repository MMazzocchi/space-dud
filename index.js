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

  socket.on('choose_role', function(role) {
    console.log("Role chose: "+role);

    if(role == 'player') {

    }
  });
});

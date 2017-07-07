var debug = require('debug')('space-dud:App');

var Game = require('./Game.js');
var Player = require('./Player.js');
var ControllerClient = require('./ControllerClient.js');
var DisplayClient = require('./DisplayClient.js');

function createPlayer(socket) {
  var player = new Player();
  socketToPlayerMap[socket.id] = player;

  return player;
};

function setSocketToPlayer(socket, player) {
  socketToPlayerMap[socket.id] = player;
}

function chooseControllerRole(socket) {
  debug('Client chose the "controller" role.');

  var player = createPlayer.call(this, socket);
  var client = new ControllerClient(socket);
  player.setControllerClient(client);

  var player_id = game.addPlayer(player);
  socket.emit('player_id', player_id);
};

function chooseDisplayRole(socket) {
  debug('Client chose the "display" role.');

  socket.on('choose_player', function(player_id) {
    var player = game.getPlayer(player_id);

    if(player == undefined) {
      debug('Display client chose invalid player with id: '+player_id);
      socket.emit('valid_player_choice', false);

    } else {
      debug('Display client chose valid player with id: '+player_id);
      setSocketToPlayer.call(this, socket, player);

      var client = new DisplayClient(socket);
      player.setDisplayClient(client);

      socket.emit('valid_player_choice', true);
    }
  });
};

function setRole(role, socket) {
  if(role == 'controller') {
    chooseControllerRole.call(this, socket);

  } else if(role == 'display') {
    chooseDisplayRole.call(this, socket);

  } else {
    debug('Client chose an invalid role: '+role);
  }
};

var GameServer = function(http) {
  
  this.io = require('socket.io')(http);
  this.game = new Game();

  this.socketToPlayerMap = {};

  io.on('connection', function(socket) {
    debug('Client connected.');

    socket.on('set_role', function(role) {
      setRole.call(this, role, socket);
    });
  });
};

module.exports = GameServer; 

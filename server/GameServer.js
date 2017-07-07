var debug = require('debug')('space-dud:GameServer');

var Game = require('./Game.js');
var Player = require('./Player.js');
var DisplayClient = require('./DisplayClient.js');

function chooseControllerRole(socket) {
  debug('Client chose the "controller" role.');
  this.game.createControllerClient(socket);
};

function chooseDisplayRole(socket) {
  debug('Client chose the "display" role.');

  var server = this;
  socket.on('choose_player', function(player_id) {

    try {
      server.game.createDisplayClient(socket, player_id);
      debug('Display client chose valid player with id: '+player_id);
      socket.emit('valid_player_choice', true);
  
    } catch(e) {
      debug('An error occured while creating the display client: '+e.message);
      socket.emit('valid_player_choice', false);
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
    socket.disconnect(true);
  }
};

var GameServer = function(http) {
  
  this.io = require('socket.io')(http);
  this.game = new Game();

  var server = this;
  io.on('connection', function(socket) {
    debug('Client connected.');

    socket.on('set_role', function(role) {
      setRole.call(server, role, socket);
    });
  });
};

module.exports = GameServer; 

var debug = require('debug')('space-dud:GameServer');

var Game = require('./Game.js');

function chooseControllerRole(socket) {
  debug('Client chose the "controller" role.');
  this.game.createControllerClient(socket);
};

function chooseDisplayRole(socket) {
  debug('Client chose the "display" role.');

  socket.on('choose_player', (player_id) => {

    try {
      this.game.createDisplayClient(socket, player_id);
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
  
  this.io = require('socket.io')(http).of('/space-dud');
  this.game = new Game();

  this.io.on('connection', (socket) => {
    debug('Client connected.');

    socket.on('set_role', (role) => {
      setRole.call(this, role, socket);
    });
  });
};

module.exports = GameServer; 

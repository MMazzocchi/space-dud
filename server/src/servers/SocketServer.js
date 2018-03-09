var debug = require('debug')('space-dud:SocketServer');
var Socket = require('socket.io');

var SocketServer = function(game, http) {
  var that = {};

  debug('Setting up SocketServer.');

  // Fields
  var io = Socket(http).of('/space-dud');

  // Private functions
  function chooseControllerRole(socket) {
    debug('Client chose the "controller" role.');

    game.createControllerClient(socket);
  };
  
  function chooseDisplayRole(socket) {
    debug('Client chose the "display" role.');
  
    socket.on('choose_player', (player_id) => {
      try {
        game.createDisplayClient(socket, player_id);
        debug('Display client chose valid player with id: '+player_id);
        socket.emit('valid_player_choice', true);
    
      } catch(e) {
        debug('An error occured while creating the display client: '+e.stack);
        socket.emit('valid_player_choice', false);
      }
    });
  };
  
  function setRole(role, socket) {
    if(role === 'controller') {
      chooseControllerRole(socket);
  
    } else if(role === 'display') {
      chooseDisplayRole(socket);
  
    } else {
      debug('Client chose an invalid role: '+role);
      socket.disconnect(true);
    }
  };
  
  function setupServer() {
    io.on('connection', (socket) => {
      debug('Client connected.');
  
      socket.on('set_role', (role) => {
        setRole(role, socket);
      });
    });
  }

  // After instantiation, set up the server
  setupServer();

  return that;
};

module.exports = SocketServer; 

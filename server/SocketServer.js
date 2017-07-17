var debug = require('debug')('space-dud:SocketServer');
var Socket = require('socket.io');

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

function serveStaticFile(req, res) {
  var filename = req.url.substr(req.url.lastIndexOf("/")+1);
  var path = __dirname+"/../client/"+filename
  if(exists(path)) {
    res.setHeader('Content-Type', 'application/javascript');
    res.writeHead(200);
    res.end(read(path));
  } else {
    res.writeHead(404);
    res.end();
  }
}

function setupServer(http) {
  this.io = Socket(http).of('/space-dud');
  this.io.on('connection', (socket) => {
    debug('Client connected.');

    socket.on('set_role', (role) => {
      setRole.call(this, role, socket);
    });
  });
}

var SocketServer = function(http) {
  this.game = new Game();
  setupServer.call(this, http);
};

module.exports = SocketServer; 

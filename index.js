module.exports = function(http) {
  var io = require('socket.io')(http);
  
  var Game = require('./server/Game.js');
  var Player = require('./server/Player.js');
  var ControllerClient = require('./server/ControllerClient.js');
  var DisplayClient = require('./server/DisplayClient.js');
  
  var game = new Game();
  
  io.on('connection', function(socket) {
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
          if(player == undefined) {
            socket.emit('valid_player_choice', false);

          } else {
            var client = new DisplayClient(socket);
            player.setDisplayClient(client);

            socket.emit('valid_player_choice', true);
          }
        });
      }
    });
  });
}

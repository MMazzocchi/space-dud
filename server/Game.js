var Game = function() {

  var that = {};

  // Imports
  var Player = require('./Player.js');
  var ControllerClient = require('./ControllerClient.js');
  var DisplayClient = require('./DisplayClient.js');

  // Fields
  var debug = require('debug')('space-dud:Game');
  var shortid = require('shortid');
  var player_lookup = {};

  debug('Created a new Game.');

  // Private functions
  function addPlayer(player) {
    var player_id = shortid.generate();
    player_lookup[player_id] = player;
  
    debug('Added a new player with id: '+player_id);
  
    return player_id;
  };
 
  // Public functions
  that.createControllerClient = function(socket) {
    var player = new Player();
    var client = new ControllerClient(socket);
    player.setControllerClient(client);
  
    var player_id = addPlayer(player);
    client.sendPlayerId(player_id);
  
    return that;
  };
  
  that.createDisplayClient = function(socket, player_id) {
    var player = that.getPlayer(player_id);
    if(player === undefined) {
      throw new Error('No player with id '+player_id+' exists.');
  
    } else if(player.hasDisplayClient()) {
      throw new Error('Player '+player_id+' already has a display client.');
  
    } else {
      var client = new DisplayClient(socket);
      player.setDisplayClient(client);
    }
  
    return that;
  };
 
  that.getPlayer = function(player_id) {
    if(player_lookup[player_id]) {
      return player_lookup[player_id];
    } else {
      return undefined;
    }
  };

  return that;
}

module.exports = Game;

var Observable = require('./Observable.js');

var Game = function() {

  var that = new Observable('player_ready');

  // Imports
  var Player = require('./Player.js');
  var ControllerClient = require('./clients/ControllerClient.js');
  var DisplayClient = require('./clients/DisplayClient.js');

  // Fields
  var debug = require('debug')('space-dud:Game');
  var shortid = require('shortid');
  var player_lookup = {};

  debug('Created a new Game.');

  // Private functions
  function addPlayer(player, player_id) {
    player_lookup[player_id] = player;
  
    debug('Added a new player with id: '+player_id);
  
    return that;
  };

  function removePlayer(player_id) {
    player_lookup[player_id] = undefined;
  };

  // Public functions
  that.createControllerClient = function(socket) {
    var player_id = shortid.generate();
    var player = new Player(player_id);

    addPlayer(player, player_id);
    player.onDisconnect(function() {
      removePlayer(player_id);
    });

    var client = new ControllerClient(socket);
    player.setControllerClient(client);

    client.sendPlayerId(player_id);
    that.triggerPlayerReady(player);
 
    return that;
  };
  
  that.createDisplayClient = function(socket, player_id) {
    var player = that.getPlayer(player_id);
    if(player === undefined) {
      throw new Error('No player with id '+player_id+' exists.');
  
    } else {
      var client = new DisplayClient(socket);
      player.addConsumerClient(client);
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

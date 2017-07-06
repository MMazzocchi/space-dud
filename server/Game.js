var debug = require('debug')('space-dud:Game');
var uuid = require('uuid/v1');

var Game = function() {
  debug('Created a new Game.');

  this.manager = null;
  this.player_lookup = {};
};

Game.prototype.addPlayer = function(player) {
  var player_id = uuid();
  this.player_lookup[player_id] = player;

  debug('Added a new player with id: '+player_id);

  return player_id;
};

Game.prototype.getPlayer = function(player_id) {
  if(this.player_lookup[player_id]) {
    return this.player_lookup[player_id];
  } else {
    return undefined;
  }
};

module.exports = Game;

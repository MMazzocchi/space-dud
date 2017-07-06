var debug = require('debug')('space-dud:Game');

var Game = function() {
  debug('Created a new Game.');

  this.PLAYER_ID_INTERVAL = 100000+Math.floor(Math.random()*100000);

  this.manager = null;
  this.player_lookup = {};

  this.next_player_id = Date.now() + this.PLAYER_ID_INTERVAL;
};

function getNewPlayerId() {
  var id = this.next_player_id;
  this.next_player_id += this.PLAYER_ID_INTERVAL;
  return id;
}

Game.prototype.addPlayer = function(player) {
  var player_id = getNewPlayerId.call(this);
  this.player_lookup[player_id] = player;

  debug('Added a new player with id: '+player_id);

  this.next_player_id += 1;
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

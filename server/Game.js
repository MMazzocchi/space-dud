var Game = function() {
  this.manager = undefined;
  this.player_lookup = {};

  this.next_player_id = 0;
};

Game.prototype.addPlayer = function(player) {
  var player_id = this.next_player_id;
  this.player_lookup[player_id] = player;

  this.next_player_id += 1;
  return player_id;
};

Game.prototype.getPlayer = function(player_id) {
  return this.player_lookup[player_id];
};

module.exports = Game;

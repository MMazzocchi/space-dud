var Game = function() {
  this.PLAYER_ID_INTERVAL = 100000+Math.floor(Math.random()*100000);

  this.manager = null;
  this.player_lookup = {};

  this.next_player_id = Date.now() + this.PLAYER_ID_INTERVAL;
};

Game.prototype.getNewPlayerId = function() {
  var id = this.next_player_id;
  this.next_player_id += this.PLAYER_ID_INTERVAL;
  return id;
}

Game.prototype.addPlayer = function(player) {
  var player_id = this.getNewPlayerId();
  this.player_lookup[player_id] = player;

  this.next_player_id += 1;
  return player_id;
};

Game.prototype.getPlayer = function(player_id) {
  return this.player_lookup[player_id];
};

Game.prototype.toJSON = function() {
  var info = {
    'players': {},
    'manager': this.manager
  };

  for(var player_id in this.player_lookup) {
    var player = this.player_lookup[player_id];
    info['players'][player_id] = player;
  }

  return info;
};

module.exports = Game;

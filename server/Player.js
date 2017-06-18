var Player = function() {
  this.display_client = undefined;
  this.controller_client = undefined;
}

Player.prototype.setDisplayClient = function(client) {
  this.display_client = client;
}

Player.prototype.setControllerClient = function(client) {
  this.controller_client = client;
}

module.exports = Player;

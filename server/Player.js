var Player = function() {
  this.display_client = null;
  this.controller_client = null;
}

Player.prototype.setDisplayClient = function(client) {
  this.display_client = client;
}

Player.prototype.setControllerClient = function(client) {
  this.controller_client = client;
}

Player.prototype.toJSON = function() {
  var info = {
    'display': this.display_client,
    'controller': this.controller_client
  };

  return info;
}

module.exports = Player;

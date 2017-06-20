var Player = function() {
  this.display_client = null;
  this.controller_client = null;
}

Player.prototype.setDisplayClient = function(client) {
  this.display_client = client;

  if(this.controller_client != null) {
    this.controller_client.setDisplayClient(client);
  }
}

Player.prototype.hasDisplayClient = function() {
  return (this.display_client == undefined);
};

Player.prototype.setControllerClient = function(client) {
  this.controller_client = client;

  if(this.display_client != null) {
    this.controller_client.setDisplayClient(this.display_client);
  }
}

Player.prototype.hasControllerClient = function() {
  return (this.controller_client == undefined);
};

Player.prototype.toJSON = function() {
  var info = {
    'display': this.display_client,
    'controller': this.controller_client
  };

  return info;
}

module.exports = Player;

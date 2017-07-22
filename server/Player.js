var debug = require('debug')('space-dud:Player');

var Player = function() {
  debug('Created a new Player.');

  this.display_client = null;
  this.controller_client = null;
}

Player.prototype.setDisplayClient = function(client) {
  debug('Connected a display client.');

  this.display_client = client;

  if(this.controller_client !== null) {
    this.controller_client.setDisplayClient(client);
    this.controller_client.dumpState();
  }

  return this;
}

Player.prototype.hasDisplayClient = function() {
  return (this.display_client !== null);
};

Player.prototype.setControllerClient = function(client) {
  debug('Connected a controller client.');

  this.controller_client = client;

  if(this.display_client !== null) {
    this.controller_client.setDisplayClient(this.display_client);
    this.controller_client.dumpState();
  }

  return this;
}

Player.prototype.hasControllerClient = function() {
  return (this.controller_client != null);
};

module.exports = Player;

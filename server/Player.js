var Player = function() {
  this.display_client = undefined;
  this.controller_client = undefined;
}

Player.prototype.setDisplayClient(client) {
  this.display_client = client;
}

Player.prototype.setControllerClient(client) {
  this.controller_client = client;
}

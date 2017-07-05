var ControllerClient = function(socket) {
  this.socket = socket;
  var client = this;

  this.socket.on("controller_event", function(controller_event) {
    if(client.display_client) {
      client.display_client.sendEvent(controller_event);
    }
  });
};

ControllerClient.prototype.setDisplayClient = function(display_client) {
  this.display_client = display_client;
};

ControllerClient.prototype.dumpState = function() {
  this.socket.emit('dump_state');
};

module.exports = ControllerClient;

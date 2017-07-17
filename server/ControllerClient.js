var debug = require('debug')('space-dud:ControllerClient');

var ControllerClient = function(socket) {
  debug('Created a new controller client.');

  this.socket = socket;

  this.socket.on("controller_event", (controller_event) => {
    if(this.display_client) {
      this.display_client.sendEvent(controller_event);

    } else {
      debug('No display client was connected to this controller client. '+
            'An event was dropped.');
    }
  });
};

ControllerClient.prototype.setDisplayClient = function(display_client) {
  this.display_client = display_client;

  return this;
};

ControllerClient.prototype.dumpState = function() {
  debug('Requesting a state dump.');

  this.socket.emit('dump_state');
  return this;
};

ControllerClient.prototype.sendPlayerId = function(player_id) {
  this.socket.emit('player_id', player_id);

  return this;
};

module.exports = ControllerClient;

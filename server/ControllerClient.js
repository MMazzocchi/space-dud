var debug = require('debug')('gamepad-event-tunnel:ControllerClient');

var ControllerClient = function(socket) {
  debug('Created a new controller client.');

  this.socket = socket;
  var client = this;

  this.socket.on("controller_event", function(controller_event) {
    if(client.display_client) {
      client.display_client.sendEvent(controller_event);

    } else {
      debug('No display client was connected to this controller client. '+
            'An event was dropped.');
    }
  });
};

ControllerClient.prototype.setDisplayClient = function(display_client) {
  this.display_client = display_client;
};

ControllerClient.prototype.dumpState = function() {
  debug('Requesting a state dump.');

  this.socket.emit('dump_state');
};

module.exports = ControllerClient;

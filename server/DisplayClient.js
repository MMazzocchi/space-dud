var debug = require('debug')('gamepad-event-tunnel:DisplayClient');

var DisplayClient = function(socket) {
  debug('Created a new DisplayClient.');

  this.socket = socket;
};

DisplayClient.prototype.sendEvent = function(controller_event) {
  this.socket.emit('controller_event', controller_event);
};

module.exports = DisplayClient;

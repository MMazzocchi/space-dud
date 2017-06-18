var DisplayClient = function(socket) {
  this.socket = socket;
};

DisplayClient.prototype.sendEvent = function(controller_event) {
  this.socket.emit('controller_event', controller_event);
};

module.exports = DisplayClient;

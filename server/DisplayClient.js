var DisplayClient = function(socket) {
  this.socket = socket;
};

DisplayClient.prototype.sendEvent = function(controller_event) {
  this.socket.emit('controller_event', controller_event);
};

DisplayClient.prototype.toJSON = function() {
  return "DisplayClient";
};

module.exports = DisplayClient;

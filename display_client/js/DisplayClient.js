var DisplayClient = function(socket) {
  this.socket = socket;
  this.anyChangeCallback = undefined;
  var client = this;
  socket.on('controller_event', function(data) {
    client.processEvent(data);
  });
};

DisplayClient.prototype.onAnyChange = function(callback) {
  this.anyChangeCallback = callback;
};

DisplayClient.prototype.processEvent = function(data) {
  if(this.anyChangeCallback != undefined) {
    this.anyChangeCallback(data);
  }
};

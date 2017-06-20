var DisplayClient = function(socket) {
  this.socket = socket;
  var client = this;
  socket.on('controller_event', function(data) {
    client.processEvent(data);
  });
};

DisplayClient.prototype.processEvent = function(data) {
  console.log(data);
};

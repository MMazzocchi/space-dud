var Observable = require('../Observable.js');

var Client = function(socket) {
  var that = new Observable('disconnect');
  socket.on('disconnect', that.triggerDisconnect);

  return that;
};

module.exports = Client;

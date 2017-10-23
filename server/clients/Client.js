var EventEmitter = require('events');

var Client = function(socket) {
  var that = new EventEmitter();

  socket.on('disconnect', function(...args) {
    that.emit('disconnect', ...args);
  });

  return that;
};

module.exports = Client;

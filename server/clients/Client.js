var EventEmitter = require('events');
var debug = require('debug')('space-dud:Client');

var Client = function(socket) {
  var that = new EventEmitter();

  debug('Created a new client.');

  socket.on('disconnect', function(...args) {
    debug('Client socket disconnected.');

    that.emit('disconnect', ...args);
  });

  return that;
};

module.exports = Client;

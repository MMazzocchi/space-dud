var ConsumerClient = require("./ConsumerClient.js");

var DisplayClient = function(socket) {
  var that = new ConsumerClient(socket);

  // Fields
  var debug = require('debug')('space-dud:DisplayClient');
  debug('Created a new DisplayClient.');

  // Public functions
  that.consume = function(data) {
    socket.emit('game_event', data);

    return that;
  };

  return that;
};

module.exports = DisplayClient;

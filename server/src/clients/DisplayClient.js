var ConsumerClient = require("./ConsumerClient.js");
var debug = require('debug')('space-dud:DisplayClient');

var DisplayClient = function(socket) {
  var that = new ConsumerClient(socket);

  // Fields
  debug('Created a new DisplayClient.');

  // Public functions
  that.consume = function(data) {
    socket.emit('game_event', data);

    return that;
  };

  return that;
};

module.exports = DisplayClient;

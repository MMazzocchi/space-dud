var ConsumerClient = require("./ConsumerClient.js");

var DisplayClient = function(socket) {

  var that = new ConsumerClient();

  // Fields
  var debug = require('debug')('space-dud:DisplayClient');
  debug('Created a new DisplayClient.');

  // Private functions

  // Public functions
  // Override
  that.consume = function(controller_event) {
    socket.emit('controller_event', controller_event);

    return that;
  };

  return that;
};

module.exports = DisplayClient;

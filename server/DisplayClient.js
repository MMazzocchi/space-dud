var DisplayClient = function(socket) {

  var that = {};

  // Fields
  var debug = require('debug')('space-dud:DisplayClient');
  debug('Created a new DisplayClient.');

  // Private functions

  // Public functions
  that.sendEvent = function(controller_event) {
    socket.emit('controller_event', controller_event);

    return that;
  };

  return that;
};

module.exports = DisplayClient;

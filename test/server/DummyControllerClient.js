var Client = require('../../server/clients/Client.js');
var DummySocket = require('./DummySocket.js');

var DummyControllerClient = function() {
  var socket = new DummySocket();
  var that = new Client(socket);

  // Fields
  var event_callback = undefined;

  // Public functions
  that.onControllerEvent = function(callback) {
    event_callback = callback;
  };

  that.controllerEvent = function(controller_event) {
    that.emit('controller_event', controller_event);
  };

  that.dumpState = function() {};

  return that;
};

module.exports = DummyControllerClient;

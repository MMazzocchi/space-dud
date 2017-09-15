var Observable = require('../shared/Observable.js');

var DummyControllerClient = function() {
  var that = new Observable('disconnect');

  // Fields
  var event_callback = undefined;

  // Public functions
  that.onControllerEvent = function(callback) {
    event_callback = callback;
  };

  that.controllerEvent = function(controller_event) {
    if(event_callback !== undefined) {
      event_callback(controller_event);
    }
  };

  that.dumpState = function() {};

  return that;
};

module.exports = DummyControllerClient;

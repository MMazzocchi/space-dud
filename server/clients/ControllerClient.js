var ControllerClient = function(socket) {
  var debug = require('debug')('space-dud:ControllerClient');
  debug('Created a new controller client.');

  var that = {};

  // Fields
  var event_callback = undefined;

  // Private functions
  function setup() {
    socket.on("controller_event", (controller_event) => {
      if(event_callback !== undefined) {
        event_callback(controller_event);

      } else {
        debug('No event callback was defined for this controller client. '+
              'An event was dropped.');
      }
    });
  };

  // Public functions
  that.onControllerEvent = function(callback) {
    event_callback = callback;
  };

  that.dumpState = function() {
    debug('Requesting a state dump.');
    socket.emit('dump_state');

    return that;
  };

  that.sendPlayerId = function(player_id) {
    socket.emit('player_id', player_id);
  
    return that;
  };

  // After instantiation, setup
  setup();

  return that;
};

module.exports = ControllerClient;

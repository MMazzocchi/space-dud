var Observable = require('../Observable.js');

var ControllerClient = function(socket) {
  var debug = require('debug')('space-dud:ControllerClient');
  debug('Created a new controller client.');

  var that = new Observable('controller_event');

  // Fields
  var event_callback = undefined;

  // Private functions
  function setup() {
    socket.on("controller_event", that.triggerControllerEvent);
  };

  // Public functions
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

var Client = require('./Client.js');

var ControllerClient = function(socket) {
  var debug = require('debug')('space-dud:ControllerClient');
  debug('Created a new controller client.');

  var that = new Client(socket);

  // Private functions
  function setup() {
    socket.on("controller_event", function(...args) {
      that.emit('controller_event', ...args);
    });
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

  /**
   * @deprecated
   */
  that.onControllerEvent = function(...args) {
    console.log('ControllerClient.onControllerEvent is deprecated. Use ControllerClient.on('+
                '"controller_event",...) instead. This method will be removed '+
                'in release 2.6.0.');
    that.on("controller_event", ...args);
  };

  /**
   * @deprecated
   */
  that.triggerControllerEvent = function(...args) {
    console.log('ControllerClient.triggerControllerEvent is deprecated. Use ControllerClient.emit('+
                '"controller_event",...) instead. This method will be removed '+
                'in release 2.6.0.');
    that.emit("controller_event", ...args);
  };

  // After instantiation, setup
  setup();

  return that;
};

module.exports = ControllerClient;

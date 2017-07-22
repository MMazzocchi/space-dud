var ControllerClient = function(socket) {
  var debug = require('debug')('space-dud:ControllerClient');
  debug('Created a new controller client.');

  var that = {};

  // Fields
  var display_client = undefined;

  socket.on("controller_event", (controller_event) => {
    if(display_client !== undefined) {
      display_client.sendEvent(controller_event);

    } else {
      debug('No display client was connected to this controller client. '+
            'An event was dropped.');
    }
  });

  // Private functions

  // Public functions
  that.setDisplayClient = function(new_display_client) {
    display_client = new_display_client;
  
    return that;
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

  return that;
};

module.exports = ControllerClient;

var Client = require('./Client.js');
var debug = require('debug')('space-dud:ControllerClient');

var ControllerClient = function(socket) {
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
    debug('Sending player id.');
    socket.emit('player_id', player_id);
  
    return that;
  };

  // After instantiation, setup
  setup();

  return that;
};

module.exports = ControllerClient;

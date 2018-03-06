var EventEmitter = require('events');
var Connection = require('./Connection.js');

var ControllerConnection = function(controller_type) {
  var that = Connection.mixin(new EventEmitter(), 'controller');

  // Fields
  var socket = that.getSocket();

  // Private methods
  function setup() {
    socket.on('get_controller_type', function(data, acknowledge) {
      acknowledge(controller_type);
    });

    socket.on('player_id', function(player_id) {
      that.emit('player_id', player_id);
    });
  };

  // Public methods
  that.sendEvent = function(id, type, value) {
    var data = {
      'event_type': 'controller',
      'id': id,
      'type': type,
      'value': value
    };

    socket.emit('controller_event', data);
  };

  setup();

  return that;
};

module.exports = ControllerConnection;

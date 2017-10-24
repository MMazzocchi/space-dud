var io = require('socket.io-client');
var EventEmitter = require('events');

var DisplayConnection = function() {
  var that = new EventEmitter();

  // Fields
  var player_id = undefined;
  var socket = io('/space-dud');

  // Private functions
  function setup() {
    socket.on('game_event', (data) => {
      processEvent.call(that, data);
    });
 
    socket.on('valid_player_choice', (valid) => {
      if(valid === false) {
        player_id = undefined;
      }
  
      that.emit('player_chosen', valid);
    });

    socket.emit('set_role', 'display');
  };
 
  function processEvent(data) {
    that.emit('event', data);

    if(data.event_type !== undefined) {
      that.emit(data.event_type, data);
    }
  };
 
  // Public functions

  /**
   * @deprecated
   */
  that.onEventType = function(event_type, callback) {
    console.warn("DisplayConnection.onEventType is deprecated, and will be "+
                 "removed in release 2.7.0. Use DisplayConnection.on(<event "+
                 "type>, <callback>) instead.");
    that.on(event_type, callback);
    return that;
  };

  /**
   * @deprecated
   */
  that.offEventType = function(event_type, callback) {
    console.warn("DisplayConnection.offEventType is deprecated, and will be "+
                 "removed in release 2.7.0. Use "+
                 "DisplayConnection.removeListener(<event type>, <callback>) "+
                 "instead.");
    that.removeListener(event_type, callback);
    return that;
  };

  /**
   * @deprecated
   */
  that.clearEventType = function(event_type) {
    console.warn("DisplayConnection.offEventType is deprecated, and will be "+
                 "removed in release 2.7.0. Use "+
                 "DisplayConnection.removeAllListeners(<event type>, "+
                 "<callback>) instead.");
    that.removeAllListeners(event_type);
    return that;
  };

  that.selectPlayer = function(selected_player_id) {
    player_id = selected_player_id; 
    socket.emit('choose_player', selected_player_id);

    return that;
  };

  that.getPlayerId = function() {
    return player_id;
  };

  setup();

  return that;
};

module.exports = DisplayConnection;

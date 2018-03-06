var EventEmitter = require('events');
var Connection = require('./Connection.js');

var DisplayConnection = function() {
  var that = Connection.mixin(new EventEmitter(), 'display');

  // Fields
  var player_id = undefined;
  var socket = that.getSocket(); 

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
  };
 
  function processEvent(data) {
    that.emit('event', data);

    if(data.event_type !== undefined) {
      that.emit(data.event_type, data);
    }
  };
 
  // Public functions
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

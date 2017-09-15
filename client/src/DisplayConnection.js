var Observable = require('../../shared/Observable.js');

var DisplayConnection = function() {

  var that = new Observable('event', 'player_chosen');

  // Fields
  var player_id = undefined;
  var observable_map = {};

  var socket = io('/space-dud');
  socket.on('game_event', (data) => {
    processEvent.call(that, data);
  });
  
  // Private functions
  function processEvent(data) {
    that.triggerEvent(data);

    if(observable_map[data.event_type] !== undefined) {
      observable_map[data.event_type].triggerEvent(data);
    }
  };
 
  // Public functions
  that.onEventType = function(event_type, callback) {
    var observable = new Observable('event');
    observable.onEvent(callback);

    observable_map[event_type] = observable;
    return that;
  };

  that.selectPlayer = function(selected_player_id) {
    socket.on('valid_player_choice', (valid) => {
      if(valid) {
        player_id = selected_player_id;
      }
  
      that.triggerPlayerChosen(valid);
    });
  
    socket.emit('choose_player', selected_player_id);

    return that;
  };

  that.getPlayerId = function() {
    return player_id;
  };
  
  // After all instantiation, set the role to display
  socket.emit('set_role', 'display');

  return that;
};

module.exports = DisplayConnection;

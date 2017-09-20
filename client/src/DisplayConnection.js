var Observable = require('../../shared/Observable.js');

var DisplayConnection = function() {

  var that = new Observable('event', 'player_chosen');

  // Fields
  var player_id = undefined;
  var observable_map = {};

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
  
      that.triggerPlayerChosen(valid);
    });

    socket.emit('set_role', 'display');
  };
 
  function processEvent(data) {
    that.triggerEvent(data);

    if(observable_map[data.event_type] !== undefined) {
      observable_map[data.event_type].triggerEvent(data);
    }
  };
 
  // Public functions
  that.onEventType = function(event_type, callback) {
    if(observable_map[event_type] === undefined) {
      var observable = new Observable('event');
      observable_map[event_type] = observable;
    }

    observable_map[event_type].onEvent(callback);
    return that;
  };

  that.offEventType = function(event_type, callback) {
    var observable = observable_map[event_type];
    if(observable !== undefined) {
      observable.offEvent(callback);
    }

    return that;
  };

  that.clearEventType = function(event_type) {
    var observable = observable_map[event_type];
    if(observable !== undefined) {
      observable.clearEvent();
    }

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

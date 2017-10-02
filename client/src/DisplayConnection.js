var EventEmitter = require('events');

var DisplayConnection = function() {
  var that = new EventEmitter();

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
  
      that.emit('player_chosen', valid);
    });

    socket.emit('set_role', 'display');
  };
 
  function processEvent(data) {
    that.emit('event', data);

    if(observable_map[data.event_type] !== undefined) {
      observable_map[data.event_type].emit('event', data);
    }
  };
 
  // Public functions
  that.onEventType = function(event_type, callback) {
    if(observable_map[event_type] === undefined) {
      var observable = new EventEmitter;
      observable_map[event_type] = observable;
    }

    observable_map[event_type].on('event', callback);
    return that;
  };

  that.offEventType = function(event_type, callback) {
    var observable = observable_map[event_type];
    if(observable !== undefined) {
      observable.removeListener('event', callback);
    }

    return that;
  };

  that.clearEventType = function(event_type) {
    var observable = observable_map[event_type];
    if(observable !== undefined) {
      observable.removeAllListeners('event');
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

  /**
   * @deprecated
   */
  that.onEvent = function(callback) {
    console.log('DisplayConnection.onEvent is deprecated. Use DisplayConnection.on("event",'+
                '...) instead. This method will be removed in release 2.6.0.');
    that.on('event', callback);
  };

  /**
   * @deprecated
   */
  that.triggerEvent = function(...args) {
    console.log('DisplayConnection.triggerEvent is deprecated. Use DisplayConnection.emit("event",'+
                '...) instead. This method will be removed in release 2.6.0.');
    that.emit('event', ...args);
  };

  /**
   * @deprecated
   */
  that.onPlayerChosen = function(callback) {
    console.log('DisplayConnection.onPlayerChosen is deprecated. Use DisplayConnection.on("player_chosen",'+
                '...) instead. This method will be removed in release 2.6.0.');
    that.on('player_chosen', callback);
  };

  /**
   * @deprecated
   */
  that.triggerPlayerChosen = function(...args) {
    console.log('DisplayConnection.triggerPlayerChosen is deprecated. Use DisplayConnection.emit("player_chosen",'+
                '...) instead. This method will be removed in release 2.6.0.');
    that.emit('player_chosen', ...args);
  }; 
  
  setup();

  return that;
};

module.exports = DisplayConnection;

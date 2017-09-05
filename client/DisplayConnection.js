var DisplayConnection = function() {

  var that = {};

  // Fields
  var eventCallback = undefined;
  var choosePlayerCallback = undefined;
  var player_id = undefined;
  var callback_map = {};

  var socket = io('/space-dud');
  socket.on('game_event', (data) => {
    processEvent.call(that, data);
  });
  
  // Private functions
  function processEvent(data) {
    if(eventCallback !== undefined) {
      eventCallback(data);
    }

    if(callback_map[data.event_type] !== undefined) {
      callback_map[data.event_type](data);
    }
  };
 
  // Public functions
  that.onEvent = function(callback) {
    eventCallback = async function(data) {
      callback(data);
    };

    return that;
  };

  that.onEventType = function(event_type, callback) {
    callback_map[event_type] = async function(data) {
      callback(data);
    };

    return that;
  };

  that.selectPlayer = function(selected_player_id, callback) {
    if(choosePlayerCallback === undefined) {
      socket.on('valid_player_choice', (valid) => {
        if(valid) {
          player_id = selected_player_id;
        }
  
        choosePlayerCallback(valid);
      });
    }
    choosePlayerCallback = callback;
  
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

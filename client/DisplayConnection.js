var DisplayConnection = function() {

  var that = {};

  // Fields
  var anyChangeCallback = undefined;
  var choosePlayerCallback = undefined;
  var player_id = undefined;

  var state = {
    button: {},
    axis: {}
  };
  
  var callbacks = {
    button: {},
    axis: {}
  };
  
  var socket = io('/space-dud');
  socket.on('controller_event', (data) => {
    processEvent.call(that, data);
  });
  
  // Private functions
  function processEvent(data) {
    state[data.type][data.id] = data.value;
  
    if(callbacks[data.type][data.id]) {
      callbacks[data.type][data.id](data);
    }
  
    if(anyChangeCallback !== undefined) {
      anyChangeCallback(data);
    }
  };
 
  // Public functions
  that.onControllerEvent = function(type, id, callback) {
    callbacks[type][id] = async function(data) {
      callback(data);
    };

    return that;
  };
  
  that.onAnyChange = function(callback) {
    anyChangeCallback = async function(data) {
      callback(data);
    };

    return that;
  };
   
  that.selectPlayer = function(player_id, callback) {
    if(choosePlayerCallback === undefined) {
      socket.on('valid_player_choice', (valid) => {
        if(valid) {
          player_id = player_id;
        }
  
        choosePlayerCallback(valid);
      });
    }
    choosePlayerCallback = callback;
  
    socket.emit('choose_player', player_id);

    return that;
  };
  
  that.getEventTypes = function() {
    var types = [];
    for(var id in state.button) {
      types.push({
        type: 'button',
        id: id
      });
    }
  
    for(var id in state.axis) {
      types.push({
        type: 'axis',
        id: id
      });
    }
  
    return types;
  };
  
  that.getState = function(type, id) {
    return state[type][id];
  };

  // After all instantiation, set the role to display
  socket.emit('set_role', 'display');

  return that;
};

var DisplayConnection = function() {

  var that = {};

  // Fields
  var eventCallback = undefined;
  var choosePlayerCallback = undefined;
  var player_id = undefined;

  var socket = io('/space-dud');
  socket.on('controller_event', (data) => {
    processEvent.call(that, data);
  });
  
  // Private functions
  function processEvent(data) {
    if(eventCallback !== undefined) {
      eventCallback(data);
    }
  };
 
  // Public functions
  that.onEvent = function(callback) {
    eventCallback = async function(data) {
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
  
  // After all instantiation, set the role to display
  socket.emit('set_role', 'display');

  return that;
};

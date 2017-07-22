var DisplayConnection = (function() {

  function processEvent(data) {
    this.state[data.type][data.id] = data.value;
  
    if(this.callbacks[data.type][data.id]) {
      this.callbacks[data.type][data.id](data);
    }
  
    if(this.anyChangeCallback !== undefined) {
      this.anyChangeCallback(data);
    }
  };

  function DisplayConnection() {
    this.state = {
      button: {},
      axis: {}
    };
  
    this.callbacks = {
      button: {},
      axis: {}
    };
  
    this.socket = io('/space-dud');
  
    this.socket.on('controller_event', (data) => {
      processEvent.call(this, data);
    });
  
    this.socket.emit('set_role', 'display');
  };
  
  DisplayConnection.prototype.onControllerEvent = function(type, id, callback) {
    this.callbacks[type][id] = async function(data) {
      callback(data);
    };

    return this;
  };
  
  DisplayConnection.prototype.onAnyChange = function(callback) {
    this.anyChangeCallback = async function(data) {
      callback(data);
    };

    return this;
  };
   
  DisplayConnection.prototype.selectPlayer = function(player_id, callback) {
    if(this.choosePlayerCallback === undefined) {
      this.socket.on('valid_player_choice', (valid) => {
        if(valid) {
          this.player_id = player_id;
        }
  
        this.choosePlayerCallback(valid);
      });
    }
    this.choosePlayerCallback = callback;
  
    this.socket.emit('choose_player', player_id);

    return this;
  };
  
  DisplayConnection.prototype.getEventTypes = function() {
    var types = [];
    for(var id in this.state.button) {
      types.push({
        type: 'button',
        id: id
      });
    }
  
    for(var id in this.state.axis) {
      types.push({
        type: 'axis',
        id: id
      });
    }
  
    return types;
  };
  
  DisplayConnection.prototype.getState = function(type, id) {
    return this.state[type][id];
  };

  return DisplayConnection;
})();


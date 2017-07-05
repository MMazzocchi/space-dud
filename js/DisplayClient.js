var DisplayClient = function() {
  this.state = {
    button: {},
    axis: {}
  };

  this.callbacks = {
    button: {},
    axis: {}
  };

  this.socket = io();

  var client = this;
  this.socket.on('controller_event', function(data) {
    client.processEvent(data);
  });

  this.socket.emit('set_role', 'display');
};

DisplayClient.prototype.onControllerEvent = function(type, id, callback) {
  this.callbacks[type][id] = async function(data) {
    callback(data);
  };
};

DisplayClient.prototype.onAnyChange = function(callback) {
  this.anyChangeCallback = async function(data) {
    callback(data);
  };
};

DisplayClient.prototype.processEvent = function(data) {
  this.state[data.type][data.id] = data.value;

  if(this.callbacks[data.type][data.id]) {
    this.callbacks[data.type][data.id](data);
  }

  if(this.anyChangeCallback != undefined) {
    this.anyChangeCallback(data);
  }
};

DisplayClient.prototype.selectPlayer = function(player_id, callback) {
  if(this.choosePlayerCallback == undefined) {
    var client = this;
    this.socket.on('valid_player_choice', function(valid) {
      if(valid) {
        client.player_id = player_id;
      }

      client.choosePlayerCallback(valid);
    });
  }
  this.choosePlayerCallback = callback;

  this.socket.emit('choose_player', player_id);
};

DisplayClient.prototype.getEventTypes = function() {
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

DisplayClient.prototype.getState = function(type, id) {
  return this.state[type][id];
};

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
  this.socket.on('player_list', function(player_list) {
    client.processPlayerList(player_list);
  });  
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

DisplayClient.prototype.onPlayerList = function(callback) {
  this.playerListCallback = callback;
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

DisplayClient.prototype.processPlayerList = function(player_list) {
  if(this.playerListCallback) {
    this.playerListCallback(player_list);
  }
};

DisplayClient.prototype.selectPlayer = function(player_id) {
  this.player_id = player_id;
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

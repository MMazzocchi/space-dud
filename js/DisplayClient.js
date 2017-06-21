var DisplayClient = function() {
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

DisplayClient.prototype.onAnyChange = function(callback) {
  this.anyChangeCallback = callback;
};

DisplayClient.prototype.onPlayerList = function(callback) {
  this.playerListCallback = callback;
};

DisplayClient.prototype.processEvent = function(data) {
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

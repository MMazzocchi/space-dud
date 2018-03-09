var DummySocket = function() {
  this.callback_map = {};
};

DummySocket.prototype.on = function(name, callback) {
  this.callback_map[name] = callback;
};

DummySocket.prototype.emit = function(name, ...args) {
  if(this.callback_map[name]) {
    this.callback_map[name](...args);
  }
};

module.exports = DummySocket;

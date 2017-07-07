var DummySocket = function() {
  this.callback_map = {};
};

DummySocket.prototype.on = function(name, callback) {
  this.callback_map[name] = callback;
};

DummySocket.prototype.emit = function(name, ...args) {
  this.callback_map[name](...args);
};

module.exports = DummySocket;

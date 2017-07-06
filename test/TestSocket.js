var TestSocket = function() {
  this.callback_map = {};
};

TestSocket.prototype.on = function(name, callback) {
  this.callback_map[name] = callback;
};

TestSocket.prototype.emit = function(name, ...args) {
  this.callback_map[name](...args);
};

module.exports = TestSocket;

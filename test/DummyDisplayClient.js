var DummyDisplayClient = function() {};

DummyDisplayClient.prototype.onSendEvent = function(callback) {
  this.sendEventCallback = callback;
};

DummyDisplayClient.prototype.sendEvent = function(...args) {
  this.sendEventCallback(...args);
};

module.exports = DummyDisplayClient;

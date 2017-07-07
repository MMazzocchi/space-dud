var TestDisplayClient = function() {};

TestDisplayClient.prototype.onSendEvent = function(callback) {
  this.sendEventCallback = callback;
};

TestDisplayClient.prototype.sendEvent = function(...args) {
  this.sendEventCallback(...args);
};

module.exports = TestDisplayClient;

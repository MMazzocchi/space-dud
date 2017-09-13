var DummyDisplayClient = function(socket) {
  var that = {};

  // Private fields
  var consumeCallback = undefined;

  // Public methods
  that.onConsume = function(callback) {
    consumeCallback = callback;
  };
  
  that.consume = function(...args) {
    if(consumeCallback !== undefined) {
      consumeCallback(...args);
    }
  };

  return that;
};

module.exports = DummyDisplayClient;

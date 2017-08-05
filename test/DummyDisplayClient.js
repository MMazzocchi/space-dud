var ConsumerClient = require("../server/ConsumerClient.js");

var DummyDisplayClient = function() {
  var that = new ConsumerClient();

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

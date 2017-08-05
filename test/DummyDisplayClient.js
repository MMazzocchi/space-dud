var ConsumerClient = require("../server/ConsumerClient.js");

var DummyDisplayClient = function() {
  var that = new ConsumerClient();

  // Private fields
  var sendEventCallback = undefined;

  // Public methods
  that.onSendEvent = function(callback) {
    sendEventCallback = callback;
  };
  
  that.sendEvent = function(...args) {
    if(sendEventCallback !== undefined) {
      sendEventCallback(...args);
    }
  };

  return that;
};

module.exports = DummyDisplayClient;

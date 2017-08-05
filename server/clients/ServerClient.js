var ConsumerClient = require('./ConsumerClient.js');

var ServerClient = function() {
  var that = new ConsumerClient();

  // Fields
  var event_callback = undefined;

  // Public functions
  that.onConsume = function(callback) {
    event_callback = async function(new_event) {
      callback(new_event);
    };
  };

  that.consume = function(new_event) {
    if(event_callback !== undefined) {
      event_callback(new_event);
    }
  };

  return that;
};

module.exports = ServerClient;

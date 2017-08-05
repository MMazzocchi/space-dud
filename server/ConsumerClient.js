var ConsumerClient = function() {

  var that = {};

  // Fields
  var debug = require('debug')('space-dud:ConsumerClient');
  debug('Created a new ConsumerClient.');

  // Private functions

  // Public functions
  that.consume = function(controller_event) {
    throw new Error("ConsumerClient.consume should be defined in all "+
                    "subclasses!");
  };

  return that;
};

module.exports = ConsumerClient;

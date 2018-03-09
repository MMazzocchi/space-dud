var Client = require('./Client.js');

var ConsumerClient = function(socket) {
  var that = new Client(socket);

  // Fields
  var debug = require('debug')('space-dud:ConsumerClient');
  debug('Created a new ConsumerClient.');

  // Private functions

  // Public functions
  that.consume = function(data) {
    throw new Error("ConsumerClient.consume should be defined in all "+
                    "subclasses!");
  };

  return that;
};

module.exports = ConsumerClient;

var Client = require('../server/clients/Client.js');
var DummySocket = require('./DummySocket.js');

var DummyConsumerClient = function() {
  var socket = new DummySocket();
  var that = new Client(socket);

  return that;
};

module.exports = DummyConsumerClient;

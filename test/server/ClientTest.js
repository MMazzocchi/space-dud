var assert = require('assert');
var DummySocket = require('./DummySocket.js');
var Client = require('../../server/clients/Client.js');

const REFERENCE_EVENT = {
  type: 'button',
  id: '1',
  value: '1'
};

describe('Client', function() {
  describe('Client', function() {
    it('should trigger a disconnect event on socket disconnect',
       function(done) {
      var socket = new DummySocket();
      var client = new Client(socket);
      client.on('disconnect', done);

      socket.emit('disconnect');
    });
  });
});

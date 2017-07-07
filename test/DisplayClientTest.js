var assert = require('assert');
var DisplayClient = require('../server/DisplayClient.js');
var DummySocket = require('./DummySocket.js');

const REFERENCE_EVENT = {
  type: 'button',
  id: '1',
  value: '1'
};

describe('DisplayClient', function() {
  describe('#sendEvent', function() {
    it('should send events through the socket.', function(done) {
      var dummy_socket = new DummySocket();
      dummy_socket.on('controller_event', function(controller_event) {
        assert.equal(controller_event, REFERENCE_EVENT);
        done();
      });

      var client = new DisplayClient(dummy_socket);
      client.sendEvent(REFERENCE_EVENT);
    });
  });
});

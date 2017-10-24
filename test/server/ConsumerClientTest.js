var assert = require('assert');
var ConsumerClient = require('../../server/clients/ConsumerClient.js');
var DummySocket = require('./DummySocket.js');

const REFERENCE_EVENT = {
  type: 'button',
  id: '1',
  value: '1'
};

describe('ConsumerClient', function() {
  describe('#consume', function() {
    it('should throw an error.', function(done) {
      var socket = new DummySocket();

      try {
        var client = new ConsumerClient();
        client.sendEvent(REFERENCE_EVENT);
      } catch(e) {
        done();
      }
    });
  });
});

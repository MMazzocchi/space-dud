var assert = require('assert');
var ServerClient = require('../server/clients/ServerClient.js');
var DummySocket = require('./DummySocket.js');

const REFERENCE_EVENT = {
  type: 'button',
  id: '1',
  value: '1'
};

describe('ServerClient', function() {
  describe('#onConsume', function() {
    it('should set the consume function handler.', function(done) {
      var client = new ServerClient();
      client.onConsume(function(new_event) {
        assert.equal(new_event, REFERENCE_EVENT);
        done();
      });

      client.consume(REFERENCE_EVENT);
    });
  });
});

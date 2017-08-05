var assert = require('assert');
var ConsumerClient = require('../server/ConsumerClient.js');

const REFERENCE_EVENT = {
  type: 'button',
  id: '1',
  value: '1'
};

describe('ConsumerClient', function() {
  describe('#consume', function() {
    it('should throw an error.', function(done) {

      try {
        var client = new ConsumerClient();
        client.sendEvent(REFERENCE_EVENT);
      } catch(e) {
        done();
      }
    });
  });
});

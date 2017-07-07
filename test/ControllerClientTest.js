var assert = require('assert');
var ControllerClient = require('../server/ControllerClient.js');
var TestDisplayClient = require('./TestDisplayClient.js');
var TestSocket = require('./TestSocket.js');

const REFERENCE_EVENT = {
  type: 'button',
  id: '1',
  value: '1'
};

describe('ControllerClient', function() {
  describe('#ControllerClient', function() {
    it('should send any event to the connected display client.',
       function(done) {
      var test_display_client = new TestDisplayClient();
      test_display_client.onSendEvent(function(controller_event) {
        assert.equal(controller_event, REFERENCE_EVENT);
        done();
      });

      var test_socket = new TestSocket();
      var controller_client = new ControllerClient(test_socket);

      controller_client.setDisplayClient(test_display_client);
      test_socket.emit('controller_event', REFERENCE_EVENT);
    });
  });

  describe('#dumpState', function() {
    it('should request a dump state.', function(done) {
      var test_socket = new TestSocket();
      test_socket.on('dump_state', function() {
        done();
      });

      var client = new ControllerClient(test_socket);
      client.dumpState();
    });
  });
});

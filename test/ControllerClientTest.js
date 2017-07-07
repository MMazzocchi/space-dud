var assert = require('assert');
var ControllerClient = require('../server/ControllerClient.js');
var DummyDisplayClient = require('./DummyDisplayClient.js');
var DummySocket = require('./DummySocket.js');

const REFERENCE_EVENT = {
  type: 'button',
  id: '1',
  value: '1'
};

describe('ControllerClient', function() {
  describe('#ControllerClient', function() {
    it('should send any event to the connected display client.',
       function(done) {
      var dummy_display_client = new DummyDisplayClient();
      dummy_display_client.onSendEvent(function(controller_event) {
        assert.equal(controller_event, REFERENCE_EVENT);
        done();
      });

      var dummy_socket = new DummySocket();
      var controller_client = new ControllerClient(dummy_socket);

      controller_client.setDisplayClient(dummy_display_client);
      dummy_socket.emit('controller_event', REFERENCE_EVENT);
    });
  });

  describe('#dumpState', function() {
    it('should request a dump state.', function(done) {
      var dummy_socket = new DummySocket();
      dummy_socket.on('dump_state', function() {
        done();
      });

      var client = new ControllerClient(dummy_socket);
      client.dumpState();
    });
  });
});

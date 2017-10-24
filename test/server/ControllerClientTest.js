var assert = require('assert');
var ControllerClient = require('../../server/clients/ControllerClient.js');
var DummyDisplayClient = require('./DummyDisplayClient.js');
var DummySocket = require('./DummySocket.js');

const REFERENCE_EVENT = {
  type: 'button',
  id: '1',
  value: '1'
};
const REFERENCE_ID = '00000000-0000-0000-0000-000000000000';

describe('ControllerClient', function() {
  describe('#on("controller_event",...)', function() {
    it('should call the controller event callback on controller events.',
       function(done) {
      var dummy_socket = new DummySocket();
      var client = new ControllerClient(dummy_socket);

      client.on('controller_event', function(controller_event) {
        assert.equal(controller_event, REFERENCE_EVENT);
        done();
      });

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

  describe('#sendPlayerId', function() {
    it('should send the player ID.', function(done) {
      var dummy_socket = new DummySocket();
      dummy_socket.on('player_id', function(player_id) {
        assert.equal(player_id, REFERENCE_ID);
        done();
      });

      var client = new ControllerClient(dummy_socket);
      client.sendPlayerId(REFERENCE_ID);
    });
  });
});

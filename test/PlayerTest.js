var assert = require('assert');
var DummySocket = require('./DummySocket.js');
var Player = require('../server/Player.js');
var DisplayClient = require('../server/DisplayClient.js');
var ConsumerClient = require('../server/ConsumerClient.js');
var ControllerClient = require('../server/ControllerClient.js');
var DummyControllerClient = require('./DummyControllerClient.js');
var DummyDisplayClient = require('./DummyDisplayClient.js');

const NUM_CLIENTS = 20;
const REFERENCE_EVENT = {
  type: 'button',
  id: '1',
  value: '1'
};

describe('Player', function() {
  describe('#Player', function() {
    it('should instantiate null for all clients', function() {
      var player = new Player();
      assert.equal(player.numConsumerClients(), 0);
      assert(!player.hasControllerClient());
    });
  });

  describe('#addConsumerClient', function() {
    it('should pass events onto new consumer client', function(done) {
      var dummy_controller = new DummyControllerClient();
      var dummy_display = new DummyDisplayClient();
      dummy_display.onConsume(function(controller_event) {
        assert.equal(controller_event, REFERENCE_EVENT);
        done();
      });

      var player = new Player();
      player.setControllerClient(dummy_controller);
      player.addConsumerClient(dummy_display);

      dummy_controller.controllerEvent(REFERENCE_EVENT);
    });
  })

  describe('#numConsumerClients', function() {
    it('should return number of consumer clients', function() {
      var player = new Player();
      for(var i=0; i<NUM_CLIENTS; i++) {
        assert.equal(player.numConsumerClients(), i);

        var client = new ConsumerClient();
        player.addConsumerClient(client);
      }
    });
  });

  describe('#clearConsumerClients', function() {
    it('should reset number of consumer clients', function() {
      var player = new Player();
      for(var i=0; i<NUM_CLIENTS; i++) {
        var client = new ConsumerClient();
        player.addConsumerClient(client);
      }

      assert.equal(player.numConsumerClients(), NUM_CLIENTS);

      player.clearConsumerClients();

      assert.equal(player.numConsumerClients(), 0);
    });
  });

  describe('#setControllerClient', function() {
    it('should trigger a dump state',
       function(done) {
      var player = new Player();

      var dummy_socket = new DummySocket();
      dummy_socket.on('dump_state', function() {
        done();
      });

      var controller_client = new ControllerClient(dummy_socket);
      player.setControllerClient(controller_client);
    });
  });

  describe('#hasControllerClient', function() {
    it('should return false if no controller client is set', function() {
      var player = new Player();
      assert(!player.hasControllerClient());
    });

    it('should return true if controller client is set', function() {
      var player = new Player();

      var dummy_socket = new DummySocket();
      var controller_client = new ControllerClient(dummy_socket);

      player.setControllerClient(controller_client);
      assert(player.hasControllerClient());
    });
  });
});

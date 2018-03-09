var assert = require('assert');
var Player = require('../src/Player.js');

var DisplayClient = require('../src/clients/DisplayClient.js');
var ControllerClient = require('../src/clients/ControllerClient.js');

var DummyConsumerClient = require('./DummyConsumerClient.js');
var DummyControllerClient = require('./DummyControllerClient.js');
var DummyDisplayClient = require('./DummyDisplayClient.js');
var DummySocket = require('./DummySocket.js');

const NUM_CLIENTS = 20;
const REFERENCE_EVENT = {
  type: 'button',
  id: '1',
  value: '1'
};
const REFERENCE_ID = 'r1RjTXHDW';

describe('Player', function() {
  describe('#Player', function() {
    it('should instantiate null for all clients', function() {
      var player = new Player(REFERENCE_ID);
      assert.equal(player.numConsumerClients(), 0);
      assert(!player.hasControllerClient());
    });
  });

  describe('#addConsumerClient', function() {
    it('should call the consumer added callback', function(done) {
      var player = new Player(REFERENCE_ID);
      player.on('consumer_added', function(client_id) {
        done();
      });

      var client = new DummyConsumerClient();
      player.addConsumerClient(client);
    });

    it('should remove the client on disconnect', function() {
      var player = new Player(REFERENCE_ID);
      var client = new DummyConsumerClient();

      player.addConsumerClient(client);
      client.emit('disconnect');

      assert.equal(player.numConsumerClients(), 0);
    });
  });

  describe('#numConsumerClients', function() {
    it('should return number of consumer clients', function() {
      var player = new Player(REFERENCE_ID);
      for(var i=0; i<NUM_CLIENTS; i++) {
        assert.equal(player.numConsumerClients(), i);

        var client = new DummyConsumerClient();
        player.addConsumerClient(client);
      }
    });
  });

  describe('#clearConsumerClients', function() {
    it('should reset number of consumer clients', function() {
      var player = new Player(REFERENCE_ID);
      for(var i=0; i<NUM_CLIENTS; i++) {
        var client = new DummyConsumerClient();
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
      var player = new Player(REFERENCE_ID);

      var dummy_socket = new DummySocket();
      dummy_socket.on('dump_state', function() {
        done();
      });

      var controller_client = new ControllerClient(dummy_socket);
      player.setControllerClient(controller_client);
    });

    it('should trigger disconnect event on disconnect',
       function(done) {
      var player = new Player(REFERENCE_ID);
      player.on('disconnect', done);

      var client = new DummyControllerClient();
      player.setControllerClient(client);

      client.emit('disconnect');
    });
  });

  describe('#hasControllerClient', function() {
    it('should return false if no controller client is set', function() {
      var player = new Player(REFERENCE_ID);
      assert(!player.hasControllerClient());
    });

    it('should return true if controller client is set', function() {
      var player = new Player(REFERENCE_ID);

      var dummy_socket = new DummySocket();
      var controller_client = new ControllerClient(dummy_socket);

      player.setControllerClient(controller_client);
      assert(player.hasControllerClient());
    });
  });

  describe('#on("controller_event",...)', function() {
    it('should catch controller events', function(done) {
      var dummy_controller = new DummyControllerClient();
      var player = new Player(REFERENCE_ID);

      player.on('controller_event', function(controller_event) {
        assert.equal(controller_event, REFERENCE_EVENT);
        done();
      });
      player.setControllerClient(dummy_controller);

      dummy_controller.controllerEvent(REFERENCE_EVENT);
    });
  });

  describe('#sendEventToConsumers', function() {
    it('should send events to all consumers', function(done) {
      var player = new Player(REFERENCE_ID);

      var finished = 0;

      for(var i=0; i<NUM_CLIENTS; i++) {
        var display_client = new DummyDisplayClient();
        display_client.onConsume(function(new_event) {
          assert.equal(new_event, REFERENCE_EVENT);

          finished += 1;
          if(finished === NUM_CLIENTS) {
            done();
          }
        });

        player.addConsumerClient(display_client);
      }

      player.sendEventToConsumers(REFERENCE_EVENT);
    });
  });

  describe('#sendEventToConsumer', function() {
    it('should send event to one consumer', function(done) {
      var player = new Player(REFERENCE_ID);

      player.on('consumer_added', function(client_id) {
        player.sendEventToConsumer(REFERENCE_EVENT, client_id);
      });

      var display_client = new DummyDisplayClient();
      display_client.onConsume(function(new_event) {
        assert.equal(new_event, REFERENCE_EVENT);
        done();
      });

      player.addConsumerClient(display_client);
    });
  });

  describe('#getId', function() {
    it('should return the ID', function() {
      var player = new Player(REFERENCE_ID);
      assert.equal(player.getId(), REFERENCE_ID);
    });
  });
});

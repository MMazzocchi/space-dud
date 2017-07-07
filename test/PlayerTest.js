var assert = require('assert');
var DummySocket = require('./DummySocket.js');
var Player = require('../server/Player.js');
var DisplayClient = require('../server/DisplayClient.js');
var ControllerClient = require('../server/ControllerClient.js');

describe('Player', function() {
  describe('#Player', function() {
    it('should instantiate null for all clients.', function() {
      var player = new Player();
      assert(!player.hasDisplayClient());
      assert(!player.hasControllerClient());
    });
  });

  describe('#hasDisplayClient', function() {
    it('should return false if no display client is set.', function() {
      var player = new Player();
      assert(!player.hasDisplayClient());
    });

    it('should return true if display client is set.', function() {
      var player = new Player();
      var display_client = new DisplayClient();
      player.setDisplayClient(display_client);
      assert(player.hasDisplayClient());
    });
  });

  describe('#setDisplayClient', function() {
    it('should trigger a dump state if controller client is set.',
       function(done) {
      var player = new Player();

      var dummy_socket = new DummySocket();
      dummy_socket.on('dump_state', function() {
        done();
      });

      var controller_client = new ControllerClient(dummy_socket);
      player.setControllerClient(controller_client);

      var display_client = new DisplayClient();
      player.setDisplayClient(display_client);
    });
  });

  describe('#hasControllerClient', function() {
    it('should return false if no controller client is set.', function() {
      var player = new Player();
      assert(!player.hasControllerClient());
    });

    it('should return true if controller client is set.', function() {
      var player = new Player();

      var dummy_socket = new DummySocket();
      var controller_client = new ControllerClient(dummy_socket);

      player.setControllerClient(controller_client);
      assert(player.hasControllerClient());
    });
  });

  describe('#setControllerClient', function() {
    it('should trigger a dump state if display client is set.',
       function(done) {
      var player = new Player();

      var display_client = new DisplayClient();
      player.setDisplayClient(display_client);

      var dummy_socket = new DummySocket();
      dummy_socket.on('dump_state', function() {
        done();
      });

      var controller_client = new ControllerClient(dummy_socket);
      player.setControllerClient(controller_client);
    });
  });
});

var assert = require('assert');
var shortid = require('shortid');

var Game = require('../../server/Game.js');
var Player = require('../../server/Player.js');
var DummySocket = require('./DummySocket.js');

const BAD_UUID = '0000000';

describe('Game', function() {

  describe('#getPlayer', function() {
    it('should return a player given a valid UUID.', function(done) {
      var game = new Game();
      var controller_socket = new DummySocket();
      controller_socket.on('player_id', function(player_id) {

        var display_socket = new DummySocket();
        game.createDisplayClient(display_socket, player_id);

        var player = game.getPlayer(player_id);
        assert.notEqual(player, undefined);

        done();
      });

      game.createControllerClient(controller_socket);
    });

    it('should return undefined if an invalid UUID is supplied.', function() {
      var game = new Game();
      var player = game.getPlayer(BAD_UUID);

      assert.equal(player, undefined);
    });
  });

  describe('#createControllerClient', function() {
    it('should create a player with a controller client, and send the ID.',
       function(done) {
      var game = new Game();
      var dummy_socket = new DummySocket();
      dummy_socket.on('player_id', function(player_id) {
        assert(shortid.isValid(player_id));

        var player = game.getPlayer(player_id);
        assert.notEqual(player, undefined);

        assert(player.hasControllerClient());        

        done();
      });

      game.createControllerClient(dummy_socket);
    });

    it('should remove added player when socket disconnects', function(done) {
      var game = new Game();
      var dummy_socket = new DummySocket();
      game.on('player_ready', function(player) {
        dummy_socket.emit('disconnect');
        assert.equal(game.getPlayer(player.getId()), undefined);
        done();
      });
      game.createControllerClient(dummy_socket);
    });
  });

  describe('#createDisplayClient', function() {
    it('should add a display client to the player.', function(done) {
      var game = new Game();
      var controller_socket = new DummySocket();
      controller_socket.on('player_id', function(player_id) {

        var display_socket = new DummySocket();
        game.createDisplayClient(display_socket, player_id);

        var player = game.getPlayer(player_id);
        assert.equal(player.numConsumerClients(), 1);

        done();
      });

      game.createControllerClient(controller_socket);
    });

    it('should throw an error if the player does not exist.', function(done) {
      var game = new Game();
      var display_socket = new DummySocket();
      try {
        game.createDisplayClient(display_socket, BAD_UUID);

      } catch(e) {
        done();
      }
    });
  });

  describe('#on#player_ready', function() {
    it('should call the callback when a Player is ready', function(done) {
      var game = new Game();
      game.on('player_ready', function(player) {
        assert.notEqual(player, undefined);
        done();
      });

      var socket = new DummySocket();
      game.createControllerClient(socket);
    });
  });
});

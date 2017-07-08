var assert = require('assert');
var Game = require('../server/Game.js');
var Player = require('../server/Player.js');
var DummySocket = require('./DummySocket.js');

const UUID_REGEX = 
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
const BAD_UUID = '00000000-0000-0000-0000-000000000000';

describe('Game', function() {
  var game = new Game();

  describe('#addPlayer', function() {
    it('should return a correctly formatted UUID when a player is added.',
       function() {
      var player = new Player();
      var uuid = game.addPlayer(player);
      assert(UUID_REGEX.test(uuid));
    });

    it('should not return a duplicate UUID on subsequent calls.', function() {
      var player_1 = new Player();
      var uuid_1 = game.addPlayer(player_1);

      var player_2 = new Player();
      var uuid_2 = game.addPlayer(player_2);

      assert.notEqual(uuid_1, uuid_2);
    });
  });

  describe('#getPlayer', function() {
    it('should return the player added with the correct UUID.', function() {
      var player = new Player();
      var uuid = game.addPlayer(player);

      var returned_player = game.getPlayer(uuid);

      assert.equal(player, returned_player);
    });

    it('should return undefined if an invalid UUID is supplied.', function() {
      var player = game.getPlayer(BAD_UUID);

      assert.equal(player, undefined);
    });
  });

  describe('#createControllerClient', function() {
    it('should create a player with a controller client, and send the ID.',
       function(done) {
      var dummy_socket = new DummySocket();
      dummy_socket.on('player_id', function(player_id) {
        assert(UUID_REGEX.test(player_id));

        var player = game.getPlayer(player_id);
        assert.notEqual(player, undefined);

        assert(player.hasControllerClient());        

        done();
      });

      game.createControllerClient(dummy_socket);
    });
  });

  describe('#createDisplayClient', function() {
    it('should add a display client to the player.', function(done) {

      var controller_socket = new DummySocket();
      controller_socket.on('player_id', function(player_id) {

        var display_socket = new DummySocket();
        game.createDisplayClient(display_socket, player_id);

        var player = game.getPlayer(player_id);
        assert(player.hasDisplayClient());

        done();
      });

      game.createControllerClient(controller_socket);
    });

    it('should throw an error if the player does not exist.', function(done) {
      var display_socket = new DummySocket();
      try {
        game.createDisplayClient(display_socket, BAD_UUID);

      } catch(e) {
        done();
      }
    });

    it('should throw an error if the player already has a display client.',
       function(done) {

      var controller_socket = new DummySocket();
      controller_socket.on('player_id', function(player_id) {

        var display_socket1 = new DummySocket();
        game.createDisplayClient(display_socket1, player_id);

        var display_socket2 = new DummySocket();
        try {
          game.createDisplayClient(display_socket2, player_id);

        } catch(e) {
          done();
        }
      });

      game.createControllerClient(controller_socket);
    });
  });
});

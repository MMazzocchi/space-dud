var assert = require('assert');
var Player = require('../server/Player.js');
var DisplayClient = require('../server/DisplayClient.js');
var ControllerClient = require('../server/ControllerClient.js');

describe('Player', function() {
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
});

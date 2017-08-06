var GameServer = function(http) {

  var that = {};

  // Imports
  var SocketServer = require('./SocketServer.js');
  var StaticServer = require('./StaticServer.js');
  var Game = require('../Game.js');

  // Fields
  var debug = require('debug')('space-dud:GameServer');
  var game = new Game();

  var static_server = new StaticServer(http);
  var socket_server = new SocketServer(game, http);

  // Public functions
  that.getGame = function() {
    return game;
  };

  return that;
};

module.exports = GameServer; 

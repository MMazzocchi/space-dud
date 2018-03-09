var SocketServer = require('./SocketServer.js');
var StaticServer = require('./StaticServer.js');
var Game = require('../Game.js');
var debug = require('debug')('space-dud:GameServer');

var GameServer = function(http) {
  var that = {};

  debug('Setting up GameServer.');

  // Fields
  var game = new Game();

  // Public functions
  that.getGame = function() {
    return game;
  };

  that.start = function() {
    new StaticServer(http);
    new SocketServer(game, http);
  };

  return that;
};

module.exports = GameServer; 

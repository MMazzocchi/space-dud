var GameServer = function(http) {

  var that = {};

  // Imports
  var SocketServer = require('./SocketServer.js');
  var StaticServer = require('./StaticServer.js');

  // Fields
  var debug = require('debug')('space-dud:GameServer');
  var static_server = new StaticServer(http);
  var socket_server = new SocketServer(http);

  return that;
};

module.exports = GameServer; 

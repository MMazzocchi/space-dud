var debug = require('debug')('space-dud:GameServer');
var SocketServer = require('./SocketServer.js');
var StaticServer = require('./StaticServer.js');

var GameServer = function(http) {
  this.static_server = new StaticServer(http);
  this.socket_server = new SocketServer(http);
};

module.exports = GameServer; 

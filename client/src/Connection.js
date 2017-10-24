var io = require('socket.io-client');
var setImmediate = require('timers').setImmediate;

function mixin(that, role) {
  var socket = io('/space-dud');

  // Public functions
  that.getSocket = function() {
    return socket;
  };

  setImmediate(function() {
    socket.emit('set_role', role);
  });

  return that;
};

var Connection = function(role) {
  return mixin({}, role);
};

Connection.mixin = mixin;

module.exports = Connection;

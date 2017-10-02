var EventEmitter = require('events');

var Client = function(socket) {
  var that = new EventEmitter();

  socket.on('disconnect', function(...args) {
    that.emit('disconnect', ...args);
  });

  /**
   * @deprecated
   */
  that.onDisconnect = function(...args) {
    console.log('Client.onDisconnect is deprecated. Use Client.on('+
                '"disconnect",...) instead. This method will be removed '+
                'in release 2.6.0.');
    that.on("disconnect", ...args);
  };

  /**
   * @deprecated
   */
  that.triggerDisconnect = function(...args) {
    console.log('Client.triggerDisconnect is deprecated. Use Client.emit('+
                '"disconnect",...) instead. This method will be removed '+
                'in release 2.6.0.');
    that.emit("disconnect", ...args);
  };

  return that;
};

module.exports = Client;

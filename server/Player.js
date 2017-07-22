var Player = function() {

  var that = {};
  var display_client = null;
  var controller_client = null;

  // Fields
  var debug = require('debug')('space-dud:Player');
  debug('Created a new Player.');

  // Public methods
  that.setDisplayClient = function(client) {
    debug('Connected a display client.');
  
    display_client = client;
  
    if(controller_client !== null) {
      controller_client.setDisplayClient(client);
      controller_client.dumpState();
    }
  
    return that;
  }
  
  that.hasDisplayClient = function() {
    return (display_client !== null);
  };
  
  that.setControllerClient = function(client) {
    debug('Connected a controller client.');
  
    controller_client = client;
  
    if(display_client !== null) {
      controller_client.setDisplayClient(display_client);
      controller_client.dumpState();
    }
  
    return this;
  }
  
  that.hasControllerClient = function() {
    return (controller_client != null);
  };

  return that;
};

module.exports = Player;

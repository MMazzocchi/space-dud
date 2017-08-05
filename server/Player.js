var Player = function() {

  var that = {};
  var display_client = null;
  var controller_client = null;

  // Fields
  var debug = require('debug')('space-dud:Player');
  debug('Created a new Player.');

  // Private methods
  function handleControllerEvent(controller_event) {
    display_client.consume(controller_event);
  };

  // Public methods
  that.setDisplayClient = function(client) {
    debug('Connected a display client.');
  
    display_client = client;
  
    if(controller_client !== null) {
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
    controller_client.onControllerEvent(handleControllerEvent);
 
    if(display_client !== null) {
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

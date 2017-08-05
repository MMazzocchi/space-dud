var Player = function() {

  var that = {};
  var consumer_clients = [];
  var controller_client = null;

  // Fields
  var debug = require('debug')('space-dud:Player');
  debug('Created a new Player.');

  // Private methods
  function handleControllerEvent(controller_event) {
    for(var i=0; i<consumer_clients.length; i++) {
      consumer_clients[i].consume(controller_event);
    }
  };

  // Public methods
  that.addConsumerClient = function(client) {
    debug('Added a consumer client.');
    consumer_clients.push(client); 
  
    return that;
  }
  
  that.numConsumerClients = function() {
    return consumer_clients.length;
  };
  
  that.clearConsumerClients = function() {
    consumer_clients = [];

    return that;
  };

  that.setControllerClient = function(client) {
    debug('Connected a controller client.');
  
    controller_client = client;
    controller_client.onControllerEvent(handleControllerEvent);
 
    controller_client.dumpState();
  
    return this;
  }
  
  that.hasControllerClient = function() {
    return (controller_client != null);
  };

  return that;
};

module.exports = Player;

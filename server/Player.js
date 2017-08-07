var Player = function(id) {

  var that = {};
  var consumer_clients = [];
  var controller_client = null;
  var controller_event_callback = undefined;

  // Fields
  var debug = require('debug')('space-dud:Player');
  debug('Created a new Player.');

  // Private methods
  function handleControllerEvent(controller_event) {
    if(controller_event_callback !== undefined) {
      controller_event_callback(controller_event);
    }
  };

  // Public methods
  that.getId = function() {
    return id;
  };

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

  that.sendEventToConsumers = function(new_event) {
    for(var i=0; i<consumer_clients.length; i++) {
      consumer_clients[i].consume(new_event);
    }

    return that;
  };

  that.setControllerClient = function(client) {
    debug('Connected a controller client.');
  
    controller_client = client;
    controller_client.onControllerEvent(handleControllerEvent);
 
    controller_client.dumpState();
  
    return that;
  }
  
  that.hasControllerClient = function() {
    return (controller_client != null);
  };

  that.onControllerEvent = function(callback) {
    controller_event_callback = async function(controller_event) {
      callback(controller_event);
    };
  };

  return that;
};

module.exports = Player;

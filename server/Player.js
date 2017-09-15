var Observable = require('../shared/Observable.js');

var Player = function(id) {

  var that = new Observable('consumer_added', 'controller_event',
                            'disconnect');

  var consumer_clients = [];
  var controller_client = null;

  // Fields
  var debug = require('debug')('space-dud:Player');
  debug('Created a new Player.');

  // Private methods
  function removeConsumerClient(client) {
    var index = consumer_clients.indexOf(client);
    if(index !== -1) {
      consumer_clients.splice(index, 1);
    }
  };

  // Public methods
  that.getId = function() {
    return id;
  };

  that.addConsumerClient = function(client) {
    debug('Added a consumer client.');
    var client_id = consumer_clients.push(client) - 1; 

    client.onDisconnect(function() {
      removeConsumerClient(client);
    });

    that.triggerConsumerAdded(client_id); 
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

  that.sendEventToConsumer = function(new_event, client_id) {
    if(client_id < consumer_clients.length) {
      consumer_clients[client_id].consume(new_event);
    }
  };

  that.setControllerClient = function(client) {
    debug('Connected a controller client.');
  
    controller_client = client;
    controller_client.onControllerEvent(that.triggerControllerEvent);
    controller_client.onDisconnect(that.triggerDisconnect);
 
    controller_client.dumpState();
  
    return that;
  }
  
  that.hasControllerClient = function() {
    return (controller_client != null);
  };

  return that;
};

module.exports = Player;

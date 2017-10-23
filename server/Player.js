var EventEmitter = require('events');

var Player = function(id) {
  var that = new EventEmitter();

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

    client.on('disconnect', function() {
      removeConsumerClient(client);
    });

    that.emit('consumer_added', client_id); 
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

    controller_client.on('controller_event', function(...args) {
      that.emit('controller_event', ...args);
    });

    controller_client.on('disconnect', function(...args) {
      that.emit('disconnect', ...args);
    });

    controller_client.dumpState();
  
    return that;
  }
  
  that.hasControllerClient = function() {
    return (controller_client != null);
  };

  return that;
};

module.exports = Player;

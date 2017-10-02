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
  /**
   * @deprecated
   */
  that.onConsumerAdded = function(...args) {
    console.log('Player.onConsumerAdded is deprecated. Use Player.on('+
                '"consumer_added",...) instead. This method will be removed '+
                'in release 2.6.0.');
    that.on("consumer_added", ...args);
  };

  /**
   * @deprecated
   */
  that.triggerConsumerAdded = function(...args) {
    console.log('Player.triggerConsumerAdded is deprecated. Use Player.emit('+
                '"consumer_added",...) instead. This method will be removed '+
                'in release 2.6.0.');
    that.emit("consumer_added", ...args);
  };

  /**
   * @deprecated
   */
  that.onDisconnect = function(...args) {
    console.log('Player.onDisconnect is deprecated. Use Player.on('+
                '"disconnect",...) instead. This method will be removed '+
                'in release 2.6.0.');
    that.on("disconnect", ...args);
  };

  /**
   * @deprecated
   */
  that.triggerDisconnect = function(...args) {
    console.log('Player.triggerDisconnect is deprecated. Use Player.emit('+
                '"disconnect",...) instead. This method will be removed '+
                'in release 2.6.0.');
    that.emit("disconnect", ...args);
  };

  /**
   * @deprecated
   */
  that.onControllerEvent = function(...args) {
    console.log('Player.onControllerEvent is deprecated. Use Player.on('+
                '"controller_event",...) instead. This method will be removed '+
                'in release 2.6.0.');
    that.on("controller_event", ...args);
  };

  /**
   * @deprecated
   */
  that.triggerControllerEvent = function(...args) {
    console.log('Player.triggerControllerEvent is deprecated. Use Player.emit('+
                '"controller_event",...) instead. This method will be removed '+
                'in release 2.6.0.');
    that.emit("controller_event", ...args);
  };

  return that;
};

module.exports = Player;

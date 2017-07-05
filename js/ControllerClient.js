var ControllerClient = (function() {

  function emitControllerEvent(type, id, value) {
    var data = {
      type: type,
      id: id,
      value: value
    };
  
    this.socket.emit('controller_event', data);
  };

  function readControllers() {
    for(var controller_id in this.controllers) {
      var controller_info = this.controllers[controller_id];
      var controller = controller_info.controller;
      var state = controller_info.state;
  
      for(var i = 0; i < controller.buttons.length; i++) {
        var button = controller.buttons[i];
        var pressed = this.buttonPressed(button);
  
        if((state.buttons[i] == undefined) ||
           (state.buttons[i] != pressed)) {
          state.buttons[i] = pressed;
          emitControllerEvent.call(this, 'button', i, pressed);
        }
      }
  
      for(var i = 0; i < controller.axes.length; i++) {
        var value = controller.axes[i];
  
        if((state.axes[i] == undefined) ||
           (state.axes[i] != value)) {
          state.axes[i] = value;
          emitControllerEvent.call(this, 'axis', i, value);
        }
      }
    }
  
    var client = this;
    window.requestAnimationFrame(function() { readControllers.call(client) });
  };

  function ControllerClient(onReadyHandler) {
    this.onReadyHandler = onReadyHandler;
    this.controllers = {};
  
    this.socket = io();

    var client = this;
    this.socket.on('dump_state', function() {
      client.dumpState();
    });
  
    this.socket.on('player_id', function(player_id) {
      if(onReadyHandler) {
        onReadyHandler(player_id);
      }
  
      this.player_id = player_id;
    });
    
    this.socket.emit('set_role', 'controller');
  
    readControllers.call(this);
  }

  ControllerClient.prototype.getPlayerId = function() {
    return this.player_id;
  };
  
  ControllerClient.prototype.connectedHandler = function(e) {
    this.addController(e.gamepad);
  };
  
  ControllerClient.prototype.disconnectedHandler = function(e) {
    this.removeController(e.gamepad);
  };
  
  ControllerClient.prototype.addController = function(controller) {
    var controller_info = {
      controller: controller,
      state: {
        buttons: {},
        axes: {}
      }
    };
  
    var controller_id = controller.index;
    this.controllers[controller_id] = controller_info;
  };
  
  ControllerClient.prototype.removeController = function(controller) {
    delete this.controllers[controller.index];
  };
  
  ControllerClient.prototype.numberControllersDetected = function() {
    return Object.keys(this.controllers).length;
  };
  
  ControllerClient.prototype.hasController = function(controller) {
    return (controller.index in this.controllers);
  };
  
  ControllerClient.prototype.findControllers = function() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for(var i=0; i<gamepads.length; i++) { 
      var gamepad = gamepad[i];
      if(!this.hasController(gamepad)) {
        this.addController(gamepad);
      }
    }
  };
   
  ControllerClient.prototype.buttonPressed = function(button) {
    if(typeof(button) == 'object') {
      return button.pressed;
    }
  
    return button == 1.0;
  };
  
  ControllerClient.prototype.dumpState = function() {
    for(var controller_id in this.controllers) {
      var controller_info = this.controllers[controller_id];
      controller_info.state = {
        buttons: {},
        axes: {}
      };
    }
  };
  
  return ControllerClient;
})();
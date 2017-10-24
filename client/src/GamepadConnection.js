var ControllerConnection = require('./ControllerConnectionBase.js');

var GamepadConnection = function(onReadyHandler) {
  if(onReadyHandler !== undefined) {
    console.warn("GamepadConnection takes no arguments. To replicate the "+
                 "functionality of ControllerConnection(onReadyHandler), use "+
                 "GamepadConnection.on('player_id', <callback>);");
  }

  var that = new ControllerConnection('gamepad');

  // Fields
  var controllers = {};
  var socket = that.getSocket();

  socket.on('dump_state', () => {
    that.dumpState();
  });
  
  // Private functions
  function readControllers() {
    for(var controller_id in controllers) {
      var controller_info = controllers[controller_id];
      var controller = controller_info.controller;
      var state = controller_info.state;
  
      for(var i = 0; i < controller.buttons.length; i++) {
        var button = controller.buttons[i];
        var pressed = buttonPressed(button);
  
        if((state.buttons[i] === undefined) ||
           (state.buttons[i] != pressed)) {
          state.buttons[i] = pressed;
          that.sendEvent(i, 'button', pressed);
        }
      }
  
      for(var i = 0; i < controller.axes.length; i++) {
        var value = controller.axes[i];
  
        if((state.axes[i] === undefined) ||
           (state.axes[i] !== value)) {
          state.axes[i] = value;
          that.sendEvent(i, 'axis', value);
        }
      }
    }
  
    window.requestAnimationFrame(readControllers);
  };
 
  function addController(controller) {
    var controller_info = {
      controller: controller,
      state: {
        buttons: {},
        axes: {}
      }
    };
  
    var controller_id = controller.index;
    controllers[controller_id] = controller_info;

    return that;
  };
  
  function removeController(controller) {
    delete controllers[controller.index];

    return that;
  };

  function buttonPressed(button) {
    if(typeof(button) === 'object') {
      return button.pressed;
    }
  
    return button === 1.0;
  };
 
  // Public functions
  that.connectedHandler = function(e) {
    addController(e.gamepad);
  };
  
  that.disconnectedHandler = function(e) {
    removeController(e.gamepad);
  };
  
  that.numberControllersDetected = function() {
    return Object.keys(controllers).length;
  };
  
  that.hasController = function(controller) {
    return (controller.index in controllers);
  };
  
  that.findControllers = function() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for(var i=0; i<gamepads.length; i++) { 
      var gamepad = gamepad[i];
      if(!hasController(gamepad)) {
        addController(gamepad);
      }
    }
  };
    
  that.dumpState = function() {
    for(var controller_id in controllers) {
      var controller_info = controllers[controller_id];
      controller_info.state = {
        buttons: {},
        axes: {}
      };
    }

    return that;
  };

  readControllers();

  return that;  
};

module.exports = GamepadConnection;

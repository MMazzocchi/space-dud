var ControllerConnection = require('./ControllerConnection.js');

var GamepadConnection = function() {
  var that = new ControllerConnection('gamepad');

  // Fields
  var controller_id = undefined;
  var controller = undefined;
  var state = [];
  var socket = that.getSocket();

  socket.on('dump_state', () => {
    that.dumpState();
  });
  
  // Private functions
  function readController() {
    if(controller !== undefined) {
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

    window.requestAnimationFrame(readController);
  };
 
  function addController(new_controller) {
    if(controller !== undefined) {
      controller = new_controller;
      state = {
        buttons: {},
        axes: {}
      };
  
      controller_id = controller.index;
    }

    return that;
  };
  
  function removeController(old_controller) {
    if(controller_id === old_controller.index) {
      controller = undefined;
      controller_id = undefined;
      state = undefined;
    }

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

  that.getGamepad = function() {
    return controller;
  };
  
  /**
   * deprecated
   */
  that.numberControllersDetected = function() {
    console.warn("GamepadConnection.numberControllersDetected is deprecated. "+
                 "GamepadConnection only uses one gamepad, this method will "+
                 "be removed in a future release.");

    if(controller !== undefined) {
      return 1;
    } else {
      return 0;
    }
  };

  /**
   * deprecated
   */
  that.hasController = function(controller) {
    console.log("GamepadConnection.hasController is deprecated. "+
                "GamepadConnection only uses one gamepad, this method will "+
                "be removed in a future release.");

    return (controller.index === controller_id);
  };
  
  that.findControllers = function() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for(var i=0; i<gamepads.length; i++) { 
      var gamepad = gamepad[i];
      addController(gamepad);
    }
  };
    
  that.dumpState = function() {
    if(controller !== undefined) {
      state = {
        buttons: {},
        axes: {}
      };
    }

    return that;
  };

  readController();

  return that;  
};

module.exports = GamepadConnection;

var ControllerConnection = require('./ControllerConnection.js');

var GamepadConnection = function() {
  var that = new ControllerConnection('gamepad');

  // Fields
  var gamepad_id = undefined;
  var gamepad = undefined;
  var state = [];
  var socket = that.getSocket();

  socket.on('dump_state', () => {
    that.dumpState();
  });
  
  // Private functions
  function readGamepad() {
    if(gamepad !== undefined) {
      for(var i = 0; i < gamepad.buttons.length; i++) {
        var button = gamepad.buttons[i];
        var pressed = buttonPressed(button);
  
        if((state.buttons[i] === undefined) ||
           (state.buttons[i] != pressed)) {
          state.buttons[i] = pressed;
          that.sendEvent(i, 'button', pressed);
        }
      }
  
      for(var i = 0; i < gamepad.axes.length; i++) {
        var value = gamepad.axes[i];
  
        if((state.axes[i] === undefined) ||
           (state.axes[i] !== value)) {
          state.axes[i] = value;
          that.sendEvent(i, 'axis', value);
        }
      }
    }  

    window.requestAnimationFrame(readGamepad);
  };
 
  function addGamepad(new_gamepad) {
    if(gamepad !== undefined) {
      gamepad = new_gamepad;
      state = {
        buttons: {},
        axes: {}
      };
  
      gamepad_id = gamepad.index;
    }

    return that;
  };
  
  function removeGamepad(old_gamepad) {
    if(gamepad_id === old_gamepad.index) {
      gamepad = undefined;
      gamepad_id = undefined;
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
    addGamepad(e.gamepad);
  };
  
  that.disconnectedHandler = function(e) {
    removeGamepad(e.gamepad);
  };

  that.getGamepad = function() {
    return gamepad;
  };
  
  /**
   * deprecated
   */
  that.numberControllersDetected = function() {
    console.warn("GamepadConnection.numberControllersDetected is deprecated. "+
                 "GamepadConnection only uses one gamepad, this method will "+
                 "be removed in a future release.");

    if(gamepad !== undefined) {
      return 1;
    } else {
      return 0;
    }
  };

  /**
   * deprecated
   */
  that.hasController = function(new_gamepad) {
    console.warn("GamepadConnection.hasController is deprecated. "+
                 "GamepadConnection only uses one gamepad, this method will "+
                 "be removed in a future release.");

    return (new_gamepad.index === gamepad_id);
  };

  /**
   * deprecated
   */ 
  that.findControllers = function() {
    console.warn("GamepadConnection.findControllers is deprecated, and will "+
                 "be removed in a future release. Use GamepadConnection."+
                 "findGamepads instead.");

    return that.findGamepads();
  };

  that.findGamepads = function() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for(var i=0; i<gamepads.length; i++) { 
      var gamepad = gamepad[i];
      addGamepad(gamepad);
    }
  };
    
  that.dumpState = function() {
    if(gamepad !== undefined) {
      state = {
        buttons: {},
        axes: {}
      };
    }

    return that;
  };

  readGamepad();

  return that;  
};

module.exports = GamepadConnection;

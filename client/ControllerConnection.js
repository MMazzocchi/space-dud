var ControllerConnection = function(onReadyHandler) {

  var that = {};

  // Fields
  var onReadyHandler = onReadyHandler;
  var controllers = {};
  var player_id = undefined;  
  var socket = io('/space-dud');

  socket.on('dump_state', () => {
    that.dumpState();
  });
  
  socket.on('player_id', (player_id) => {
    if(onReadyHandler) {
      onReadyHandler(player_id);
    }
  
    player_id = player_id;
  });
  
  // Private functions
  function emitControllerEvent(type, id, value) {
    var data = {
      event_type: "controller",
      type: type,
      id: id,
      value: value
    };
  
    socket.emit('controller_event', data);
  };

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
          emitControllerEvent('button', i, pressed);
        }
      }
  
      for(var i = 0; i < controller.axes.length; i++) {
        var value = controller.axes[i];
  
        if((state.axes[i] === undefined) ||
           (state.axes[i] !== value)) {
          state.axes[i] = value;
          emitControllerEvent('axis', i, value);
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
  that.getPlayerId = function() {
    return player_id;
  };
  
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

  // After instantiation, set role and start controller read loop
  socket.emit('set_role', 'controller');
  readControllers();

  return that;  
};

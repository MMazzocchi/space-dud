function buttonPressed(button) {
  if(typeof(button) == 'object') {
    return button.pressed;
  }

  return button == 1.0;
}

var ControllerClient = function(socket) {
  this.socket = socket;
  this.controllers = {};
};

ControllerClient.prototype.connectedHandler = function(e) {
  console.log("Controller connected.");
  this.addController(e.gamepad);
};

ControllerClient.prototype.disconnectedHandler = function(e) {
  console.log("Controller disconnected.");
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

ControllerClient.prototype.emitControllerEvent = function(type, id, value) {
  var data = {
    type: type,
    id: id,
    value: value
  };

  this.socket.emit('controller_event', data);
};

ControllerClient.prototype.readControllers = function() {
  for(var controller_id in this.controllers) {
    var controller_info = this.controllers[controller_id];
    var controller = controller_info.controller;
    var state = controller_info.state;

    for(var i = 0; i < controller.buttons.length; i++) {
      var button = controller.buttons[i];
      var pressed = buttonPressed(button);

      if((state.buttons[i] == undefined) ||
         (state.buttons[i] != pressed)) {
        state.buttons[i] = pressed;
        this.emitControllerEvent('button', i, pressed);
      }
    }

    for(var i = 0; i < controller.axes.length; i++) {
      var value = controller.axes[i];

      if((state.axes[i] == undefined) ||
         (state.axes[i] != value)) {
        state.axes[i] = value;
        this.emitControllerEvent('axis', i, value);
      }
    }
  }

  var client = this;
  window.requestAnimationFrame(function() { client.readControllers() });
};

function setup_controller_client(socket) {
  console.log("Setting up controller client.");
  var client = new ControllerClient(socket);

  function findControllers() { client.findControllers(); }
  function connectedHandler(e) { client.connectedHandler(e); }
  function disconnectedHandler(e) { client.disconnectedHandler(e); }

  setInterval(findControllers, 500);

  window.addEventListener("gamepadconnected", connectedHandler);
  window.addEventListener("gamepaddisconnected", disconnectedHandler);

  client.readControllers();
}

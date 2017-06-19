var controllers = {};

function addGamepad(gamepad) {
  controllers[gamepad.index] = gamepad;
}

function find_gamepads() {
  console.log("Looking for gamepads...");
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);

  for(var i=0; i<gamepads.length; i++) { 
    var gamepad = gamepad[i];
    addGamepad(gamepad);
  }
}

function setup_controller_client(socket) {
  console.log("Setting up controller client.");
  setInterval(find_gamepads, 500);
}

window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);

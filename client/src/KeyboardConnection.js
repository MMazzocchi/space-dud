var ControllerConnection = require('./ControllerConnectionBase.js');

var KeyboardConnection = function(element) {
  var that = new ControllerConnection('keyboard');

  // Private methods
  function keyDown(e) {
    that.sendEvent(e.keyCode, 'button', true);
  };

  function keyUp(e) {
    that.sendEvent(e.keyCode, 'button', false);
  };

  function captureKeys() {
    element.onkeydown = keyDown;
    element.onkeyup = keyUp;
  };

  function setup() {
    that.once('player_id', function() {
      captureKeys();  
    });
  };

  setup();

  return that;
};

module.exports = KeyboardConnection;

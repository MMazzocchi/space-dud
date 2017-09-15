var DisplayConnection = require('./DisplayConnection.js');
var ControllerConnection = require('./ControllerConnection.js');

var JointConnection = function() {
  var that = {};

  // Fields
  var display = new DisplayConnection();
  var controller = new ControllerConnection(display.selectPlayer);

  // Display methods
  that.onEvent = display.onEvent;
  that.onEventType = display.onEventType;

  // Controller methods 
  that.getPlayerId               = controller.getPlayerId;
  that.connectedHandler          = controller.connectedHandler;
  that.disconnectedHandler       = controller.disconnectedHandler;
  that.numberControllersDetected = controller.numberControllersDetected;
  that.hasController             = controller.hasController;
  that.findControllers           = controller.findControllers;
  that.dumpState                 = controller.dumpState;

  return that;
};

module.exports = JointConnection;

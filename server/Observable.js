var Observable = function(...args) {
  var that = {};

  // Fields
  var callbacks = {};

  // Private methods
  function upperCaseToken(token) {
    return token.toUpperCase().replace("_", "");
  }

  function addMethodsForEvent(name) {
    var caps_name = name.replace(/(^.|_.)/g, upperCaseToken);

    callbacks[name] = [];

    var on_method_name = "on"+caps_name;
    that[on_method_name] = function(callback) {
      callbacks[name].push(callback);
    };

    var clear_method_name = "clear"+caps_name;
    that[clear_method_name] = function() {
      callbacks[name] = [];
    };

    var trigger_method_name = "trigger"+caps_name;
    that[trigger_method_name] = function() {
      for(var i=0; i<callbacks[name].length; i++) {
        callbacks[name][i](...arguments);
      }
    }

    var off_method_name = "off"+caps_name;
    that[off_method_name] = function(callback) {
      var index = callbacks[name].indexOf(callback);
      if(index !== -1) {
        callbacks.splice(index, 1);
      }
    };
  };

  function setup() {
    for(var i=0; i<args.length; i++) {
      addMethodsForEvent(args[i]);
    }
  }

  setup();

  return that;
};

module.exports = Observable;

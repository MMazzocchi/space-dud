var Observable = function() {
  // Private static methods
  function upperCaseToken(token) {
    return token.toUpperCase().replace("_", "");
  }
  
  function addMethodsForEvent(that, name) {
    var callbacks = [];
    var caps_name = name.replace(/(^.|_.)/g, upperCaseToken);
  
    var on_method_name = "on"+caps_name;
    that[on_method_name] = function(callback) {
      callbacks.push(callback);
    };
  
    var clear_method_name = "clear"+caps_name;
    that[clear_method_name] = function() {
      callbacks = [];
    };
  
    var trigger_method_name = "trigger"+caps_name;
    that[trigger_method_name] = function(...trigger_args) {
      for(var i=0; i<callbacks.length; i++) {
        callbacks[i](...trigger_args);
      }
    }
  
    var off_method_name = "off"+caps_name;
    that[off_method_name] = function(callback) {
      var index = callbacks.indexOf(callback);
      if(index !== -1) {
        callbacks.splice(index, 1);
      }
    };
  };

  var constructor = function(...event_names) {
    var that = {};
  
    // Private methods
    function setup() {
      for(var i=0; i<event_names.length; i++) {
        addMethodsForEvent(that, event_names[i]);
      }
    }
  
    setup();
  
    return that;
  };
  
  constructor.augment = function(observable, ...event_names) {
     for(var i=0; i<event_names.length; i++) {
      addMethodsForEvent(observable, event_names[i]);
    }
  };

  return constructor;
}();

module.exports = Observable;

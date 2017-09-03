var Event = function() {

  function addMethods(that, data) {
    that.setField = function(name, value) {
      data[name] = value;
    };

    that.getField = function(name) {
      return data[name];
    };

    that.getEventType = function() {
      return data.event_type;
    };

    return that;
  };

  // Normal Constructor
  var EventConstructor = function(event_type) {
    var that = {};

    // Fields
    var data = {
      'event_type': event_type
    };

    that = addMethods(that, data);

    return that;
  };

  // Convenience constructor from pre-made object
  EventConstructor.fromData = function(data) {
    var that = addMethods({}, data);
    return that;
  };

  return EventConstructor;
}();

module.exports = Event;

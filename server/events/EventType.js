var EventType = function(name, field_names) {
  var that = {};

  that.create = function(...args) {
    var new_event = {};
    new_event.event_type = name;

    for(var i=0; i<field_names.length; i++) {
      new_event[field_names[i]] = args[i];
    };

    return new_event;
  };

  return that;
};

module.exports = EventType;

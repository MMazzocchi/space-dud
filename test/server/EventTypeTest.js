var assert = require('assert');
var EventType = require('../../server/src/events/EventType.js');

const NAME = "controller";
const FIELD_NAMES = [ "id", "value", "type" ];
const ID = 1;
const VALUE = true;
const TYPE = "button";

describe('EventType', function() {
  describe('#Constructor', function() {
    it('should return a an event generator', function() {
      var ControllerEvent = new EventType(NAME, FIELD_NAMES);
      var new_event = ControllerEvent.create(ID, VALUE, TYPE);

      assert.equal(new_event.event_type, NAME);
      assert.equal(new_event.id, ID); 
      assert.equal(new_event.value, VALUE); 
      assert.equal(new_event.type, TYPE); 
    });
  });
});

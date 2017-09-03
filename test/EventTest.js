var assert = require('assert');
var Event = require('../server/events/Event.js');

const EVENT_TYPE = 'controller';
const FIELD_NAME = 'id';
const FIELD_VALUE = 1;

describe('Event', function() {
  describe('#getEventType', function() {
    it('should return the event type', function() {
      var new_event = new Event(EVENT_TYPE);
      assert.equal(new_event.getEventType(), EVENT_TYPE);
    });
  });

  describe('#setField', function() {
    it('should set the field', function() {
      var new_event = new Event(EVENT_TYPE);
      new_event.setField(FIELD_NAME, FIELD_VALUE);
      assert.equal(FIELD_VALUE, new_event.getField(FIELD_NAME));
    });
  });

  describe('#fromData', function() {
    it('should set the fields from data', function() {
      var data = {};
      data[FIELD_NAME] = FIELD_VALUE;

      var new_event = Event.fromData(data);
      assert.equal(FIELD_VALUE, new_event.getField(FIELD_NAME));
    });
  });
});

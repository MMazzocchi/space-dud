var assert = require('assert');
var Observable = require('../server/Observable.js');
var wait = require('./Util.js').wait;

const REFERENCE_DATA = {
  'a': 1,
  'b': 2,
  'c': 3
};

describe('Observable', function() {
  describe('#Constructor', function() {
    it('should create appropriate methods', function() {
      var obs = new Observable("something_happened");
      assert.notEqual(obs.onSomethingHappened, undefined);
      assert.notEqual(obs.offSomethingHappened, undefined);
      assert.notEqual(obs.clearSomethingHappened, undefined);
      assert.notEqual(obs.triggerSomethingHappened, undefined);
    });
  });

  describe('#on*', function() {
    it('should register a callback with the event trigger', function(done) {
      var obs = new Observable("something_happened");
      obs.onSomethingHappened(function(data) {
        assert.equal(data, REFERENCE_DATA);
        done();
      });

      obs.triggerSomethingHappened(REFERENCE_DATA);
    });
  });

  describe('#off*', function() {
    it('should remove a callback from the event trigger', function(done) {

      var obs = new Observable("event");
      var fired = false;

      var callback = function() {
        fired = true;
      };

      obs.onEvent(callback);
      obs.offEvent(callback);

      obs.triggerEvent();

      wait(100).then(function() {
        assert.equal(fired, false);
        done();
      });
    });
  });

  describe('#clear*', function() {
    it('should clear all callbacks from the event trigger', function(done) {

      var obs = new Observable("event");
      var fired = false;

      var callback_1 = function() { fired = true; };
      var callback_2 = function() { fired = true; };
      var callback_3 = function() { fired = true; };

      obs.onEvent(callback_1);
      obs.onEvent(callback_2);
      obs.onEvent(callback_3);
      obs.clearEvent();

      obs.triggerEvent();

      wait(100).then(function() {
        assert.equal(fired, false);
        done();
      });
    });
  });

  describe('#augment', function() {
    it('should augment an object with observable methods', function() {
      var obs = new Observable("something_happened");
      assert.notEqual(obs.onSomethingHappened, undefined);
      assert.notEqual(obs.offSomethingHappened, undefined);
      assert.notEqual(obs.clearSomethingHappened, undefined);
      assert.notEqual(obs.triggerSomethingHappened, undefined);

      Observable.augment(obs, "something_else_happened");
      assert.notEqual(obs.onSomethingElseHappened, undefined);
      assert.notEqual(obs.offSomethingElseHappened, undefined);
      assert.notEqual(obs.clearSomethingElseHappened, undefined);
      assert.notEqual(obs.triggerSomethingElseHappened, undefined);
    });
  });
});

var assert = require('assert');
var Observable = require('../server/Observable.js');

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

var Observable = require('../shared/Observable.js');

var DummyConsumerClient = function() {
  var that = new Observable('disconnect');

  return that;
};

module.exports = DummyConsumerClient;

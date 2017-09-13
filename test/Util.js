var Util = function() {
  var that = {};

  that.wait = function(ms) {
    return new Promise(function(resolve) {
      setTimeout(resolve, ms);
    });
  };

  return that;
}();

module.exports = Util;

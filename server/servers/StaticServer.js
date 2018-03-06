var debug = require('debug')('space-dud:StaticServer');
var read = require('fs').readFileSync;
var exists = require('fs').existsSync;

/**
 * deprecated
 */
var StaticServer = function(http) {

  debug('Setting up StaticServer.');

  var that = {};

  // Fields
  // Private functions
  function serveStaticFile(req, res) {
    var filename = req.url.substr(req.url.lastIndexOf("/")+1);
    var path = __dirname+"/../../client/dist/"+filename

    if(exists(path)) {
      console.warn("The space-dud static server is deprecated. Access files "+
                   "using the standalone space-dud-client.js file.");
      debug('Request for '+filename+' succeeded.');

      res.setHeader('Content-Type', 'application/javascript');
      res.writeHead(200);
      res.end(read(path));

    } else {
      debug('Request for '+filename+' failed.');

      res.writeHead(404);
      res.end();
    }
  }
  
  function setupServer() {
    var evs = http.listeners('request').slice(0);
    http.removeAllListeners('request');
  
    http.on('request', function(req, res) {
      if(req.url.indexOf('/space-dud') === 0) {
        serveStaticFile(req, res);
  
      } else {
        for(var i = 0; i < evs.length; i++) {
          evs[i].call(http, req, res);
        }
      }
    });  
  }
 
  // After instantiation, setup the server 
  setupServer();

  return that;
};

module.exports = StaticServer; 

var debug = require('debug')('space-dud:StaticServer');
var read = require('fs').readFileSync;
var exists = require('fs').existsSync;

function serveStaticFile(req, res) {
  var filename = req.url.substr(req.url.lastIndexOf("/")+1);
  var path = __dirname+"/../client/"+filename
  if(exists(path)) {
    res.setHeader('Content-Type', 'application/javascript');
    res.writeHead(200);
    res.end(read(path));
  } else {
    res.writeHead(404);
    res.end();
  }
}

function setupServer(http) {

  // Serve the static files
  var evs = http.listeners('request').slice(0);
  http.removeAllListeners('request');

  http.on('request', function(req, res) {
    if(req.url.indexOf('/space-dud') === 0) {
      serveStaticFile.call(this, req, res);

    } else {
      for(var i = 0; i < evs.length; i++) {
        evs[i].call(http, req, res);
      }
    }
  });  
}

var StaticServer = function(http) {
  setupServer.call(this, http);
};

module.exports = StaticServer; 

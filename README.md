# space-dud
`space-dud` is a plugin that facilitates the streaming of game controller events from web clients on one device to web clients on other devices.

## Installation
```
$ npm install space-dud
```
## Usage
`space-dud` creates a tunnel from one web client to another, through a web server. When a gamepad is connected to the "controller" client, all events are captured and sent to the server. The server can then forward these events to the "display" client, or process them itself.
### Server
`space-dud` provides a function which takes one argument: an HTTP service. Once given the HTTP service, all that's needed is to serve the clients.

Example _index.js_:
> **Hint:** All these examples are in a runnable package in the [space-dud repository](https://github.com/MMazzocchi/space-dud/tree/master/example)!
```javascript
const HOST = '0.0.0.0';
const PORT = 3000;

// Set up the express app and space-dud.
var express = require('express');
var app = express();
var http = require('http').Server(app);
var space_dud = require('space-dud')(http);

// On every event, pass it on to any connected consumers
var game = space_dud.getGame();
game.on('player_ready', function(player) {
  player.on('controller_event', player.sendEventToConsumers);
});

// Start the space-dud server.
space_dud.start();

// Serve the static files.
app.use('/space-dud-client.js', express.static(__dirname+'/space-dud-client.js'));
app.use('/controller.html', express.static(__dirname+'/controller.html'));
app.use('/display.html', express.static(__dirname+'/display.html'));

// Start the server.
http.listen(PORT, HOST, function(){
  console.log('listening on '+HOST+':'+PORT);
});
```
### Clients
#### Controller Client
The controller client runs on a machine with a USB game controller attached. The controller must be compatible with the [HTML5 gamepad API](https://www.w3.org/TR/gamepad/). Once connected, the server will provide the client with a player ID number. The client captures all gamepad events, and forwards them onto the server.

Example _controller.html_:
```html
<!DOCTYPE html>
<html>
    <body>
        <p>Player ID: <span id="player_id">None</span></p>

        <input id="A" type="button" value="A"/>
        <input id="B" type="button" value="B"/>

        <script src="/space-dud-client.js"></script>
        <script>

var client = new SpaceDudClient.ControllerConnection();
client.on('player_id', function (player_id) {
    document.getElementById('player_id').innerHTML = player_id;
});

document.getElementById('A').onmousedown = function() {
    client.sendEvent(0, 'button', 1);
};
document.getElementById('A').onmouseup = function() {
    client.sendEvent(0, 'button', 0);
};
document.getElementById('B').onmousedown = function() {
    client.sendEvent(1, 'button', 1);
};
document.getElementById('B').onmouseup = function() {
    client.sendEvent(1, 'button', 0);
};

        </script>
    </body>
</html>
```

#### Display Client
The display client runs on the machine that is reacting to the controller events. Upon connection, the display client should send a player ID to the server. Once verified, the server will then begin streaming gamepad events to the display client.

Example _display.html_:
```html
<!DOCTYPE html>
<html>
  <body>
    <p>Player ID: 
      <input id="player_id" type="text"/>
      <input id="submit_player_id" type="button" value="Submit"/>
    </p>
 
    <p>Last event received was: <span id="event">None</span>

    <script src="/socket.io/socket.io.js"></script>
    <script src="/space-dud/DisplayConnection.js"></script>
    <script>

var client = new DisplayConnection();
client.on('event', function(data) {
    document.getElementById('event').innerHTML = JSON.stringify(data);
});

document.getElementById('submit_player_id').onclick = function(e) {
    var player_id = document.getElementById('player_id').value;
    client.selectPlayer(player_id);
};

    </script>
  </body>
</html>
```

## Logging
`space-dud` uses the [debug](https://www.npmjs.com/package/space-dud) package for logging. To view log messages, add the `space-dud` namespace to the `DEBUG` call.
```
$ DEBUG=space-dud* node index.js
```

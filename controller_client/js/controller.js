$(function() {
  function setup_controller_client(socket) {
    var client = new ControllerClient(socket);
  
    function findControllers() { client.findControllers(); }
    function connectedHandler(e) { client.connectedHandler(e); }
    function disconnectedHandler(e) { client.disconnectedHandler(e); }
  
    setInterval(findControllers, 500);
  
    window.addEventListener("gamepadconnected", connectedHandler);
    window.addEventListener("gamepaddisconnected", disconnectedHandler);
  
    client.readControllers();
  }
  
  var socket = io();
  
  socket.on('player_id', function(player_id) {
    $('#status')[0].innerHTML = 'Connected to server.';
    $('#player_id')[0].innerHTML = "Player ID#: "+player_id;
  
    setup_controller_client(socket);
  });
  
  socket.emit('set_role', 'controller');
});

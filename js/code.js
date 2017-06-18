$(function() {
  var socket = io();

  socket.on('game_data', function(data) {
    load_roles_table(data, socket);
  });
});

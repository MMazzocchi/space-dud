$(function() {
  var socket = io();
  
  socket.emit('set_role', 'display');
});

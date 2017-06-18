$(function() {
  var socket = io();

  socket.on('game_data', function(data) {
    console.log(data);
  });

  $('.role-btn').click(function(e) {
    e.preventDefault();

    var role = e.currentTarget.innerHTML;
    socket.emit('choose_role', role);
  });
});

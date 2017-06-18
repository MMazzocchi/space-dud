$(function() {
  var socket = io();

  $('.role-btn').click(function(e) {
    e.preventDefault();
    var role = e.currentTarget.innerHTML;
    socket.emit('choose_role', role);
  });
});

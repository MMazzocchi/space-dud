$(function() {
  function setupPlayerList(player_list) {
    var html = "";
    for(var i = 0; i < player_list.length; i++) {
      var player_id = player_list[i];
      html += '<div><a class="btn btn-default">'+player_id+'</a></div>';
    }

    $('#status')[0].innerHTML = "Select your player ID:";
    $('#content')[0].innerHTML = html;
  };

  var socket = io();

  socket.on('player_list', setupPlayerList);
  
  socket.emit('set_role', 'display');
});

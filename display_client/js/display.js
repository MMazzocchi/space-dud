$(function() {
  function setupPlayerList(player_list, socket) {
    var html = "";
    for(var i = 0; i < player_list.length; i++) {
      var player_id = player_list[i];
      html += '<div><a class="btn btn-default choose-player-btn">'+player_id+'</a></div>';
    }

    $('#status')[0].innerHTML = "Select your player ID:";
    $('#content')[0].innerHTML = html;

    $('.choose-player-btn').click(function(e) {
      e.preventDefault();
      $('#content')[0].innerHTML = "";

      var player_id = e.target.innerHTML;
      socket.emit('choose_player', player_id);
    });
  };

  var socket = io();

  socket.on('player_list', function(player_list) {
    setupPlayerList(player_list, socket);
  });  
  socket.emit('set_role', 'display');
});

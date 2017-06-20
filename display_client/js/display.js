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
      var player_id = e.target.innerHTML;

      $('#content')[0].innerHTML = "";
      $('#status')[0].innerHTML = "Waiting for events...";

      var client = new DisplayClient(socket);
      client.onAnyChange(function(data) {
        $('#status')[0].innerHTML = "Received event: "+JSON.stringify(data);
      });

      socket.emit('choose_player', player_id);
    });
  };

  var socket = io();

  socket.on('player_list', function(player_list) {
    setupPlayerList(player_list, socket);
  });  
  socket.emit('set_role', 'display');
});

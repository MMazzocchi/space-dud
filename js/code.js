$(function() {
  function load_roles_table(roles_data) {
    var html = "";

    if(!roles_data.manager) {
      html += '<div><a class="btn btn-default role-btn">Manager</a></div>';
    }

    var players = roles_data.players;
    for(var id in players) {
      var player = players[id];
      if(!player.display) {
        html += '<div><a class="btn btn-default role-btn">Player #'+id+
                ' - Display</a></div>';
      }

      if(!player.controller) {
        html += '<div><a class="btn btn-default role-btn">Player #'+id+
                ' - Controller</a></div>';
      }
    }

    html += '<div><a class="btn btn-default role-btn">Add Player</a></div>';

    $('#content')[0].innerHTML = html;
  }

  var socket = io();

  socket.on('game_data', function(data) {
    load_roles_table(data);
  });

  $('.role-btn').click(function(e) {
    e.preventDefault();

    var role = e.currentTarget.innerHTML;
    socket.emit('choose_role', role);
  });
});

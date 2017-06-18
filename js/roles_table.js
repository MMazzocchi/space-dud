function load_roles_table(roles_data, socket) {
  var html = "";

  if(!roles_data.manager) {
    html += '<div><a class="btn btn-default manager-btn">Manager</a></div>';
  }

  var players = roles_data.players;
  for(var id in players) {
    var player = players[id];
    if(!player.display) {
      html += '<div><a class="btn btn-default player-btn" '+
                       'player_id="'+id+'" '+
                       'part="display" '+
                       '>Player #'+id+' - Display</a></div>';
    }

    if(!player.controller) {
      html += '<div><a class="btn btn-default player-btn" '+
                       'player_id="'+id+'" '+
                       'part="controller" '+
                       '>Player #'+id+' - Controller</a></div>';
    }
  }

  html += '<div><a class="btn btn-default add-player-btn">Add Player</a></div>';

  $('#content')[0].innerHTML = html;

  $('.manager-btn').click(function(e) {
    e.preventDefault();
    socket.emit('choose_role', {'role': 'manager'});

    $('#content')[0].innerHTML = '';
  });

  $('.player-btn').click(function(e) {
    e.preventDefault();
    var player_id = e.target.attributes['player_id'].value;
    var part = e.target.attributes['part'].value;

    var data = {
      'role': 'player',
      'player_id': player_id,
      'part': part
    };

    socket.emit('choose_role', data);

    $('#content')[0].innerHTML = '';
  });

  $('.add-player-btn').click(function(e) {
    e.preventDefault();
    socket.emit('add_player');
  });
}

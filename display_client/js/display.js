$(function() {
  function setupPlayerList(player_list, client) {

    var html = "";
    for(var i = 0; i < player_list.length; i++) {
      html += '<div><a class="btn btn-default choose-player-btn">'+
              player_list[i]+
              '</a></div>';
    }

    $('#status')[0].innerHTML = "Select your player ID:";
    $('#content')[0].innerHTML = html;

    $('.choose-player-btn').click(function(e) {
      e.preventDefault();
      var player_id = e.target.innerHTML;

      $('#content')[0].innerHTML = "";
      $('#status')[0].innerHTML = "Waiting for events...";

      client.selectPlayer(player_id);
    });
  };

  var client = new DisplayClient();
  client.onAnyChange(function(data) {
    $('#status')[0].innerHTML = "Received event: "+JSON.stringify(data);
  });

  client.onPlayerList(function(player_list) {
    setupPlayerList(player_list, client);
  });
});

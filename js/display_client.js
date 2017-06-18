function setup_display_client(socket) {
  console.log("Setting up display client.");

  socket.on('game_event', function(data) {
    console.log(data);
  });
}

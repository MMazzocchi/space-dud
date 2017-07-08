var debug = require('debug')('space-dud:Game');
var uuid = require('uuid/v1');

var Player = require('./Player.js');
var ControllerClient = require('./ControllerClient.js');
var DisplayClient = require('./DisplayClient.js');

var Game = function() {
  debug('Created a new Game.');

  this.manager = null;
  this.player_lookup = {};
};

Game.prototype.createControllerClient = function(socket) {
  var player = new Player();
  var client = new ControllerClient(socket);
  player.setControllerClient(client);

  var player_id = this.addPlayer(player);
  client.sendPlayerId(player_id);
};

Game.prototype.createDisplayClient = function(socket, player_id) {
  var player = this.getPlayer(player_id);
  if(player == undefined) {
    throw new Error('No player with id '+player_id+' exists.');

  } else if(player.hasDisplayClient()) {
    throw new Error('Player '+player_id+' already has a display client.');

  } else {
    var client = new DisplayClient(socket);
    player.setDisplayClient(client);
  }
};

Game.prototype.addPlayer = function(player) {
  var player_id = uuid();
  this.player_lookup[player_id] = player;

  debug('Added a new player with id: '+player_id);

  return player_id;
};

Game.prototype.getPlayer = function(player_id) {
  if(this.player_lookup[player_id]) {
    return this.player_lookup[player_id];
  } else {
    return undefined;
  }
};

module.exports = Game;

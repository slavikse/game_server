const gameBroadcast = require('./gameBroadcast');
const lobbyBroadcast = require('./lobbyBroadcast');

function connection(io) {
  const dynamicNamespace = gameBroadcast(io);
  lobbyBroadcast(dynamicNamespace, io);
}

module.exports = connection;

const {
  clientInitialize,
  clientConnected,
  clientsUpdate,
  clientDisconnected,
  clientsBroadcast,
} = require('../app');

// [namespace]: { [clientId]: [ position, rotation ] }
const clientsConnections = {};

function gameBroadcast(io) {
  const dynamicNamespace = io.of(/^\/room-\d+$/);

  // Состояние вне замыкания общее для всех подключённых.
  dynamicNamespace.on('connection', (socket) => {
    clientInitialize(socket, clientsConnections);
    clientConnected(socket, clientsConnections);
    clientsUpdate(socket);
    clientDisconnected(socket, clientsConnections);
  });

  clientsBroadcast(dynamicNamespace, clientsConnections);

  return dynamicNamespace;
}

module.exports = gameBroadcast;

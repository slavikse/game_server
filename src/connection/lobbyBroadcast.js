const broadcastFrequency = 1000 / 10;
let broadcastTimeoutId;

function lobbyBroadcast(dynamicNamespace, io) {
  const nsp = io.of('/lobby');

  nsp.on('connection', (socket) => {
    clientsBroadcast(dynamicNamespace, socket);

    socket.on('ping', () => {
      socket.emit('pong');
    });

    socket.on('disconnect', () => {
      clientsBroadcast(dynamicNamespace, socket);
      clearTimeout(broadcastTimeoutId);
    });
  });
}

function clientsBroadcast(dynamicNamespace, socket) {
  const clients = {};

  dynamicNamespace.children.forEach((nspChild) => {
    clients[nspChild.name] = {
      clientsCount: nspChild.sockets.size,
    };
  });

  socket.volatile.emit('update', clients);

  broadcastTimeoutId = setTimeout(clientsBroadcast, broadcastFrequency, dynamicNamespace, socket);
}

module.exports = lobbyBroadcast;

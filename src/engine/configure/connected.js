function broadcastReceived(socket) {
  socket.once('connected', (payload) => {
    socket.payload = payload;

    socket.broadcast.emit('clientUpdate', {
      [socket.id]: payload,
    });
  });
}

function getClients(io) {
  // todo
  return Object.values(io.connected || {})
    .reduce((clients, { id, payload }) => {
      clients[id] = payload;
      return clients;
    }, {});
}

function sendConnected({ io, socket }) {
  const clients = getClients(io);
  delete clients[socket.id];

  socket.emit('connected', {
    clientId: socket.id,
    clients,
  });
}

module.exports = { sendConnected, broadcastReceived };

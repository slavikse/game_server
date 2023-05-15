function clientDisconnected(socket, clientsConnections) {
  socket.on('disconnect', () => {
    if (clientsConnections[socket.nsp.name]) {
      delete clientsConnections[socket.nsp.name][socket.id];

      if (Object.keys(clientsConnections[socket.nsp.name]).length === 0) {
        delete clientsConnections[socket.nsp.name];
      }

      socket.broadcast.emit('disconnected', { clientId: socket.id });
    }
  });
}

module.exports = clientDisconnected;

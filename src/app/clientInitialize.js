function clientInitialize(socket, clientsConnections) {
  if (!clientsConnections[socket.nsp.name]) {
    clientsConnections[socket.nsp.name] = {};
  }
}

module.exports = clientInitialize;

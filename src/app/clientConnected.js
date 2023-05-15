function clientConnected(socket, clientsConnections) {
  // Отправка подключённых пользователей.
  socket.emit('connected', {
    clientId: socket.id,
    clients: clientsConnections[socket.nsp.name],
  });

  // Получение начальных данных от клиента.
  socket.on('connected', (data) => {
    socket.data = data; // [ position, rotation ]
    clientsConnections[socket.nsp.name][socket.id] = data; // Ссылочная связь на обновления.

    // Отправка данных подключенного клиента для всех подключённых в его комнате.
    socket.broadcast.emit('update', { [socket.id]: data });
  });
}

module.exports = clientConnected;

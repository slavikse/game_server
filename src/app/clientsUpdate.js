function clientsUpdate(socket) {
  socket.on('update', (data) => {
    data.isUpdated = true;
    Object.assign(socket.data, data);
  });
}

module.exports = clientsUpdate;

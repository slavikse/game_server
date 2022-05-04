function clientUpdate(socket) {
  socket.on('clientUpdate', (payload) => {
    mergeWithUpdated(socket, payload);
    broadcastUpdates(socket, payload);
  });
}

function mergeWithUpdated(socket, payload) {
  socket.payload = {
    ...socket.payload,
    ...payload,
  };
}

function broadcastUpdates(socket, payload) {
  socket.broadcast.emit('clientUpdate', {
    [socket.id]: payload,
  });
}

module.exports = clientUpdate;

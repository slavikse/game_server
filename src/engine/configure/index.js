const { sendConnected, broadcastReceived } = require('./connected');

function configure({ io, socket }) {
  sendConnected({ io, socket });
  broadcastReceived(socket);

  disconnected(socket);
}

function disconnected(socket) {
  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnected', {
      clientId: socket.id,
    });
  });
}

module.exports = configure;

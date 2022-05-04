const { createServer } = require('http');
const { Server } = require('socket.io');

const serverOptions = {
  serveClient: false,
  pingInterval: 500,
  cors: { origin: ['http://localhost:3000'] },
  // cookie: {
  //   name: 'my-cookie',
  //   httpOnly: true,
  //   sameSite: 'strict',
  //   maxAge: 86400,
  // },
};

const port = 5656;

function serverInit() {
  const httpServer = createServer();
  const io = new Server(httpServer, serverOptions);

  process.on('SIGTERM', () => {
    httpServer.close(() => {
      process.exit(0);
    });
  });

  httpServer.listen(port, () => {
    console.log(`Server Listen Port: ${port}`);
  });

  return io;
}

module.exports = serverInit;

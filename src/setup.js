const fs = require('fs');
const http = require('http');
const https = require('https');
const { Server } = require('socket.io');

global.envs = { dev: false, prod: false };

process.argv.slice(2).forEach((env) => {
  global.envs[env] = true;
});

let httpServer = http.createServer();

if (global.envs.prod) {
  const serverOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/vr-rooms.int.netintel.ru/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/vr-rooms.int.netintel.ru/fullchain.pem'),
  };

  httpServer = https.createServer(serverOptions);
}

const socketOptions = {
  serveClient: false,
  transports: ['websocket'],
  cors: {
    origin: ['https://178.213.8.45'],
    credentials: true,
  },
  // cookie: {
  //   name: 'my-cookie', // todo пригодится для авторизации?
  //   httpOnly: true,
  //   sameSite: 'strict',
  //   maxAge: 86400,
  // },
};

/* @ts-ignore */
const io = new Server(httpServer, socketOptions);
const serverPort = 8443;

httpServer.listen(serverPort, () => {
  console.log('Server up and running at %s port', serverPort);
});

process.on('SIGTERM', () => {
  httpServer.close(() => {
    process.exit(0);
  });
});

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err);
});

module.exports = io;

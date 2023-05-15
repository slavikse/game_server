const connection = require('./connection');

module.exports = connection;

// todo для авторизации?
// https://socket.io/docs/v4/server-api/#socketusefn
// io.use(async (socket, next) => {
// const token = socket.handshake.auth.token;

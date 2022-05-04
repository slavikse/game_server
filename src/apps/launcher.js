const { fork } = require('child_process');

const independents = [
  'vr_room',
];

// Структура хранения подключённых клиентов к каналу:
// io.nsps[channel].connected = { id: socket }
function launcher({ io, connection }) {
  // todo динамичесткое подключение к комнатам - получить из запроса
  connection({ io, channel: 'room1' });

  independents.forEach((path) => fork(`${__dirname}/${path}`));
}

module.exports = launcher;

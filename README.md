# Игровой сервер

Игровой сокет-сервер: Обмен информацией между клиентами приложения в режиме реального времени.

#### [Команды для запуска](COMMANDS.md)

## Возможности

- Подключённый клиент получает id и информацию о всех подключённых клиентах, а всем клиентам отправляется инициализирующая информация подключённого клиента.
- Событийная модель рассылки - клиент самостоятельно решает, что и с какой частотой отправлять на игровой сервер. При обновлении клиентской информации, игровой сервер делает рассылку накопившейся за 1 тик информации всем клиентам.

## Документация

- Подключение к клиентскому каналу:

  ```js
  import io from "socket.io-client";

  const serverURI = "wss://localhost:8443";
  const opts = { transports: ["websocket"], secure: true };
  const socket = io.connect(`${serverURI}/${roomId}`, opts);
  ```

- Получение ID и всех подключённых пользователей:
  ```js
  socket.once("connected", ({ clientId, clients }) => {
    // Клиент отправляет свои начальные данные для всех подключённых.
    socket.emit("connected", { /* Инициализирующая информация клиента. */ });
  });
  ```

- Подписка на обновления информации клиентов:
  ```js
  socket.on("update", (client) => {});
  ```

- Отправка клиентом обновлённой информации:
  ```js
  socket.emit("update", {});
  ```

- Подписка на получение задержки соединения с сервером:
  ```js
  socket.on("pong", () => {});
  ```

- Подписка на получение идентификатора отключившегося клиента:
  ```js
  socket.on("disconnected", ({ clientId }) => {});
  ```

- (на клиенте) Отключение клиента от сервера:
  ```js
  socket.disconnect();
  ```

### License

[MIT](LICENSE) Copyright (c) 2019 - по настоящее время, Лебедев Вячеслав Викторович

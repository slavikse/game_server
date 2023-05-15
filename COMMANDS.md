# Команды для запуска

### Подключение
```
ssh slavikse@172.31.34.35
```

### Обновление Server & Client одной командой
```
cd /opt/game_server &&
sudo git pull &&
sudo npm i &&
cd vr_rooms &&
sudo git pull &&
sudo npm i &&
sudo npm run build
```

### Обновление systemd
```
sudo systemctl stop nodeserver

sudo systemctl daemon-reload
sudo systemctl stop nodeserver.service
sudo systemctl start nodeserver.service
sudo systemctl status nodeserver.service
```

---

### Развёртывание Server & Client одной командой
```
cd /opt &&
sudo rm -rf game_server &&
sudo git clone https://gitlab.int.netintel.ru/nymph/game_server.git &&
cd game_server &&
sudo npm i &&
sudo git clone https://gitlab.int.netintel.ru/nymph/vr_rooms.git &&
cd vr_rooms &&
sudo npm i &&
sudo npm run build
```

### Развёртывание Server
```
cd /opt &&
sudo rm -rf game_server &&
sudo git clone https://gitlab.int.netintel.ru/nymph/game_server.git &&
cd game_server &&
sudo npm i
```

### Развёртывание Client
```
sudo git clone https://gitlab.int.netintel.ru/nymph/vr_rooms.git &&
cd vr_rooms &&
sudo npm i &&
sudo npm run build
```

### Настройка systemd
```
sudo nano /etc/systemd/system/nodeserver.service

[Unit]
Description=Game_Server

[Service]
ExecStart=/usr/bin/node --use-strict /opt/game_server/src/ prod
Environment=NODE_ENV=production
Restart=always
RestartSec=0
SyslogIdentifier=Game_Server
StandardOutput=syslog
StandardError=syslog

[Install]
WantedBy=multi-user.target
```
```
sudo systemctl enable nodeserver.service
```

> Остановка всех Node процессов:
  * windows: `taskkill /F /IM node.exe`
  * linux: `sudo pkill node`

### Статистика
```
htop
```

### License
[MIT](LICENSE) Copyright (c)
2019 - по настоящее время, Лебедев Вячеслав Викторович

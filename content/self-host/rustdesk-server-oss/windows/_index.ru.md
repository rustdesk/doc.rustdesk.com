---
title: Установка на Windows
weight: 20
---



### Установка Node.js
Скачайте [Node.js](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) и установите.
Node.js - это среда исполнения для pm2。

### Установка pm2
В консоли (cmd, PowerShell, и т.п.) используйте команды:
```
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### Запуск hbbr и hbbs
Скачайте версию [сервера](https://github.com/rustdesk/rustdesk-server/releases) для Windows.
В консоли (cmd, PowerShell, и т.п.) используйте команды:
```
cd <каталог с распакованными файлами сервера>
pm2 start hbbs.exe -- -r <адрес ретранслятора>
pm2 start hbbr.exe
pm2 save
```

### Просмотр журнала
```
pm2 log hbbr
pm2 log hbbs
```

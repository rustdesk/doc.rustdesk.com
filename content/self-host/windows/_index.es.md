---
title: Windows & pm2
weight: 20
---


### Instalar NodeJs
Por favor [Download](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) e instalar
NodeJs es el entorno de tiempo de ejecución de pm2, por lo que primero debe instalar NodeJs。

### Instalar pm2
Ingrese los siguientes en cmd.exe, presione la tecla Intro para cada línea y ejecútelos línea por línea.
```
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### Ejecutar hbbr y hbbs
Descargue la versión de Windows de [server program](https://github.com/rustdesk/rustdesk-server/releases), suponiendo que lo descomprima en la unidad C. Ejecute las siguientes cuatro líneas de comandos respectivamente.
```
cd c:\rustdesk-server-windows-x64
pm2 start hbbs.exe -- -r <The address of the host where hbbr is running>
pm2 start hbbr.exe 
pm2 save
```

### Ver registro
```
pm2 log hbbr
pm2 log hbbs
```
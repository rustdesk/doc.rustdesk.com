---
title: Windows & pm2
weight: 20
---


### Install NodeJs

Please [download](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) and install.
NodeJs is the runtime environment of pm2, so you need to install NodeJs first。

### Install pm2

Enter belows in `cmd.exe`, press the <kbd>Enter</kbd> key for each line, and run them line by line.

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### Run hbbr and hbbs

Download the Windows version of [server program](https://github.com/rustdesk/rustdesk-server/releases). Unzip the program to the C: drive. Run the following four commands (take care to edit the `-r` parameter):

```cmd
cd c:\rustdesk-server-windows-x64
pm2 start hbbs.exe -- -r <The host where hbbr is running>
pm2 start hbbr.exe 
pm2 save
```

### View the log

```cmd
pm2 log hbbr
pm2 log hbbs
```

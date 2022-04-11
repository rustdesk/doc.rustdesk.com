---
title: Windows
weight: 20
---


### Install NodeJs
Please [Download](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) and install.
NodeJs is the runtime environment of pm2, so you need to install NodeJs first。

### Install pm2
Enter belows in cmd.exe, press the Enter key for each line, and run them line by line.
```
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### Run hbbr and hbbs
Download the windows version of [server program](https://github.com/rustdesk/rustdesk-server/releases), assuming you unzip it to the C drive. Run the following four lines of commands respectively.
```
cd c:\rustdesk-server-windows-x64
pm2 start hbbr.exe -- -m <Registered email address>
pm2 start hbbs.exe -- -r <The address of the host where hbbr is running> -m <Registered email address>
pm2 save
```

### View log
```
pm2 log hbbr
pm2 log hbbs
```

### Modify email
For example, the new registered email address is test@test.com, and the public address of hbbr is test.hbbr.com
```
pm2 delete hbbr hbbs
cd c:\rustdesk-server-windows-x64
pm2 start hbbr.exe -- -m test@test.com
pm2 start hbbs.exe -- -r test.hbbr.com -m test@test.com
pm2 save
```
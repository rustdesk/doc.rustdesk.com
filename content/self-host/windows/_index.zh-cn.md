---
title: Windows & pm2
weight: 20
---

### 安装NodeJs
请点击[下载](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi)安装，可能会有点慢，如果卡顿太久，尝试关掉重新安装。
NodeJs是pm2的运行时环境，所以要先安装NodeJs。

### 安装pm2
在cmd.exe中分别输入下面三行，每一行都要按回车键，一行一行运行。
```
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### 运行hbbr和hbbs
下载Windows版本[服务器程序](https://gitee.com/rustdesk/rustdesk-server/releases)，假设你解压缩到了C盘下。分别运行下面四行命令。
```
cd c:\rustdesk-server-windows-x64
pm2 start hbbs.exe -- -r hbbr运行所在主机的地址 -m 注册邮箱地址
pm2 start hbbr.exe -- -m 注册邮箱地址
pm2 save
```

### 查看log
```
pm2 log hbbr
pm2 log hbbs
```

### 更换注册邮箱
比如新的注册邮箱是test@test.com，hbbr的公网地址是test.hbbr.com
```
pm2 delete hbbr hbbs
cd c:\rustdesk-server-windows-x64
pm2 start hbbs.exe -- -r test.hbbr.com -m test@test.com
pm2 start hbbr.exe -- -m test@test.com
pm2 save
```
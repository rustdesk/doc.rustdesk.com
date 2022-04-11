---
title: Windows
weight: 20
---

### 安裝NodeJs
請點擊[下載](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi)安裝，可能會有點慢，如果卡頓太久，嘗試關掉重新安裝。
NodeJs是pm2的運行時環境，所以要先安裝NodeJs。

### 安裝pm2
在cmd.exe中分別輸入下面三行，每一行都要按回車鍵，一行一行運行。
```
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### 運行hbbr和hbbs
下載Windows版本[服務器程序](https://gitee.com/rustdesk/rustdesk-server/releases)，假設你解壓縮到了C盤下。分別運行下面四行命令。
```
cd c:\rustdesk-server-windows-x64
pm2 start hbbs.exe -- -r hbbr運行所在主機的地址 -m 註冊郵箱地址
pm2 start hbbr.exe -- -m 註冊郵箱地址
pm2 save
```

### 查看log
```
pm2 log hbbr
pm2 log hbbs
```

### 更換註冊郵箱
比如新的註冊郵箱是test@test.com，hbbr的公網地址是test.hbbr.com
```
pm2 delete hbbr hbbs
cd c:\rustdesk-server-windows-x64
pm2 start hbbs.exe -- -r test.hbbr.com -m test@test.com
pm2 start hbbr.exe -- -m test@test.com
pm2 save
```
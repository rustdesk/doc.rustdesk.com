---
title: Windows & pm2
weight: 20
---

## 十字路口

您現在有兩個選擇，您可以使用 pm2 (較簡單) 或 NSSM (稍難) 來啟動 rustdesk 伺服器
使用 NSSM 的好處：
- Backwards compatibility with older windows (Windows Server 2008R2/Windows 7 and earlier although untested).
- Ideal for Windows Server
- Auto start on boot without login (The user who created the startup entry does not need to log on for it to start).
- Running both binaries as Services.
- Standalone (no dependency on nodejs)

使用 pm2 的好處：
- Good idea if you run the server on the same computer as your main work computer
- You logon regularly to the user that created the rustdesk startup entry
- 使用者友好

## 使用 NSSM 安裝

### 安裝 NSSM
Please [download](https://nssm.cc/release/nssm-2.24.zip) and extract NSSM select the appropriate
architecture to your windows system (if x86 use the contents of the win32 folder, if x64 use the
contents of win64 folder). It is also best practice to move the binary of NSSM into the
`Program Files\NSSM` (NSSM once started as a service, it cannot be moved from the directory it was placed in.
thus it is best to tuck it away in Program files) directory of your Installation drive (Usually the C drive).
It is also advisable to add the path (such as `C:\Program Files\NSSM`) to the path variable.


### Checking if NSSM is installed properly
If you've done everything correctly the folder `C:\Program Files\NSSM` (in this example I use the C:
drive but you can use whatever drive you installed windows to or whatever path you desire) should
only contain the file `nssm.exe`.

在此範例中，我們將使用 `C:\Program Files\NSSM`

Open Command prompt and run `nssm` if you see a help page you are ready to move onto the next step

### 執行 hbbr 和 hbbs
Download the Windows version of [server program](https://github.com/rustdesk/rustdesk-server/releases).
Unzip the program to the `C:\Program Files\RustDesk Server` (or anywhere you desire just make sure it
doesn't change after the service is installed). now get back to Command prompt

在此範例中，我們將使用 `C:\Program Files\RustDesk Server`
```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe" -r 0.0.0.0 -k _
nssm install "RustDesk hbbr Service" "C:\Program Files\RustDesk Server\hbbr.exe" -k _
```
**Note:**
- You can change `RustDesk hbbs service` to whatever you desire to name hbbs the service
- You can change `RustDesk hbbr service` to whatever you desire to name hbbr the service
- You can change `C:\Program Files\RustDesk Server\hbbs.exe` to wherever you placed the rustdesk binaries
- You can change `C:\Program Files\RustDesk Server\hbbr.exe` to wherever you placed the rustdesk binaries
- You do not need the `-k _` option which is optional, it's just for better security

**Command templates:**

The command template in case you just want to copy and paste and edit.

```cmd
nssm install <Desired hbbs servicename> <RustDesk hbbs binary path> <RustDesk hbbs arguments>
nssm install <Desired hbbr servicename> <RustDesk hbbr binary path> <RustDesk hbbr arguments>
```

**啟動服務**
成功安裝服務後，需要將其重新啟動。

```cmd
nssm start <Desired hbbs servicename>
nssm start <Desired hbbr servicename>
```

**大功告成！**

(上述方法已在 Windows Server Core 2022 Standard 上測試)。

## 或

## 使用 pm2 安裝

### 安裝 NodeJs
請[下載](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi)並安裝 NodeJs。
NodeJs 是 pm2 的執行環境，所以要先安裝 NodeJs。

### 安裝 pm2

在 `cmd.exe` 中輸入下面三行指令，每一行都要按 <kbd>Enter</kbd> 鍵，並逐行執行。

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### 執行 hbbr 和 hbbs
下載 [伺服器程式](https://gitee.com/rustdesk/rustdesk-server/releases)的 Windows 版本，解壓縮到 C: 下。並執行下面四行指令 (記得編輯 `-r` 參數)：

```cmd
cd c:\rustdesk-server-windows-x64
pm2 start hbbs.exe -- -r <hbbr 運行所在主機的地址>
pm2 start hbbr.exe
pm2 save
```

### 查看記錄

```
pm2 log hbbr
pm2 log hbbs
```
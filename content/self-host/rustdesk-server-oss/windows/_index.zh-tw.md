---
title: Windows & PM2 或 NSSM
weight: 20
---

{{% notice note %}}
Windows 安全政策較為複雜，如果這份教程對您不適用，或您遇到連線不穩定的情況，請轉移到 Linux 伺服器。
{{% /notice %}}

{{% notice note %}}
GUI 版本 `RustDeskServer.setup.exe` 已不再維護，不建議使用。
{{% /notice %}}

## 分岔路口
您現在有兩個選擇，您可以使用 PM2（較簡單）或 NSSM（稍難）來啟動 RustDesk 伺服器
使用 NSSM 的好處：
- 與舊版 Windows（Windows Server 2008 R2/Windows 7 及更早版本，雖未經測試）的向下相容。
- 適合 Windows Server 使用
- 開機自動啟動，無需登入（建立啟動項目的使用者無需登入即可啟動）。
- 將兩個執行檔作為服務執行。
- 獨立運行（不依賴於 Node.js）

使用 PM2 的好處包括：
- 如果您在主要工作的電腦上執行伺服器，這是一個好主意
- 您會定期登入建立 RustDesk 啟動項目的使用者帳戶
- 更加使用者友好

## 使用 NSSM 安裝

### 安裝 NSSM
請[下載](https://github.com/dkxce/NSSM/releases/download/v2.25/NSSM_v2.25.zip)並解壓縮 NSSM，選擇適合您的 Windows 系統架構的版本（如果是 x86，使用 win32 資料夾內的檔案；如果是 x64，則使用 win64 資料夾內容）。最佳做法是將 NSSM 的二進位檔移動到 `Program Files\NSSM` 目錄（一旦作為服務啟動，NSSM 不能從其放置的目錄中移動，因此最好將其收納在 `Program Files` 中）。建議將路徑（如 `C:\Program Files\NSSM`）新增到路徑變數中。

### 檢查 NSSM 是否正確安裝
如果一切正確，`C:\Program Files\NSSM` 資料夾（在這個例子中使用 C: 磁碟，但您可以使用安裝 Windows 的任何磁碟或所需的任何路徑）應該只包含 `nssm.exe` 檔案。

我們將在此範例中使用 `C:\Program Files\NSSM`。

開啟命令提示字元並執行 `nssm`，如果您看到說明頁面，則可以進行下一步。

### 執行 hbbr 和 hbbs
下載 [RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases) 的 Windows 版本。
將程式解壓縮至 `C:\Program Files\RustDesk Server`（或任何您想要的地方，只要確保在服務安裝後不會改變）。現在回到命令提示字元。

我們將在此範例中使用 `C:\Program Files\RustDesk Server`。
```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe"
nssm install "RustDesk hbbr service" "C:\Program Files\RustDesk Server\hbbr.exe"
```
**注意：**
- 您可以將 `RustDesk hbbs service` 改為任何您希望命名 hbbs 服務的名稱
- 您可以將 `RustDesk hbbr service` 改為任何您希望命名 hbbr 服務的名稱
- 您可以將 `C:\Program Files\RustDesk Server\hbbs.exe` 改為您放置 RustDesk 二進位檔的位置
- 您可以將 `C:\Program Files\RustDesk Server\hbbr.exe` 改為您放置 RustDesk 二進位檔的位置

**命令範本：**

如果您只想複製貼上並編輯，這是命令範本。

```cmd
nssm install <想要的 hbbs 服務名稱> <RustDesk hbbs 二進位檔路徑> <RustDesk hbbs 參數>
nssm install <想要的 hbbr 服務名稱> <RustDesk hbbr 二進位檔路徑> <RustDesk hbbr 參數>
```

**啟動服務**

成功安裝服務後，需要啟動它們。
```cmd
nssm start <想要的 hbbs 服務名稱>
nssm start <想要的 hbbr 服務名稱>
```

**完成！**

（以上方法已在 Windows Server Core 2022 標準版上測試。）

## 或者

## 使用 PM2 安裝

### 安裝 Node.js

請[下載](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi)並安裝 Node.js。
Node.js 是 PM2 的執行環境，所以您需要先安裝 Node.js。

### 安裝 PM2

在 `cmd.exe` 中輸入以下內容，每行輸入後按 <kbd>Enter</kbd> 鍵，逐行執行。

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### 執行 hbbr 和 hbbs

下載 [RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases) 的 Windows 版本。將程式解壓縮到 C: 磁碟。執行以下四個命令：

```cmd
cd C:\rustdesk-server-windows-x64
pm2 start hbbs.exe
pm2 start hbbr.exe
pm2 save
```

### 查看日誌

```cmd
pm2 log hbbr
pm2 log hbbs
```

## 替代教程
https://pedja.supurovic.net/setting-up-self-hosted-rustdesk-server-on-windows/?lang=lat
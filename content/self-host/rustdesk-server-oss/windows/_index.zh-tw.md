---
title: Windows & pm2
weight: 20
---
{{% notice note %}}
Windows 安全政策較為複雜，如果這份教程對您不適用，或您遇到連線不穩定的情況，請考慮轉移到 `Linux` 伺服器。
{{% /notice %}}

## 十字路口

您現在有兩個選擇，您可以使用 pm2 (較簡單) 或 NSSM (稍難) 來啟動 RustDesk 伺服器
使用 NSSM 的好處：
- 與舊版 Windows（Windows Server 2008 R2/Windows 7 及更早版本，雖未經測試）的向下兼容。
- 適合 Windows 伺服器使用
- 開機自動啟動，無需登入（建立啟動項目的用戶無需登入即可啟動）。
- 將兩個執行檔作為服務運行。
- 獨立運行（不依賴於 nodejs）。

使用 pm2 的好處：
- 如果您在主要工作的電腦上運行伺服器，這是一個好主意。
- 您會定期登入創建 RustDesk 啟動項目的使用者帳戶。
- 對使用者友好

### 使用 NSSM 安裝

#### 安裝 NSSM
請[下載](https://nssm.cc/release/nssm-2.24.zip)並解壓縮 NSSM，選擇適合您的 Windows 系統架構的版本（如果是 x86，使用 win32 資料夾內的檔案；如果是 x64，則使用 win64 資料夾）。最佳做法是將 NSSM 的執行檔移動到 `Program Files\NSSM` 目錄（一旦作為服務啟動，NSSM 不能從其放置的目錄中移動，因此最好放在 `Program Files` 中）。建議將路徑（如 `C:\Program Files\NSSM`）添加到環境變數中。

#### 檢查 NSSM 是否正確安裝
如果一切正確，`C:\Program Files\NSSM` 資料夾（在這個例子中使用 C: 磁碟，但您可以使用安裝 Windows 的任何磁碟或所需的任何路徑）應該只包含 `nssm.exe` 檔案。

我們將在範例中使用 `C:\Program Files\NSSM`。

打開命令提示字元並運行 `nssm`，如果您看到幫助頁面，則可以進行下一步。

#### 運行 hbbr 和 hbbs
下載 [RustDesk 伺服器](https://github.com/rustdesk/rustdesk-server/releases)的 Windows 版本。解壓縮至 `C:\Program Files\RustDesk Server`（或任何您想要的地方，只要確保在服務安裝後不會改變）。現在回到命令提示字元。

我們將在範例中使用 `C:\Program Files\RustDesk Server`。
```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe" 
nssm install "RustDesk hbbr service" "C:\Program Files\RustDesk Server\hbbr.exe" 
```
**注意：**
- 您可以將 `RustDesk hbbs service` 改為任何您希望命名 hbbs 的服務名稱。
- 您可以將 `RustDesk hbbr service` 改為任何您希望命名 hbbr 的服務名稱。
- 您可以將 `C:\Program Files\RustDesk Server\hbbs.exe` 改為 RustDesk 執行檔所在的位置。
- 您可以將 `C:\Program Files\RustDesk Server\hbbr.exe` 改為 RustDesk 執行檔所在的位置。

**指令範例：**

如果您只想複製並貼上並編輯，這是指令的範例。

```cmd
nssm install <所需的 hbbs 服務名稱> <RustDesk hbbs 執行檔路徑> <RustDesk hbbs 參數>
nssm install <所需的 hbbr 服務名稱> <RustDesk hbbr 執行檔路徑> <RustDesk hbbr 參數>
```

**啟動服務**

成功安裝服務後，需要啟動它們。
```cmd
nssm start <所需的 hbbs 服務名稱>
nssm start <所需的 hbbr 服務名稱>
```

**完成！**

（以上方法已在 Windows Server Core 2022 標準版上測試。）

### 或者

### 使用 PM2 安裝

#### 安裝 Node.js

請[下載](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi)並安裝 Node.js。
Node.js 是 PM2 的運行環境，所以您需要先安裝 Node.js。

#### 安裝 PM2

在 `cmd.exe` 中輸入以下內容，每行輸入後按 <kbd>Enter</kbd> 鍵，逐行運行。

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

#### 運行 hbbr 和 hbbs

下載 [RustDesk 伺服器](https://github.com/rustdesk/rustdesk-server/releases)的 Windows 版本。將程序解壓縮到 C: 磁碟。執行以下四個命令：

```cmd
cd C:\rustdesk-server-windows-x64
pm2 start hbbs.exe 
pm2 start hbbr.exe
pm2 save
```

#### 查看日誌

```cmd
pm2 log hbbr
pm2 log hbbs
```

---
title: 網頁控制台
weight: 10
---

功能：

- 新增/變更使用者和使用者群組
- 變更裝置存取權限
- 瀏覽裝置連線和其他紀錄檔
- 更新設定
- 管理客戶端設定同步策略

## 登入

如同之前所述，網頁控制台的預設連接埠為 21114。在瀏覽器輸入 `http://<hbbs host>:21114` 以進入控制台頁面。如下圖所示 (hbbs 執行在 IP 為 192.168.1.143 的伺服器上)：
![](/docs/en/self-host/pro/console/images/console-login.png)

如果您需要 https，請安裝如 `Nginx` 的網頁伺服器。

預設管理員帳號/密碼為 admin/test1234，請記得在登入後變更密碼，在右上角的帳號選單選擇 "設定" 以進入密碼變更頁面，如下圖所示。您也可以建立另一個管理員帳號，並刪除預設帳號，建議啟用電子郵件登入驗證。

<a name=console-home></a>
![](/docs/en/self-host/pro/console/images/console-home.png?v2)

非管理員使用者也可以登入來瀏覽他們的裝置和記錄，以及變更他們的使用者設定。

## Windows EXE

For Windows clients, you can leave out the custom server configuration and put the configuration information in the `RustDesk.exe` filename instead. As shown above, please go to the console welcome page and click on `Windows EXE`. **`Client >=1.1.9 Required`**。

## 裝置存取權限

若要將裝置與使用者關聯，有兩種方法：

- 透過控制台裝置頁面
- 在客戶端登入指定的使用者帳號

以下兩種情況將使裝置無法存取：
- 在控制台的裝置頁面停用裝置
- 在控制台的使用者頁面停用使用者

關聯裝置僅能被同使用者或使用者群組的裝置存取，或擁有正確的跨群組設定。

---
title: 網頁控制台
weight: 10
---

網頁控制台整合在 RustDesk 伺服器專業版中，由 `21114` 連接埠提供服務。

功能：

- 瀏覽裝置
- 新增/修改使用者和使用者群組
- 修改裝置存取權限
- 瀏覽裝置連線記錄和其他記錄
- 更新設定
- 管理客戶端設定同步策略
- 管理共享通訊錄
- 產生自訂客戶端

## 登入

網頁控制台的預設連接埠是 21114。在瀏覽器中輸入 `http://<伺服器 ip>:21114` 進入控制台頁面，如下圖所示。預設管理員使用者名稱/密碼是 `admin`/`test1234`：

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

如果您需要 HTTPS 支援，請安裝如 `Nginx` 的網頁伺服器，或在 Windows 上使用 `IIS`。

登入後請務必變更密碼，在右上角的帳號選單中選擇 `設定` 進入密碼修改頁面，如下圖所示。您也可以建立另一個管理員帳號並刪除這個。建議啟用電子郵件登入驗證。

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

非管理員使用者也可以登入查看他們的裝置和記錄，變更他們的使用者設定。

## 自動設定
點選 `Windows EXE` 您將能夠取得您自己的 RustDesk 伺服器專業版的設定，這將協助設定您的客戶端。

對於 Windows 客戶端，您可以省略自訂伺服器設定，將設定資訊放在 `rustdesk.exe` 檔案名稱中。如上所示，請進入控制台歡迎頁面並點選 `Windows EXE`。**需要客戶端 ≥ 1.1.9。**

您可以結合[客戶端設定](https://rustdesk.com/docs/zh-tw/self-host/client-configuration/)和[部署腳本](https://rustdesk.com/docs/zh-tw/self-host/client-deployment/)來設定您的客戶端。

## 建立除預設 `admin` 使用者之外的新使用者

{{% notice note %}}
`個人版` 方案沒有此功能。
{{% /notice %}}

1. 點選左側選單的 `使用者`。
2. 建立另一個啟用了 `管理員` 權限的帳號。
3. 使用新的管理員帳號登入。
4. 在 `使用者` 頁面刪除 `admin`。

## 建立新使用者
1. 點選左側選單的 `使用者`。
2. 建立新使用者。
3. 選擇他們應該所屬的群組（如果需要新增新群組，請繼續閱讀）。

## 新增新群組
1. 點選左側選單的 `群組`。
2. 建立新群組。
3. 建立後，您可以允許群組之間相互存取，點選 `編輯`。
4. 選擇您想要存取的相關群組（它會自動將它們新增到相應的群組中）。

## 設定多個中繼伺服器
1. 進入左側選單的 `設定`。
2. 點選子選單的 `中繼`。
3. 點選 `中繼伺服器` 旁邊的 `+`。
4. 在現在顯示的方塊中輸入中繼伺服器 DNS 位址或 IP 位址，然後按 <kbd>Enter</kbd>。
5. 如果您有多個中繼伺服器，可以繼續點選 `+` 並根據需要調整地理位置設定（記住並將您的金鑰複製到其他伺服器）。

## 設定或變更授權
1. 進入左側選單的 `設定`。
2. 點選子選單的 `授權`。
3. 點選 `編輯` 並貼上您的授權碼。
4. 點選 `確定`。

## 檢視記錄
點選左側的 `記錄`。

## 設定電子郵件
以 Gmail 為例

1. 進入左側選單的 `設定`。
2. 點選子選單的 `SMTP`。
3. 輸入 SMTP 位址 `smtp.gmail.com`。
4. 在 `SMTP 連接埠` 中輸入連接埠 587。
5. 在 `郵件帳號` 中輸入 Gmail 帳號，例如 `myrustdeskserver@gmail.com`。
6. 輸入您的密碼（您可能需要應用程式專用密碼）。
7. 在 `寄件者` 中輸入您的 Gmail 帳號，例如 `myrustdeskserver@gmail.com`。
8. 點選 `檢查` 儲存。

## 將裝置使用者/群組/策略/裝置群組指派給裝置
使用者是登入在裝置上的 RustDesk 使用者，或透過點選裝置旁邊的 `編輯` 指派給裝置的使用者，點選 `使用者` 方塊並從下拉式選單中選擇您的使用者，這將根據使用者被指派到的群組自動指派群組。

這也可以透過 API 在部署時或之後在命令列中完成，呼叫 RustDesk 執行檔後接 `--assign --token <產生的權杖> --user_name <使用者名稱>`。您需要先進入 `設定 → 權杖 → 建立` 並建立具有裝置權限的權杖。在 Windows 上的範例為 `"C:\Program Files\RustDesk\rustdesk.exe" --assign --token <產生的權杖> --user_name <新使用者>`。

您也可以透過這種方式指派策略，例如 `--assign --token <產生的權杖> --strategy_name <策略名稱>`。

您也可以透過這種方式指派通訊錄，例如 `--assign --token <產生的權杖> --address_book_name <通訊錄名稱>` 或 `--assign --token <產生的權杖> --address_book_name <通訊錄名稱> --address_book_tag <通訊錄標籤> --address_book_alias <別名>`。`--address_book_alias` 需要 RustDesk 伺服器專業版 >=1.5.8 和客戶端 >=1.4.1。

您也可以透過這種方式指派裝置群組名稱，例如 `--assign --token <產生的權杖> --device_group_name <裝置群組名稱>`。

Windows 上的命令列預設沒有輸出。要取得輸出，請這樣執行：`"C:\Program Files\RustDesk\rustdesk.exe" <參數1> <參數2> ... | more` 或 `"C:\Program Files\RustDesk\rustdesk.exe" <參數1> <參數2> ... | Out-String`，參見[這裡](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952)。

## 搜尋裝置
1. 進入裝置頁面。
2. 在裝置名稱搜尋欄位中輸入名稱並點選 `查詢` 或按 <kbd>Enter</kbd>。
3. 要使用萬用字元，請在搜尋詞的開頭、結尾或兩端新增 `%`。
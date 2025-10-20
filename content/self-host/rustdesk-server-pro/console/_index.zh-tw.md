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

## 透過 Web 控制台分配設備使用者/策略/設備群組

使用者是已登入該設備的 RustDesk 使用者，或可透過點擊設備旁的 **編輯**，在 **使用者** 欄位中從下拉選單選擇使用者來分配。  
也可以透過在 **使用者列表** 點擊 **更多 → 分配設備**，批次將設備分配給使用者。

若要將設備加入設備群組，可在 **設備列表** 中點擊設備旁的 **編輯**，修改 **群組**，或前往 **設備群組** 列表，點擊群組名稱並調整該群組內的設備。

若要將策略分配給設備，將滑鼠移至 **策略** 列表右側，並在選單中點擊 **編輯設備**、**編輯使用者** 或 **編輯設備群組**，將對應的設備、使用者設備或群組設備加入所選策略。

---

## API Token

首先，需前往 **設定 → Token → 建立**，並建立擁有所需權限的權杖：**設備、審計日誌、使用者、群組、策略、通訊錄**。

建立後，可透過 **命令列** 或 **Python CLI** 使用這些權杖，執行擁有相應權限的操作。

### 透過命令列使用Token分配

也可以使用 RustDesk 可執行檔搭配 `--assign` 參數進行分配。  
這可直接透過命令列將使用者、策略、通訊錄或設備群組分配給設備。

**範例：**

    "C:\Program Files\RustDesk\rustdesk.exe" --assign --token <generatedtoken> --user_name <username>

支援參數

| 參數                                    | 說明                                     | RustDesk Server Pro | RustDesk Client | 
| --------------------------------------- | ---------------------------------------- | ----------------- | --------------- | 
| `--user_name <username>`                | 將使用者分配給設備                        |                   |                 | 
| `--strategy_name <strategyname>`        | 將策略分配給設備                          |                   |                 | 
| `--address_book_name <addressbookname>` | 將設備分配給通訊錄                        |                   |                 | 
| `--address_book_tag <addressbooktag>`   | 使用通訊錄標籤進行分配                    |                   |                 | 
| `--address_book_alias <alias>`          | 使用通訊錄別名進行分配                    | 1.5.8             | 1.4.1           | 
| `--address_book_password <password>`    | 設定通訊錄條目的密碼                        | 1.6.6             | 1.4.3           | 
| `--address_book_note <note>`            | 設定通訊錄條目的備註                        | 1.6.6             | 1.4.3           | 
| `--device_group_name <devicegroupname>` | 將設備分配到設備群組                        |                   |                 | 
| `--note <note>`                         | 為設備添加備註                             | 1.6.6             | 1.4.3           | 
| `--device_username <device_username>`   | 設定設備使用者名稱                           | 1.6.6             | 1.4.3           | 
| `--device_name <device_name>`           | 設定設備名稱                               | 1.6.6             | 1.4.3           | 

Windows 命令列預設不會輸出結果。若要查看輸出，可使用：

    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more
    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String

詳情參考 [這裡](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952)。

### Python CLI 管理工具

#### 使用者管理 (`users.py`)

**顯示幫助：**

    ./users.py -h

**查看使用者：**

    ./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]

**篩選條件：**

    --name : 使用者名稱
    --group_name : 使用者群組

**範例：**

    ./users.py --url https://example.com --token <token> view --group_name admins

**操作：**

`view` 可替換為 `enable`、`disable` 或 `delete`。

**範例（停用使用者）：**

    ./users.py --url https://example.com --token <token> disable --name testuser

---

#### 設備管理 (`devices.py`)

**顯示幫助：**

    ./devices.py -h

**查看設備：**

    ./devices.py --url <url> --token <token> view [--id <device_id>] [--device_name <device_name>] [--user_name <user_name>] [--group_name <group_name>] [--device_group_name <device_group_name>] [--offline_days <days>]

**篩選條件：**

    --id : 設備 ID
    --device_name : 設備名稱
    --user_name : 分配的使用者
    --group_name : 使用者群組
    --device_group_name : 設備群組
    --offline_days : 離線天數

**範例：**

    ./devices.py --url https://example.com --token <token> view --user_name mike

**操作：**

`view` 可替換為 `enable`、`disable`、`delete` 或 `assign`。

**範例（分配設備）：**

    ./devices.py --url https://example.com --token <token> assign --device_name PC01 --assign_to user_name=mike

---

#### 通訊錄管理 (`ab.py`)

**顯示幫助：**

    ./ab.py -h

**查看共享通訊錄：**

    ./ab.py --url <url> --token <token> view-ab [--ab-name <address_book_name>]

**取得個人通訊錄 GUID：**

    ./ab.py --url <url> --token <token> get-personal-ab

**新增共享通訊錄：**

    ./ab.py --url <url> --token <token> add-ab --ab-name <name> [--note <note>] [--password <password>]

**更新或刪除共享通訊錄：**

    ./ab.py --url <url> --token <token> update-ab --ab-guid <guid> [--ab-update-name <new_name>] [--note <note>]
    ./ab.py --url <url> --token <token> delete-ab --ab-guid <guid>

**查看通訊錄中的 peer：**

    ./ab.py --url <url> --token <token> view-peer --ab-guid <guid> [--peer-id <peer_id>] [--alias <alias>]

**新增、更新或刪除 peer：**

    ./ab.py --url <url> --token <token> add-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> update-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> delete-peer --ab-guid <guid> --peer-id <peer_id>

**標籤管理：**

    ./ab.py --url <url> --token <token> view-tag --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-tag --ab-guid <guid> --tag-name <name> [--tag-color 0xFF00FF00]
    ./ab.py --url <url> --token <token> update-tag --ab-guid <guid> --tag-name <name> --tag-color 0xFFFF0000
    ./ab.py --url <url> --token <token> delete-tag --ab-guid <guid> --tag-name <name>

**存取規則管理：**

    ./ab.py --url <url> --token <token> view-rule --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-rule --ab-guid <guid> [--rule-type user|group|everyone] [--rule-user <user>] [--rule-group <group>] --rule-permission ro|rw|full
    ./ab.py --url <url> --token <token> update-rule --rule-guid <rule_guid> --rule-permission rw
    ./ab.py --url <url> --token <token> delete-rule --rule-guid <rule_guid>

**範例（為使用者 "mike" 新增唯讀規則）：**

    ./ab.py --url https://example.com --token <token> add-rule --ab-guid <guid> --rule-user mike --rule-permission ro

---

#### 稽核 (`audits.py`)

**顯示幫助：**

    ./audits.py -h

**查看連線稽核：**

    ./audits.py --url <url> --token <token> view-conn [--remote <peer_id>] [--conn-type <type>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**查看檔案稽核：**

    ./audits.py --url <url> --token <token> view-file [--remote <peer_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**查看警示稽核：**

    ./audits.py --url <url> --token <token> view-alarm [--device <device_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**查看控制台稽核：**

    ./audits.py --url <url> --token <token> view-console [--operator <username>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**篩選條件：**

    --remote : peer ID（連線或檔案稽核用）
    --conn-type : 0=遠端桌面, 1=檔案傳輸, 2=端口傳輸, 3=觀看攝影機, 4=終端機
    --device : 設備 ID（警示稽核用）
    --operator : 操作者使用者名稱（控制台稽核用）
    --created-at : 本地時間篩選，例如 "2025-09-16 14:15:57"
    --days-ago : 篩選 n 天內的紀錄
    --page-size / --current : 分頁

**範例：**

    ./audits.py --url https://example.com --token <token> view-conn --remote 123456789 --days-ago 7

## 搜尋裝置
1. 進入裝置頁面。
2. 在裝置名稱搜尋欄位中輸入名稱並點選 `查詢` 或按 <kbd>Enter</kbd>。
3. 要使用萬用字元，請在搜尋詞的開頭、結尾或兩端新增 `%`。
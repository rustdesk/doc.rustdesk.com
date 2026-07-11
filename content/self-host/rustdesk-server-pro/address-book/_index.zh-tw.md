---
title: 通訊錄
weight: 201
description: "在 RustDesk Server Pro 中使用通訊錄儲存遠端設備、共享設備列表、用標籤組織設備，並在 RustDesk 用戶端中使用共享密碼連線。"
keywords: ["rustdesk address book", "rustdesk server pro address book", "rustdesk shared address book", "rustdesk device tags", "rustdesk shared password"]
---

通訊錄允許使用者儲存 RustDesk 設備 ID、用標籤組織設備、共享設備列表，並在 RustDesk 用戶端中使用已儲存的密碼連線。

## 快速回答

- **我的通訊錄** 對已登入使用者私有。手動輸入後被記住的密碼會儲存在 **我的通訊錄** 中，並可在該使用者的設備之間同步。
- **共享** 通訊錄可以共享給指定使用者、使用者群組或所有使用者。
- 共享通訊錄可以儲存通訊錄級密碼，每個設備條目也可以儲存設備級密碼。未設定設備級密碼時，會使用通訊錄級密碼。
- 標籤可用於在 Web 控制台和 RustDesk 用戶端中過濾設備。

## 使用共享通訊錄一鍵連線

當使用者需要連線而不想每次手動輸入遠端密碼時，請使用共享通訊錄。

1. 建立或開啟一個共享通訊錄。可選擇在通訊錄上設定 **通訊錄級密碼**。

2. 點擊通訊錄名稱開啟設備頁面。點擊 **匯入**，選擇要匯入通訊錄的設備，然後點擊底部的 **儲存** 儲存所選設備。或者點擊 **新增**，透過 ID 新增設備；如需直接 IP 存取，可使用 IP 位址作為 ID。可選擇為單個設備條目設定 **設備級密碼**。

3. 將通訊錄共享給指定使用者、使用者群組或所有使用者。

4. 使用者登入 RustDesk 用戶端並開啟 **通訊錄** 標籤頁。

5. 使用者選擇共享通訊錄並點擊設備卡片。

![在用戶端中點擊共享通訊錄設備卡片](/docs/en/self-host/rustdesk-server-pro/address-book/images/click-peer-card.png)

{{% notice warning %}}
共享密碼僅在從對應的共享通訊錄連線時使用，包括點擊設備卡片或使用其下拉選單。從其他設備標籤頁、ID 輸入框旁邊的 **連線** 按鈕或其他共享通訊錄連線時，不會使用該共享密碼。
{{% /notice %}}

## 共享通訊錄權限

| 權限 | 使用者可以執行的操作 |
| --- | --- |
| **唯讀** | 可以查看設備和標籤，並可以使用密碼。 |
| **讀/寫** | 可以編輯設備和標籤。 |
| **完全控制** | 可以再次共享、刪除或重新命名通訊錄。 |

當多條規則符合同一使用者時，優先順序為：

1. 使用者
2. 群組
3. 所有人

例如，如果 **所有人** 是唯讀，但某個指定使用者是完全控制，則該使用者會取得完全控制權限。

![共享通訊錄權限](/docs/en/self-host/rustdesk-server-pro/address-book/images/share-list.png)

![Web 控制台中的共享通訊錄權限](/docs/en/self-host/rustdesk-server-pro/address-book/images/user1-permission.png)

## Web 控制台

### 建立或編輯共享通訊錄

在 **通訊錄 > 共享** 中，建立帶有名稱、可選備註和可選 **預設共享密碼** 的共享通訊錄。這就是通訊錄級密碼。

![建立帶有預設共享密碼的共享通訊錄](/docs/en/self-host/rustdesk-server-pro/address-book/images/create-shared-address-book.png)

### 新增設備和密碼

可以透過 ID 手動新增設備，也可以從 Server Pro 設備列表匯入設備。對於每個條目，你可以設定別名、標籤、備註；對於共享通訊錄，還可以設定設備級密碼。

![將設備新增到共享通訊錄](/docs/en/self-host/rustdesk-server-pro/address-book/images/import-device.png)

![設備](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-addressbook-devices.png)

![編輯共享通訊錄中的設備](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-edit-device.png)

### 標籤和過濾

標籤用於組織和過濾設備。`未標記` 會篩選沒有標籤的設備。啟用 **按交集過濾** 後，只會顯示符合所有已選標籤的設備。

### 回收站

從通訊錄中刪除設備會將該條目移動到該通訊錄的回收站。它不會從 RustDesk Server Pro 中刪除該設備。

## 共享密碼行為

| 密碼級別 | 優先順序 |
| --- | --- |
| 設備級密碼 | 當設備條目設定了密碼時優先使用。 |
| 通訊錄級密碼 | 當設備條目沒有密碼時使用。 |

如果兩個密碼都未設定，使用者將按正常方式連線，並且可能需要手動輸入密碼。在 Web 控制台中，密碼欄只顯示是否已設定密碼。

## RustDesk 用戶端

登入後，使用通訊錄選擇器在 **我的通訊錄** 和共享通訊錄之間切換。對於共享通訊錄，用戶端會顯示目前使用者的權限。

![RustDesk 用戶端通訊錄選擇器](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-selector.png)

![唯讀通訊錄](/docs/en/self-host/rustdesk-server-pro/address-book/images/read-only-address-book.png)

### 從用戶端編輯

有寫入權限的使用者可以新增 ID、新增標籤、編輯別名、編輯標籤、編輯備註、設定共享密碼或移除條目。

![RustDesk 用戶端中的通訊錄設備選單 1](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu1.png)

![RustDesk 用戶端新增 ID](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-add-id.png)

![RustDesk 用戶端中的通訊錄設備選單 2](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu2.png)

![RustDesk 用戶端修改密碼](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-change-password.png)

## 部署預設

RustDesk 用戶端設定可以預設通訊錄分配：

- `preset-address-book-name`
- `preset-address-book-tag`
- `preset-address-book-alias`
- `preset-address-book-password`
- `preset-address-book-note`

`preset-address-book-alias`、`preset-address-book-password` 和 `preset-address-book-note` 需要 RustDesk 用戶端 1.4.3 或更高版本，以及 RustDesk Server Pro 1.6.6 或更高版本。

更多詳情，請參閱[進階用戶端設定](/docs/en/self-host/client-configuration/advanced-settings/#preset-address-book-name--preset-address-book-tag--preset-address-book-alias--preset-address-book-password--preset-address-book-note)。

## 相關設定

| 設定 | 位置 | 作用 |
| --- | --- | --- |
| **允許非管理員將通訊錄共享給其他群組** | **設定 > 其他** | 允許非管理員使用者將通訊錄共享給其他使用者群組。 |
| **停用通訊錄** | **自訂用戶端** | 在產生的自訂用戶端中隱藏或停用通訊錄。 |

## 故障排除

### 密碼錯誤

保存在共享通訊錄中的密碼由控制端 RustDesk 用戶端使用。它不會設定到被控設備上。請在被控設備的 **設定 > 安全性 > 密碼** 中設定該設備的密碼。

要使用共享密碼，請點擊設備卡片從對應的共享通訊錄連線。從其他通訊錄、其他設備標籤頁或 ID 輸入框旁邊的 **連線** 按鈕連線時，不會使用此通訊錄的共享密碼。

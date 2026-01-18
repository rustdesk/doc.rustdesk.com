---
title: 管理員角色
weight: 17
---

管理員角色允許管理員將部分管理權限委派給非管理員使用者。您可以為全域資源（如策略、控制角色和自訂用戶端）以及不同範圍內的使用者和裝置定義權限。

一旦為使用者分配了管理員角色，他們將根據授予的權限在 Web 控制台中看到相應的頁面和選單。

## 管理員與管理員角色

- 只有管理員可以編輯管理員角色並將管理員角色分配給使用者。
- 管理員不受管理員角色的限制，儘管可以為管理員分配管理員角色。
- 非管理員使用者無法編輯管理員帳戶，即使被授予了全域使用者權限。

## 角色類型

管理員角色有三種類型，每種類型具有不同的範圍和可用權限。

| 類型 | 描述 |
|------|-------------|
| **全域** | 可以管理整個團隊的所有資源 |
| **個人** | 只能管理使用者自己的裝置和稽核日誌 |
| **群組範圍** | 可以管理指定群組內的使用者和裝置 |

### 關於群組範圍

| 選定的權限 | 應用於 |
|-------|-------------|
| **使用者權限** | 應用於所選使用者群組內的使用者 |
| **裝置權限** | 應用於以下裝置：<ul><li>所選裝置群組中的裝置</li><li>分配給所選使用者群組內使用者的裝置</li><li>未分配的裝置（如果啟用）</li></ul> |

您可以在群組範圍角色中僅選擇使用者權限或僅選擇裝置權限，使權限和範圍更清晰。例如，僅選擇使用者權限可以管理使用者而無需任何裝置存取權限；僅選擇裝置權限則可以透過選擇使用者群組、裝置群組或未分配裝置作為範圍來管理裝置。

## 權限規則

### 任何編輯權限都包含相應的檢視權限

任何編輯權限都自動包含相應的檢視權限。例如，「裝置啟用/停用」權限包含「檢視裝置」權限。

### 編輯權限不包含分配

資源（使用者群組、裝置群組、策略、控制角色）的編輯權限僅允許編輯資源本身，不包含將其分配給使用者或裝置的權限。

例如，「編輯裝置群組」權限允許建立和修改裝置群組，但要向群組中新增或移除裝置，需要「裝置更新群組」權限。

### 檢視權限不包含成員

資源的檢視權限僅允許檢視資源本身，不包含檢視其中成員的權限。

{{% notice note %}}
地址簿的裝置讀取不受管理員角色影響。用戶端的可存取裝置 peer 標籤頁的內容讀取僅受控制台中 **設定 → 其他 → 停用取得可存取裝置** 的限制，也不受管理員角色限制。
{{% /notice %}}

## 控制台操作

### 建立角色

1. 導覽至**管理員角色**頁面並點擊**建立**
2. 輸入角色的**名稱**
3. 選擇**類型**（對於**群組範圍**，還需設定範圍）
4. 選擇要授予的**權限**

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-permission.png)

### 角色分配

有兩種方式將管理員角色分配給使用者：

1. **使用者頁面** → 點擊使用者的**編輯** → 在**管理員角色**欄位中選擇角色
2. **管理員角色頁面** → 點擊**使用者數量**或**分配使用者** → 新增或移除角色中的使用者

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-role-page.png)

{{% notice note %}}
- 一個使用者可以被分配多個管理員角色。所有分配角色的權限會合併（所有權限的聯集）。
{{% /notice %}}

## 權限參考

### 全域權限

| 權限 | 描述 |
|------------|-------------|
| Users-View | 讀取所有使用者的清單資訊。 |
| Users-Create | 直接建立非管理員使用者。 |
| Users-Invite | 透過郵件邀請使用者。 |
| Users-Delete | 刪除任何非管理員使用者。 |
| Users-Enable/Disable | 啟用或停用任何非管理員使用者。 |
| Users-Edit Email | 更改任何非管理員使用者的郵箱。 |
| Users-Edit Password | 更改任何非管理員使用者的密碼。 |
| Users-Edit Note | 更改任何非管理員使用者的備註。 |
| Users-Manage 2FA | 管理任何非管理員使用者的登入驗證。 |
| Users-Force Logout | 強制任何非管理員使用者從所有裝置登出。 |
| Users-Update Group | 更改任何非管理員使用者的群組。 |
| Users-Update Strategy | 更改任何非管理員使用者的策略。 |
| Users-Update Control Role | 更改任何非管理員使用者的控制角色。 |
| Devices-View | 讀取所有裝置的清單資訊。 |
| Devices-Enable/Disable | 啟用或停用任何裝置。 |
| Devices-Delete | 刪除任何裝置。 |
| Devices-Edit Info | 編輯任何裝置的名稱、裝置使用者名稱和備註。 |
| Devices-Assign to User | 將任何裝置分配給任何使用者。 |
| Devices-Update Group | 更改任何裝置的群組。 |
| Devices-Update Strategy | 更改任何裝置的策略。 |
| User Groups-View | 讀取所有使用者群組的清單資訊。 |
| User Groups-Edit | 建立、編輯和刪除使用者群組。 |
| Device Groups-View | 讀取所有裝置群組的清單資訊。 |
| Device Groups-Edit | 建立、編輯和刪除裝置群組。 |
| Device Groups-Update Strategy | 更改任何裝置群組的策略。 |
| Audit Logs-View | 讀取所有日誌。 |
| Audit Logs-Edit | 可以中斷任何活動連線。 |
| Strategies-View | 讀取任何策略。 |
| Strategies-Edit | 建立、編輯和刪除策略。 |
| Control Roles-View | 讀取任何控制角色。 |
| Control Roles-Edit | 建立、編輯和刪除控制角色。 |
| Custom Clients-View | 讀取自訂用戶端清單。 |
| Custom Clients-Edit | 建立、編輯和刪除自訂用戶端。 |

### 個人權限

| 權限 | 描述 |
|------------|-------------|
| Devices-View | 讀取使用者自己裝置的清單資訊。 |
| Devices-Enable/Disable | 啟用或停用使用者自己的裝置。 |
| Devices-Delete | 刪除使用者自己的裝置。 |
| Devices-Edit Info | 編輯使用者自己裝置的資訊。 |
| Devices-Update Strategy | 更改使用者自己裝置的策略。 |
| Audit Logs-View | 讀取個人日誌。 |
| Audit Logs-Edit | 可以中斷個人活動連線。 |

### 群組範圍權限

| 權限 | 描述 |
|------------|-------------|
| Users-View | 讀取所選使用者群組內使用者的清單資訊。 |
| Users-Create | 在所選使用者群組內建立非管理員使用者。 |
| Users-Invite | 在所選使用者群組內透過郵件邀請使用者。 |
| Users-Delete | 刪除所選使用者群組內的非管理員使用者。 |
| Users-Enable/Disable | 啟用或停用所選使用者群組內的非管理員使用者。 |
| Users-Edit Email | 更改所選使用者群組內非管理員使用者的郵箱。 |
| Users-Edit Password | 更改所選使用者群組內非管理員使用者的密碼。 |
| Users-Edit Note | 更改所選使用者群組內非管理員使用者的備註。 |
| Users-Manage 2FA | 管理所選使用者群組內非管理員使用者的登入驗證。 |
| Users-Force Logout | 強制所選使用者群組內的非管理員使用者登出。 |
| Users-Update Strategy | 更改所選使用者群組內非管理員使用者的策略。 |
| Users-Update Control Role | 更改所選使用者群組內非管理員使用者的控制角色。 |
| Devices-View | 讀取當前角色管理的裝置的清單資訊。 |
| Devices-Enable/Disable | 啟用或停用當前角色管理的裝置。 |
| Devices-Delete | 刪除當前角色管理的裝置。 |
| Devices-Edit Info | 編輯當前角色管理的裝置的資訊。 |
| Devices-Update Strategy | 更改當前角色管理的裝置的策略。 |

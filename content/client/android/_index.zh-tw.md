---
title: Android
weight: 4
---

## 遠端控制

在主頁輸入遠端設備的ID或選擇歷史設備進行驗證。
驗證成功後，即可控制遠端設備。

| 主頁 | 成功連接 |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_en.jpg?width=300px) | ![](/docs/en/client/android/images/connection_en.jpg?width=300px) |

輸入控制提供兩種模式：`滑鼠模式`和`觸控模式`，可透過下方工具列切換。

| 滑鼠設定 | 模式選擇 |
| --- | --- |
| ![](/docs/en/client/android/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/client/android/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
在`滑鼠模式`下，您也可以透過`雙指點擊`觸發遠端設備的`右鍵`
{{% /notice %}}

## 檔案傳輸（Android）

> 需要 RustDesk ≥ 1.1.9

在主頁的設備列表中選擇設備。

長按或點擊右側選單選擇`檔案傳輸`。

| 主頁 | 成功連接 |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_connection_en.jpg?width=300px) |

- 初始目錄是設備的主目錄，您可以點擊 <i class="fas fa-home"></i> 快速返回主目錄。
- 標題列下方是目錄層級，您可以點擊相應資料夾快速跳轉。
- 點擊 <i class="fas fa-arrow-up"></i> 存取上級目錄。
- 列表底部會提示目前絕對路徑和項目統計。
- 點擊標題列中的`本機`/`遠端`切換頁面。

### 如何傳輸檔案？

1. 在列表中**長按**檔案或資料夾，快速進入**多選模式**，可選擇多個項目。
2. 選擇檔案後，切換`本機`/`遠端`頁面。切換後，螢幕底部會出現`貼上到此處？`提示。
3. 點擊圖片中的貼上檔案圖示，將選中的項目傳輸到目標目錄。

| 多選模式 | 檔案貼上 |
| --- | --- |
| ![](/docs/en/client/android/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_copy_en.jpg?width=300px) |

## 設定ID/中繼伺服器

1. 點擊底部導航列的`設定`。
2. 點擊`ID/中繼伺服器`。
3. 在`ID伺服器`欄位中輸入您的ID伺服器主機名稱/IP位址。將`中繼伺服器`和`API伺服器`留空，在`金鑰`欄位中輸入您的公開金鑰（可選，加密需要）。按**確定**儲存設定。它會自動切換到指定的伺服器。

您也可以透過掃描QR碼進行設定。要產生QR碼，請使用以下格式（將`host`和`key`值更改為您自己的）：

```nolang
config={"host": "xxx", "key": "xxx"}
```

然後造訪[線上QR碼產生器](https://www.qr-code-generator.com/)並貼上上述程式碼。

下圖是Android的截圖。如果是iOS，請檢查主頁右上角選單。

![](/docs/en/client/android/images/id_setting_en.jpg?width=300px)

## 分享您Android手機的螢幕/檔案

從1.1.9版本開始，Android用戶端增加了分享手機螢幕和分享手機檔案系統的功能。

- 螢幕分享需要Android 6及以上版本
- 分享手機系統內部音訊需要Android 10及以上版本
- iOS暫不支援螢幕分享

### 請求權限並啟動服務

從底部導航列點擊`分享螢幕`。

根據需要設定各種權限。每次啟動RustDesk時，都需要重新請求「螢幕擷取」和「輸入控制」權限。

![](/docs/en/client/android/images/server_off_en.jpg?width=300px)

| 權限 | 描述 |
| --- | --- |
| 螢幕擷取 | 是否啟用螢幕擷取分享權限，啟動時同時啟用監控服務 |
| 輸入控制* | 是否允許控制端控制手機輸入，如滑鼠虛擬觸控操作 |
| 檔案傳輸* | 是否啟用檔案傳輸權限，啟動後可遠端控制此手機的檔案系統 |
| 音訊擷取 | 是否分享手機內部系統音樂（非麥克風輸入） |

{{% notice note %}}
上述*代表特殊權限。要獲得此類權限，需要跳轉到Android系統設定頁面手動獲取。詳情如下
{{% /notice %}}

### 特殊權限請求 - 檔案

| 請求Android檔案權限會自動跳轉到系統設定頁面 |
| :---: |
| ![](/docs/en/client/android/images/get_file_en.jpg?width=300px) |

### 特殊權限請求 - 滑鼠輸入
| 步驟1：找到「已安裝的服務」 | 步驟2：啟動RustDesk輸入 |
| --- | --- |
| ![](/docs/en/client/android/images/get_input1_en.jpg?width=300px) | ![](/docs/en/client/android/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
不同廠商的系統設定頁面可能不同，請根據您的系統頁面進行調整。
{{% /notice %}}

| 遠端滑鼠控制快捷鍵 | 描述 |
| --- | --- |
| 點擊滑鼠右鍵 | 返回 |
| 點擊滑鼠滾輪 | 主頁 |
| 長按滑鼠滾輪 | 最近開啟的應用程式 |
| 滑鼠滾輪滾動 | 模擬垂直滑動 |

### 啟動服務

獲得`螢幕擷取`權限後，服務會自動啟動。您也可以點擊`啟動服務`按鈕啟動服務。服務啟動後，可以接受來自其他設備的桌面控制請求。

如果啟用了`檔案傳輸`權限，也可以接受來自其他設備的檔案控制請求。

服務啟動後，會自動為此設備獲取唯一ID和隨機密碼。其他設備可以透過ID和密碼控制手機，或在收到新請求時手動確認。

| 啟動服務前 | 啟動服務後 |
| --- | --- |
| ![](/docs/en/client/android/images/server_off_en.jpg?width=300px) | ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. 點擊`啟動服務`預設啟用`螢幕擷取`權限。
2. 未獲得`螢幕擷取`權限時，其他設備無法發出控制請求。
3. 除`螢幕擷取`權限外，其他權限的切換只會對新連接生效，不會影響已建立的連接。如需對已建立的連接切換權限，請先關閉目前連接，修改權限後再接受控制請求。
{{% /notice %}}

#### PC端

![](/docs/en/client/android/images/android_server_pc_side_en.png?width=700px)

#### 行動端

| 您可以隨時停止服務或關閉指定連接 | 您可以接收或發起聊天 |
| --- | --- |
| ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) | ![](/docs/en/client/android/images/android_server2_en.jpg?width=300px) |
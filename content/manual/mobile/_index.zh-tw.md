---
title: 手機端
weight: 1
---

### 遠端控制

在首頁中輸入遠端裝置的 ID 或選擇歷史裝置，即可進行驗證。
驗證成功後即可控制對方的桌面。

| 首頁             | 連接成功                                                     |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/connection_home_zh.jpg?width=300px) | ![](/docs/en/manual/mobile/images/connection.jpg?width=300px) |

輸入控制提供兩種模式：`滑鼠模式`和`觸控模式`，可以通過下方的工具列進行切換。

| 滑鼠設定             | 模式選擇                                                     |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/touch_mode_icon.png?width=300px) | ![](/docs/en/manual/mobile/images/touch_mode_zh.jpg?width=300px) |

{{% notice note %}}
在`滑鼠模式`中，你也可以通過`雙指輕觸`觸發遠程裝置的`滑鼠右鍵`
{{% /notice %}}

### 檔案傳輸 (Android)

> 需要 RustDesk 1.1.9 以上版本

在首頁的裝置列表中選擇裝置。

長按或點擊右側選單來選擇`檔案傳輸`

| 首頁             | 連接成功                                                     |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/connection_home_file_zh.jpg?width=300px) | ![](/docs/en/manual/mobile/images/file_connection.jpg?width=300px) |

- 初始目錄是裝置的主目錄，可以點擊 <i class="fas fa-home"></i> 快速回到主目錄。
- 在標題欄下方是目錄層級，可以點擊相應資料夾來快速跳轉。
- 點擊 <i class="fas fa-arrow-up"></i> 可以訪問父目錄。
- 列表底部會提示目前絕對路徑和專案統計資料。
- 點擊標題欄的`本機`/`遠端` 進行頁面切換。

#### 如何傳輸檔案？

1. **長按**列表中的檔案或資料夾可以可快速進入**多選模式**，可以同時選擇多個項目。
2. 選擇檔案後切換`本機`/`遠端`頁面，切換頁面後將在下方看到`貼上到這裡？`的提示。
3. 點擊圖中的貼上檔案圖示即可將選中的檔案/資料夾傳輸至目標目錄。

| 多選模式             | 檔案貼上                                                     |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/file_multi_select.jpg?width=300px) | ![](/docs/en/manual/mobile/images/file_copy.png?width=300px) |


### **設置 ID/中繼伺服器**

1. 點擊下方瀏覽列的`設定`。
2. 點擊 `ID/中繼伺服器`。
3. 在 `ID 伺服器` 欄位輸入您的 ID 伺服器的主機名稱/IP 地址。將 `Relay 伺服器`和 `API 伺服器`欄位留空，然後在`金鑰`欄位輸入您的公鑰 (選填，僅供加密用)。點擊 **OK** 以儲存設定。RustDesk 將自動切換到您指定的伺服器。

也可以通過掃描 QR 碼來設定，若要產生 QR 碼，請使用下列格式 (記得更改 `host` 和 `key` 的值)。

```nolang
config={"host": "xxx", "key": "xxx"}
```

下圖是 Android 畫面，如果是 iOS，對應選項在首頁右上角的選單中。

![](/docs/en/manual/mobile/images/id_setting_en.png?width=300px)

有關自架伺服器的詳細內容，請參考[自架伺服器](/docs/zh-tw/self-host/)
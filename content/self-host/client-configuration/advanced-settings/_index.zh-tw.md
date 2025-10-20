---
title: 進階設定
weight: 49
---

所有自訂用戶端中的進階設定都在這裡涵蓋。

## 設定的權限層級

有四種類型的設定：

1. 覆蓋設定，在`Web控制台` → `自訂用戶端`中
2. 預設設定，在`Web控制台` → `自訂用戶端`中
3. 使用者設定，在RustDesk用戶端中
4. 策略設定，在`Web控制台` → `策略`中

這些設定的權限層次結構如下：`覆蓋 > 策略 > 使用者 > 預設`。

## 安全設定

### access-mode

設定傳入連接的存取模式（權限）。

**位置**：

1. **桌面** 設定 → 安全 → 權限
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | custom, full, view | custom | `access-mode=custom` |

### enable-keyboard

啟用傳入連接的鍵盤/滑鼠輸入。

**位置**：

1. **桌面** 設定 → 安全 → 權限 → 啟用鍵盤
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-keyboard=Y` |

### enable-clipboard

啟用傳入連接的複製和貼上。

**位置**：

1. **桌面** 設定 → 安全 → 權限 → 啟用剪貼簿
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-clipboard=Y` |

### enable-file-transfer

啟用傳入連接的檔案複製貼上或檔案傳輸（會話）。

**位置**：

1. **桌面** 設定 → 安全 → 權限 → 啟用檔案傳輸
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-file-transfer=Y` |


### enable-camera

啟用傳入連接的攝影機。

**位置**：

1. **桌面** 設定 → 安全 → 權限 → 啟用攝影機
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-camera=Y` |

### enable-terminal

為傳入連線啟用終端。

**位置**:

**桌面端** 設定 → 安全 → 權限 → 啟用終端

| 是否需要安裝 | 可選值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-terminal=Y` |

### enable-remote-printer

為傳入連線啟用遠端印表機。

**位置**：

1. **Windows** 設定 → 安全 → 權限 → 啟用遠端印表機

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-remote-printer=Y` |

### enable-audio

啟用音訊記錄並傳輸到對等端。

**位置**：

1. **桌面** 設定 → 安全 → 權限 → 啟用音訊
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-audio=Y` |

### enable-tunnel

啟用TCP通道。

**位置**：

1. **桌面** 設定 → 安全 → 權限 → 啟用TCP通道
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-tunnel=Y` |

### enable-remote-restart

啟用控制端重啟。

**位置**：

1. **桌面** 設定 → 安全 → 權限 → 啟用遠端重啟
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-remote-restart=Y` |

### enable-record-session

啟用會話錄製。

**位置**：

1. **桌面** 設定 → 安全 → 權限 → 啟用錄製會話
2. **行動裝置** 設定 → 螢幕分享 → 啟用錄製會話

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-record-session=Y` |

### enable-block-input

啟用控制端阻擋其他使用者的輸入。

**位置**：

1. **桌面** 設定 → 安全 → 權限 → 啟用阻擋使用者輸入（僅Windows）
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-block-input=Y` |

### allow-remote-config-modification

允許控制端更改受控RustDesk UI中的設定。

**位置**：

1. **桌面** 設定 → 安全 → 權限 → 啟用遠端組態修改
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `allow-remote-config-modification=Y` |

### enable-lan-discovery

允許區域網路對等端發現我。

啟用區域網路發現後，如果本地支援，[WOL](https://en.wikipedia.org/wiki/Wake-on-LAN)可以工作。

**位置**：

1. **桌面** 設定 → 安全 → 安全 → 拒絕區域網路發現
2. **行動裝置** 設定 → 螢幕分享 → 拒絕區域網路發現

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 是 | Y, N | Y | `enable-lan-discovery=Y` |

### direct-server

啟用直接IP存取。

**位置**：

1. **桌面** 設定 → 安全 → 安全 → 啟用直接IP存取
2. **行動裝置** 設定 → 螢幕分享 → 直接IP存取

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `direct-server=Y` |

### direct-access-port

直接IP存取連接埠。

**位置**：

1. **桌面** 設定 → 安全 → 安全 → 直接IP存取連接埠（勾選「啟用直接IP存取」時顯示）
2. **行動裝置** 設定 → 螢幕分享 → 直接IP存取

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 |  | 21118 | `direct-access-port=21118` |

### whitelist

使用IP白名單。

**位置**：

1. **桌面** 設定 → 安全 → 安全 → 使用IP白名單
2. **行動裝置** 設定 → 螢幕分享 → 使用IP白名單

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | `,` 或 `<ip1>,<ip2>,<ip3>` | `,` 表示無過濾 | `whitelist=,` |

### allow-auto-disconnect & auto-disconnect-timeout

在使用者無活動一段時間後自動關閉傳入會話。

**位置**：

1. **桌面** 設定 → 安全 → 安全 → 使用者無活動時自動關閉傳入會話
2. **行動裝置** 設定 → 螢幕分享 → 使用者無活動時自動關閉傳入會話

| 選項 | 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: | :------: |
| allow-auto-disconnect | 否 | Y, N | N | `allow-auto-disconnect=Y` |
| auto-disconnect-timeout | 否 | 逾時分鐘數 | 10 | `auto-disconnect-timeout=10` |

### allow-only-conn-window-open

僅在RustDesk視窗開啟時允許連接。

**位置**：

1. **桌面** 設定 → 安全 → 安全 → 僅在RustDesk視窗開啟時允許連接
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 是 | Y, N | N | `allow-only-conn-window-open=N` |

### approve-mode

透過密碼或手動點擊接受傳入連接。

**位置**：

1. **桌面** 設定 → 安全 → 密碼 → 下拉框
2. **行動裝置** 螢幕分享 → 右上角下拉選單

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | password, click, password-click | password-click | `approve-mode=password-click` |

### verification-method

可以使用什麼類型的密碼，`臨時密碼`是指一次性隨機密碼。

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | use-temporary-password, use-permanent-password, use-both-passwords | use-both-passwords | `verification-method=use-permanent-password` |

### temporary-password-length

1. **桌面端** 設定 → 安全 → 密碼 → 一次性密碼長度
2. **行動端** 分享畫面 → 右上角下拉選單 → 一次性密碼長度

臨時密碼的長度。

| 是否需要安裝 | 可選值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | 6, 8, 10 | 6 | `temporary-password-length=6` |

### proxy-url

代理 URL。

目前支援`http`和`socks5`。

**位置**：

1. **桌面** 設定 → 網路 → 代理 → Socks5/Http(s)代理
2. **行動裝置**

範例：

1. **http** `proxy-url=http://192.168.0.2:12345`
2. **https** `proxy-url=https://192.168.0.2:12345`
3. **socks5** `proxy-url=socks5://192.168.0.2:1080`

### proxy-username & proxy-password

代理使用者名稱和密碼。

**位置**：

1. **桌面** 設定 → 網路 → 代理 → Socks5/Http(s)代理
2. **行動裝置**

| 選項 | 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: | :------: |
| proxy-username | 否 | | | `proxy-username=user` |
| proxy-password | 否 | | | `proxy-password=pass` |

## 一般設定

### theme

控制RustDesk用戶端的UI主題。

**位置**：

1. **桌面** 設定 → 一般 → 主題
2. **行動裝置** 設定 → 設定 → 主題

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | dark, light, system | system | `theme=system` |

### lang

控制RustDesk用戶端的語言。

**位置**：

1. **桌面** 設定 → 一般 → 語言
2. **行動裝置** 設定 → 設定 → 語言

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | default, ar, bg, ... | default | `lang=default` |

目前可用的語言有：

ar, bg, ca, cs, da, de, el, en, eo, es, et, fa, fr, he, hr, hu, id, it, ja, ko, kz, lt, lv, nb, nl, pl, pt, ro, ru, sk, sl, sq, sr, sv, th, tr, uk, vn, zh-cn, zh-tw

您可以查看代碼中的[LANGS](https://github.com/rustdesk/rustdesk/blob/master/src/lang.rs#L45)獲取最新的語言清單。

### allow-auto-record-incoming

自動錄製傳入會話。

**位置**：

1. **桌面** 設定 → 一般 → 錄製 → 自動錄製傳入會話
2. **行動裝置** 設定 → 錄製 → 自動錄製傳入會話

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `allow-auto-record-incoming=Y` |

### allow-auto-record-outgoing

自動錄製傳出會話。

**位置**：

1. **桌面** 設定 → 一般 → 錄製 → 自動錄製傳出會話
2. **行動裝置** 設定 → 錄製 → 自動錄製傳出會話

| 安裝需要 | 值 | 預設值 | 範例 | 版本 |
| :------: | :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `allow-auto-record-outgoing=Y` | >= 1.3.2 |

### video-save-directory

儲存錄製影片的目錄。

**位置**：

1. **桌面** 設定 → 一般 → 錄製 → 影片儲存目錄
2. **行動裝置** 設定 → 錄製

預設值：

1. **macOS** ~/Movies/**app_name**
2. **Linux** ~/Videos/**app_name**
3. **Windows** %USERPROFILE%\Videos\\**app_name**
4. **Android** /Storage/emulated/0/**app_name**/ScreenRecord

**注意**：替換**app_name**表示目前應用程式名稱。

### enable-confirm-closing-tabs

控制是否在關閉所有遠端標籤之前顯示確認對話框。

**位置**：

1. **桌面** 設定 → 一般 → 其他 → 關閉多個標籤前確認
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-confirm-closing-tabs=Y` |

### enable-abr

啟用自適應位元率。

**位置**：

1. **桌面** 設定 → 一般 → 其他 → 自適應位元率
2. **行動裝置** 設定 → 螢幕分享 → 自適應位元率（測試版）

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-abr=Y` |

### allow-remove-wallpaper

在傳入會話期間移除桌布。

**位置**：

1. **桌面** 設定 → 一般 → 其他 → 傳入會話期間移除桌布
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `allow-remove-wallpaper=N` |

### enable-open-new-connections-in-tabs

控制是否使用新標籤或新視窗開啟新連接。

**位置**：

1. **桌面** 設定 → 一般 → 其他 → 在新標籤中開啟連接
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-open-new-connections-in-tabs=Y` |

### allow-always-software-render

始終使用軟體渲染。

**位置**：

1. **桌面** 設定 → 一般 → 其他 → 始終使用軟體渲染
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `allow-always-software-render=N` |

### allow-linux-headless

如果沒有顯示器，允許傳入連接。

此選項需要桌面環境、Xorg伺服器和GDM，請參閱[PR 3902](https://github.com/rustdesk/rustdesk/pull/3902)。

**位置**：

1. **桌面** 設定 → 一般 → 其他 → 允許Linux無頭模式
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 是 | Y, N | N | `allow-linux-headless=N` |

### enable-hwcodec

啟用硬體編碼以使畫面更流暢。

**位置**：

1. **桌面**
2. **行動裝置** 設定 → 硬體編解碼器

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-hwcodec=Y` |

### peer-card-ui-type

控制對等端卡片的檢視，包括「大磚塊」、「小磚塊」和「清單」。

**位置**：

1. **桌面** 首頁 → 對等端面板 → 右上角網格圖示
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | 0, 1, 2 | 0 | `peer-card-ui-type=0` |

**0** 大磚塊  
**1** 小磚塊  
**2** 清單

### peer-sorting

控制對等端卡片的排序。

**位置**：

1. **桌面** 首頁 → 對等端面板 → 右上角排序圖示
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Remote ID, Remote Host, Username | Remote ID | `peer-sorting=Remote ID` |

### sync-ab-with-recent-sessions

控制是否將通訊錄與最近會話同步。

**位置**：

1. **桌面** 首頁 → 對等端面板 → 通訊錄 → 標籤 → 下拉選單 → 與最近會話同步
2. **行動裝置** 首頁 → 對等端面板 → 通訊錄 → 標籤 → 下拉選單 → 與最近會話同步

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `sync-ab-with-recent-sessions=N` |

### sync-ab-tags

控制是否對通訊錄標籤進行排序。

**位置**：

1. **桌面** 首頁 → 對等端面板 → 通訊錄 → 標籤 → 下拉選單 → 標籤排序
2. **行動裝置** 首頁 → 對等端面板 → 通訊錄 → 標籤 → 下拉選單 → 標籤排序

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `sync-ab-tags=N` |

### filter-ab-by-intersection

按標籤交集過濾通訊錄。

**預覽**：[PR #5985](https://github.com/rustdesk/rustdesk/pull/5985)

**位置**：

1. **桌面** 首頁 → 對等端面板 → 通訊錄 → 標籤 → 下拉選單 → 按交集過濾
2. **行動裝置** 首頁 → 對等端面板 → 通訊錄 → 標籤 → 下拉選單 → 按交集過濾

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `filter-ab-by-intersection=N` |

## 顯示設定

### view-only

此選項將為每個對等端在首次連接後設定「僅檢視」選項。

然後每個對等端設定中的「僅檢視」選項將控制連接是否為僅檢視模式。

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 檢視模式
2. **行動裝置** 設定 → 顯示設定 → 其他預設選項 → 檢視模式

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `view-only=Y` |

### show-monitors-toolbar

控制是否在工具列中顯示監視器。

![show-monitors-toolbar](/docs/en/self-host/client-configuration/advanced-settings/images/show-monitors-toolbar.png)

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 顯示監視器工具列
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `show-monitors-toolbar=Y` |

### collapse-toolbar

控制連接後遠端工具列是否摺疊。

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 摺疊工具列
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `collapse-toolbar=Y` |

### show-remote-cursor

此選項將為每個對等端在首次連接後設定「顯示遠端游標」選項。

然後每個對等端設定中的「顯示遠端游標」選項將控制是否在遠端控制頁面中顯示遠端游標。

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 顯示遠端游標
2. **行動裝置** 設定 → 顯示設定 → 其他預設選項 → 顯示遠端游標

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `show-remote-cursor=N` |

### follow-remote-cursor

此選項將為每個對等端在首次連接後設定「跟隨遠端游標」選項。

然後每個對等端設定中的「跟隨遠端游標」選項將控制是否跟隨遠端游標。

**預覽**：[PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 跟隨遠端游標
2. **行動裝置** 設定 → 顯示設定 → 其他預設選項 → 跟隨遠端游標

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `follow-remote-cursor=Y` |

### follow-remote-window

此選項將為每個對等端在首次連接後設定「跟隨遠端視窗」選項。

然後每個對等端設定中的「跟隨遠端視窗」選項將控制是否跟隨遠端視窗。

**預覽**：[PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 跟隨遠端視窗焦點
2. **行動裝置** 設定 → 顯示設定 → 其他預設選項 → 跟隨遠端視窗焦點

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `follow-remote-window=Y` |

### zoom-cursor

此選項將為每個對等端在首次連接後設定「縮放游標」選項。

每個對等端設定中的「縮放游標」選項將控制游標是否根據目前影像縮放進行縮放。

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 縮放游標
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `zoom-cursor=Y` |

### show-quality-monitor

此選項將為每個對等端在首次連接後設定「顯示品質監視器」選項。

每個對等端設定中的「顯示品質監視器」選項將控制是否顯示品質監視器。

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 顯示品質監視器
2. **行動裝置** 設定 → 顯示設定 → 其他預設選項 → 顯示品質監視器

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `show-quality-monitor=Y` |

### disable-audio

此選項將為每個對等端在首次連接後設定「禁用音訊」選項。

每個對等端設定中的「禁用音訊」選項將控制是否播放聲音。

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 靜音
2. **行動裝置** 設定 → 顯示設定 → 其他預設選項 → 靜音

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `disable-audio=Y` |

### enable-file-copy-paste

此選項將為每個對等端在首次連接後設定「啟用檔案複製貼上」選項。

每個對等端設定中的「啟用檔案複製貼上」選項將控制是否在連接中啟用檔案複製貼上。

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 啟用檔案複製貼上（僅Windows）
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `enable-file-copy-paste=Y` |

### disable-clipboard

此選項將為每個對等端在首次連接後設定「禁用剪貼簿」選項。

每個對等端設定中的「禁用剪貼簿」選項將控制是否啟用文字複製貼上。

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 禁用剪貼簿
2. **行動裝置** 設定 → 顯示設定 → 其他預設選項 → 禁用剪貼簿

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `disable-clipboard=Y` |

### lock-after-session-end

此選項將為每個對等端在首次連接後設定「會話結束後鎖定」選項。

每個對等端設定中的「會話結束後鎖定」選項將控制會話結束後是否鎖定對等機器。

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 會話結束後鎖定
2. **行動裝置** 設定 → 顯示設定 → 其他預設選項 → 會話結束後鎖定

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `lock-after-session-end=Y` |

### privacy-mode

此選項將為每個對等端在首次連接後設定「隱私模式」選項。

每個對等端設定中的「隱私模式」選項將控制連接後是否使用隱私模式。

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 隱私模式
2. **行動裝置** 設定 → 顯示設定 → 其他預設選項 → 隱私模式

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `privacy-mode=Y` |

### i444

此選項將為每個對等端在首次連接後設定「i444」選項。

每個對等端設定中的「i444」選項將控制是否使用真彩色。

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 真彩色（4:4:4）
2. **行動裝置** 設定 → 顯示設定 → 其他預設選項 → 真彩色（4:4:4）

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `i444=Y` |

### reverse-mouse-wheel

此選項將為每個對等端在首次連接後設定「反轉滑鼠滾輪」選項。

每個對等端設定中的「反轉滑鼠滾輪」選項將控制是否反轉滑鼠滾輪。

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 反轉滑鼠滾輪
2. **行動裝置** 設定 → 顯示設定 → 其他預設選項 → 反轉滑鼠滾輪

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `reverse-mouse-wheel=Y` |

### swap-left-right-mouse

此選項將為每個對等端在首次連接後設定「交換左右滑鼠按鈕」選項。

每個對等端設定中的「交換左右滑鼠按鈕」選項將控制是否交換左右滑鼠按鈕。

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 交換左右滑鼠按鈕
2. **行動裝置** 設定 → 顯示設定 → 其他預設選項 → 交換左右滑鼠按鈕

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `swap-left-right-mouse=Y` |

### displays-as-individual-windows

此選項將為每個對等端在首次連接後設定「顯示為個別視窗」選項。

每個對等端設定中的「顯示為個別視窗」選項將控制是否將顯示器顯示為個別的視窗。

**預覽**：[PR 5945](https://github.com/rustdesk/rustdesk/pull/5945)

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 將顯示器顯示為個別視窗
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `displays-as-individual-windows=Y` |

### use-all-my-displays-for-the-remote_session

此選項將為每個對等端在首次連接後設定「為遠端會話使用我的所有顯示器」選項。

每個對等端設定中的「為遠端會話使用我的所有顯示器」選項將控制是否為遠端會話使用我的所有顯示器。

**預覽**：[PR 6064](https://github.com/rustdesk/rustdesk/pull/6064)

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 為遠端會話使用我的所有顯示器
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `use-all-my-displays-for-the-remote_session=Y` |

### view-style

此選項將為每個對等端在首次連接後設定「檢視樣式」選項。

每個對等端設定中的「檢視樣式」選項將控制檢視樣式。

**位置**：

1. **桌面** 設定 → 顯示 → 預設檢視樣式
2. **行動裝置** 設定 → 顯示設定 → 預設檢視樣式

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | original, adaptive | original | `view-style=original` |

### scroll-style

此選項將為每個對等端在首次連接後設定「滾動樣式」選項。

每個對等端設定中的「滾動樣式」選項將控制滾動樣式。

**位置**：

1. **桌面** 設定 → 顯示 → 預設滾動樣式
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | scrollauto, scrollbar | scrollauto | `scroll-style=scrollauto` |

### image-quality

此選項將為每個對等端在首次連接後設定「影像品質」選項。

每個對等端設定中的「影像品質」選項將控制影像品質。

**位置**：

1. **桌面** 設定 → 顯示 → 預設影像品質
2. **行動裝置** 設定 → 顯示設定 → 預設影像品質

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | best, balanced, low, custom | balanced | `image-quality=balanced` |

### custom-image-quality

此選項將為每個對等端在首次連接後設定「自訂影像品質」選項。

如果「影像品質」設定為自訂，每個對等端設定中的「自訂影像品質」選項將控制影像品質。

**位置**：

1. **桌面** 設定 → 顯示 → 預設影像品質 → 自訂
2. **行動裝置** 設定 → 顯示設定 → 預設影像品質 → 自訂

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | [10.0, 2000.0] | 50.0 | `custom-image-quality=50` |

### custom-fps

此選項將為每個對等端在首次連接後設定「自訂幀率」選項。

如果「影像品質」設定為自訂，每個對等端設定中的「自訂幀率」選項將控制幀率。

**位置**：

1. **桌面** 設定 → 顯示 → 預設影像品質 → 自訂
2. **行動裝置** 設定 → 顯示設定 → 預設影像品質 → 自訂

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | [5, 120] | 30 | `custom-fps=30` |

### codec-preference

此選項將為每個對等端在首次連接後設定「編解碼器偏好」選項。

每個對等端設定中的「編解碼器偏好」選項將控制影像的編解碼器。

**位置**：

1. **桌面** 設定 → 顯示 → 預設編解碼器
2. **行動裝置** 設定 → 顯示設定 → 預設編解碼器

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | auto, vp8, vp9, av1, h264, h265 | auto | `codec-preference=auto` |

**注意**：除了「vp8」和「vp9」之外的選項可能無法工作。這取決於您的機器支援什麼。

## 其他

### preset-address-book-name & preset-address-book-tag & preset-address-book-alias & preset-address-book-password & preset-address-book-note

預設通訊錄名稱、設備標籤、設備別名、設備密碼、設備備註，https://github.com/rustdesk/rustdesk-server-pro/issues/257。
如果不想設定標籤，可以僅設定preset-address-book-name。
請在Web控制台的通訊錄頁面上使用有效的通訊錄名稱和標籤。

| 選項 | 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: | :------: |
| preset-address-book-name | 否 | | | `preset-address-book-name=<通訊錄名稱>` |
| preset-address-book-tag | 否 | | | `preset-address-book-tag=<通訊錄標籤名稱>` |
| preset-address-book-alias | 否 | | | `preset-address-book-alias=<設備別名>` |
| preset-address-book-password | 否 | | | `preset-address-book-password=<設備密碼>` |
| preset-address-book-note | 否 | | | `preset-address-book-note=<設備備註>` |

preset-address-book-alias、preset-address-book-password、preset-address-book-note在RustDesk用戶端>=1.4.3、pro >= 1.6.6中可用。

### disable-group-panel

在RustDesk用戶端上禁用群組面板（在通訊錄面板旁邊，自1.3.8版本起命名為「可存取設備」），https://github.com/rustdesk/rustdesk-server-pro/issues/250。

| 選項 | 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: | :------: |
| disable-group-panel | 否 | Y, N | N | `disable-group-panel=Y` |

### pre-elevate-service

Windows便攜版執行時自動提升權限，https://github.com/rustdesk/rustdesk-server-pro/issues/252。

| 選項 | 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: | :------: |
| pre-elevate-service | 否 | Y, N | N | `pre-elevate-service=Y` |

### disable-floating-window

當Android服務啟動時，它會顯示一個浮動視窗，這有助於防止系統終止RustDesk服務。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `disable-floating-window=Y` |

### floating-window-size

當Android服務啟動時，它會顯示一個浮動視窗，這有助於防止系統終止RustDesk服務。當大小小於120時，浮動視窗將難以被點擊。非常小的尺寸可能無法在某些設備上保持背景服務。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| [32, 320] | 120 | `floating-window-size=120` |

### floating-window-untouchable

預設情況下，點擊浮動視窗會彈出選單。設定為「不可觸控」後，點擊或滑動將穿過浮動視窗並傳輸到底層視窗。設定為「不可觸控」後，浮動視窗的位置無法更改，系統可能會自動將浮動視窗設定為半透明。但是，此功能可能在少數應用程式中不起作用，例如GitHub應用程式。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `floating-window-untouchable=Y` |

### floating-window-transparency

Android浮動視窗具有可調節的透明度。如果要啟用但隱藏浮動視窗，可以將透明度設定為0，浮動視窗將自動設定為「不可觸控」以穿透點擊事件。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| [0, 10] | 10 | `floating-window-transparency=5` |

### floating-window-svg

如果沒有為Android浮動視窗設定圖示，它將預設顯示RustDesk圖示。
設定時，請將SVG的文字內容寫成一行，並注意[SVG支援限制](https://bigbadaboom.github.io/androidsvg/index.html)。

| 預設值 | 範例 |
| :------: | :------: |
| RustDesk圖示 | `floating-window-svg=<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1717559129252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4248" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M950.857143 512c0 242.285714-196.571429 438.857143-438.857143 438.857143S73.142857 754.285714 73.142857 512 269.714286 73.142857 512 73.142857s438.857143 196.571429 438.857143 438.857143z" fill="#1296db" p-id="4249"></path></svg>` |

### keep-screen-on

這是針對Android受控端的。請注意，保持螢幕開啟依賴於浮動視窗。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| never, during-controlled, service-on | during-controlled | `keep-screen-on=never` |

### enable-directx-capture

這是針對Windows受控端的。如果沒有遇到任何問題，建議使用預設設定，優先使用DirectX進行截圖而不是直接使用GDI。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | Y | `enable-directx-capture=N` |

### enable-android-software-encoding-half-scale

這是針對Android受控端的。預設情況下，當解析度大於1200時，硬體編碼使用原始解析度，而軟體編碼使用一半解析度，因為軟體編碼較慢。此選項用於設定軟體編碼是否應縮放到一半解析度。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | Y | `enable-android-software-encoding-half-scale=N` |

### allow-remote-cm-modification

控制是否允許控制端點擊連接管理視窗來接受連接、更改權限等。

https://github.com/rustdesk/rustdesk/issues/7425

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-remote-cm-modification=Y` |

### remove-preset-password-warning

控制當自訂用戶端中有預設密碼時是否移除GUI上的安全警告。

https://github.com/rustdesk/rustdesk-server-pro/discussions/286

https://github.com/rustdesk/rustdesk/discussions/7956

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | Y | `remove-preset-password-warning=Y` |

### hide-security-settings / hide-network-settings / hide-server-settings / hide-proxy-settings / hide-websocket-settings / hide-remote-printer-settings

控制是否隱藏某些設定。請確保`禁用設定`已關閉，否則這些不會生效。

https://github.com/rustdesk/rustdesk-server-pro/issues/263

https://github.com/rustdesk/rustdesk-server-pro/issues/276

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `hide-security-settings=Y` |

### hide-username-on-card

控制是否在設備清單中顯示使用者名稱。因為有時使用者名稱太長，會隱藏其他資訊。

https://github.com/rustdesk/rustdesk-server-pro/issues/284#issuecomment-2216521407

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `hide-username-on-card=Y` |

### hide-help-cards

控制是否在GUI上顯示UAC/權限警告。

https://github.com/rustdesk/rustdesk/issues/8687

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `hide-help-cards=Y` |

### display-name

更改將在連接到遠端設備時彈出視窗中顯示的顯示名稱。預設情況下，它首先顯示登入使用者的名稱，否則顯示您的作業系統使用者名稱。

https://github.com/rustdesk/rustdesk-server-pro/issues/277

### disable-udp

控制是否僅使用TCP。它將不再使用UDP 21116，而是使用TCP 21116。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `disable-udp=Y` |

### preset-user-name / preset-strategy-name / preset-device-group-name / preset-device-username / preset-device-name / preset-note

將使用者/策略/設備群組/設備使用者名稱/設備名稱(主機名)/備註分配給設備。您也可以透過[命令列](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/#assign-device-usersgroupsstrategies-to-devices)執行此操作。

https://github.com/rustdesk/rustdesk-server-pro/discussions/304

設備群組在RustDesk用戶端>=1.3.8、pro >= 1.5.0中可用

preset-device-username、preset-device-name、preset-note在RustDesk用戶端>=1.4.3、pro >= 1.6.6中可用。

### default-connect-password

您使用`預設連接密碼`來建立到遠端設備的連接。此密碼在控制端設定，不應與受控（僅傳入）用戶端上找到的任何[預設密碼](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-can-we-set-up-a-client-with-a-fixed-password-for-unattended-remote-access)混淆。

例如 `default-connect-password=abcd1234`

### enable-trusted-devices

允許受信任的設備跳過2FA驗證。

https://github.com/rustdesk/rustdesk/discussions/8513#discussioncomment-10234494

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | Y | `enable-trusted-devices=N` |

### hide-tray

禁用系統匣中的匣圖示。

https://github.com/rustdesk/rustdesk-server-pro/issues/332

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `hide-tray=Y` |

### one-way-clipboard-redirection

禁用從受控端到控制端的剪貼簿同步，在RustDesk用戶端>=1.3.1（受控端）中可用

https://github.com/rustdesk/rustdesk/discussions/7837

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `one-way-clipboard-redirection=Y` |

### one-way-file-transfer

禁用從受控端到控制端的檔案傳輸，在RustDesk用戶端>=1.3.1（受控端）中可用

https://github.com/rustdesk/rustdesk/discussions/7837

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `one-way-file-transfer=Y` |


### sync-init-clipboard

建立連接時是否同步初始剪貼簿（僅從控制端到受控端），在RustDesk用戶端>=1.3.1（控制端）中可用

https://github.com/rustdesk/rustdesk/discussions/9010

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `sync-init-clipboard=Y` |

### allow-logon-screen-password

在使用[僅點擊批准模式](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#approve-mode)時是否允許在登入畫面上輸入密碼，在RustDesk用戶端>=1.3.1（受控端）中可用

https://github.com/rustdesk/rustdesk/discussions/9269

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-logon-screen-password=Y` |

### allow-https-21114

通常，HTTPS使用連接埠443。當API伺服器的連接埠錯誤地設定為21114時，RustDesk用戶端預設會移除21114連接埠設定。將選項設定為Y允許使用21114作為HTTPS連接埠。在RustDesk用戶端>=1.3.9中可用。

https://github.com/rustdesk/rustdesk-server-pro/discussions/570

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-https-21114=Y` |

### allow-d3d-render

D3D渲染可以獲得高幀率並減少CPU使用率，但在某些設備上遠端控制螢幕可能會變黑。在RustDesk用戶端>=1.3.9中可用，僅Windows。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-d3d-render=Y` |


### allow-hostname-as-id

[使用主機名作為ID](https://github.com/rustdesk/rustdesk-server-pro/discussions/483)，主機名中的空格會被替換為'-'。這不是100%保證的，只在第一次執行RustDesk用戶端時發生（即在新安裝的用戶端上）；如果發生衝突，將分配一個隨機ID。

在RustDesk用戶端版本1.4.0及更高版本中可用。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-hostname-as-id=Y` |

### allow-websocket

使用WebSocket協定連接伺服器和用戶端。僅在RustDesk用戶端>=1.4.0和Pro伺服器>= 1.5.7中可用。請注意，WebSocket僅支援中繼連接。

要使WebSocket工作，您需要正確設定反向代理， https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-websocket=Y` |

### allow-numeric-one-time-password

此選項啟用或禁用僅數字一次性密碼的使用。
僅在RustDesk用戶端>=1.4.1和Pro伺服器>= 1.5.9中可用。

**討論**： https://github.com/rustdesk/rustdesk-server-pro/discussions/685

**預覽**： https://github.com/rustdesk/rustdesk/pull/11846

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-numeric-one-time-password=Y` |

### register-device

不註冊設備，您不會在Web控制台的設備頁面中看到它。

**僅在Pro伺服器>= 1.6.0中可用，需要[custom2許可證](https://rustdesk.com/pricing#custom2)且並行連接數>= 2。**

如果`register-device=N`，以下功能對此設備不起作用。
- 登入
- `--assign`命令
- `preset-address-book-name`, `preset-address-book-tag`, `preset-address-book-alias`, `preset-address-book-password`, `preset-address-book-note` `preset-user-name`, `preset-strategy-name`, `preset-device-group-name`, `preset-device-username`, `preset-device-name`, `preset-note`
- 稽核日誌
- 策略

**討論**： https://github.com/rustdesk/rustdesk-server-pro/discussions/672 和 https://github.com/rustdesk/rustdesk-server-pro/discussions/182

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | Y | `register-device=N` |

### use-texture-render

**位置**:

**桌面端** 設定 → 通用 → 其他 → 使用紋理渲染

使用紋理渲染可以使畫面更流暢。如果遇到渲染問題，可以嘗試禁用此選項。僅在桌面端可用。

| 可選值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | linux:Y, macOS:N, win7:N, win10+:Y | `use-texture-render=Y` |

### enable-udp-punch

**位置**:

**桌面端** 設定 → 通用 → 其他 → 啟用 UDP 打洞
**行動端** 設定 → 啟用 UDP 打洞

自 RustDesk 1.4.1, RustDesk Server Pro 1.6.2 起可用

| 可選值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | Y | `enable-udp-punch=N` |

### enable-ipv6-punch

**位置**:

**桌面端** 設定 → 通用 → 其他 → 啟用 IPv6 P2P 連線
**行動端** 設定 → 通用 → 其他 → 啟用 IPv6 P2P 連線

自 RustDesk 1.4.1, RustDesk Server Pro 1.6.2 起可用

| 可選值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | selfhost:N, 其他:Y | `enable-ipv6-punch=N` |

## 顯示設定

### view-only

此選項將為每個對等端在首次連接後設定「僅檢視」選項。

然後每個對等端設定中的「僅檢視」選項將控制連接是否為僅檢視模式。

**位置**：

1. **桌面** 設定 → 顯示 → 其他預設選項 → 檢視模式
2. **行動裝置** 設定 → 顯示設定 → 其他預設選項 → 檢視模式

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `view-only=Y` |

### use-all-my-displays-for-the-remote-session

此選項將在首次連線後為每個裝置設定「use-all-my-displays-for-the-remote-session」選項。

然後，每個裝置設定中的「use-all-my-displays-for-the-remote-session」選項將控制是否為遠端工作階段使用我的所有顯示器。

**位置**:

1. **桌面端** 設定 → 顯示 → 其他預設選項 → 為遠端工作階段使用我的所有顯示器
2. **行動端** 設定 → 顯示設定 → 其他預設選項 → 為遠端工作階段使用我的所有顯示器

| 是否需要安裝 | 可選值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `use-all-my-displays-for-the-remote_session=Y` |

### view-style

此選項將在首次連線後為每個裝置設定「view-style」選項。

每個對等端設定中的「檢視樣式」選項將控制檢視樣式。

**位置**：

1. **桌面** 設定 → 顯示 → 預設檢視樣式
2. **行動裝置** 設定 → 顯示設定 → 預設檢視樣式

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | original, adaptive | original | `view-style=original` |

### scroll-style

此選項將為每個對等端在首次連接後設定「滾動樣式」選項。

每個對等端設定中的「滾動樣式」選項將控制滾動樣式。

**位置**：

1. **桌面** 設定 → 顯示 → 預設滾動樣式
2. **行動裝置**

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | scrollauto, scrollbar | scrollauto | `scroll-style=scrollauto` |

### image-quality

此選項將為每個對等端在首次連接後設定「影像品質」選項。

每個對等端設定中的「影像品質」選項將控制影像品質。

**位置**：

1. **桌面** 設定 → 顯示 → 預設影像品質
2. **行動裝置** 設定 → 顯示設定 → 預設影像品質

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | best, balanced, low, custom | balanced | `image-quality=balanced` |

### custom-image-quality

此選項將為每個對等端在首次連接後設定「自訂影像品質」選項。

如果「影像品質」設定為自訂，每個對等端設定中的「自訂影像品質」選項將控制影像品質。

**位置**：

1. **桌面** 設定 → 顯示 → 預設影像品質 → 自訂
2. **行動裝置** 設定 → 顯示設定 → 預設影像品質 → 自訂

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | [10.0, 2000.0] | 50.0 | `custom-image-quality=50` |

### custom-fps

此選項將為每個對等端在首次連接後設定「自訂幀率」選項。

如果「影像品質」設定為自訂，每個對等端設定中的「自訂幀率」選項將控制幀率。

**位置**：

1. **桌面** 設定 → 顯示 → 預設影像品質 → 自訂
2. **行動裝置** 設定 → 顯示設定 → 預設影像品質 → 自訂

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | [5, 120] | 30 | `custom-fps=30` |

### codec-preference

此選項將為每個對等端在首次連接後設定「編解碼器偏好」選項。

每個對等端設定中的「編解碼器偏好」選項將控制影像的編解碼器。

**位置**：

1. **桌面** 設定 → 顯示 → 預設編解碼器
2. **行動裝置** 設定 → 顯示設定 → 預設編解碼器

| 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | auto, vp8, vp9, av1, h264, h265 | auto | `codec-preference=auto` |

**注意**：除了「vp8」和「vp9」之外的選項可能無法工作。這取決於您的機器支援什麼。

### terminal-persistent

此選項將在首次連線後為每个裝置設定「terminal-persistent」選項。

然後，每个裝置設定中的「terminal-persistent」選項將控制斷線時是否保留終端工作階段。

**位置**:

1. **桌面端** 設定 → 顯示 → 其他預設選項 → 斷線時保留終端工作階段
2. **行動端** 設定 → 顯示設定 → 其他預設選項 → 斷線時保留終端工作階段

| 是否需要安裝 | 可選值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `terminal-persistent=Y` |

### trackpad-speed

此選項將在首次連線後为每個裝置設定「trackpad-speed」選項。

然後，每個裝置設定中的「trackpad-speed」選項將控制「trackpad-speed」設定为自訂時的 fps。

**位置**:

1. **桌面端** 設定 → 顯示 → 預設觸控板速度
2. **行動端** 設定 → 顯示設定 → 預設觸控板速度

| 是否需要安裝 | 可選值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| 否 | [10, 1000] | 100 | `trackpad-speed=100` |

## 其他

### preset-address-book-name & preset-address-book-tag & preset-address-book-alias & preset-address-book-password & preset-address-book-note

預設通訊錄名稱、設備標籤、設備別名、設備密碼、設備備註，https://github.com/rustdesk/rustdesk-server-pro/issues/257。
如果不想設定標籤，可以僅設定preset-address-book-name。
請在Web控制台的通訊錄頁面上使用有效的通訊錄名稱和標籤。

| 選項 | 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: | :------: |
| preset-address-book-name | 否 | | | `preset-address-book-name=<通訊錄名稱>` |
| preset-address-book-tag | 否 | | | `preset-address-book-tag=<通訊錄標籤名稱>` |
| preset-address-book-alias | 否 | | | `preset-address-book-alias=<設備別名>` |
| preset-address-book-password | 否 | | | `preset-address-book-password=<設備密碼>` |
| preset-address-book-note | 否 | | | `preset-address-book-note=<設備備註>` |

preset-address-book-alias、preset-address-book-password、preset-address-book-note在RustDesk用戶端>=1.4.3、pro >= 1.6.6中可用。

### disable-group-panel

在RustDesk用戶端上禁用群組面板（在通訊錄面板旁邊，自1.3.8版本起命名為「可存取設備」），https://github.com/rustdesk/rustdesk-server-pro/issues/250。

| 選項 | 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: | :------: |
| disable-group-panel | 否 | Y, N | N | `disable-group-panel=Y` |

### pre-elevate-service

Windows便攜版執行時自動提升權限，https://github.com/rustdesk/rustdesk-server-pro/issues/252。

| 選項 | 安裝需要 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: | :------: |
| pre-elevate-service | 否 | Y, N | N | `pre-elevate-service=Y` |

### disable-floating-window

當Android服務啟動時，它會顯示一個浮動視窗，這有助於防止系統終止RustDesk服務。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `disable-floating-window=Y` |

### floating-window-size

當Android服務啟動時，它會顯示一個浮動視窗，這有助於防止系統終止RustDesk服務。當大小小於120時，浮動視窗將難以被點擊。非常小的尺寸可能無法在某些設備上保持背景服務。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| [32, 320] | 120 | `floating-window-size=120` |

### floating-window-untouchable

預設情況下，點擊浮動視窗會彈出選單。設定為「不可觸控」後，點擊或滑動將穿過浮動視窗並傳輸到底層視窗。設定為「不可觸控」後，浮動視窗的位置無法更改，系統可能會自動將浮動視窗設定為半透明。但是，此功能可能在少數應用程式中不起作用，例如GitHub應用程式。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `floating-window-untouchable=Y` |

### floating-window-transparency

Android浮動視窗具有可調節的透明度。如果要啟用但隱藏浮動視窗，可以將透明度設定為0，浮動視窗將自動設定為「不可觸控」以穿透點擊事件。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| [0, 10] | 10 | `floating-window-transparency=5` |

### floating-window-svg

如果沒有為Android浮動視窗設定圖示，它將預設顯示RustDesk圖示。
設定時，請將SVG的文字內容寫成一行，並注意[SVG支援限制](https://bigbadaboom.github.io/androidsvg/index.html)。

| 預設值 | 範例 |
| :------: | :------: |
| RustDesk圖示 | `floating-window-svg=<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1717559129252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4248" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M950.857143 512c0 242.285714-196.571429 438.857143-438.857143 438.857143S73.142857 754.285714 73.142857 512 269.714286 73.142857 512 73.142857s438.857143 196.571429 438.857143 438.857143z" fill="#1296db" p-id="4249"></path></svg>` |

### keep-screen-on

這是針對Android受控端的。請注意，保持螢幕開啟依賴於浮動視窗。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| never, during-controlled, service-on | during-controlled | `keep-screen-on=never` |

### enable-directx-capture

這是針對Windows受控端的。如果沒有遇到任何問題，建議使用預設設定，優先使用DirectX進行截圖而不是直接使用GDI。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | Y | `enable-directx-capture=N` |

### enable-android-software-encoding-half-scale

這是針對Android受控端的。預設情況下，當解析度大於1200時，硬體編碼使用原始解析度，而軟體編碼使用一半解析度，因為軟體編碼較慢。此選項用於設定軟體編碼是否應縮放到一半解析度。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | Y | `enable-android-software-encoding-half-scale=N` |

### allow-remote-cm-modification

控制是否允許控制端點擊連接管理視窗來接受連接、更改權限等。

https://github.com/rustdesk/rustdesk/issues/7425

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-remote-cm-modification=Y` |

### remove-preset-password-warning

控制當自訂用戶端中有預設密碼時是否移除GUI上的安全警告。

https://github.com/rustdesk/rustdesk-server-pro/discussions/286

https://github.com/rustdesk/rustdesk/discussions/7956

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | Y | `remove-preset-password-warning=Y` |

### hide-security-settings / hide-network-settings / hide-server-settings / hide-proxy-settings / hide-websocket-settings / hide-remote-printer-settings

控制是否隱藏某些設定。請確保`禁用設定`已關閉，否則這些不會生效。

https://github.com/rustdesk/rustdesk-server-pro/issues/263

https://github.com/rustdesk/rustdesk-server-pro/issues/276

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `hide-security-settings=Y` |

### hide-username-on-card

控制是否在設備清單中顯示使用者名稱。因為有時使用者名稱太長，會隱藏其他資訊。

https://github.com/rustdesk/rustdesk-server-pro/issues/284#issuecomment-2216521407

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `hide-username-on-card=Y` |

### hide-help-cards

控制是否在GUI上顯示UAC/權限警告。

https://github.com/rustdesk/rustdesk/issues/8687

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `hide-help-cards=Y` |

### display-name

更改將在連接到遠端設備時彈出視窗中顯示的顯示名稱。預設情況下，它首先顯示登入使用者的名稱，否則顯示您的作業系統使用者名稱。

https://github.com/rustdesk/rustdesk-server-pro/issues/277

### disable-udp

控制是否僅使用TCP。它將不再使用UDP 21116，而是使用TCP 21116。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `disable-udp=Y` |

### preset-user-name / preset-strategy-name / preset-device-group-name / preset-device-username / preset-device-name / preset-note

將使用者/策略/設備群組/設備使用者名稱/設備名稱(主機名)/備註分配給設備。您也可以透過[命令列](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/#assign-device-usersgroupsstrategies-to-devices)執行此操作。

https://github.com/rustdesk/rustdesk-server-pro/discussions/304

設備群組在RustDesk用戶端>=1.3.8、pro >= 1.5.0中可用

preset-device-username、preset-device-name、preset-note在RustDesk用戶端>=1.4.3、pro >= 1.6.6中可用。

### default-connect-password

您使用`預設連接密碼`來建立到遠端設備的連接。此密碼在控制端設定，不應與受控（僅傳入）用戶端上找到的任何[預設密碼](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-can-we-set-up-a-client-with-a-fixed-password-for-unattended-remote-access)混淆。

例如 `default-connect-password=abcd1234`

### enable-trusted-devices

允許受信任的設備跳過2FA驗證。

https://github.com/rustdesk/rustdesk/discussions/8513#discussioncomment-10234494

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | Y | `enable-trusted-devices=N` |

### hide-tray

禁用系統匣中的匣圖示。

https://github.com/rustdesk/rustdesk-server-pro/issues/332

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `hide-tray=Y` |

### one-way-clipboard-redirection

禁用從受控端到控制端的剪貼簿同步，在RustDesk用戶端>=1.3.1（受控端）中可用

https://github.com/rustdesk/rustdesk/discussions/7837

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `one-way-clipboard-redirection=Y` |

### one-way-file-transfer

禁用從受控端到控制端的檔案傳輸，在RustDesk用戶端>=1.3.1（受控端）中可用

https://github.com/rustdesk/rustdesk/discussions/7837

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `one-way-file-transfer=Y` |


### sync-init-clipboard

建立連接時是否同步初始剪貼簿（僅從控制端到受控端），在RustDesk用戶端>=1.3.1（控制端）中可用

https://github.com/rustdesk/rustdesk/discussions/9010

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `sync-init-clipboard=Y` |

### allow-logon-screen-password

在使用[僅點擊批准模式](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#approve-mode)時是否允許在登入畫面上輸入密碼，在RustDesk用戶端>=1.3.1（受控端）中可用

https://github.com/rustdesk/rustdesk/discussions/9269

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-logon-screen-password=Y` |

### allow-https-21114

通常，HTTPS使用連接埠443。當API伺服器的連接埠錯誤地設定為21114時，RustDesk用戶端預設會移除21114連接埠設定。將選項設定為Y允許使用21114作為HTTPS連接埠。在RustDesk用戶端>=1.3.9中可用。

https://github.com/rustdesk/rustdesk-server-pro/discussions/570

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-https-21114=Y` |

### allow-d3d-render

D3D渲染可以獲得高幀率並減少CPU使用率，但在某些設備上遠端控制螢幕可能會變黑。在RustDesk用戶端>=1.3.9中可用，僅Windows。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-d3d-render=Y` |


### allow-hostname-as-id

[使用主機名作為ID](https://github.com/rustdesk/rustdesk-server-pro/discussions/483)，主機名中的空格會被替換為'-'。這不是100%保證的，只在第一次執行RustDesk用戶端時發生（即在新安裝的用戶端上）；如果發生衝突，將分配一個隨機ID。

在RustDesk用戶端版本1.4.0及更高版本中可用。

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-hostname-as-id=Y` |

### allow-websocket

使用WebSocket協定連接伺服器和用戶端。僅在RustDesk用戶端>=1.4.0和Pro伺服器>= 1.5.7中可用。請注意，WebSocket僅支援中繼連接。

要使WebSocket工作，您需要正確設定反向代理， https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-websocket=Y` |

### allow-numeric-one-time-password

此選項啟用或禁用僅數字一次性密碼的使用。
僅在RustDesk用戶端>=1.4.1和Pro伺服器>= 1.5.9中可用。

**討論**： https://github.com/rustdesk/rustdesk-server-pro/discussions/685

**預覽**： https://github.com/rustdesk/rustdesk/pull/11846

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-numeric-one-time-password=Y` |

### register-device

不註冊設備，您不會在Web控制台的設備頁面中看到它。

**僅在Pro伺服器>= 1.6.0中可用，需要[custom2許可證](https://rustdesk.com/pricing#custom2)且並行連接數>= 2。**

如果`register-device=N`，以下功能對此設備不起作用。
- 登入
- `--assign`命令
- `preset-address-book-name`, `preset-address-book-tag`, `preset-address-book-alias`, `preset-address-book-password`, `preset-address-book-note` `preset-user-name`, `preset-strategy-name`, `preset-device-group-name`, `preset-device-username`, `preset-device-name`, `preset-note`
- 稽核日誌
- 策略

**討論**： https://github.com/rustdesk/rustdesk-server-pro/discussions/672 和 https://github.com/rustdesk/rustdesk-server-pro/discussions/182

| 值 | 預設值 | 範例 |
| :------: | :------: | :------: |
| Y, N | Y | `register-device=N` |

### main-window-always-on-top

始終將主視窗保持在最上層。

**討論**: https://github.com/rustdesk/rustdesk-server-pro/issues/761

僅在 RustDesk 客戶端 1.4.2 中可用。

| 需要安裝 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `main-window-always-on-top=N` |

### relay-server

https://github.com/rustdesk/rustdesk-server-pro/issues/776#issuecomment-3306524913

### disable-discovery-panel

在 RustDesk 客戶端上停用「已發現」面板（在「我的最愛」面板旁邊）。

| 選項 | 需要安裝 | 值 | 預設值 | 範例 |
| :------: | :------: | :------: | :------: |
| disable-discovery-panel | N | Y, N | N | `disable-discovery-panel=Y` |

### touch-mode

控制在遠端控制會話期間使用觸控模式或滑鼠模式。

#### 不同版本的行為差異

##### RustDesk（控制端） < 1.4.3

在首次連線後，該選項會為每個裝置（peer）設定 "touch-mode"。此後，每個裝置的個別設定將決定是否使用觸控模式或滑鼠模式。

**位置**：

1. **桌面**
2. **行動** 設定 → 顯示 → 其他預設選項 → 觸控模式

##### RustDesk（控制端） >= 1.4.3

此選項會統一控制所有裝置是否使用觸控模式或滑鼠模式，並覆寫個別裝置設定。

| 值 | 預設 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `touch-mode=Y` |

### show-virtual-mouse

https://github.com/rustdesk/rustdesk/pull/12911

控制在 行動 → 桌面 模式下虛擬滑鼠的顯示。

**位置**：

1. **桌面**
2. **行動** 遠端連線 → 底部導覽列 → 手勢輔助

自 RustDesk 1.4.3 起可用

| 值 | 預設 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `show-virtual-mouse=Y` |

**注意**：此選項應在 **Default settings** 中配置，而非 **Override settings**。

### show-virtual-joystick

https://github.com/rustdesk/rustdesk/pull/12911

控制在 行動 → 桌面 模式下虛擬搖桿的顯示。

此選項需要先啟用 **show-virtual-mouse**。

**位置**：

1. **桌面**
2. **行動** 遠端連線 → 底部導覽列 → 手勢輔助

自 RustDesk 1.4.3 起可用

| 值 | 預設 | 範例 |
| :------: | :------: | :------: |
| Y, N | N | `show-virtual-joystick=Y` |

**注意**：此選項應在 **Default settings** 中配置，而非 **Override settings**。

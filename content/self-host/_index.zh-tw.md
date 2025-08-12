---
title: 自架伺服器
description: "學習如何自架您自己的 RustDesk 伺服器。完整指南涵蓋 RustDesk 伺服器基礎設施的安裝、配置和部署，實現安全的遠端桌面存取。"
keywords: ["rustdesk 自架", "rustdesk 伺服器", "遠端桌面伺服器", "自架指南", "rustdesk 安裝", "hbbs hbbr", "rustdesk 專業版伺服器"]
weight: 5
pre: "<b>2. </b>"
---

如果您使用 RustDesk，您應該擁有自己的 RustDesk 伺服器，這些文檔將在您的 RustDesk 之旅中提供幫助。

支援服務可透過我們的 [Discord](https://discord.com/invite/nDceKgxnkV) 獲得開源版本的協助，以及透過[Email](mailto:support@rustdesk.com)獲得專業版支援。

## 自架伺服器如何運作？

從技術上講，有兩個可執行檔案（伺服器）：

- `hbbs` - RustDesk ID（會合 / 信號）伺服器，監聽 TCP（`21114` - 僅用於 Pro 版的 HTTP、`21115`、`21116`、`21118` 用於 WebSocket）和 UDP（`21116`）
- `hbbr` - RustDesk 中繼伺服器，監聽 TCP（`21117`、`21119` 用於 WebSocket）

當您透過安裝腳本 / docker compose / deb 安裝時，這兩個服務都會被安裝。

這裡有 RustDesk 客戶端如何與 `hbbr` / `hbbs` 通信的[圖解](https://github.com/rustdesk/rustdesk/wiki/How-does-RustDesk-work%3F)。

只要 RustDesk 在機器上運行，該機器就會不斷地 ping ID 伺服器（`hbbs`），以使其當前的 IP 位址和連接埠被知悉。

當您從電腦 A 啟動到電腦 B 的連接時，電腦 A 會聯繫 ID 伺服器並要求與電腦 B 通信。

ID 伺服器然後嘗試使用打洞技術將 A 和 B 直接連接。

如果打洞失敗，A 將透過中繼伺服器（`hbbr`）與 B 通信。

在大多數情況下，打洞是成功的，並且永遠不會使用中繼伺服器。

這裡有一個關於[您是否應該自架 RustDesk 伺服器？](https://www.reddit.com/r/rustdesk/comments/1cr8kfv/should_you_selfhost_a_rustdesk_server/)的討論

## 所需的連結埠

自架 RustDesk 伺服器所需的連接埠在很大程度上取決於您的環境以及您想要使用 RustDesk 做什麼。整個文檔中顯示的範例通常會建議開啟所有連接埠。

核心連接埠：\
TCP `21114-21119` \
UDP `21116`

上述的 `21115-21117` 是 RustDesk 運作所需的最低要求連接埠，這些處理信號和中繼連接埠以及 NAT 穿透。

TCP 連接埠 `21118` 和 `21119` 是 [RustDesk Web 客戶端](https://rustdesk.com/web/)的 WebSocket 連接埠，您需要反向代理來支援 HTTPS，請參考這個 [Nginx 配置範例](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-the-web-client)。

對於沒有 SSL 代理的專業版用戶，您需要開啟 TCP 連接埠 `21114` 以使 API 運作，或者使用 SSL 代理開啟 TCP 連接埠 `443`。

{{% children depth="4" showhidden="true" %}}

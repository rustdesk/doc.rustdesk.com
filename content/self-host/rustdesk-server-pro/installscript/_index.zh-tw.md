---
title: 安裝
weight: 2
description: "RustDesk 的安裝文檔，提供安裝、設定、部署與疑難排解指南。"
keywords: ["rustdesk server pro install", "rustdesk self-host pro", "rustdesk pro docker", "rustdesk pro linux install", "rustdesk pro windows install"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## 快速回答

對大多數團隊來說，安裝 RustDesk Server Pro 的最佳方式是 Docker，因為升級與回滾都更簡單。如果您想要原生 Linux 服務，請使用 `install.sh`；如果已經在執行 OSS，請使用轉換路徑。

## 關鍵重點

- RustDesk Server Pro 授權
- Linux 伺服器、虛擬機，或可使用 Docker 的主機
- 所需連接埠，以及 Web 主控台和 API 需要的 `21114` 或 `443`
- 如果您想在網域上啟用 HTTPS，可選擇設定 DNS

<!-- GEO-LOCALIZED-INTRO:END -->

## 方法 1：Docker (建議)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
docker compose up -d
```

更多詳情，請查看 [Docker](/docs/zh-tw/self-host/rustdesk-server-pro/installscript/docker/)。

## 方法 2：install.sh

如果您精通 Linux，請使用下面的腳本。否則，如果腳本執行失敗，您可能會遇到嚴重問題，並且很難確定問題原因。

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

更多詳情，請查看 [install.sh](/docs/zh-tw/self-host/rustdesk-server-pro/installscript/script/)。

## 從開源版本轉換

### Docker
如果您使用 Docker 安裝了開源版本，沒有直接的轉換方法。相反，您需要使用 Pro 鏡像運行一個新容器。在執行此操作之前，請備份您的私鑰（`id_ed25519` 文件，而不是 `id_ed25519.pub`）。設置新容器後，將舊的 `id_ed25519` 私鑰文件複製到新容器的工作目錄中，然後重啟容器。

### install.sh
如果您使用 install.sh 安裝了開源版本，請參考[這裡](/docs/zh-tw/self-host/rustdesk-server-pro/installscript/script/#convert-from-open-source)。
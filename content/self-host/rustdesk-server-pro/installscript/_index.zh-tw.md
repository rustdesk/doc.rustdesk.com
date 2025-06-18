---
title: 安裝
weight: 2
---

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
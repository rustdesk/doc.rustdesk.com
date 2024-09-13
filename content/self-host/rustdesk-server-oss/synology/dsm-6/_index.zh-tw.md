---
title: Synology DSM 6
weight: 22
---

本教學基於 DSM v6 最新版。

### 安裝 Docker

打開套件管理員並安裝 docker

|             |                                                   |
| --------------- | -------------------------------------------------------- |
![](images/package-manager.png) | ![](images/docker.png)


### 安裝 RustDesk Server

| 在 Docker 的 registery 裡搜尋 rustdesk-server 並連點兩下來安裝  |   安裝 rustdesk-server 映像後, 連點兩下映像來建立容器                                    |
| --------------- | -------------------------------------------------------- |
![](images/pull-rustdesk-server.png) | ![](images/rustdesk-server-installed.png)


### 建立 hbbs 容器

如上所述，連點兩下 rustdesk-server 映像來建立新容器，並將其名稱設置為 `hbbs`。
![](images/hbbs.png)

點擊上面的 "進階設定"。

- 啟用自動重新啟動
![](images/auto-restart.png)

- 啟用 "Use the same network as Docker host", 關於 host net 的更多解釋，請[查閱](/docs/zh-tw/self-host/install/#net-host)
![](images/host-net.png)

- 將主機目錄 (比如 `Shared/test/`) 掛接到 `/root`，hbbs 將把產生的文件（包括 `key` 檔案）放在該目錄。
| 掛接 | 產生的檔案 |
|-- | -- |
![](images/mount.png?width=500px) | ![](images/mounted-dir.png?width=300px)

- 設置指令
{{% notice note %}}
群暉的操作系統是基於 Debian 的，因此 host net (--net=host) 可以正常工作，我們不需要使用 `-p` 選項映射連接埠。

`192.168.16.98` 為內網 IP，此處僅作演示，部署時請設置為公網 IP。

{{% /notice %}}

![](images/hbbs-cmd.png?v3)

- 搞定

![](images/hbbs-config.png)

### 建立 hbbr 容器

請重複上述 `hbbs` 步驟，但將容器名稱更改為 `hbbr` 並將指令更改為 `hbbr`。

![](images/hbbr-config.png)

### hbbr/hbbs 容器建立完成

![](images/containers.png?width=500px)


| 連點兩下容器並查看日誌 | 確認 hbbs/hbbr 在使用 host net |
|-- | -- |
![](images/log.png?width=500px) | ![](images/network-types.png?width=500px)

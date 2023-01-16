---
title: 群暉
weight: 22
---


本手冊基於DSM v6。

### 安裝Docker

打開 package manager 並安裝 docker

|             |                                                   |
| --------------- | -------------------------------------------------------- |
![](/docs/en/self-host/synology/images/package-manager.png) | ![](/docs/en/self-host/synology/images/docker.png)


### 安裝 RustDesk Server

| 在 Docker's registery 裡搜索 rustdesk-server 並雙擊安裝  |   安裝 rustdesk-server 鏡像後, 雙擊鏡像創建容器                                    |
| --------------- | -------------------------------------------------------- |
![](/docs/en/self-host/synology/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/synology/images/rustdesk-server-installed.png)


### 創建 hbbs 容器

如上所述哦，雙擊 rustdesk-server 鏡像創建新容器，設置名稱 `hbbs`。
![](/docs/en/self-host/synology/images/hbbs.png) 

點擊上面的 "Advanced Settings"。

- 開啟 auto-restart
![](/docs/en/self-host/synology/images/auto-restart.png) 

- 開啟 "Use the same network as Docker host", 關於 host net的更多解釋，請[查看](/docs/zh-tw/self-host/install/#net-host)
![](/docs/en/self-host/synology/images/host-net.png) 

- 將容器裡的 home 目錄 `/root` 掛在到宿主目錄(比如 `Shared/test/`), hbbs將把產生的文件（包括`key`文件）放在該目錄。
| 掛在 | 產生的文件 |
|-- | -- |
![](/docs/en/self-host/synology/images/mount.png?width=500px) | ![](/docs/en/self-host/synology/images/mounted-dir.png?width=300px) 

- 設置命令
{{% notice note %}}
Synology 的操作系統是基於 Debian 的，因此host net (--net=host) 可以正常工作，我們不需要使用 `-p` 選項映射端口。

`192.168.16.98`為內網ip，此處僅作演示，部署時請設置為公網ip。

{{% /notice %}}

![](/docs/en/self-host/synology/images/hbbs-cmd.png?v2) 

- 搞定
  
![](/docs/en/self-host/synology/images/hbbs-config.png) 

### 創建 hbbr 容器 

請重複上述 `hbbs` 步驟，請將容器名更改為 `hbbr` 並將命令更改為 `hbbr`。

![](/docs/en/self-host/synology/images/hbbr-config.png) 

### hbbr/hbbs 容器創建完成 

![](/docs/en/self-host/synology/images/containers.png?width=500px)


| 雙擊容器並查看日誌 | 確認 hbbs/hbbr 在使用 host net |
|-- | -- |
![](/docs/en/self-host/synology/images/log.png?width=500px) | ![](/docs/en/self-host/synology/images/network-types.png?width=500px)

---
title: 群暉
weight: 22
---


本手冊基於DSM v6。

### 安裝Docker

打開 package manager 並安裝 docker

|             |                                                   |
| --------------- | -------------------------------------------------------- |
![](/docs/en/self-host/synogy/images/package-manager.png) | ![](/docs/en/self-host/synogy/images/docker.png)


### 安裝 RustDesk Server

| 在 Docker's registery 裡搜索 rustdesk-server 並雙擊安裝  |   安裝 rustdesk-server 鏡像後, 雙擊鏡像創建容器                                    |
| --------------- | -------------------------------------------------------- |
![](/docs/en/self-host/synogy/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/synogy/images/rustdesk-server-installed.png)


### 創建 hbbs 容器

如上所述哦，雙擊 rustdesk-server 鏡像創建新容器，設置名稱 `hbbs`。
![](/docs/en/self-host/synogy/images/hbbs.png?height=500px) 

點擊上面的 "Advanced Settings"。

- 開啟 auto-restart
![](/docs/en/self-host/synogy/images/auto-restart.png?height=500px) 

- 選擇 host net, 關於 host net的更多解釋，請[查看](/docs/zh-tw/self-host/install/#net-host)
![](/docs/en/self-host/synogy/images/host-net.png?height=500px) 

- 將容器裡的 home 目錄 `/root` 掛在到宿主目錄(比如 `Shared/test/`), hbbr將把產生的文件放在該目錄。
| 掛在 | 產生的文件 |
|-- | -- |
![](/docs/en/self-host/synogy/images/mount.png?width=500px) | ![](/docs/en/self-host/synogy/images/mounted-dir.png?width=300px) 

- 設置命令
{{% notice note %}}
Synogy 的操作系統是基於 debain 的，因此host net (--net=host) 可以正常工作，我們不需要使用 `-p` 選項映射端口。

`192.168.16.98`為內網ip，此處僅作演示，部署時請設置為公網ip。

`demo`在這裡僅供試用，部署時請設置為註冊郵箱。 `demo` 可以在許可證開售之前一直使用。
{{% /notice %}}

![](/docs/en/self-host/synogy/images/hbbs-cmd.png?height=500px) 

- 搞定
  
![](/docs/en/self-host/synogy/images/hbbs-config.png?height=500px) 

### 創建 hbbr 容器 

請重複上述 `hbbs` 步驟，請將容器名更改為 `hbbr` 並將命令更改為 `hbbr -m demo`。

![](/docs/en/self-host/synogy/images/hbbr-config.png?height=500px) 

### hbbr/hbbs 容器創建完成 

![](/docs/en/self-host/synogy/images/containers.png?width=500px)


| 雙擊容器並查看日誌 | 確認 hbbs/hbbr 在使用 host net |
|-- | -- |
![](/docs/en/self-host/synogy/images/log.png?width=500px) | ![](/docs/en/self-host/synogy/images/network-types.png?width=500px)

### 測試

您可以通過 `hbbs` 內置的 web 控制台測試 hbbs 是否運行良好。請將 `192.168.16.98` 更改為您的春輝的IP。默認登錄名/密碼是 `admin`/`test1234`。

![](/docs/en/self-host/synogy/images/console.png?width=500px)

請按以下方式更改管理員密碼。

| | |
|- | -|
![](/docs/en/self-host/synogy/images/go-to-settings.png?width=500px) | ![](/docs/en/self-host/synogy/images/change-password.png?width=500px)
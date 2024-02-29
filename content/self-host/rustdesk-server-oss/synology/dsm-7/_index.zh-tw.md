---
title: Synology DSM 7.2
weight: 20
---
<!--to translater: When translating elements like "buttons", don't just translate, please refer actual naming in their interface.-->
在 DSM 7.2 更新之後，Synology 已將 "Docker" 套件改名為 "Container Manager"，它採用新的介面，並且在其圖形介面內建 docker-compose，可讓您更容易地建立 Docker。
## 支援的機型以及需求

Container Manager 為部分低階的 ARM64 的機型帶來支援，例如 j 系列，如要獲取更多支援機型，請參閱 [Synology 網站](https://www.synology.com/zh-tw/dsm/packages/ContainerManager)。

## 1. 安裝 Container Manager (Docker)

開啟"套件中心"，搜尋並安裝 "Container Manager"。

![](images/dsm7_install_container_manager_though_package_center.png)

## 2. 建立資料夾

在您安裝完 "Container Manager" 之後，它會建立一個叫做 "docker" 的共享資料夾，讓我們把伺服器的資料放這。

打開您的 File Station，建立一個名叫 `rustdesk-server`(或您想要的名字)的資料夾，接著在其建立名為 `data` 的資料夾，如圖所示。

![](images/dsm7_create_required_folders.png)

## 3. 建立容器

打開您的 Container Manager，前往專案並點擊新增。

輸入您的專案名稱 `rustdesk-server` 然後變更來源從"上傳 docker-compose.yml" 至 "建立 docker-compose.yml"，接著複製下方內容到框框，在您複製貼上後，您應該將 `rustdesk.example.com` (它該指向到您的 `hbbr`) 改為會指向至您NAS的網域。

{{% notice note %}}
如圖所示，您可以暫時將 `hbbs` 那行改為指向至您的NAS的 LAN IP，在您驗證您的伺服器可以正常運作後，您**應當**變更回來。
{{% /notice %}}

![](images/dsm7_creating_project_init.png)

````yaml
version: '3'
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    command: hbbs -r rustdesk.example.com:21117 -k _
    volumes:
      - ./data:/root
    network_mode: host
    depends_on:
      - hbbr
    restart: always

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr -k _
    volumes:
      - ./data:/root
    network_mode: host
    restart: always

# 因為使用 docker host mode
# 以防你忘記這些端口:
# 21115 TCP NAT 類型測試
# 21116 TCP TCP 打洞
# 21116 UDP 心跳/ID 伺服器
# 21117 TCP Relay/中繼
 ````

請略過 `網頁入口設定` 接著完成。

 ## 4. 檢查可否運作

打開您的 File Station 您應該可看到 `id_ed25519`、`id_ed25519.pub` 在您的 `docker/rustdesk-server/data` 資料夾。

公鑰看起來會像這個樣子:

![](images/dsm7_viewing_public_key_though_syno_text_editor.png)

看看[這裡](/docs/zh-tw/self-host/rustdesk-server-oss/install/#step-3-set-hbbshbbr-address-on-client-side)來設置您的客戶端，只有 `ID 伺服器` 以及 `Key` 是需要的，中繼伺服器不需設定，因為我們已經把它設置在 `hbbs` 了，hbbs 會自動提供這項資訊。

## 5. 設置 hbbs 讓它指向至您的網域

如果您設置了 `hbbs` 指向至您的 LAN IP，並且確認它正常運作，現在是時候改回網域了，因為它會在您的區域網路之外不能正常運作。

<hr>

5.1 前往 Container Manager > 專案 > 點擊 "rustdesk-server" > 操作 > 停止

5.2 在停止之後，點擊 "YAML 設定"，修改開始為 `command: hbbs` 的那一行至您的網域，接著點擊 "停止"，請確保您選擇了 "建立並啟動專案(重建映像檔)"

![](images/dsm7_recreate_project_after_modified_args.png)

5.3 您的 RustDesk 伺服器應該可接受來自網際網路的連線了，接著，您應該設定 port forwarding (通訊埠轉發)。

{{% notice note %}}
在完成這個步驟後就遇到問題了? 那麼你應該看看 [這個文章](/docs/zh-tw/self-host/nat-loopback-issues/)。
{{% /notice %}}

## 6. 在您的路由器設置 port forwarding (通訊埠轉發)

前往您的路由器的管理頁面，尋找任何有關於 `Port forwarding` 或是 `通訊埠轉發` 的設定，他應該在 `WAN`、`網際網路` 或是 `防火牆` 設置。

如果您還是無法找到設定，Google 搜尋 `{路由器廠牌} + port forwarding` 或 `{路由器型號} + port forwarding`

開啟這些需要的端口:
  * `21115` `TCP` NAT 類型測試
  * `21116` `TCP` TCP 打洞
  * `21116` `UDP` 心跳/ID 伺服器
  * `21117` `TCP` Relay/中繼
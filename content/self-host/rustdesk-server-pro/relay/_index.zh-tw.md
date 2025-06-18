---
title: 配置中繼伺服器
weight: 17
---

## RustDesk Pro - 使用docker安裝具有地理位置的附加中繼伺服器

{{% notice note %}}
[簡單安裝](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/)會在同一台機器上隱式創建一個中繼伺服器（`hbbr`進程），您無需顯式指定中繼伺服器。

如果您想在另一台機器上顯式創建附加中繼伺服器，請按照[OSS安裝](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/)運行`hbbr`。您可以在`rustdesk-server-linux-amd64.tar.gz`、`rustdesk-server-hbbr_<version>-<arch>.deb`、`rustdesk-server-windows-x86_64.tar.gz`或`docker`（`sudo docker run ... rustdesk/rustdesk-server-pro hbbr`）中找到`hbbr`。

`hbbr`不需要許可證，與開源版本相同。
{{% /notice %}}

您可以在全球運行多個中繼伺服器，並利用地理位置自動使用最近的中繼伺服器，從而在連接遠程計算機時獲得更快的體驗。`hbbs`每隔幾秒鐘自動檢查這些中繼伺服器是否在線，它只選擇在線的中繼伺服器。

{{% notice note %}}
已知問題：https://github.com/rustdesk/rustdesk/discussions/7934
{{% /notice %}}

> 您需要私鑰對`id_ed25519`和`id_ed25519.pub`。

# 安裝步驟

1 - 如果已安裝docker，通過SSH連接到您的伺服器並為hbbr創建卷：
```
# docker volume create hbbr
```

卷hbbr應該位於`/var/lib/docker/volumes/hbbr/_data`。

2 - 將私鑰對複製到卷位置，在本例中我們將使用SCP複製文件。

命令語法為`scp <路徑/文件名> 用戶名@伺服器:</目標/路徑>`。
```
# scp id_ed25519 root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
# scp id_ed25519.pub root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
```

3 - 使用先前創建的卷部署hbbr容器。該卷包含運行私有中繼伺服器所需的私鑰對。
```
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server hbbr -k _
```

4 - 檢查運行日誌以驗證hbbr正在使用您的密鑰對運行：
```
# docker logs hbbr

INFO [src/common.rs:121] **Private key comes from id_ed25519**
NFO [src/relay_server.rs:581] Key: XXXXXXXXXXXXXXXXXXXXX
INFO [src/relay_server.rs:60] #blacklist(blacklist.txt): 0
INFO [src/relay_server.rs:75] #blocklist(blocklist.txt): 0
INFO [src/relay_server.rs:81] Listening on tcp :21117
```

根據您的作業系統，您可能希望使用防火牆阻止/允許IP。

在我們的例子中，運行Ubuntu時，我們希望允許任何TCP連接到端口21117和21119。

```
# sudo ufw allow proto tcp from any to any port 21117,21119
```

**啟用防火牆**
```
# sudo ufw enable
```

**檢查狀態**
```
# ufw status

Status: active

To                         Action      From
--                         ------      ----
21117,21119/tcp            ALLOW       Anywhere
21117,21119/tcp (v6)       ALLOW       Anywhere (v6)
```

## 使用Web控制台為地理位置配置RustDesk Pro

### 註冊並下載GeoLite2 City資料庫檔案

要使用地理位置，hbbs需要訪問MaxMind GeoLite2 City資料庫。該資料庫是免費的，您可以註冊下載檔案並獲取API密鑰。

首先通過訪問[網站](https://www.maxmind.com/en/account/login)創建賬戶（如果您還沒有）。
轉到`Download Databases`並下載GeoLite2 City，選擇gzip檔案，解壓縮後應該有`mmdb`檔案。

<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/e14318fb-ec52-463c-af77-d08c9479c1b5">

如果您使用安裝腳本在Linux機器上安裝了RustDesk Pro，`mmdb`檔案需要移動到`/var/lib/rustdesk-server/`。

對於Docker安裝，檔案應該在部署容器時映射到`/root`的卷中。

### 獲取API密鑰以自動化流程 - Linux伺服器

您需要定期更新此檔案，我們可以使用cronjob來執行。您需要一個API密鑰來訪問下載鏈接，這是免費的。

轉到`Manage License Keys`並生成新的許可證密鑰。<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/632aeb33-4f5d-4a31-9010-38e01c22d3c9">
<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/3e178174-5fbf-46b7-a335-01f77125dfad">

您可以通過幾種方式自動化[下載過程](https://dev.maxmind.com/geoip/updating-databases)，但您可以將以下命令添加到您的crontab中，將{您的訪問密鑰}替換為您從上一步獲得的API密鑰。

```
/usr/bin/curl -L --silent 'https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={您的訪問密鑰}&suffix=tar.gz' | /bin/tar -C '/var/lib/rustdesk-server/' -xvz --keep-newer-files --strip-components=1 --wildcards '*GeoLite2-City.mmdb'
```

### 在RustDesk Pro Web控制台中更改設置

將您的中繼伺服器IP地址或DNS名稱（從版本1.1.11開始支持DNS）添加到`Relay Servers`。**不需要端口，顯式使用`21117`端口。**<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/c4452ba4-5e1d-437a-ae1d-fc0070bfa26c">

通過添加伺服器IP地址和伺服器所在位置的坐標來添加地理覆蓋。<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/41c558e3-423b-4296-90d3-cb0769f4a369">

點擊`Reload Geo`，您的列表應該類似於此。<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/5a0d39a9-4fec-46b4-a7a2-7ed38b6baeb7">

要確認結果，在點擊`Reload Geo`時檢查您的hbbs日誌，您應該看到顯示中繼伺服器IP地址及其坐標的訊息。

> 如果您在Linux機器上運行RustDesk Pro，請使用命令`RUST_LOG=debug ./hbbs`查看日誌。如果您在Docker容器上運行，請使用`docker logs hbbs`。

```
RUST_LOG=debug ./hbbs

INFO [src/common.rs:130] GEOIP_FILE: ./GeoLite2-City.mmdb
INFO [src/common.rs:159] override 1xx.xxx.xxx.x7: -1.xx 5x.xxx
[src/common.rs:159] override 1xx.xxx.xxx.xx8: -3.xxx 5x.xxxx
[src/common.rs:159] override 7xx.xxx.xxxx.xx1: 6.xxx 5x.xxxx
GEOIP_FILE loaded, #overrides 3
INFO [src/common.rs:119] relay-servers=["1xx.xxx.xxx.x7", "1xx.xxx.xxx.xx8", "7xx.xxx.xxx.xx1"]
NFO [src/rendezvous_server.rs:1467] parsed relay servers: [("1xx.xxxx.xxx.xx7", Some((-1x, xxx))), ("1xx.xxx.xxx.xx8", Some((-3x, xxx))), ("7xx.xxx.xxx.xx1", Some((6x, xxx)))]
```

您還可以直接在hbbr實例上確認中繼請求，只需檢查容器日誌即可。

```
# docker logs hbbr

INFO [src/relay_server.rs:436] Relayrequest 0593e64e-4fe8-4a59-a94f-b3420ab043eb from [::ffff:100.100.123.233]:52038 got paired
INFO [src/relay_server.rs:442] Both are raw
```
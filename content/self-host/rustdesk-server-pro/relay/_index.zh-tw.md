---
title: 配置中繼伺服器
weight: 17
---

## RustDesk Pro - 使用docker安裝具有地理位置的附加中繼伺服器

{{% notice note %}}
[簡單安裝](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/)會在同一台機器上隱式創建一個中繼伺服器（`hbbr`進程），您無需顯式指定中繼伺服器。

如果您想在另一台機器上顯式創建附加中繼伺服器，請按照[OSS安裝](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/)運行`hbbr`。

`hbbr`不需要許可證，與開源版本相同。
{{% /notice %}}

您可以在全球運行多個中繼伺服器，並利用地理位置自動使用最近的中繼伺服器，從而在連接遠程計算機時獲得更快的體驗。`hbbs`每隔幾秒鐘自動檢查這些中繼伺服器是否在線，它只選擇在線的中繼伺服器。

> 您需要私鑰對`id_ed25519`和`id_ed25519.pub`。

# 安裝步驟

1. 如果已安裝docker，通過SSH連接到您的伺服器並為hbbr創建卷：
```
# docker volume create hbbr
```

2. 將私鑰對複製到卷位置：
```
# scp id_ed25519 root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
# scp id_ed25519.pub root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
```

3. 使用先前創建的卷部署hbbr容器：
```
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server hbbr -k _
```

4. 檢查運行日誌以驗證hbbr正在使用您的密鑰對運行：
```
# docker logs hbbr
```

# 防火牆配置
```
# sudo ufw allow proto tcp from any to any port 21117,21119
# sudo ufw enable
```

## 使用Web控制台為地理位置配置RustDesk Pro

### 註冊並下載GeoLite2 City資料庫檔案

要使用地理位置，hbbs需要訪問MaxMind GeoLite2 City資料庫。該資料庫是免費的，您可以註冊下載檔案並獲取API密鑰。

1. 在[網站](https://www.maxmind.com/en/account/login)創建帳戶
2. 轉到`Download Databases`並下載GeoLite2 City
3. 選擇gzip檔案，解壓縮後應該有`mmdb`檔案

對於Linux安裝，`mmdb`檔案需要移動到`/var/lib/rustdesk-server/`。
對於Docker安裝，檔案應該在您映射到`/root`的卷中。

### 在RustDesk Pro Web控制台中更改設置

1. 將中繼伺服器IP地址或DNS名稱添加到`Relay Servers`（不需要端口，顯式使用`21117`端口）
2. 添加地理覆蓋，通過添加伺服器IP地址和伺服器所在位置的坐標
3. 點擊`Reload Geo`

要確認結果，在點擊`Reload Geo`時檢查您的hbbs日誌，您應該看到顯示中繼伺服器IP地址及其坐標的訊息。
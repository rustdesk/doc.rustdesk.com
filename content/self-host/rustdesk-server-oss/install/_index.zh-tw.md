---
title: 安裝
weight: 1
---

## 影片教學
YouTube上有許多影片教學，https://github.com/rustdesk/rustdesk/wiki/FAQ#video-tutorials。

## 伺服器需求
硬體需求非常低；基本雲端伺服器的最低配置就足夠了，CPU和記憶體需求極低。您也可以使用樹莓派或類似裝置。關於網路規模，如果TCP打洞直連失敗，將消耗中繼流量。中繼連線的流量根據解析度設定和螢幕更新在30 K/s到3 M/s（1920x1080螢幕）之間。如果僅用於辦公需求，流量約為100 K/s。

## 防火牆
如果您安裝了UFW，請使用以下命令設定防火牆：
```
ufw allow 21114:21119/tcp
ufw allow 21116/udp
sudo ufw enable
```

## 安裝
### 方法1：Docker（建議）

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/oss.yml -O compose.yml
sudo docker compose up -d
```

更多詳情，請查看 [Docker](/docs/en/self-host/rustdesk-server-oss/docker/)。

### 方法2：使用簡單的安裝腳本將您自己的伺服器安裝為systemd服務
腳本託管在 [Techahold](https://github.com/techahold/rustdeskinstall)，並在我們的 [Discord](https://discord.com/invite/nDceKgxnkV) 上提供支援。

目前，該腳本將下載並設定中繼和訊號伺服器（hbbr和hbbs），產生設定並將其託管在受密碼保護的網頁上，以便簡單部署到用戶端。

執行以下命令：
```
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```

[Techahold](https://github.com/techahold/rustdeskinstall) 的儲存庫中還有一個更新腳本。

從那裡，記下安裝結束時顯示的IP/DNS和金鑰，並將它們分別插入用戶端設定 > 網路 > ID/中繼伺服器的`ID伺服器`和`金鑰`欄位中，其他欄位留空（見下面的註解）。

### 方法3：使用deb檔案為debian發行版安裝您自己的伺服器作為systemd服務

請自行[下載](https://github.com/rustdesk/rustdesk-server/releases/latest) deb檔案，並使用`apt-get -f install <filename>.deb`或`dpkg -i <filename>.deb`進行安裝。

## 設定用戶端
請查看[這裡](/docs/en/self-host/client-configuration/#2-manual-config)。

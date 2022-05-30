---
title: 安裝
weight: 10
---

## 如何自建中繼
-----------

### 步驟1: 下載服務器端軟件程序

[下載](https://gitee.com/rustdesk/rustdesk-server/)或者使用docker[rustdesk/rustdesk-server](https://hub.docker.com/r/rustdesk/rustdesk-server/tags)。

提供版本：
  - Linux
  - Windows

以下針對Linux版本做使用說明。

有兩個可執行文件和一個文件夾:
  - hbbs - RustDesk ID註冊服務器
  - hbbr - RustDesk 中繼服務器

Linux版本在Centos7構建，在 Centos7/8，Ubuntu 18/20上測試過，Debian系列的發行版本應該都沒有問題。如果有其他發行版本需求，請聯繫我。

#### 服務器要求
硬件要求很低，最低配置的雲服務器就可以了，CPU和內存要求都是最小的。關於網絡大小，如果TCP打洞直連失敗，就要耗費中繼流量，一個中繼連接的流量在30k-3M每秒之間（1920x1080屏幕），取決於清晰度設置和畫面變化，如果只是辦公需求，平均在100K。

### 步驟2: 在服務器上運行 hbbs 和 hbbr

在服務器上運行 hbbs/hbbr (Centos 或 Ubuntu)。建議使用[pm2](https://pm2.keymetrics.io/) 管理服務。

```
./hbbs -r <hbbr運行所在主機的地址[:port]> 
./hbbr 
```

或者使用 pm2 運行 hbbs/hbbr

```
pm2 start hbbs -- -r <relay-server-ip[:port]> 
pm2 start hbbr
```

<a name="demo"></a>
{{% notice note %}}

`pm2` 需要 nodejs v16+，如果你運行 pm2 失敗（例如在 `pm2 list` 中看不到 hbbs/hbbr），請從 https://nodejs.org 下載並安裝 LTS 版本的 nodejs。如果你想讓 hbbs/hbbr 在重啟後自動運行，請查看 `pm2 save` 和 `pm2 startup`。更多關於 [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/)。另一個不錯的日誌工具是 [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate)。


hhbs的`-r`參數不是必須的，他只是方便你不用在客戶端指定中繼服務器。客戶端指定的中繼服務器優先級高於這個。

{{% /notice %}}

默認情況下，hbbs 監聽21115(tcp), 21116(tcp/udp), 21118(tcp)，hbbr 監聽21117(tcp), 21119(tcp)。務必在防火牆開啟這幾個端口， **請注意21116同時要開啟TCP和UDP**。其中21115是hbbs用作NAT類型測試，21116/UDP是hbbs用作ID註冊與心跳服務，21116/TCP是hbbs用作TCP打洞與連接服務，21117是hbbr用作中繼服務, 21118和21119是為了支持網頁客戶端。如果您不需要網頁客戶端（21118，21119）支持，對應端口可以不開。

- TCP(**21115, 21116, 21117, 21118, 21119**)
- UDP(**21116**)

如果你想選擇**自己的端口**，使用 “-h” 選項查看幫助。

#### Docker示範
##### Linux/amd64
```
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -it --net=host --rm rustdesk/rustdesk-server hbbs -r <relay-server-ip[:port]> 
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -it --net=host --rm rustdesk/rustdesk-server hbbr 
```

##### Linux/arm64v8
```
sudo docker image pull rustdesk/rustdesk-server:latest-arm64v8
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -it --net=host --rm rustdesk/rustdesk-server:latest-arm64v8 hbbs -r <relay-server-ip[:port]> 
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -it --net=host --rm rustdesk/rustdesk-server:latest-arm64v8 hbbr 
```

<a name="net-host"></a>

{{% notice note %}}
據我所知，--net=host 僅適用於 Linux，它讓 hbbs/hbbr 可以看到對方真實的ip, 而不是固定的容器ip (172.17.0.1)。
如果--net=host運行正常，-p選項就不起作用了, 可以去掉。

****請去掉 --net=host，如果您在非Linux系統上遇到無法連接的問題**
{{% /notice %}}

### 步驟3: 在客戶端設置 hbbs/hbbr 地址

點擊 ID 右側的菜單按鈕如下，選擇“ ID/中繼服務器”。

![](/docs/en/self-host/install/images/server-set-menu.png)

在 ID 服務器輸入框中（被控端+主控端）輸入 hbbs 主機或 ip 地址，另外兩個地址可以不填，RustDesk會自動推導（如果沒有特別設定），中繼服務器指的是hbbr（21116）端口。

例如:

```
hbbs.example.com
```

或者

```
hbbs.example.com:21116
```
![](/docs/en/self-host/install/images/server-set-window.png)

#### 把配置放在可執行文件名里 (Windows only)

把`rustdesk.exe` 修改為 rustdesk-`host=<host-ip-or-name>,key=<public-key-string>`.exe, 例如： rustdesk-`host=192.168.1.137,key=xfdsfsd32=32`.exe，你可以在About窗口看到配置結果，如下圖所示。

{{% notice note %}}
`host` 和 `key` 都需要添加，缺少一個就不好使。
{{% /notice %}}

| Menu | About Page |
| -- | -- |
![](/docs/en/self-host/install/images/aboutmenu.png) | ![](/docs/en/self-host/install/images/lic.png) |

## Key
-----------
同上個版本不同，本版本中的key是強制的，但是不用你自己設置。hbbs在第一次運行時，會自動產生一對加密私鑰和公鑰（分別位於運行目錄下的`id_ed25519`和`id_ed25519.pub`文件中），其主要用途是為了通訊加密。

如果您在上一步驟中沒有填寫`Key:`(公鑰文件`id_ed25519.pub`中的內容)，不影響連接，但是連接無法加密。

```
cat ./id_ed25519.pub
```
如果您禁止沒有key的用戶建立非加密連接，請在運行hbbs和hbbr的時候添加`-k _ `參數，例如:

```
./hbbs -r <relay-server-ip[:port]> -k _
./hbbr -k _
```

如果要更改key，請刪除 `id_ed25519` 和 `id_ed25519.pub` 文件並重新啟動 hbbs/hbbr，hbbs將會產生新的密鑰對。
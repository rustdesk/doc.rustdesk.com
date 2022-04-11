---
title: 安裝
weight: 10
---

## 如何自建中繼
-----------

### 步驟1: 下載服務器端軟件程序

[下載](https://gitee.com/rustdesk/rustdesk-server/)或者使用docker rustdesk/rustdesk-server，**注意**： 你需要[購買許可](https://rustdesk.com/server/)才能正常運行本程序

提供三個版本：
  - Linux
  - Windows

以下針對Linux版本做使用說明。

有兩個可執行文件:
  - hbbs - RustDesk ID註冊服務器
  - hbbr - RustDesk 中繼服務器

下載後務必
```
chmod a+x hbbs hbbr
```

Linux版本在Centos7構建，在 Centos7/8，Ubuntu 18/20上測試過，Debian系列的發行版本應該都沒有問題。如果有其他發行版本需求，請聯繫我。

#### 服務器要求
硬件要求很低，最低配置的雲服務器就可以了，CPU和內存要求都是最小的。關於網絡大小，如果TCP打洞直連失敗，就要耗費中繼流量，一個中繼連接的流量在30k-3M每秒之間（1920x1080屏幕），取決於清晰度設置和畫面變化，如果只是辦公需求，平均在100K。

### 步驟2: 在服務器上運行 hbbs 和 hbbr

在服務器上運行 hbbs/hbbr (Centos 或 Ubuntu)。建議使用[pm2](https://pm2.keymetrics.io/) 管理服務。

```
./hbbs -r <hbbr運行所在主機的地址>
./hbbr
```
{{% notice note %}}
hhbs的-r參數不是必須的，他只是方便你不用在客戶端指定中繼服務器。客戶端指定的中繼服務器優先級高於這個。
{{% /notice %}}

默認情況下，hbbs 監聽21114(tcp), 21115(tcp), 21116(tcp/udp), 21118(tcp)，hbbr 監聽21117(tcp), 21119(tcp)。務必在防火牆開啟這幾個端口， **請注意21116同時要開啟TCP和UDP**。其中21114是網頁控制台+API，21115是hbbs用作NAT類型測試，21116/UDP是hbbs用作ID註冊與心跳服務，21116/TCP是hbbs用作TCP打洞與連接服務，21117是hbbr用作中繼服務, 21118和21119是為了支持網頁客戶端。如果您不需要網頁控制端+API（21114）或者網頁客戶端（21118，21119）支持，對應端口可以不開。

- TCP(21114, 21115, 21116, 21117, 21118, 21119)
- UDP(21116)

如果你想選擇**自己的端口**，使用 “-h” 選項查看幫助。

#### Docker示範
```
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -it --rm rustdesk/rustdesk-server hbbs -r <relay-server-ip> -m <registered_email>
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -it --rm rustdesk/rustdesk-server hbbr -m <registered_email>
```

### 步驟3: 在客戶端設置 hbbs/hbbr 地址

點擊 ID 右側的菜單按鈕如下，選擇“ ID/中繼服務器”。

![](/docs/en/self-host/install/images/server-set-menu-zh.png)

在 ID 服務器輸入框中（被控端+主控端）輸入 hbbs 主機或 ip 地址，另外兩個地址可以不填，RustDesk會自動推導（如果沒有特別設定），中繼服務器指的是hbbr（21116）端口，API服務器指的是上面的網頁控制台+API（21114）。

{{% notice note %}}
圖中的Key不是指的註冊郵箱，[下節](#key)將會具體解釋。
{{% /notice %}}

例如:

```
hbbs.yourhost.com
```

或者

```
hbbs.yourhost.com:21116
```
![](/docs/en/self-host/install/images/server-set-window-zh.png)

### Key
同上個版本不同，本版本中的Key是強制的，hbbs在第一次運行時，會自動產生一對加密私鑰和公鑰（分別位於運行目錄下的`id_ed25519`和`id_ed25519.pub`文件中），其主要用途是為了通訊加密，如果您在上一步驟中沒有填寫Key(公鑰文件`id_ed25519.pub`中的內容)，

```
cat ./id_ed25519.pub
```

不影響連接，但是連接無法加密。如果您禁止沒有Key的用戶建立非加密連接，請在運行hbbs和hbbr的時候添加`-k _ `參數，例如:
```
./hbbs -r <hbbr運行所在主機的地址> -k _
./hbbr -k _
```

{{% notice note %}}
在控制台首頁也可以看到Key
{{% /notice %}}
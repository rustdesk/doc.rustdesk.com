---
title: 安装
weight: 10
---

## 如何自建中继
-----------

### 步骤1: 下载服务器端软件程序

[下载](https://gitee.com/rustdesk/rustdesk-server/)或者使用docker [rustdesk/rustdesk-server](https://hub.docker.com/r/rustdesk/rustdesk-server/tags)。

<!-- **注意**： 你需要[购买许可](https://rustdesk.com/server/)才能正常运行本程序 -->

提供版本：
  - Linux
  - Windows

以下针对Linux版本做使用说明。

有两个可执行文件和一个文件夹:
  - hbbs - RustDesk ID注册服务器
  - hbbr - RustDesk 中继服务器
  - static - 该文件夹中包含网页控制台所有文件

Linux版本在Centos7构建，在 Centos7/8，Ubuntu 18/20上测试过，Debian系列的发行版本应该都没有问题。如果有其他发行版本需求，请联系我。

#### 服务器要求
硬件要求很低，最低配置的云服务器就可以了，CPU和内存要求都是最小的。关于网络大小，如果TCP打洞直连失败，就要耗费中继流量，一个中继连接的流量在30k-3M每秒之间（1920x1080屏幕），取决于清晰度设置和画面变化。如果只是办公需求，平均在100K/s。

### 步骤2: 在服务器上运行 hbbs 和 hbbr

在服务器上运行 hbbs/hbbr (Centos 或 Ubuntu)。建议使用[pm2](https://pm2.keymetrics.io/) 管理服务。

```
./hbbs -r <hbbr运行所在主机的地址> -m <registered_email>
./hbbr -m <registered_email>
```

{{% notice note %}}
**请为 <registered_email> 输入 `demo` 进行试用。**
{{% /notice %}}

{{% notice note %}}
hhbs的-r参数不是必须的，他只是方便你不用在客户端指定中继服务器。客户端指定的中继服务器优先级高于这个。
{{% /notice %}}

默认情况下，hbbs 监听21114(tcp), 21115(tcp), 21116(tcp/udp), 21118(tcp)，hbbr 监听21117(tcp), 21119(tcp)。务必在防火墙开启这几个端口， **请注意21116同时要开启TCP和UDP**。其中21114是网页控制台+API，21115是hbbs用作NAT类型测试，21116/UDP是hbbs用作ID注册与心跳服务，21116/TCP是hbbs用作TCP打洞与连接服务，21117是hbbr用作中继服务, 21118和21119是为了支持网页客户端。如果您不需要网页控制台+API（21114）或者网页客户端（21118，21119）支持，对应端口可以不开。

- TCP(21114, 21115, 21116, 21117, 21118, 21119)
- UDP(21116)

如果你想选择**自己的端口**，使用 “-h” 选项查看帮助。

#### Docker示范
##### Linux/amd64
```
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -it --net=host --rm rustdesk/rustdesk-server hbbs -r <relay-server-ip> -m <registered_email>
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -it --net=host --rm rustdesk/rustdesk-server hbbr -m <registered_email>
```

##### Linux/arm64v8
```
sudo docker image pull rustdesk/rustdesk-server:latest-arm64v8
sudo docker run --name hbbs -p 21114:21114 -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -it --net=host --rm rustdesk/rustdesk-server:latest-arm64v8 hbbs -r <relay-server-ip> -m <registered_email>
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -it --net=host --rm rustdesk/rustdesk-server:latest-arm64v8 hbbr -m <registered_email>
```

{{% notice note %}}
据我所知，--net=host 仅适用于 Linux，它让 hbbs/hbbr 可以看到对方真实的ip, 而不是固定的容器ip (172.17.0.1)

**请去掉 --net=host，如果您在非Linux系统上遇到无法连接的问题**
{{% /notice %}}

### 步骤3: 在客户端设置 hbbs/hbbr 地址

{{% notice note %}}
对于Windows客户端，可以选用[Windows Exe](/docs/zh-cn/self-host/console/#windows-exe)方案，免填自定义服务器配置。
{{% /notice %}}

点击 ID 右侧的菜单按钮如下，选择“ ID/中继服务器”。

![](/docs/en/self-host/install/images/server-set-menu-zh.png)

在 ID 服务器输入框中（被控端+主控端）输入 hbbs 主机或 ip 地址，另外两个地址可以不填，RustDesk会自动推导（如果没有特别设定），中继服务器指的是hbbr（21116）端口，API服务器指的是上面的网页控制台+API（21114）。

{{% notice note %}}
图中的Key不是指的注册邮箱，[下节](#key)将会具体解释。
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

## Key
-----------
同上个版本不同，本版本中的Key是强制的，hbbs在第一次运行时，会自动产生一对加密私钥和公钥（分别位于运行目录下的`id_ed25519`和`id_ed25519.pub`文件中），其主要用途是为了通讯加密，如果您在上一步骤中没有填写Key(公钥文件`id_ed25519.pub`中的内容)，

```
cat ./id_ed25519.pub
```

不影响连接，但是连接无法加密。如果您禁止没有Key的用户建立非加密连接，请在运行hbbs和hbbr的时候添加`-k _ `参数，例如:
```
./hbbs -r <hbbr运行所在主机的地址> -k _
./hbbr -k _
```

{{% notice note %}}
在[控制台](/docs/zh-cn/self-host/console/)欢迎页面（点击Windows EXE）也可以看到Key。
{{% /notice %}}



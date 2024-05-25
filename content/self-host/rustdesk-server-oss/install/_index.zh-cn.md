---
title: 安装
weight: 10
---

## 如何自建中继
-----------

### 步骤1: 下载服务器端软件程序

[下载](https://github.com/rustdesk/rustdesk-server/releases)或者使用docker [rustdesk/rustdesk-server](https://hub.docker.com/r/rustdesk/rustdesk-server/tags)。

提供版本：
  - Linux
  - Windows

以下针对Linux版本做使用说明。

有两个可执行文件和一个文件夹:
  - hbbs - RustDesk ID注册服务器
  - hbbr - RustDesk 中继服务器

Linux版本在Centos7构建，在 Centos7/8，Ubuntu 18/20上测试过，Debian系列的发行版本应该都没有问题。如果有其他发行版本需求，请联系我。

#### 服务器要求
硬件要求很低，最低配置的云服务器就可以了，CPU和内存要求都是最小的。关于网络大小，如果TCP打洞直连失败，就要耗费中继流量，一个中继连接的流量在30k-3M每秒之间（1920x1080屏幕），取决于清晰度设置和画面变化。如果只是办公需求，平均在100K/s。

### 步骤2: 在服务器上运行 hbbs 和 hbbr

在服务器上运行 hbbs/hbbr (Centos 或 Ubuntu)。建议使用[pm2](https://pm2.keymetrics.io/) 管理服务。

```
./hbbs -r <hbbr运行所在主机的地址[:port]> 
./hbbr
```

或者使用 pm2 运行 hbbs/hbbr

```
pm2 start hbbs -- -r <relay-server-ip[:port]> 
pm2 start hbbr 
```

<a name="demo"></a>
{{% notice note %}}

`pm2` 需要 nodejs v16+，如果你运行 pm2 失败（例如在 `pm2 list` 中看不到 hbbs/hbbr），请从 https://nodejs.org 下载并安装 LTS 版本的 nodejs。 如果你想让 hbbs/hbbr 在重启后自动运行，请查看 `pm2 save` 和 `pm2 startup`。 更多关于 [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/)。另一个不错的日志工具是 [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate)。

hhbs的`-r`参数不是必须的，他只是方便你不用在客户端指定中继服务器，如果是默认21117端口，可以不填port。客户端指定的中继服务器优先级高于这个。
{{% /notice %}}

默认情况下，hbbs 监听21115(tcp), 21116(tcp/udp), 21118(tcp)，hbbr 监听21117(tcp), 21119(tcp)。务必在防火墙开启这几个端口， **请注意21116同时要开启TCP和UDP**。其中21115是hbbs用作NAT类型测试，21116/UDP是hbbs用作ID注册与心跳服务，21116/TCP是hbbs用作TCP打洞与连接服务，21117是hbbr用作中继服务, 21118和21119是为了支持网页客户端。如果您不需要网页客户端（21118，21119）支持，对应端口可以不开。

- TCP(**21115, 21116, 21117, 21118, 21119**)
- UDP(**21116**)

如果你想选择**自己的端口**，使用 “-h” 选项查看帮助。

#### Docker示范

{{% notice note %}}
如果你运行 docker 版本时候，要求注册码，说明你下载的是老版本，国内的 docker 镜像缓存没有更新
{{% /notice %}}

```
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbs -r <relay-server-ip[:port]>
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbr
```

##### Docker Compose

```yaml

networks:
  rustdesk-net:
    external: false

services:
  hbbs:
    container_name: hbbs
    ports:
      - 21115:21115
      - <hbbs_port>:21116 # 自定义 hbbs 映射端口
      - <hbbs_port>:21116/udp # 自定义 hbbs 映射端口
    image: rustdesk/rustdesk-server
    command: hbbs -r <your_domain>:<hbbr_port> # 填入个人域名或 IP + hbbr 暴露端口
    volumes:
      - <mount_path>:/root # 自定义挂载目录
    networks:
      - rustdesk-net
    depends_on:
      - hbbr
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 64M

  hbbr:
    container_name: hbbr
    ports:
      - <hbbr_port>:21117 # 自定义 hbbr 映射端口
    image: rustdesk/rustdesk-server
    command: hbbr
    volumes:
      - <mount_path>:/root # 自定义挂载目录
    networks:
      - rustdesk-net
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 64M
```

<a name="net-host"></a>

{{% notice note %}}
据我所知，--net=host 仅适用于 Linux，它让 hbbs/hbbr 可以看到对方真实的ip, 而不是固定的容器ip (172.17.0.1)。
如果--net=host运行正常，-p选项就不起作用了, 可以去掉。

**请去掉 --net=host，如果您在非Linux系统上遇到无法连接的问题**
{{% /notice %}}

### 步骤3: 在客户端设置 hbbs/hbbr 地址

点击 ID 右侧的菜单按钮如下，选择“ ID/中继服务器”。

![](/docs/en/self-host/rustdesk-server-oss/install/images/server-set-menu-zh.png)

在 ID 服务器输入框中（被控端+主控端）输入 hbbs 主机或 ip 地址，另外两个地址可以不填，RustDesk会自动推导（如果没有特别设定），中继服务器指的是hbbr（21117）端口。

例如:

```
hbbs.example.com
```

或者

```
hbbs.example.com:21116
```
![](/docs/en/self-host/rustdesk-server-oss/install/images/server-set-window-zh.png)

#### 把配置放在可执行文件名里 (Windows only)

把`rustdesk.exe` 修改为 rustdesk-`host=<host-ip-or-name>,key=<public-key-string>`.exe, 例如： rustdesk-`host=192.168.1.137,key=xfdsfsd32=32`.exe，你可以在About窗口看到配置结果，如下图所示。

{{% notice note %}}
`host` 和 `key` 都需要添加，缺少一个就不好使。

If there are invalid characters in the key which can not be used in file name, please remove id_ed25519 file and restart your hbbs/hbbr, the id_ed25519.pub file will be regenerated, please repeat until you get valid characters.
{{% /notice %}}

| Menu | About Page |
| -- | -- |
![](/docs/en/self-host/rustdesk-server-oss/install/images/aboutmenu.png) | ![](/docs/en/self-host/rustdesk-server-oss/install/images/lic.png) |

## Key
-----------
同上个版本不同，本版本中的key是强制的，但是不用你自己设置。hbbs在第一次运行时，会自动产生一对加密私钥和公钥（分别位于运行目录下的`id_ed25519`和`id_ed25519.pub`文件中），其主要用途是为了通讯加密。

如果您在上一步骤中没有填写`Key:`(公钥文件`id_ed25519.pub`中的内容)，不影响连接，但是连接无法加密。

```
cat ./id_ed25519.pub
```

如果您禁止没有key的用户建立非加密连接，请在运行hbbs和hbbr的时候添加`-k _ `参数，例如:
```
./hbbs -r <relay-server-ip[:port]> -k _
./hbbr -k _
```

如果要更改key，请删除 `id_ed25519` 和 `id_ed25519.pub` 文件并重新启动 hbbs/hbbr，hbbs将会产生新的密钥对。



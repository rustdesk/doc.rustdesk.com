---
title: 安装
weight: 1
---

## 视频教程
YouTube上有许多视频教程，https://github.com/rustdesk/rustdesk/wiki/FAQ#video-tutorials。

## 服务器要求
硬件要求非常低；基本云服务器的最低配置就足够了，CPU和内存要求极低。您也可以使用树莓派或类似设备。关于网络规模，如果TCP打洞直连失败，将消耗中继流量。中继连接的流量根据分辨率设置和屏幕更新在30 K/s到3 M/s（1920x1080屏幕）之间。如果仅用于办公需求，流量约为100 K/s。

## 防火墙
如果您安装了UFW，请使用以下命令配置防火墙：
```
ufw allow 21114:21119/tcp
ufw allow 21116/udp
sudo ufw enable
```

## 安装
### 方法1：Docker（推荐）

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/oss.yml -O compose.yml
sudo docker compose up -d
```

更多详情，请查看 [Docker](/docs/en/self-host/rustdesk-server-oss/docker/)。

### 方法2：使用简单的安装脚本将您自己的服务器安装为systemd服务
脚本托管在 [Techahold](https://github.com/techahold/rustdeskinstall)，并在我们的 [Discord](https://discord.com/invite/nDceKgxnkV) 上提供支持。

目前，该脚本将下载并设置中继和信号服务器（hbbr和hbbs），生成配置并将其托管在受密码保护的网页上，以便简单部署到客户端。

运行以下命令：
```
wget https://raw.githubusercontent.com/techahold/rustdeskinstall/master/install.sh
chmod +x install.sh
./install.sh
```

[Techahold](https://github.com/techahold/rustdeskinstall) 的仓库中还有一个更新脚本。

从那里，记下安装结束时显示的IP/DNS和密钥，并将它们分别插入客户端设置 > 网络 > ID/中继服务器的`ID服务器`和`密钥`字段中，其他字段留空（见下面的注释）。

### 方法3：使用deb文件为debian发行版安装您自己的服务器作为systemd服务

请自行[下载](https://github.com/rustdesk/rustdesk-server/releases/latest) deb文件，并使用`apt-get -f install <filename>.deb`或`dpkg -i <filename>.deb`进行安装。

## 配置客户端
请查看[这里](/docs/en/self-host/client-configuration/#2-manual-config)。

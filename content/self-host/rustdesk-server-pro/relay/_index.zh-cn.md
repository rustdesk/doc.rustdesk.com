---
title: 配置中继服务器
weight: 17
---

## RustDesk Pro - 使用docker安装具有地理位置的附加中继服务器

{{% notice note %}}
[简单安装](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/)会在同一台机器上隐式创建一个中继服务器（`hbbr`进程），您无需显式指定中继服务器。

如果您想在另一台机器上显式创建附加中继服务器，请按照[OSS安装](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/)运行`hbbr`。您可以在`rustdesk-server-linux-amd64.tar.gz`、`rustdesk-server-hbbr_<version>-<arch>.deb`、`rustdesk-server-windows-x86_64.tar.gz`或`docker`（`sudo docker run ... rustdesk/rustdesk-server-pro hbbr`）中找到`hbbr`。

`hbbr`不需要许可证，与开源版本相同。
{{% /notice %}}

您可以在全球运行多个中继服务器，并利用地理位置自动使用最近的中继服务器，从而在连接远程计算机时获得更快的体验。`hbbs`每隔几秒钟自动检查这些中继服务器是否在线，它只选择在线的中继服务器。

{{% notice note %}}
已知问题：https://github.com/rustdesk/rustdesk/discussions/7934
{{% /notice %}}

> 您需要私钥对`id_ed25519`和`id_ed25519.pub`。

# 安装步骤

1. 如果已安装docker，通过SSH连接到您的服务器并为hbbr创建卷：
```
# docker volume create hbbr
```

卷hbbr应该位于`/var/lib/docker/volumes/hbbr/_data`。

2. 将私钥对复制到卷位置，在本例中我们将使用SCP复制文件。

命令语法为`scp <路径/文件名> 用户名@服务器:</目标/路径>`。
```
# scp id_ed25519 root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
# scp id_ed25519.pub root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
```

3. 使用先前创建的卷部署hbbr容器。该卷包含运行私有中继服务器所需的私钥对。
```
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server hbbr -k _
```

4. 检查运行日志以验证hbbr正在使用您的密钥对运行：
```
# docker logs hbbr

INFO [src/common.rs:121] **Private key comes from id_ed25519**
NFO [src/relay_server.rs:581] Key: XXXXXXXXXXXXXXXXXXXXX
INFO [src/relay_server.rs:60] #blacklist(blacklist.txt): 0
INFO [src/relay_server.rs:75] #blocklist(blocklist.txt): 0
INFO [src/relay_server.rs:81] Listening on tcp :21117
```

根据您的操作系统，您可能希望使用防火墙阻止/允许IP。

在我们的例子中，运行Ubuntu时，我们希望允许任何TCP连接到端口21117和21119。

# 防火墙配置
```
# sudo ufw allow proto tcp from any to any port 21117,21119
```

**启用防火墙**
```
# sudo ufw enable
```

**检查状态**
```
# ufw status

Status: active

To                         Action      From
--                         ------      ----
21117,21119/tcp            ALLOW       Anywhere
21117,21119/tcp (v6)       ALLOW       Anywhere (v6)
```

## 使用Web控制台为地理位置配置RustDesk Pro

### 注册并下载GeoLite2 City数据库文件

要使用地理位置，hbbs需要访问MaxMind GeoLite2 City数据库。该数据库是免费的，您可以注册下载文件并获取API密钥。

1. 在[网站](https://www.maxmind.com/en/account/login)创建账户
首先通过访问[网站](https://www.maxmind.com/en/account/login)创建账户（如果您还没有）。
转到`Download Databases`并下载GeoLite2 City，选择gzip文件，解压缩后应该有`mmdb`文件。

<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/e14318fb-ec52-463c-af77-d08c9479c1b5">

如果您使用安装脚本在Linux机器上安装了RustDesk Pro，`mmdb`文件需要移动到`/var/lib/rustdesk-server/`。

对于Docker安装，文件应该在部署容器时映射到`/root`的卷中。

### 获取API密钥以自动化流程 - Linux服务器

您需要定期更新此文件，我们可以使用cronjob来执行。您需要一个API密钥来访问下载链接，这是免费的。

转到`Manage License Keys`并生成新的许可证密钥。<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/632aeb33-4f5d-4a31-9010-38e01c22d3c9">
<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/3e178174-5fbf-46b7-a335-01f77125dfad">

您可以通过几种方式自动化[下载过程](https://dev.maxmind.com/geoip/updating-databases)，但您可以将以下命令添加到您的crontab中，将{您的访问密钥}替换为您从上一步获得的API密钥。
```
/usr/bin/curl -L --silent 'https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={您的访问密钥}&suffix=tar.gz' | /bin/tar -C '/var/lib/rustdesk-server/' -xvz --keep-newer-files --strip-components=1 --wildcards '*GeoLite2-City.mmdb'
```

### 在RustDesk Pro Web控制台中更改设置

将您的中继服务器IP地址或DNS名称（从版本1.1.11开始支持DNS）添加到`Relay Servers`。**不需要端口，显式使用`21117`端口。**<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/c4452ba4-5e1d-437a-ae1d-fc0070bfa26c">

通过添加服务器IP地址和服务器所在位置的坐标来添加地理覆盖。<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/41c558e3-423b-4296-90d3-cb0769f4a369">

点击`Reload Geo`，您的列表应该类似于此。<br>
<img width="500" alt="image" src="https://github.com/rustdesk/doc.rustdesk.com/assets/642149/5a0d39a9-4fec-46b4-a7a2-7ed38b6baeb7">

要确认结果，在点击`Reload Geo`时检查您的hbbs日志，您应该看到显示中继服务器IP地址及其坐标的消息。

> 如果您在Linux机器上运行RustDesk Pro，请使用命令`RUST_LOG=debug ./hbbs`查看日志。如果您在Docker容器上运行，请使用`docker logs hbbs`。

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

您还可以直接在hbbr实例上确认中继请求，只需检查容器日志即可。

```
# docker logs hbbr

INFO [src/relay_server.rs:436] Relayrequest 0593e64e-4fe8-4a59-a94f-b3420ab043eb from [::ffff:100.100.123.233]:52038 got paired
INFO [src/relay_server.rs:442] Both are raw
```
---
title: 配置中继服务器
weight: 17
---

### RustDesk Pro - 使用docker安装具有地理位置的附加中继服务器

{{% notice note %}}
[简单安装](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/)会在同一台机器上隐式创建一个中继服务器（`hbbr`进程），您无需显式指定中继服务器。

如果您想在另一台机器上显式创建附加中继服务器，请按照[OSS安装](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/)运行`hbbr`。您可以在`rustdesk-server-linux-amd64.tar.gz`、`rustdesk-server-hbbr_<版本>-<架构>.deb`、`rustdesk-server-windows-x86_64.tar.gz`或`docker`（`sudo docker run ... rustdesk/rustdesk-server-pro hbbr`）中找到`hbbr`。

`hbbr`不需要许可证，与开源版本相同。
{{% /notice %}}

您可以在全球运行多个中继服务器，并利用地理位置自动使用最近的中继服务器，从而在连接远程计算机时获得更快的体验。`hbbs`每隔几秒钟自动检查这些中继服务器是否在线，它只选择在线的中继服务器。

{{% notice note %}}
已知问题：https://github.com/rustdesk/rustdesk/discussions/7934
{{% /notice %}}

> 您需要私钥对`id_ed25519`和`id_ed25519.pub`。

## 安装步骤

1. 如果已安装docker，通过SSH连接到您的服务器并为hbbr创建卷：
```
# docker volume create hbbr
```

2. 将私钥对复制到卷位置：
```
# scp id_ed25519 root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
# scp id_ed25519.pub root@100.100.100.100:/var/lib/docker/volumes/hbbr/_data
```

3. 使用先前创建的卷部署hbbr容器：
```
# sudo docker run --name hbbr -v hbbr:/root -td --net=host rustdesk/rustdesk-server hbbr -k _
```

4. 检查运行日志以验证hbbr正在使用您的密钥对运行：
```
# docker logs hbbr
```

## 防火墙配置
```
# sudo ufw allow proto tcp from any to any port 21117,21119
# sudo ufw enable
```

### 使用Web控制台为地理位置配置RustDesk Pro

#### 注册并下载GeoLite2 City数据库文件

要使用地理位置，hbbs需要访问MaxMind GeoLite2 City数据库。该数据库是免费的，您可以注册下载文件并获取API密钥。

1. 在[网站](https://www.maxmind.com/en/account/login)创建账户
2. 转到`Download Databases`并下载GeoLite2 City
3. 选择gzip文件，解压缩后应该有`mmdb`文件

对于Linux安装，`mmdb`文件需要移动到`/var/lib/rustdesk-server/`。
对于Docker安装，文件应该在您映射到`/root`的卷中。

#### 获取API密钥以自动化流程

您需要定期更新此文件，可以使用cronjob来执行。您需要一个API密钥来访问下载链接，这是免费的。

转到`Manage License Keys`并生成新的许可证密钥。

自动化下载命令：
```
/usr/bin/curl -L --silent 'https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key={Your Access Key}&suffix=tar.gz' | /bin/tar -C '/var/lib/rustdesk-server/' -xvz --keep-newer-files --strip-components=1 --wildcards '*GeoLite2-City.mmdb'
```

#### 在RustDesk Pro Web控制台中更改设置

1. 将中继服务器IP地址或DNS名称添加到`Relay Servers`（不需要端口，显式使用`21117`端口）
2. 添加地理覆盖，通过添加服务器IP地址和服务器所在位置的坐标
3. 点击`Reload Geo`

要确认结果，在点击`Reload Geo`时检查您的hbbs日志，您应该看到显示中继服务器IP地址及其坐标的消息。
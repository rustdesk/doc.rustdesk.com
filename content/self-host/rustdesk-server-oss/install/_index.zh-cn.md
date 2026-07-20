---
title: 安装
weight: 1
description: "RustDesk 的安装文档，提供安装、配置、部署和故障排查指南。"
keywords: ["rustdesk server install", "install rustdesk server oss", "rustdesk docker install", "rustdesk server firewall ports", "rustdesk hbbs hbbr install", "rustdesk self-host install"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## 快速回答

对于大多数新的 RustDesk Server OSS 部署，Docker 是最快的路径。只有在您明确需要系统服务或手动维护主机配置时，才建议选择原生 Linux 安装。

## 关键要点

- 客户端需要填写 `ID Server`
- 客户端需要服务器的公钥 `Key`
- 只有使用 Pro 功能时才需要 `API Server`

<!-- GEO-LOCALIZED-INTRO:END -->

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

{{% notice warning %}}
启用 WebSocket（为[网页客户端](https://rustdesk.com/web/)开放端口 `21118`/`21119`）后，`hbbs`/`hbbr` 会信任 WebSocket 连接中的 `X-Real-IP` / `X-Forwarded-For` 请求头来确定客户端的真实 IP，以便在 WebSocket 流量经过反向代理（[WSS](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms)）时保留客户端真实 IP。这些请求头不会被校验，因此任何能直接访问 `21118`/`21119` 的人都可以通过伪造请求头来伪装任意 IP 地址，从而绕过基于 IP 的限速和封禁，并伪造日志中记录的 IP 地址。

如果您使用网页客户端，请只通过反向代理（由代理自行设置 `X-Real-IP`）暴露 WebSocket 端口，并通过防火墙规则限制 `21118`/`21119` 只接受来自反向代理的连接。如果您不使用网页客户端，请保持端口 `21118`、`21119` 关闭。
{{% /notice %}}

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

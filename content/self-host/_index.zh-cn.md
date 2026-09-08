---
title: 自托管
description: "学习如何自托管您自己的 RustDesk 服务器。完整指南涵盖 RustDesk 服务器基础设施的安装、配置和部署，实现安全的远程桌面访问。"
keywords: ["rustdesk 自托管", "rustdesk 服务器", "远程桌面服务器", "自托管指南", "rustdesk 安装", "hbbs hbbr", "rustdesk 专业版服务器"]
weight: 5
pre: "<b>2. </b>"
---

如果您使用 RustDesk，您应该拥有自己的 RustDesk 服务器，这些文档将帮助您的 RustDesk 之旅。

开源版支持可通过我们的 [Discord](https://discord.com/invite/nDceKgxnkV) 获取，专业版支持可通过[邮件](mailto:support@rustdesk.com)获取。

## 自托管服务器如何工作？

技术上有两个可执行文件（服务器）：

- `hbbs` - RustDesk ID（会合/信令）服务器，监听 TCP（`21114` - 仅专业版的 http，`21115`、`21116`、`21118` 用于 web socket）和 UDP（`21116`）
- `hbbr` - RustDesk 中继服务器，监听 TCP（`21117`、`21119` 用于 web socket）

当您通过安装脚本/docker compose/deb 安装时，两个服务都会被安装。

这里有 RustDesk 客户端如何与 `hbbr`/`hbbs` 通信的[说明](https://github.com/rustdesk/rustdesk/wiki/How-does-RustDesk-work%3F)。

只要 RustDesk 在机器上运行，机器就会不断 ping ID 服务器（`hbbs`）以告知其当前 IP 地址和端口。

当您从计算机 A 启动到计算机 B 的连接时，计算机 A 联系 ID 服务器并请求与计算机 B 通信。

然后 ID 服务器尝试使用打洞技术将 A 和 B 直接连接。

如果打洞失败，A 将通过中继服务器（`hbbr`）与 B 通信。

在大多数情况下，打洞是成功的，从不使用中继服务器。

这里有一个关于[您是否应该自托管 rustdesk 服务器？](https://www.reddit.com/r/rustdesk/comments/1cr8kfv/should_you_selfhost_a_rustdesk_server/)的讨论

## 所需端口

RustDesk 服务器自托管所需的端口很大程度上取决于您的环境以及您想用 RustDesk 做什么。整个文档中显示的示例通常会建议打开所有端口。

核心端口：\
TCP `21114-21119` \
UDP `21116`

- TCP `21114`：用于 RustDesk Server Pro 中的 HTTP API 服务器。
- TCP `21115`：用于 NAT 类型测试。
- UDP `21116`：用于设备注册。
- TCP `21116`：用于设备注册和 NAT 打洞。
- TCP `21117`：用于中继通信。
- TCP `21118`：用于 WebSocket 通信。
- TCP `21119`：用于 WebSocket 通信。

`21115`-`21117` 是 RustDesk 工作所需的最小端口。这些端口处理信令、中继和 NAT 穿透。

对于 WSS 配置，TCP `21118` 和 TCP `21119` 通常不需要对外暴露，因为它们通常由 Nginx 等反向代理在内部访问。如果您不使用 WebSocket，也不需要暴露这些端口。请参考这个[示例 Nginx 配置](/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms)。

对于没有 SSL 代理的专业版用户，您需要打开 TCP 端口 `21114` 以使 API 工作。如果服务器已配置 HTTPS (`443`)，TCP `21114` 不需要暴露到 Internet。

RustDesk 还支持仅暴露 TCP `443` 并关闭所有其他端口的部署模式。使用此配置时，通信只能通过 WSS 中继进行，无法使用直接点对点连接。

{{% children depth="4" showhidden="true" %}}

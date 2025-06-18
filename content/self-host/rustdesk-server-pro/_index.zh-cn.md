---
title: 自建服务器专业版
weight: 200
pre: "<b>2.2. </b>"
---

自建服务器专业版相较于开源版本拥有更多功能。

- 账户
- [Web 控制台](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/)
- [API](https://github.com/rustdesk/rustdesk/wiki/FAQ#api-of-rustdesk-server-pro)
- [OIDC](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/oidc/)、[LDAP](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/ldap/)、[2FA](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/2fa/)
- 通讯录
- 日志管理（连接、文件传输、告警等）
- 设备管理
- [安全设置同步](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/strategy/)
- [访问控制](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/)
- [多中继服务器](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/)（自动选择离您最近的中继）
- [自定义客户端生成器](https://rustdesk.com/docs/en/self-host/client-configuration/#1-custom-client-generator-pro-only)
- WebSocket
- Web 客户端自托管

{{% notice note %}}
如果您在家中或办公室搭建自己的服务器，但无法通过公共 IP/域名进行连接，请查看[这篇文章](https://rustdesk.com/docs/en/self-host/nat-loopback-issues/)。
{{% /notice %}}

{{% notice note %}}
在继续之前，我们建议您先阅读[自托管服务器如何工作？](/docs/en/self-host/#how-does-self-hosted-server-work)。
{{% /notice %}}

## 硬件要求

最低配置的 VPS 就足以满足您的使用需求。服务器软件对 CPU 和内存的要求不高。我们的公共 ID 服务器部署在一台 2 CPU/4 GB 的 Vultr 服务器上，服务超过 100 万终端。每个中继连接平均消耗 180kb/s。1 个 CPU 核心和 1GB 内存足以支持 1000 个中继并发连接。

## 文章教程
[分步指南：通过 Docker 在云端自托管 RustDesk Server Pro，实现安全远程访问](https://www.linkedin.com/pulse/step-by-step-guide-self-host-rustdesk-server-pro-cloud-montinaro-fwnmf/)

## 视频教程

[新手指南：为 Linux 新手用户自托管 RustDesk Server Pro](https://www.youtube.com/watch?v=MclmfYR3frk)

[快速指南：为高级 Linux 用户自托管 RustDesk Server Pro](https://youtu.be/gMKFEziajmo)

## 许可证

您可以从 https://rustdesk.com/pricing.html 获取许可证，详情请参阅[许可证](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/)页面。

## 快速开始
### 1、安装

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
sudo docker compose up -d
```

更多详情请查看 [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/)。

### 2、所需端口

您需要开放 TCP 端口 `21114`-`21119` 和 UDP 端口 `21116`，请确保在配置防火墙规则和 Docker 端口映射时已开放这些端口。

有关这些端口的更多信息，请查看[这里](/docs/en/self-host/rustdesk-server-oss/install/#ports)。

### 3、设置许可证

通过访问 `http://<服务器 IP>:21114` 打开您的 Web 控制台，使用默认凭据 `admin`/`test1234` [登录](/docs/en/self-host/rustdesk-server-pro/console/#log-in)。按照[此指南](/docs/en/self-host/rustdesk-server-pro/license/#set-license)设置许可证。

### 4、为 Web 控制台设置 HTTPS

> 如果在试用期间您不希望使用 HTTPS，可以跳过此步骤，但设置 HTTPS 后请记得更改客户端的 API 地址

这里有一个[手动设置 HTTPS](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually) 的简单教程。

### 5、配置客户端使用自托管服务器

https://rustdesk.com/docs/en/self-host/client-configuration/

### 6、设置 WebSocket

要使 Web 客户端或[桌面/移动客户端](/docs/en/self-host/client-configuration/advanced-settings/#allow-websocket)能够通过 WebSocket 正常工作，您需要在反向代理配置中添加以下设置。

https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms

## 升级服务器

本[指南](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade)介绍了如何从旧版本升级到 RustDesk Server Pro，涵盖了不同的安装方法。

## 迁移到新主机及备份/恢复

这里有一篇详细的[教程](https://github.com/rustdesk/rustdesk-server-pro/discussions/184)。

## 迁移许可证

请参考这份[指南](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-license-retrieval-and-migration)进行操作。

## 升级许可证

按照[此指南](/docs/en/self-host/rustdesk-server-pro/license/#renewupgrade-license)随时升级您的许可证，以支持更多用户和设备。

## 关于安全

https://github.com/rustdesk/rustdesk/discussions/9835

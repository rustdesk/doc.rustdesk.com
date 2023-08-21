---
title: 专业版
weight: 100
---

相比开源版本，自建专业版提供更多功能。

- OIDC, ldap, 2FA (电子邮件验证)
- 通讯录
- 重新命名
- 记录管理
- 装置管理
- 设定同步
- 权限控制
- 多台中继服务器 (自动选择离您最近的中继服务器)

{{% notice note %}}
需要 RustDesk 客户端 1.2.0 以上版本
{{% /notice %}}

## 下载

[https://github.com/rustdesk/rustdesk-server-pro/releases/tag/1.1.8](https://github.com/rustdesk/rustdesk-server-pro/releases/tag/1.1.8)

## 安装

### 简易安装

为了使过程轻松点，我们开发的脚本能帮您搞定一切 (安装/升级/从开源版本转换) [简易安装脚本](https://rustdesk.com/docs/zh-cn/self-host/pro/installscript/)

{{% notice note %}}
别忘记从 [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) 取得授权，查阅[授权](/docs/zh-cn/self-host/pro/license)页面以了解详情。
{{% /notice %}}

### 手动安装

几乎与[开源版本](/docs/zh-cn/self-host/install/)相同，但您在执行 hbbs/hbbr 时不需加上任何参数，全部都能在网页控制台中设定。

- `-k _` 预设设定
- `-r <server:host>` 如果中继服务器跟 hbbs 在同一台服务器执行，便不需要加上此参数。且您可以在网页控制台设置多台中继服务器。

### 额外端口 (或使用 Proxy)

新增一个用于网页控制台的 tcp 端口 `21114`，请在设定防火墙规则和 Docker 端口时新增此端口。

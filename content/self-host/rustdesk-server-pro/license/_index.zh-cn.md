---
title: 授权
weight: 15
---

## 购买授权

请从 [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) 获取您的许可证，在Stripe结账页面输入有效的电子邮件地址。付款成功完成后，许可证（以及单独邮件中的发票）将发送到您的电子邮件。

![](/docs/en/self-host/rustdesk-server-pro/license/images/stripe.jpg)

## 设定授权

您将须在网页控制台（`http://<rustdesk-server-pro-ip>:21114`）输入授权码，或稍后变更授权。

| 设定授权 | 变更授权 |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/set.png) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/change.png) |

## 续期/升级许可证

续期/升级许可证可以通过[自助许可证门户](https://rustdesk.com/self-host/account/)找到，如下所述，使用您购买许可证时使用的电子邮件登录。

| 带有续期/升级操作的许可证页面 | 升级窗口 |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/renew.jpg?v2) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/upgrade.png) |

支付后，请按照[下面的方法](/docs/en/self-host/rustdesk-server-pro/license/#refresh-license)刷新许可证以激活它。

### 刷新许可证
支付后，您需要进入网页控制台手动激活，如下所示。只需点击`编辑`，然后点击`确定`，无需编辑任何内容，因为您的许可证密钥保持不变。

![](/docs/en/self-host/rustdesk-server-pro/license/images/updatelic.jpg)

## 发票、许可证检索和迁移

许可证只能在一台机器上使用（仅限hbbs，hbbr不需要许可证），如果您想要迁移到其他机器、检索您的许可证或下载发票，请访问[https://rustdesk.com/self-host/account/](https://rustdesk.com/self-host/account/)。使用在Stripe结账时使用的电子邮件地址登录，解绑您要迁移的旧机器，如下所示，当您在新服务器的网页控制台中设置许可证时，它将自动分配许可证并在控制台中注册。

![](/docs/en/self-host/rustdesk-server-pro/license/images/unbind.jpg)

## 代理
如果您的服务器无法直接访问互联网以验证许可证，您可以添加代理，例如`proxy=http://username:password@example.com:8080 ./hbbs`。

或者，您可以将`proxy=http://username:password@example.com:8080`添加到工作目录（`id_ed25519` / `db.sqlite3`文件所在的位置）下的`.env`文件中。

`http`可以替换为`https`或`socks5`。如果没有`username` / `password` / `port`，可以使用`proxy=http://example.com`。

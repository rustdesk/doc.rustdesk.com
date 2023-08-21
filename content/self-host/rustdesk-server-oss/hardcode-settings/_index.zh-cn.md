---
title: 硬编码自定义设置
weight: 49
---

## 自定义服务器

{{% notice note %}}
如果您想将自定义服务器设置硬编码到您的可执行文件中，您必须在您自己的机器上[编译](/docs/zh-cn/dev/build/)客户端或者通过 [GitHub Actions](/docs/en/dev/build/all/) 完成。
{{% /notice %}}
{{% notice note %}}
**如果您只设置了其中的一个值而没有设置另一个，您的可执行文件将无法正常工作！**
{{% /notice %}}

您可以在您的操作系统上设置以下环境变量，RustDesk 在编译客户端时将使用这些变量而不是默认的 rustdesk.com 服务器。

如果您不知道如何在系统上设置环境变量，您可以在网上找到相关的操作系统文档以了解如何进行设置。

#### RENDEZVOUS_SERVER

这个变量应该被设置为您自己的服务器 URL。

这应该是一个字符串，例如：

```text
rustdesk.my-domain.com
```

#### RS_PUB_KEY

这个变量应该是您的公钥，关于其更多信息可以参见 [Key](/docs/zh-cn/self-host/install/#key)。

这应该是一个字符串，例如：

```text
OeVuKk5nlHiXp+APNn0Y3pC1Iwpwn44JGqrQCsWqmBw=
```

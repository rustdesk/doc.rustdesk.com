---
title: 客户端配置
description: "为自托管服务器配置 RustDesk 客户端。功能包括自定义客户端生成器（专业版）用于带有您的标志的品牌应用、手动配置、导入/导出设置和企业部署策略。"
keywords: ["rustdesk 客户端配置", "自定义客户端生成器", "rustdesk 品牌客户端", "rustdesk 白标签", "rustdesk 企业部署", "rustdesk 客户端设置", "自定义rustdesk应用", "rustdesk 专业版客户端", "rustdesk 配置管理", "rustdesk 企业品牌"]
weight: 300
pre: "<b>2.3. </b>"
---

## 概述

有多种方式可以配置 RustDesk 客户端使用您自己的自托管服务器，我们将在下面介绍一些方法。

## 1. 自定义客户端生成器（仅限 Pro 版本，基础计划或自定义计划）

您可以拥有自己的名称、徽标、图标、配置、签名等。

目前支持 Windows X64、Mac Arm64 / X64、[Linux](https://twitter.com/rustdesk/status/1788905463678951787)、Android Arm 64。

[视频](https://twitter.com/rustdesk/status/1769171628426944539)

![](/docs/en/self-host/client-configuration/images/custom-client-qs.png)
![](/docs/en/self-host/client-configuration/images/web_console_custom_client_config.jpeg)

## 2. 手动配置

在 RustDesk 客户端主界面，点击 ID 旁边的菜单按钮 [ &#8942; ]，然后点击网络，您现在可以使用提升的权限解锁设置并设置您的 `ID`、`中继`、`API` 和 `密钥`。需要注意的是，这个 `密钥` 是用于连接加密的公钥，与您购买 Pro 版本时提供的许可证密钥不同。

![](/docs/en/self-host/client-configuration/images/network-config.png)

在 **ID 服务器** 输入框中输入 `hbbs` 主机或 IP 地址（本地端 + 远程端）。其他两个地址可以留空，RustDesk 会自动推导（如果未特别设置），中继服务器指的是 `hbbr`（端口 21117）。

例如：

```nolang
hbbs.example.com
```

或

```nolang
hbbs.example.com:21116
```

### 设置 `密钥`

为了与您的自托管服务器建立加密连接，您需要输入其公钥。密钥通常在 `hbbs` 首次运行时生成，可以在工作目录/数据文件夹中的 `id_ed25519.pub` 文件中找到。

作为 `Pro` 用户，您还可以从 [Web 控制台](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/) 获取 `密钥`。

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

### 设置 `API 服务器`

这仅适用于 `Pro` 用户。当您可以在 Web 控制台上登录，但无法在 RustDesk 客户端上登录时，可能是您没有正确设置 `API 服务器`。

如果您的 API 服务器不运行在默认的 `21114` 端口上（如果您来自开源版本，可能没有将此端口添加到防火墙），请明确指定 `API 服务器`。
例如，如果您的 API 服务器运行在默认的 HTTPS 端口上，请使用 `https://hbbs.example.com` 指定 `API 服务器`。

如果您仍然无法确认 `API 服务器` 的值，请访问 Web 控制台的欢迎页面，`API 服务器` 显示在上图中（带有 `API:` 标签的输入框）。

## 3. 使用导入或导出设置

1. 使用[上述](https://rustdesk.com/docs/en/self-host/client-configuration/#manual-config)步骤在设备上配置 RustDesk 客户端。
2. 使用上述机器转到设置，然后网络并解锁。
3. 点击 `导出服务器配置`。
4. 将复制的字符串粘贴到记事本或类似软件中。
5. 转到新客户端，将上述内容复制到剪贴板。
6. 在 RustDesk 客户端中转到设置，然后网络，解锁并点击 `导入服务器配置`。
7. 它会自动粘贴设置。
8. 点击 `应用`。

## 4. 自动配置

最简单的自动设置方法是使用[此处](https://rustdesk.com/docs/en/self-host/client-deployment/)的部署脚本。

## 5. 从 `Pro` 通过剪贴板导入配置

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

https://github.com/rustdesk/rustdesk-server-pro/discussions/372#discussioncomment-10473298

## 6. 使用命令行 `--config`
`rustdesk.exe --config <配置字符串>`

您可以从 Web 控制台获取配置字符串（您可以在上图中看到）或从 RustDesk 客户端"设置 → 网络"（[这里](https://github.com/rustdesk/rustdesk/discussions/7118)有相关讨论）。

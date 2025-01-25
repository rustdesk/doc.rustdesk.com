---
title: 客户端配置
weight: 300
pre: "<b>2.3. </b>"
---

### 概述

有多种方法可以配置 RustDesk 客户端以使用您自己的自托管服务器，我们将在下面介绍一些方法。

### 1. 自定义客户端生成器 (仅支持 Pro)

您可以拥有自己的名称、logo、图标、配置、签名等。

[Videos](https://twitter.com/rustdesk/status/1769171628426944539)

![](images/custom-client-qs.png)
![](images/web_console_custom_client_config.jpeg)


### 2. 手动配置

在 RustDesk 客户端主主页中，单击您的 ID 旁的菜单按钮 [ &#8942; ] ，然后单击网络。您现在可以使用提升的权限解锁设置，并设置您的 ID、中继、API 和 Keys。

![](/docs/en/self-host/client-configuration/images/network-config.png)

Enter the `hbbs` host or IP Address in the **ID Server** input box (local side + remote side). The other two addresses can be left blank, RustDesk will automatically deduce (if not specially set), and the Relay Server refers to `hbbr` (port 21117).

在 **ID Server** 输入框中输入 "hbbs" 主机或 IP 地址（本地端+远程端）。
另外两个地址可以留空，RustDesk会自动推导（如果没有特别设置），Relay Server 引用的是 `hbbr`（端口21117）。

如：

```nolang
hbbs.example.com
```

或者

```nolang
hbbs.example.com:21116
```

#### 设置 `Key`

作为 "Pro" 用户，您将能够从 [Web 控制台](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/) 获取 "Key"，或者 您可以在工作目录下的 "id_ed25519.pub" 文件中找到它。

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

#### 设置 `API Server`

这仅适用于 `Pro` 用户。 当您可以登录 Web 控制台，但无法登录 RustDesk 客户端时，可能是您没有正确设置 `API Server`。

如果您的 API Server 不在默认的 `21114` 端口上运行（如果您来自开源版本，则不能将此端口添加到防火墙），请明确指定 `API Server`。
例如 您的 API 服务器在默认 https 端口上运行，请使用 `https://hbbs.example.com` 指定 `API Server`。

如果您仍然无法确认 `API Server` 的值，请进入 Web控制台 的欢迎页面，`API Server` 如上图所示（带有 `API：` 标签的输入框）。

### 3. 通过导入导出进行设置

1. 使用[上述步骤](https://rustdesk.com/docs/en/self-host/client-configuration/#manual-config) 在设备上配置 RustDesk 客户端。
2. 使用上述机器进入 "设置"，然后进入 "网络" 并解锁。
3. 单击 "导出服务器配置"。
4. 将复制的字符串粘贴到记事本或类似工具中。
5. 转到新客户端，将以上内容复制到剪贴板。
6. 在 RustDesk 客户端中转到 "设置"，然后转到 "网络"，解锁并单击 "导入服务器配置"。
7. 它会自动粘贴设置。
8. 单击 "应用"。

### 4. 自动配置

自动设置的最简单方法是使用[此处](https://rustdesk.com/docs/en/self-host/client-deployment/)找到的部署脚本。

您可以修复需要密码并使用格式为 `{"host":"HOSTADDRESS","key":"HOSTKEY","api":"http://HOSTADDRESS:21114"}` 的反向 Base64 字符串来自动配置客户端，这在 RustDesk Server Pro 控制台是直接可用的。

您还可以使用[上面的步骤](https://rustdesk.com/docs/en/self-host/client-configuration/#setup-using-import-or-export)导出字符串，删除任何 `=` 位于字符串的开头或结尾。 如果设置未显示，请重新启动 RustDesk 客户端。

### 5. 通过剪贴板从专业版导入配置

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

https://github.com/rustdesk/rustdesk-server-pro/discussions/372#discussioncomment-10473298

### 6. 通过命令行 `--config`

`rustdesk.exe --config <config-string>`

您可以从 Web 控制台（您可以在上图中看到它）或从 RustDesk 客户端 "设置 → 网络" 获取配置字符串（[此处](https://github.com/rustdesk/rustdesk/discussions/7118)对此进行讨论）。

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

### 5. 将配置放入 rustdesk.exe 文件名中 (仅支持 Windows)

Change `rustdesk.exe` to rustdesk-`host=<host-ip-or-name>,key=<public-key-string>`.exe, e.g. rustdesk-`host=192.168.1.137,key=xfdsfsd32=32`.exe. You can see the config result in the About Window below.

As a `Pro` user you will be able to retrieve the whole encrypted string from the [web console](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/) then download and rename the RustDesk Client exe, you can upload this somewhere easy for your customers to use.

将 `rustdesk.exe` 更改为 rustdesk-`host=<主机 IP 或名称>,key=<公钥字符串>`.exe，例如 rustdesk-`主机=192.168.1.137，密钥=xfdsfsd32=32`.exe。 您可以在下面的 "关于" 窗口中看到配置结果。

作为 `Pro` 用户，您将能够从 [Web 控制台](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/) 检索整个加密字符串，然后下载 并重命名 RustDesk Client exe，您可以将其上传到易于客户使用的地方。

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

<a name="invalidchar"></a>
{{% notice note %}}
您需要同时设置 `host` 和 `key`，缺少任何一个都将不起作用。

可以选择在键后面， `.exe` 部分前面，添加一个 `,`（逗号）字符作为分隔符，以避免 Windows 或浏览器在下载重复名称时重命名文件时键被破坏，例如 `host=<主机 IP 或名称>,key=<公钥字符串>,.exe`。

如果密钥中存在无法在 Windows 文件名中使用的无效字符，请删除从服务器上下载 `id_ed25519` 文件并重启 `hbbs`/`hbbr`。
这将重新生成 `id_ed25519.pub` 文件。
您可能需要重复此过程，直到获得有效字符。
{{% /notice %}}

#### 在名称中包含带有 `--` 的配置字符串

示例： `rustdesk--{config-string}--.exe`

{{% notice note %}}
请不要将 `-licensed-` 与 `--` 一起使用。例如 `rustdesk-licensed-{config-string}--.exe` 在版本 1.2.3 中不起作用。
我们将在 1.2.4 版本中修复它。
{{% /notice %}}

我们注意到，在某些情况下，当双重下载时，类似 `copy (1)` 的内容会添加到文件名末尾，这会破坏配置。

通过在配置字符串后面添加 `--`，即使文件名中添加了某些内容，也不会损坏配置字符串，并且 RustDesk 将正确检索它。

### 6. [Hardcoding Custom Settings](https://rustdesk.com/docs/en/self-host/client-configuration/hardcode-settings/)

### 7. Use command line `--config`

`rustdesk.exe --config <config-string>`

You can get the config string from web console (you can see it on above picture) or from RustDesk client "Settings → Network" ([here](https://github.com/rustdesk/rustdesk/discussions/7118) is a discussion about this).

您可以从 Web 控制台（您可以在上图中看到它）或从 RustDesk 客户端 "设置 → 网络" 获取配置字符串（[此处](https://github.com/rustdesk/rustdesk/discussions/7118)对此进行讨论）。

### 8. [高级设置](https://rustdesk.com/docs/zh-cn/self-host/client-configuration/advanced-settings/)

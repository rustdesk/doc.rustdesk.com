---
title: Windows 安装
weight: 5
---

{{% notice note %}}
Windows 安全策略比较复杂，如果此教程对您不适用，或者您遇到不稳定的连接，请迁移到 Linux 服务器。
{{% /notice %}}

{{% notice note %}}
GUI 版本 `RustDeskServer.setup.exe` 已不再维护，不推荐使用。
{{% /notice %}}

### 安装

## 先决条件
在 Windows 上运行 rustdesk 需要 Microsoft Visual C++ Redistributable。您可以在[这里](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)下载。

1. 从 [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html) 获取您的许可证，更多详情请查看[许可证](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/)页面。
2. 从 [GitHub](https://github.com/rustdesk/rustdesk-server-pro/releases/latest) 下载 Windows 安装程序。
3. 解压 Windows 安装程序。
4. 运行安装程序并按照屏幕上的步骤进行。或者手动安装 [PM2 或 NSSM](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/windows/)。
5. 完成后打开 RustDesk Server。
6. 按照提示进行安装。
7. 点击 `Services` 然后点击 `Start`。
8. 安装完成后访问 `http://youripaddress:21114`。
9. 使用用户名 `admin` 和密码 `test1234` 登录。
10. 输入您在第 1 步中购买的许可证代码。

### 使用 IIS 作为代理

请确保已安装 `Dynamic Content Compression`（这是一个 IIS 功能，可以通过服务器角色安装）。
1. 打开 IIS（或安装它）。
2. 为 RustDesk 创建一个新网站，设置绑定（理想情况下为 443）和相关证书。基本设置应该指向一个空白文件夹。（如果您使用默认站点，请确保文件夹中没有其他文件）。
3. 在 IIS 上，安装 [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing) 和 [URL Rewrite](https://learn.microsoft.com/en-us/iis/extensions/url-rewrite-module/using-the-url-rewrite-module)。

### Application Request Routing

1. 在 IIS 服务器主机下打开 Application Request Routing。
2. 转到 Server Proxy Settings。
3. 启用代理，所有设置都会出现，您可以保持默认值。
4. 保存设置，然后我们可以进入下一步：URL Rewrite。

### URL Rewrite

1. 在左侧面板中打开 IIS 上的站点，双击 URL Rewrite。
2. 点击 `Add rules`。
3. 设置一个新的反向代理规则。
4. 设置本地地址（RustDesk 内部 21114 地址）\
Inbound Rule – RustDesk 内部 21114 地址\
Outbound Rules – `From` 是 RustDesk 内部 21114 地址，`To` 是外部地址。\
注意：地址前不要有 http / https – 它们会被自动处理。另外，确保所有地址在内部和外部都可以访问。

### 压缩

1. 禁用 `Dynamic Content Compression`。

### 故障排除

如果您遇到 500.52 错误，请添加提到的变量：[IIS acting as reverse proxy: Where the problems start](https://techcommunity.microsoft.com/t5/iis-support-blog/iis-acting-as-reverse-proxy-where-the-problems-start/ba-p/846259)。

您可能需要将 SSL 设置更改为 “Require SSL → Ignore”。
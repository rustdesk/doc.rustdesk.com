---
title: 网页控制台
weight: 10
---

网页控制台集成在 RustDesk 服务器专业版中，由 `21114` 端口提供服务。

功能：

- 浏览设备
- 新增/修改用户和用户组
- 修改设备访问权限
- 浏览设备连接日志和其他日志
- 更新设置
- 管理客户端设置同步策略
- 管理共享通讯录
- 生成自定义客户端

## 登录

网页控制台的默认端口是 21114。在浏览器中输入 `http://<服务器 ip>:21114` 进入控制台页面，如下图所示。默认管理员用户名/密码是 `admin`/`test1234`：

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

如果您需要 HTTPS 支持，请安装如 `Nginx` 的网页服务器，或在 Windows 上使用 `IIS`。

登录后请务必更改密码，在右上角的账户菜单中选择 `设置` 进入密码修改页面，如下图所示。您也可以创建另一个管理员账户并删除这个。建议启用邮箱登录验证。

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

非管理员用户也可以登录查看他们的设备和日志，更改他们的用户设置。

## 自动配置
点击 `Windows EXE` 您将能够获得您自己的 RustDesk 服务器专业版的配置，这将帮助配置您的客户端。

对于 Windows 客户端，您可以省略自定义服务器配置，将配置信息放在 `rustdesk.exe` 文件名中。如上所示，请进入控制台欢迎页面并点击 `Windows EXE`。**需要客户端 ≥ 1.1.9。**

您可以结合[客户端配置](https://rustdesk.com/docs/zh-cn/self-host/client-configuration/)和[部署脚本](https://rustdesk.com/docs/zh-cn/self-host/client-deployment/)来设置您的客户端。

## 创建除默认 `admin` 用户之外的新用户

{{% notice note %}}
`个人版` 计划没有此功能。
{{% /notice %}}

1. 点击左侧菜单的 `用户`。
2. 创建另一个启用了 `管理员` 权限的账户。
3. 使用新的管理员账户登录。
4. 在 `用户` 页面删除 `admin`。

## 创建新用户
1. 点击左侧菜单的 `用户`。
2. 创建新用户。
3. 选择他们应该所属的组（如果需要添加新组，请继续阅读）。

## 添加新组
1. 点击左侧菜单的 `组`。
2. 创建新组。
3. 创建后，您可以允许组之间相互访问，点击 `编辑`。
4. 选择您想要访问的相关组（它会自动将它们添加到相应的组中）。

## 设置多个中继服务器
1. 进入左侧菜单的 `设置`。
2. 点击子菜单的 `中继`。
3. 点击 `中继服务器` 旁边的 `+`。
4. 在现在显示的框中输入中继服务器 DNS 地址或 IP 地址，然后按 <kbd>Enter</kbd>。
5. 如果您有多个中继服务器，可以继续点击 `+` 并根据需要调整地理位置设置（记住并将您的密钥复制到其他服务器）。

## 设置或更改许可证
1. 进入左侧菜单的 `设置`。
2. 点击子菜单的 `许可证`。
3. 点击 `编辑` 并粘贴您的许可证代码。
4. 点击 `确定`。

## 查看日志
点击左侧的 `日志`。

## 设置邮箱
以 Gmail 为例

1. 进入左侧菜单的 `设置`。
2. 点击子菜单的 `SMTP`。
3. 输入 SMTP 地址 `smtp.gmail.com`。
4. 在 `SMTP 端口` 中输入端口 587。
5. 在 `邮箱账户` 中输入 Gmail 账户，例如 `myrustdeskserver@gmail.com`。
6. 输入您的密码（您可能需要应用专用密码）。
7. 在 `发件人` 中输入您的 Gmail 账户，例如 `myrustdeskserver@gmail.com`。
8. 点击 `检查` 保存。

## 将设备用户/组/策略/设备组分配给设备
用户是登录在设备上的 RustDesk 用户，或通过点击设备旁边的 `编辑` 分配给设备的用户，点击 `用户` 框并从下拉菜单中选择您的用户，这将根据用户被分配到的组自动分配组。

这也可以通过 API 在部署时或之后在命令行中完成，调用 RustDesk 可执行文件后跟 `--assign --token <生成的令牌> --user_name <用户名>`。您需要先进入 `设置 → 令牌 → 创建` 并创建具有设备权限的令牌。在 Windows 上的示例为 `"C:\Program Files\RustDesk\rustdesk.exe" --assign --token <生成的令牌> --user_name <新用户>`。

您也可以通过这种方式分配策略，例如 `--assign --token <生成的令牌> --strategy_name <策略名称>`。

您也可以通过这种方式分配通讯录，例如 `--assign --token <生成的令牌> --address_book_name <通讯录名称>` 或 `--assign --token <生成的令牌> --address_book_name <通讯录名称> --address_book_tag <通讯录标签> --address_book_alias <别名>`。`--address_book_alias` 需要 RustDesk 服务器专业版 >=1.5.8 和客户端 >=1.4.1。

您也可以通过这种方式分配设备组名称，例如 `--assign --token <生成的令牌> --device_group_name <设备组名称>`。

Windows 上的命令行默认没有输出。要获得输出，请这样运行：`"C:\Program Files\RustDesk\rustdesk.exe" <参数1> <参数2> ... | more` 或 `"C:\Program Files\RustDesk\rustdesk.exe" <参数1> <参数2> ... | Out-String`，参见[这里](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952)。

## 搜索设备
1. 进入设备页面。
2. 在设备名称搜索字段中输入名称并点击 `查询` 或按 <kbd>Enter</kbd>。
3. 要使用通配符，请在搜索词的开头、结尾或两端添加 `%`。
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

## 通过 Web Console 分配设备用户 / 策略 / 设备组

**用户 (User)** 指的是在设备上登录的 RustDesk 用户，或在 **设备列表** 中点击设备旁边的 **Edit（编辑）**，然后在 **User（用户）** 框中下拉选择要分配的用户。  
你也可以在 **用户列表 (User List)** 中点击 **More → Assign Devices** 来批量分配设备给某个用户。

要将设备添加到某个设备组，可以在 **设备列表 (Device List)** 中点击设备旁的 **Edit（编辑）** 并更改 **Group（组）**，  
或者进入 **设备组列表 (Device Groups)**，点击某个设备组名称，在该组中调整包含的设备。

要为设备分配策略，可以将鼠标悬停在 **策略列表 (Strategy List)** 的右侧，点击菜单中的 **Edit Devices（编辑设备）**、**Edit Users（编辑用户）** 或 **Edit Device Groups（编辑设备组）**，  
以添加对应的设备、用户设备或设备组设备到所选策略中。

---

## API 令牌（Token）

首先，请前往 **Settings → Tokens → Create** 创建一个具有所需权限的令牌，所需权限包括：  
**Device, Audit Log, User, Group, Strategy, Address Book**。

创建完成后，可以通过 **命令行 (Command Line)** 或 **Python CLI** 使用这些令牌执行相应权限的操作。

### 使用命令行令牌分配

你也可以使用 RustDesk 可执行文件并带上 `--assign` 参数来执行分配操作。  
这可以让你在命令行中直接将用户、策略、地址簿或设备组分配给设备。

**示例：**

    "C:\Program Files\RustDesk\rustdesk.exe" --assign --token <generatedtoken> --user_name <username>

**支持的参数：**

| 参数名 | 说明 | RustDesk Server Pro | RustDesk Client |
| ------- | ---- | ------------------- | ---------------- |
| `--user_name <username>` | 为设备分配用户 |  |  |
| `--strategy_name <strategyname>` | 为设备分配策略 |  |  |
| `--address_book_name <addressbookname>` | 将设备分配到地址簿 |  |  |
| `--address_book_tag <addressbooktag>` | 按标签分配地址簿 |  |  |
| `--address_book_alias <alias>` | 设置地址簿别名 | 1.5.8 | 1.4.1 |
| `--address_book_password <password>` | 为地址簿条目设置密码 | 1.6.6 | 1.4.3 |
| `--address_book_note <note>` | 为地址簿条目添加备注 | 1.6.6 | 1.4.3 |
| `--device_group_name <devicegroupname>` | 将设备分配到设备组 |  |  |
| `--note <note>` | 为设备添加备注 | 1.6.6 | 1.4.3 |
| `--device_username <device_username>` | 设置设备用户名 | 1.6.6 | 1.4.3 |
| `--device_name <device_name>` | 设置设备名称 | 1.6.6 | 1.4.3 |

Windows 命令行默认无输出，如需查看输出，可使用如下方式运行：

    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more

或

    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String

详情参考：RustDesk 讨论区相关评论链接（原文处有链接）。

---

### Python CLI 管理工具

#### 用户管理 （users.py）

**查看帮助：**

    ./users.py -h

**查看用户：**

    ./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]

**过滤条件：**  
`--name`：用户名  
`--group_name`：用户组名

**示例：**

    ./users.py --url https://example.com --token <token> view --group_name admins

**操作命令：**  
`view` 可替换为 `enable`（启用）、`disable`（禁用）或 `delete`（删除）。

**示例（禁用用户）：**

    ./users.py --url https://example.com --token <token> disable --name testuser

---

#### 设备管理 （devices.py）

**查看帮助：**

    ./devices.py -h

**查看设备：**

    ./devices.py --url <url> --token <token> view [--id <device_id>] [--device_name <device_name>] [--user_name <user_name>] [--group_name <group_name>] [--device_group_name <device_group_name>] [--offline_days <days>]

**过滤条件：**  
`--id`：设备 ID  
`--device_name`：设备名称  
`--user_name`：分配的用户  
`--group_name`：用户组  
`--device_group_name`：设备组  
`--offline_days`：离线天数

**示例：**

    ./devices.py --url https://example.com --token <token> view --user_name mike

**操作命令：**  
`view` 可替换为 `enable`（启用）、`disable`（禁用）、`delete`（删除）或 `assign`（分配）。

**示例（分配设备）：**

    ./devices.py --url https://example.com --token <token> assign --device_name PC01 --assign_to user_name=mike

---

#### 地址簿管理 （ab.py）

**查看帮助：**

    ./ab.py -h

**查看共享地址簿：**

    ./ab.py --url <url> --token <token> view-ab [--ab-name <address_book_name>]

**获取个人地址簿 GUID：**

    ./ab.py --url <url> --token <token> get-personal-ab

**添加共享地址簿：**

    ./ab.py --url <url> --token <token> add-ab --ab-name <name> [--note <note>] [--password <password>]

**更新或删除共享地址簿：**

    ./ab.py --url <url> --token <token> update-ab --ab-guid <guid> [--ab-update-name <new_name>] [--note <note>]
    ./ab.py --url <url> --token <token> delete-ab --ab-guid <guid>

**查看地址簿中的设备（peer）：**

    ./ab.py --url <url> --token <token> view-peer --ab-guid <guid> [--peer-id <peer_id>] [--alias <alias>]

**添加、更新或删除设备（peer）：**

    ./ab.py --url <url> --token <token> add-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> update-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> delete-peer --ab-guid <guid> --peer-id <peer_id>

**标签管理：**

    ./ab.py --url <url> --token <token> view-tag --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-tag --ab-guid <guid> --tag-name <name> [--tag-color 0xFF00FF00]
    ./ab.py --url <url> --token <token> update-tag --ab-guid <guid> --tag-name <name> --tag-color 0xFFFF0000
    ./ab.py --url <url> --token <token> delete-tag --ab-guid <guid> --tag-name <name>

**访问规则管理：**

    ./ab.py --url <url> --token <token> view-rule --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-rule --ab-guid <guid> [--rule-type user|group|everyone] [--rule-user <user>] [--rule-group <group>] --rule-permission ro|rw|full
    ./ab.py --url <url> --token <token> update-rule --rule-guid <rule_guid> --rule-permission rw
    ./ab.py --url <url> --token <token> delete-rule --rule-guid <rule_guid>

**示例（为用户 mike 添加只读权限）：**

    ./ab.py --url https://example.com --token <token> add-rule --ab-guid <guid> --rule-user mike --rule-permission ro

---

#### 审计日志 （audits.py）

**查看帮助：**

    ./audits.py -h

**查看连接审计：**

    ./audits.py --url <url> --token <token> view-conn [--remote <peer_id>] [--conn-type <type>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**查看文件审计：**

    ./audits.py --url <url> --token <token> view-file [--remote <peer_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**查看告警审计：**

    ./audits.py --url <url> --token <token> view-alarm [--device <device_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**查看控制台操作审计：**

    ./audits.py --url <url> --token <token> view-console [--operator <username>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**过滤条件：**  
`--remote`：对端 ID（用于连接或文件审计）  
`--conn-type`：连接类型（0=远程桌面，1=文件传输，2=端口转发，3=查看摄像头，4=终端）  
`--device`：设备 ID（用于告警审计）  
`--operator`：操作员用户名（用于控制台审计）  
`--created-at`：本地时间过滤，如 `"2025-09-16 14:15:57"`  
`--days-ago`：筛选指定天数内的记录  
`--page-size` / `--current`：分页参数

**示例：**

    ./audits.py --url https://example.com --token <token> view-conn --remote 123456789 --days-ago 7


## 搜索设备
1. 进入设备页面。
2. 在设备名称搜索字段中输入名称并点击 `查询` 或按 <kbd>Enter</kbd>。
3. 要使用通配符，请在搜索词的开头、结尾或两端添加 `%`。
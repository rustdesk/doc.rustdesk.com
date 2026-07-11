---
title: 地址簿
weight: 201
description: "在 RustDesk Server Pro 中使用地址簿保存远程设备、共享设备列表、用标签组织设备，并在 RustDesk 客户端中使用共享密码连接。"
keywords: ["rustdesk address book", "rustdesk server pro address book", "rustdesk shared address book", "rustdesk device tags", "rustdesk shared password"]
---

地址簿允许用户保存 RustDesk 设备 ID、用标签组织设备、共享设备列表，并在 RustDesk 客户端中使用已保存的密码连接。

## 快速回答

- **我的地址簿** 对已登录用户私有。手动输入后被记住的密码会保存在 **我的地址簿** 中，并可在该用户的设备之间同步。
- **共享** 地址簿可以共享给指定用户、用户组或所有用户。
- 共享地址簿可以保存地址簿级密码，每个设备条目也可以保存设备级密码。未设置设备级密码时，将使用地址簿级密码。
- 标签可用于在 Web 控制台和 RustDesk 客户端中过滤设备。

## 使用共享地址簿一键连接

当用户需要连接而不想每次手动输入远程密码时，请使用共享地址簿。

1. 创建或打开一个共享地址簿。可选择在地址簿上设置 **地址簿级密码**。

2. 点击地址簿名称打开设备页面。点击 **导入**，选择要导入地址簿的设备，然后点击底部的 **保存** 保存所选设备。或者点击 **添加**，通过 ID 添加设备；如需直接 IP 访问，可使用 IP 地址作为 ID。可选择为单个设备条目设置 **设备级密码**。

3. 将地址簿共享给指定用户、用户组或所有用户。

4. 用户登录 RustDesk 客户端并打开 **地址簿** 标签页。

5. 用户选择共享地址簿并点击设备卡片。

![在客户端中点击共享地址簿设备卡片](/docs/en/self-host/rustdesk-server-pro/address-book/images/click-peer-card.png)

{{% notice warning %}}
共享密码仅在从对应的共享地址簿连接时使用，包括点击设备卡片或使用其下拉菜单。从其他设备标签页、ID 输入框旁边的 **连接** 按钮或其他共享地址簿连接时，不会使用该共享密码。
{{% /notice %}}

## 共享地址簿权限

| 权限 | 用户可以执行的操作 |
| --- | --- |
| **只读** | 可以查看设备和标签，并可以使用密码。 |
| **读/写** | 可以编辑设备和标签。 |
| **完全控制** | 可以再次共享、删除或重命名地址簿。 |

当多条规则匹配同一用户时，优先级为：

1. 用户
2. 组
3. 所有人

例如，如果 **所有人** 是只读，但某个指定用户是完全控制，则该用户获得完全控制权限。

![共享地址簿权限](/docs/en/self-host/rustdesk-server-pro/address-book/images/share-list.png)

![Web 控制台中的共享地址簿权限](/docs/en/self-host/rustdesk-server-pro/address-book/images/user1-permission.png)

## Web 控制台

### 创建或编辑共享地址簿

在 **地址簿 > 共享** 中，创建带有名称、可选备注和可选 **默认共享密码** 的共享地址簿。这就是地址簿级密码。

![创建带有默认共享密码的共享地址簿](/docs/en/self-host/rustdesk-server-pro/address-book/images/create-shared-address-book.png)

### 添加设备和密码

可以通过 ID 手动添加设备，也可以从 Server Pro 设备列表导入设备。对于每个条目，你可以设置别名、标签、备注；对于共享地址簿，还可以设置设备级密码。

![将设备添加到共享地址簿](/docs/en/self-host/rustdesk-server-pro/address-book/images/import-device.png)

![设备](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-addressbook-devices.png)

![编辑共享地址簿中的设备](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-edit-device.png)

### 标签和过滤

标签用于组织和过滤设备。`未标记` 会筛选没有标签的设备。启用 **按交集过滤** 后，只会显示匹配所有已选标签的设备。

### 回收站

从地址簿中删除设备会将该条目移动到该地址簿的回收站。它不会从 RustDesk Server Pro 中删除该设备。

## 共享密码行为

| 密码级别 | 优先级 |
| --- | --- |
| 设备级密码 | 当设备条目设置了密码时优先使用。 |
| 地址簿级密码 | 当设备条目没有密码时使用。 |

如果两个密码都未设置，用户将按正常方式连接，并且可能需要手动输入密码。在 Web 控制台中，密码列只显示是否设置了密码。

## RustDesk 客户端

登录后，使用地址簿选择器在 **我的地址簿** 和共享地址簿之间切换。对于共享地址簿，客户端会显示当前用户的权限。

![RustDesk 客户端地址簿选择器](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-selector.png)

![只读地址簿](/docs/en/self-host/rustdesk-server-pro/address-book/images/read-only-address-book.png)

### 从客户端编辑

有写入权限的用户可以添加 ID、添加标签、编辑别名、编辑标签、编辑备注、设置共享密码或移除条目。

![RustDesk 客户端中的地址簿设备菜单 1](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu1.png)

![RustDesk 客户端添加 ID](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-add-id.png)

![RustDesk 客户端中的地址簿设备菜单 2](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu2.png)

![RustDesk 客户端修改密码](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-change-password.png)

## 部署预设

RustDesk 客户端配置可以预设地址簿分配：

- `preset-address-book-name`
- `preset-address-book-tag`
- `preset-address-book-alias`
- `preset-address-book-password`
- `preset-address-book-note`

`preset-address-book-alias`、`preset-address-book-password` 和 `preset-address-book-note` 需要 RustDesk 客户端 1.4.3 或更高版本，以及 RustDesk Server Pro 1.6.6 或更高版本。

有关更多详情，请参阅[高级客户端配置](/docs/en/self-host/client-configuration/advanced-settings/#preset-address-book-name--preset-address-book-tag--preset-address-book-alias--preset-address-book-password--preset-address-book-note)。

## 相关设置

| 设置 | 位置 | 作用 |
| --- | --- | --- |
| **允许非管理员将地址簿共享给其他组** | **设置 > 其他** | 允许非管理员用户将地址簿共享给其他用户组。 |
| **禁用地址簿** | **自定义客户端** | 在生成的自定义客户端中隐藏或禁用地址簿。 |

## 故障排查

### 密码错误

保存在共享地址簿中的密码由控制端 RustDesk 客户端使用。它不会设置到被控设备上。请在被控设备的 **设置 > 安全 > 密码** 中设置该设备的密码。

要使用共享密码，请点击设备卡片从对应的共享地址簿连接。从其他地址簿、其他设备标签页或 ID 输入框旁边的 **连接** 按钮连接时，不会使用此地址簿的共享密码。

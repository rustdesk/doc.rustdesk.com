---
title: 管理员角色
weight: 17
---

管理员角色允许管理员将部分管理权限委派给非管理员用户。您可以为全局资源（如策略、控制角色和自定义客户端）以及不同范围内的用户和设备定义权限。

一旦为用户分配了管理员角色，他们将根据授予的权限在 Web 控制台中看到相应的页面和菜单。

## 管理员与管理员角色

- 只有管理员可以编辑管理员角色并将管理员角色分配给用户。
- 管理员不受管理员角色的限制，尽管可以为管理员分配管理员角色。
- 非管理员用户无法编辑管理员账户，即使被授予了全局用户权限。

## 角色类型

管理员角色有三种类型，每种类型具有不同的范围和可用权限。

| 类型 | 描述 |
|------|-------------|
| **全局** | 可以管理整个团队的所有资源 |
| **个人** | 只能管理用户自己的设备和审计日志 |
| **组范围** | 可以管理指定组内的用户和设备 |

### 关于组范围

| 选定的权限 | 应用于 |
|-------|-------------|
| **用户权限** | 应用于所选用户组内的用户 |
| **设备权限** | 应用于以下设备：<ul><li>所选设备组中的设备</li><li>分配给所选用户组内用户的设备</li><li>未分配的设备（如果启用）</li></ul> |

您可以在组范围角色中仅选择用户权限或仅选择设备权限，使权限和范围更清晰。例如，仅选择用户权限可以管理用户而无需任何设备访问权限；仅选择设备权限则可以通过选择用户组、设备组或未分配设备作为范围来管理设备。

## 权限规则

### 任何编辑权限都包含相应的查看权限

任何编辑权限都自动包含相应的查看权限。例如，"设备启用/禁用"权限包含"查看设备"权限。

### 编辑权限不包含分配

资源（用户组、设备组、策略、控制角色）的编辑权限仅允许编辑资源本身，不包含将其分配给用户或设备的权限。

例如，"编辑设备组"权限允许创建和修改设备组，但要向组中添加或移除设备，需要"设备更新组"权限。

### 查看权限不包含成员

资源的查看权限仅允许查看资源本身，不包含查看其中成员的权限。

例如，"查看设备组"权限允许查看设备组列表，但要查看组内的设备，需要"查看设备"权限或任何设备编辑权限。如果设备权限是全局的，可以看到组内所有设备；如果是组范围或个人的，只能看到允许范围内的设备。

{{% notice note %}}
地址簿的设备读取不受管理员角色影响。客户端的可访问设备 peer 标签页的内容读取仅受控制台中 **设置 → 其他 → 禁用获取可访问设备** 的限制，也不受管理员角色限制。
{{% /notice %}}

## 控制台操作

### 创建角色

1. 导航到**管理员角色**页面并点击**创建**
2. 输入角色的**名称**
3. 选择**类型**（对于**组范围**，还需配置范围）
4. 选择要授予的**权限**

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-permission.png)

### 角色分配

有两种方式将管理员角色分配给用户：

1. **用户页面** → 点击用户的**编辑** → 在**管理员角色**字段中选择角色
2. **管理员角色页面** → 点击**用户数量**或**分配用户** → 添加或移除角色中的用户

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-role-page.png)

{{% notice note %}}
- 一个用户可以被分配多个管理员角色。所有分配角色的权限会合并（所有权限的并集）。
{{% /notice %}}

## 权限参考

### 全局权限

| 权限 | 描述 |
|------------|-------------|
| Users-View | 读取所有用户的列表信息。 |
| Users-Create | 直接创建非管理员用户。 |
| Users-Invite | 通过邮件邀请用户。 |
| Users-Delete | 删除任何非管理员用户。用户必须先禁用才能删除。 |
| Users-Enable/Disable | 启用或禁用任何非管理员用户。 |
| Users-Edit Email | 更改任何非管理员用户的邮箱。 |
| Users-Edit Password | 更改任何非管理员用户的密码。 |
| Users-Edit Note | 更改任何非管理员用户的备注。 |
| Users-Manage 2FA | 管理任何非管理员用户的登录验证。包括启用/禁用 2FA 强制、重置 2FA 配置、禁用邮件登录验证。 |
| Users-Force Logout | 强制任何非管理员用户从所有设备登出。 |
| Users-Update Group | 更改任何非管理员用户的组。 |
| Users-Update Strategy | 更改任何非管理员用户的策略。 |
| Users-Update Control Role | 更改任何非管理员用户的控制角色。 |
| Devices-View | 读取所有设备的列表信息。 |
| Devices-Enable/Disable | 启用或禁用任何设备。 |
| Devices-Delete | 删除任何设备。设备必须先禁用才能删除。 |
| Devices-Edit Info | 编辑任何设备的名称、设备用户名和备注。 |
| Devices-Assign to User | 将任何设备分配给任何用户。 |
| Devices-Update Group | 更改任何设备的组。 |
| Devices-Update Strategy | 更改任何设备的策略。 |
| User Groups-View | 读取所有用户组的列表信息。 |
| User Groups-Edit | 创建、编辑和删除用户组。 |
| Device Groups-View | 读取所有设备组的列表信息。 |
| Device Groups-Edit | 创建、编辑和删除设备组。 |
| Device Groups-Update Strategy | 更改任何设备组的策略。 |
| Audit Logs-View | 读取所有日志。可以编辑备注。 |
| Audit Logs-Edit | 可以断开任何活动连接。 |
| Strategies-View | 读取任何策略。 |
| Strategies-Edit | 创建、编辑和删除策略。 |
| Control Roles-View | 读取任何控制角色。 |
| Control Roles-Edit | 创建、编辑和删除控制角色。 |
| Custom Clients-View | 读取自定义客户端列表。 |
| Custom Clients-Edit | 创建、编辑和删除自定义客户端。 |

### 个人权限

| 权限 | 描述 |
|------------|-------------|
| Devices-View | 读取用户自己设备的列表信息。 |
| Devices-Enable/Disable | 启用或禁用用户自己的设备。 |
| Devices-Delete | 删除用户自己的设备。 |
| Devices-Edit Info | 编辑用户自己设备的信息。 |
| Devices-Update Strategy | 更改用户自己设备的策略。 |
| Audit Logs-View | 读取个人日志。 |
| Audit Logs-Edit | 可以断开个人活动连接。 |

### 组范围权限

| 权限 | 描述 |
|------------|-------------|
| Users-View | 读取所选用户组内用户的列表信息。 |
| Users-Create | 在所选用户组内创建非管理员用户。 |
| Users-Invite | 在所选用户组内通过邮件邀请用户。 |
| Users-Delete | 删除所选用户组内的非管理员用户。 |
| Users-Enable/Disable | 启用或禁用所选用户组内的非管理员用户。 |
| Users-Edit Email | 更改所选用户组内非管理员用户的邮箱。 |
| Users-Edit Password | 更改所选用户组内非管理员用户的密码。 |
| Users-Edit Note | 更改所选用户组内非管理员用户的备注。 |
| Users-Manage 2FA | 管理所选用户组内非管理员用户的登录验证。 |
| Users-Force Logout | 强制所选用户组内的非管理员用户登出。 |
| Users-Update Strategy | 更改所选用户组内非管理员用户的策略。 |
| Users-Update Control Role | 更改所选用户组内非管理员用户的控制角色。 |
| Devices-View | 读取当前角色管理的设备的列表信息。 |
| Devices-Enable/Disable | 启用或禁用当前角色管理的设备。 |
| Devices-Delete | 删除当前角色管理的设备。 |
| Devices-Edit Info | 编辑当前角色管理的设备的信息。 |
| Devices-Update Strategy | 更改当前角色管理的设备的策略。 |

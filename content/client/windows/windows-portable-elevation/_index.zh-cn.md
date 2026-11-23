---
title: Windows Portable 提权
weight: 49
description: "RustDesk 的Windows Portable 提权文档，提供安装、配置、部署和故障排查指南。"
keywords: ["rustdesk portable elevation", "rustdesk uac", "rustdesk windows admin rights", "rustdesk task manager mouse issue", "rustdesk request elevation"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## 快速回答

当您运行便携版 RustDesk 客户端，但仍需要管理员权限来执行特定任务或在被控端执行高权限操作时，应使用便携提权。它适合未安装完整客户端、但仍需要高权限远程支持的场景。

## 关键要点

- 先决定是启动时就提权，还是仅在会话中提权
- 同时测试被控端和控制端的提权提示
- 在大规模部署前先向支持团队讲清提权流程

<!-- GEO-LOCALIZED-INTRO:END -->

在Windows下，Portable程序没有管理员权限，这会导致以下问题：

* 当UAC（用户账户控制）窗口弹出时，画面无法传输。
* 当弹出被提权的窗口（如任务管理器）时，鼠标操作不响应。

通过提权, RustDesk在启动时或会话过程中可以创建一个具有管理员权限的进程，用于截屏和鼠标操作，从而避免了上述问题。

## 启动时提权

这种方式，连接时不需要再请求提升。有两种方法：

* 方法一：更改portable程序的名称，名称中需包含`-qs-`或`-qs.exe`或`_qs.exe`（>= 1.4.6），或以`qs.exe`结尾（1.2.0 ~ 1.4.5）。鼠标左键点击运行，并在UAC窗口点击允许。

* 方法二: 右键以管理员权限运行。

## 被控端主动提权

被控端可以在对方发起连接时，直接点击`接受并提权`，或在已经连接的情况下点击`提权`。

|                   正在连接                   |                   已连接                    |
| :--------------------------------------: | :--------------------------------------: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/cm_unauth.jpg) | ![](/docs/en/client/windows/windows-portable-elevation/images/cm_auth.jpg) |

## 控制端主动提权

在控制端的动作菜单中选择 `请求提权`。如果被控端用户有管理员权限，可选择 `请求远程用户授权`。如果对方使用 Windows 标准账户，请选择 `发送管理员用户的账号和密码`，并在控制端输入管理员凭据。连接后即可请求提权，无需等到以管理员身份打开应用时再操作。**两种方式都需要被控端有人处理 RustDesk 的 UAC 提示。**

|                    菜单                    |                   对话框                    |
| :--------------------------------------: | :--------------------------------------: |
| ![](/docs/en/client/windows/windows-portable-elevation/images/menu.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/dialog.png) |
|                  **等待**                  |                  **成功**                  |
| ![](/docs/en/client/windows/windows-portable-elevation/images/wait.png) | ![](/docs/en/client/windows/windows-portable-elevation/images/success.png) |

### 应用与 RustDesk 的 UAC 提示

以管理员身份运行应用和为 RustDesk 提权会分别触发 UAC 提示。如果请求 RustDesk 提权时，应用的提示已经弹出，请被控端用户先处理应用的提示。

1. 在**应用的提示**（例如“Windows 命令处理程序”）中，点击**是**以管理员身份运行应用，或点击**否**取消。
2. 在 **`rustdesk.exe` 的提示**中，点击**是**为 RustDesk 提权。如果 Windows 要求管理员凭据，请先输入再确认。

提权成功后，您可以在控制端操作 UAC 窗口，点击需要管理员权限的按钮。如果被控端用户刚才取消了应用启动，您现在可以重新以管理员身份打开它。

### RustDesk 的 UAC 提示再次要求输入凭据

RustDesk 使用控制端发送的凭据，以管理员账户启动辅助进程。该进程请求提权时，Windows 会应用**用户账户控制：管理员批准模式中管理员的提升权限提示行为**策略。在组策略中，依次打开**计算机配置 → 策略 → Windows 设置 → 安全设置 → 本地策略 → 安全选项**即可找到该策略。

如果设置为**在安全桌面上提示输入凭据**，即使控制端已发送管理员凭据，仍需有人在被控端的 `rustdesk.exe` UAC 窗口中再次输入。即使在打开其他应用之前主动请求提权，也会出现同样的提示。[微软 UAC 策略文档](https://learn.microsoft.com/zh-cn/windows/security/application-security/application-control/user-account-control/settings-and-configuration)

## 如何选择

|                情形                |             方式             |
| :------------------------------: | :------------------------: |
|              无需处理提权              |            安装程序            |
|              被控端没有人              |     重命名<br>或右键以管理员权限运行     |
| 被控端有人<br/>且通过点击确认连接<br/>且连接时立即提权 |     被控端接收连接时点击`接受并提权`      |
|        被控端有人<br/>且仅必要时提权         | 被控端通过连接管理窗口提权<br/>或主控端请求提权 |






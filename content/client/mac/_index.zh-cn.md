---
title: Mac 
weight: 3
description: "RustDesk 的Mac文档，提供安装、配置、部署和故障排查指南。"
keywords: ["rustdesk mac", "rustdesk macos", "rustdesk mac install", "rustdesk screen recording permission", "rustdesk accessibility permission", "rustdesk mac remote control"]
---

## RustDesk 在 macOS 上需要什么？

RustDesk 在 macOS 上不只是把应用装好即可。要正常远控另一台 Mac，通常需要把应用放进 `Applications`、允许应用运行，并授予 `Accessibility`、`Screen Recording`，某些情况下还要授予 `Input Monitoring` 权限。

## macOS 快速答案

- 从 `.dmg` 安装到 `Applications`。
- 如果 Gatekeeper 阻止运行，请在系统安全设置中允许该应用。
- 为远程控制授予 `Accessibility` 和 `Screen Recording`。
- 如果键盘或鼠标输入仍不工作，再授予 `Input Monitoring`。
- 如果权限重置后仍无效，请重启。

## 哪些 macOS 权限最重要？

| 权限 | 作用 |
| --- | --- |
| Accessibility | 允许 RustDesk 控制键盘和鼠标输入 |
| Screen Recording | 允许 RustDesk 捕获本机屏幕 |
| Input Monitoring | 在较新的 macOS 上，当本地输入捕获仍失败时需要 |

## 安装

打开 .dmg 文件并将 `RustDesk` 拖到 `应用程序`，如下所示。

![](/docs/en/client/mac/images/dmg.png)

确保您已退出所有正在运行的 RustDesk。还要确保退出托盘上显示的 RustDesk 服务。

![](/docs/en/client/mac/images/tray.png)

## 允许 RustDesk 运行

| 解锁改变 | 点击"App Store and identified developers"  |
| ---- | ---- |
|![](/docs/en/client/mac/images/allow2.png)|![](/docs/en/client/mac/images/allow.png)|

## 启用权限

{{% notice note %}}
由于 macOS 安全策略的更改，我们在本地端捕获输入的 API 不再工作。您必须在本地 Mac 端启用"输入监控"权限。
请按照此说明操作：
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923)。

在版本 1.2.4 中，您可以尝试使用 `输入源 2`，点击工具栏上的键盘图标即可看到。
{{% /notice %}}

为了获得捕获屏幕的能力，您需要授予 `RustDesk` **辅助功能** 权限和 **屏幕录制** 权限。 RustDesk 将引导您进入设置窗口。

| RustDesk 窗口 |设置窗口 |
| ---- | ---- |
|![](/docs/en/client/mac/images/acc.png)|![](/docs/en/client/mac/images/acc3.png?v2)|

如果您在设置窗口中启用了它，但 RustDesk 仍然会发出警告。请通过 `-` 按钮从设置窗口中删除 `RustDesk`，然后单击 `+` 按钮，在 `应用程序` 中选择 `RustDesk`。

{{% notice note %}}
[https://github.com/rustdesk/rustdesk/issues/3261](https://github.com/rustdesk/rustdesk/issues/3261) <br>
其他无奈的尝试： <br>
`tccutil reset ScreenCapture com.carriez.RustDesk` <br>
`tccutil reset Accessibility com.carriez.RustDesk` <br>
仍然需要重启。
{{% /notice %}}

| `-` 和 `+` 按钮 |选择 RustDesk |
| ---- | ---- |
|![](/docs/en/client/mac/images/acc2.png)|![](/docs/en/client/mac/images/add.png?v2)|

请按照上面相似步骤设置**屏幕录制**权限。

![](/docs/en/client/mac/images/screen.png?v2)

---
title: Mac 
weight: 3
---

### 安装
------

打开 .dmg 文件并将 `RustDesk` 拖到`应用程序`，如下所示。

![](/docs/en/manual/mac/images/dmg.png)

确保已退出所有正在运行的 RustDesk。还要确保退出托盘上显示的 RustDesk 服务。

![](/docs/en/manual/mac/images/tray.png)

### 允许 RustDesk 运行

| 解锁更改 | 点击 "App Store and identified developers"  |
| ---- | ---- |
|![](/docs/en/manual/mac/images/allow2.png)|![](/docs/en/manual/mac/images/allow.png)|

### 启用权限

{{% notice note %}}
由于 macOS 安全策略改变，在本地捕获输入的 API 不再可用。必须在本地启用输入“输入监视”权限。
请参阅
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923)

此问题似乎无法快速解决，需要与 Flutter 版本一起修复。
{{% /notice %}}

为了获得捕获屏幕的能力，需要授予 `RustDesk` **辅助功能**权限和**屏幕录制**权限。 RustDesk 将引导您进入设置窗口。

| RustDesk 窗口 |设置窗口 |
| ---- | ---- |
|![](/docs/en/manual/mac/images/acc.png)|![](/docs/en/manual/mac/images/acc3.png)|

在设置窗口中启用后，RustDesk 仍然会发出警告。请通过 `-` 按钮从设置窗口中删除 RustDesk，然后单击 `+` 按钮，在 `/Applications` 中选择 RustDesk。

| `-` 和 `+` 按钮 |选择 RustDesk |
| ---- | ---- |
|![](/docs/en/manual/mac/images/acc2.png)|![](/docs/en/manual/mac/images/add.png)|

请按照上述步骤设置**屏幕录制**权限。

![](/docs/en/manual/mac/images/screen.png)

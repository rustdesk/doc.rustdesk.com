---
title: Android
weight: 4
---

## 远程控制

在主页输入远程设备的ID或选择历史设备进行验证。
验证成功后，即可控制远程设备。

| 主页 | 成功连接 |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_en.jpg?width=300px) | ![](/docs/en/client/android/images/connection_en.jpg?width=300px) |

输入控制提供两种模式：`鼠标模式`和`触摸模式`，可通过下方工具栏切换。

| 鼠标设置 | 模式选择 |
| --- | --- |
| ![](/docs/en/client/android/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/client/android/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
在`鼠标模式`下，您也可以通过`双指点击`触发远程设备的`右键`
{{% /notice %}}

## 文件传输（Android）

> 需要 RustDesk ≥ 1.1.9

在主页的设备列表中选择设备。

长按或点击右侧菜单选择`文件传输`。

| 主页 | 成功连接 |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_connection_en.jpg?width=300px) |

- 初始目录是设备的主目录，您可以点击 <i class="fas fa-home"></i> 快速返回主目录。
- 标题栏下方是目录层级，您可以点击相应文件夹快速跳转。
- 点击 <i class="fas fa-arrow-up"></i> 访问上级目录。
- 列表底部会提示当前绝对路径和项目统计。
- 点击标题栏中的`本地`/`远程`切换页面。

### 如何传输文件？

1. 在列表中**长按**文件或文件夹，快速进入**多选模式**，可选择多个项目。
2. 选择文件后，切换`本地`/`远程`页面。切换后，屏幕底部会出现`粘贴到此处？`提示。
3. 点击图片中的粘贴文件图标，将选中的项目传输到目标目录。

| 多选模式 | 文件粘贴 |
| --- | --- |
| ![](/docs/en/client/android/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_copy_en.jpg?width=300px) |

## 设置ID/中继服务器

1. 点击底部导航栏的`设置`。
2. 点击`ID/中继服务器`。
3. 在`ID服务器`字段中输入您的ID服务器主机名/IP地址。将`中继服务器`和`API服务器`留空，在`密钥`字段中输入您的公钥（可选，加密需要）。按**确定**保存设置。它会自动切换到指定的服务器。

您也可以通过扫描二维码进行配置。要生成二维码，请使用以下格式（将`host`和`key`值更改为您自己的）：

```nolang
config={"host": "xxx", "key": "xxx"}
```

然后访问[在线二维码生成器](https://www.qr-code-generator.com/)并粘贴上述代码。

下图是Android的截图。如果是iOS，请检查主页右上角菜单。

![](/docs/en/client/android/images/id_setting_en.jpg?width=300px)

## 分享您Android手机的屏幕/文件

从1.1.9版本开始，Android客户端增加了分享手机屏幕和分享手机文件系统的功能。

- 屏幕分享需要Android 6及以上版本
- 分享手机系统内部音频需要Android 10及以上版本
- iOS暂不支持屏幕分享

### 请求权限并启动服务

从底部导航栏点击`分享屏幕`。

根据需要配置各种权限。每次启动RustDesk时，都需要重新请求"屏幕捕获"和"输入控制"权限。

![](/docs/en/client/android/images/server_off_en.jpg?width=300px)

| 权限 | 描述 |
| --- | --- |
| 屏幕捕获 | 是否启用屏幕捕获分享权限，启动时同时启用监控服务 |
| 输入控制* | 是否允许控制端控制手机输入，如鼠标虚拟触屏操作 |
| 文件传输* | 是否启用文件传输权限，启动后可远程控制此手机的文件系统 |
| 音频捕获 | 是否分享手机内部系统音乐（非麦克风输入） |

{{% notice note %}}
上述*代表特殊权限。要获得此类权限，需要跳转到Android系统设置页面手动获取。详情如下
{{% /notice %}}

### 特殊权限请求 - 文件

| 请求Android文件权限会自动跳转到系统设置页面 |
| :---: |
| ![](/docs/en/client/android/images/get_file_en.jpg?width=300px) |

### 特殊权限请求 - 鼠标输入
| 步骤1：找到"已安装的服务" | 步骤2：启动RustDesk输入 |
| --- | --- |
| ![](/docs/en/client/android/images/get_input1_en.jpg?width=300px) | ![](/docs/en/client/android/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
不同厂商的系统设置页面可能不同，请根据您的系统页面进行调整。
{{% /notice %}}

| 远程鼠标控制快捷键 | 描述 |
| --- | --- |
| 点击鼠标右键 | 返回 |
| 点击鼠标滚轮 | 主页 |
| 长按鼠标滚轮 | 最近打开的应用 |
| 鼠标滚轮滚动 | 模拟垂直滑动 |

### 启动服务

获得`屏幕捕获`权限后，服务会自动启动。您也可以点击`启动服务`按钮启动服务。服务启动后，可以接受来自其他设备的桌面控制请求。

如果启用了`文件传输`权限，也可以接受来自其他设备的文件控制请求。

服务启动后，会自动为此设备获取唯一ID和随机密码。其他设备可以通过ID和密码控制手机，或在收到新请求时手动确认。

| 启动服务前 | 启动服务后 |
| --- | --- |
| ![](/docs/en/client/android/images/server_off_en.jpg?width=300px) | ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. 点击`启动服务`默认启用`屏幕捕获`权限。
2. 未获得`屏幕捕获`权限时，其他设备无法发出控制请求。
3. 除`屏幕捕获`权限外，其他权限的切换只会对新连接生效，不会影响已建立的连接。如需对已建立的连接切换权限，请先关闭当前连接，修改权限后再接受控制请求。
{{% /notice %}}

#### PC端

![](/docs/en/client/android/images/android_server_pc_side_en.png?width=700px)

#### 移动端

| 您可以随时停止服务或关闭指定连接 | 您可以接收或发起聊天 |
| --- | --- |
| ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) | ![](/docs/en/client/android/images/android_server2_en.jpg?width=300px) |
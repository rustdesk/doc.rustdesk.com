---
title: 高级设置
weight: 49
---

所有自定义客户端中的高级设置都在这里涵盖。

## 设置的权限级别

有四种类型的设置：

1. 覆盖设置，在`Web控制台` → `自定义客户端`中
2. 默认设置，在`Web控制台` → `自定义客户端`中
3. 用户设置，在RustDesk客户端中
4. 策略设置，在`Web控制台` → `策略`中

这些设置的权限层次结构如下：`覆盖 > 策略 > 用户 > 默认`。

## 安全设置

### access-mode

设置传入连接的访问模式（权限）。

**位置**：

1. **桌面** 设置 → 安全 → 权限
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | custom, full, view | custom | `access-mode=custom` |

### enable-keyboard

启用传入连接的键盘/鼠标输入。

**位置**：

1. **桌面** 设置 → 安全 → 权限 → 启用键盘
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-keyboard=Y` |

### enable-clipboard

启用传入连接的复制和粘贴。

**位置**：

1. **桌面** 设置 → 安全 → 权限 → 启用剪贴板
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-clipboard=Y` |

### enable-file-transfer

启用传入连接的文件复制粘贴或文件传输（会话）。

**位置**：

1. **桌面** 设置 → 安全 → 权限 → 启用文件传输
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-file-transfer=Y` |


### enable-camera

启用传入连接的摄像头。

**位置**：

1. **桌面** 设置 → 安全 → 权限 → 启用摄像头
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-camera=Y` |

### enable-terminal

为传入连接启用终端。

**位置**:

**桌面端** 设置 → 安全 → 权限 → 启用终端

| 是否需要安装 | 可选值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-terminal=Y` |

### enable-remote-printer

启用传入连接的远程打印机。

**位置**：

1. **Windows** 设置 → 安全 → 权限 → 启用远程打印机

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-remote-printer=Y` |

### enable-audio

启用音频记录并传输到对等端。

**位置**：

1. **桌面** 设置 → 安全 → 权限 → 启用音频
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-audio=Y` |

### enable-tunnel

启用TCP隧道。

**位置**：

1. **桌面** 设置 → 安全 → 权限 → 启用TCP隧道
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-tunnel=Y` |

### enable-remote-restart

启用控制端重启。

**位置**：

1. **桌面** 设置 → 安全 → 权限 → 启用远程重启
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-remote-restart=Y` |

### enable-record-session

启用会话录制。

**位置**：

1. **桌面** 设置 → 安全 → 权限 → 启用录制会话
2. **移动端** 设置 → 屏幕共享 → 启用录制会话

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-record-session=Y` |

### enable-block-input

启用控制端阻止其他用户的输入。

**位置**：

1. **桌面** 设置 → 安全 → 权限 → 启用阻止用户输入（仅Windows）
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-block-input=Y` |

### allow-remote-config-modification

允许控制端更改受控RustDesk UI中的设置。

**位置**：

1. **桌面** 设置 → 安全 → 权限 → 启用远程配置修改
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `allow-remote-config-modification=Y` |

### enable-lan-discovery

允许局域网对等端发现我。

启用局域网发现后，如果本地支持，[WOL](https://en.wikipedia.org/wiki/Wake-on-LAN)可以工作。

**位置**：

1. **桌面** 设置 → 安全 → 安全 → 拒绝局域网发现
2. **移动端** 设置 → 屏幕共享 → 拒绝局域网发现

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 是 | Y, N | Y | `enable-lan-discovery=Y` |

### direct-server

启用直接IP访问。

**位置**：

1. **桌面** 设置 → 安全 → 安全 → 启用直接IP访问
2. **移动端** 设置 → 屏幕共享 → 直接IP访问

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `direct-server=Y` |

### direct-access-port

直接IP访问端口。

**位置**：

1. **桌面** 设置 → 安全 → 安全 → 直接IP访问端口（勾选"启用直接IP访问"时显示）
2. **移动端** 设置 → 屏幕共享 → 直接IP访问

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 |  | 21118 | `direct-access-port=21118` |

### whitelist

使用IP白名单。

**位置**：

1. **桌面** 设置 → 安全 → 安全 → 使用IP白名单
2. **移动端** 设置 → 屏幕共享 → 使用IP白名单

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | `,` 或 `<ip1>,<ip2>,<ip3>` | `,` 表示无过滤 | `whitelist=,` |

### allow-auto-disconnect & auto-disconnect-timeout

在用户不活动一段时间后自动关闭传入会话。

**位置**：

1. **桌面** 设置 → 安全 → 安全 → 用户不活动时自动关闭传入会话
2. **移动端** 设置 → 屏幕共享 → 用户不活动时自动关闭传入会话

| 选项 | 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: | :------: |
| allow-auto-disconnect | 否 | Y, N | N | `allow-auto-disconnect=Y` |
| auto-disconnect-timeout | 否 | 超时分钟数 | 10 | `auto-disconnect-timeout=10` |

### allow-only-conn-window-open

仅在RustDesk窗口打开时允许连接。

**位置**：

1. **桌面** 设置 → 安全 → 安全 → 仅在RustDesk窗口打开时允许连接
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 是 | Y, N | N | `allow-only-conn-window-open=N` |

### approve-mode

通过密码或手动点击接受传入连接。

**位置**：

1. **桌面** 设置 → 安全 → 密码 → 下拉框
2. **移动端** 屏幕共享 → 右上角下拉菜单

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | password, click, password-click | password-click | `approve-mode=password-click` |

### verification-method

可以使用什么类型的密码，`临时密码`是指一次性随机密码。

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | use-temporary-password, use-permanent-password, use-both-passwords | use-both-passwords | `verification-method=use-permanent-password` |

### temporary-password-length

1. **桌面端** 设置 → 安全 → 密码 → 一次性密码长度
2. **移动端** 分享屏幕 → 右上角下拉菜单 → 一次性密码长度

临时密码的长度。

| 是否需要安装 | 可选值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | 6, 8, 10 | 6 | `temporary-password-length=6` |

### proxy-url

代理 URL。

目前支持`http`和`socks5`。

**位置**：

1. **桌面** 设置 → 网络 → 代理 → Socks5/Http(s)代理
2. **移动端**

示例：

1. **http** `proxy-url=http://192.168.0.2:12345`
2. **https** `proxy-url=https://192.168.0.2:12345`
3. **socks5** `proxy-url=socks5://192.168.0.2:1080`

### proxy-username & proxy-password

代理用户名和密码。

**位置**：

1. **桌面** 设置 → 网络 → 代理 → Socks5/Http(s)代理
2. **移动端**

| 选项 | 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: | :------: |
| proxy-username | 否 | | | `proxy-username=user` |
| proxy-password | 否 | | | `proxy-password=pass` |

## 常规设置

### theme

控制RustDesk客户端的UI主题。

**位置**：

1. **桌面** 设置 → 常规 → 主题
2. **移动端** 设置 → 设置 → 主题

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | dark, light, system | system | `theme=system` |

### lang

控制RustDesk客户端的语言。

**位置**：

1. **桌面** 设置 → 常规 → 语言
2. **移动端** 设置 → 设置 → 语言

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | default, ar, bg, ... | default | `lang=default` |

目前可用的语言有：

ar, bg, ca, cs, da, de, el, en, eo, es, et, fa, fr, he, hr, hu, id, it, ja, ko, kz, lt, lv, nb, nl, pl, pt, ro, ru, sk, sl, sq, sr, sv, th, tr, uk, vn, zh-cn, zh-tw

您可以查看代码中的[LANGS](https://github.com/rustdesk/rustdesk/blob/master/src/lang.rs#L45)获取最新的语言列表。

### allow-auto-record-incoming

自动录制传入会话。

**位置**：

1. **桌面** 设置 → 常规 → 录制 → 自动录制传入会话
2. **移动端** 设置 → 录制 → 自动录制传入会话

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `allow-auto-record-incoming=Y` |

### allow-auto-record-outgoing

自动录制传出会话。

**位置**：

1. **桌面** 设置 → 常规 → 录制 → 自动录制传出会话
2. **移动端** 设置 → 录制 → 自动录制传出会话

| 安装需要 | 值 | 默认值 | 示例 | 版本 |
| :------: | :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `allow-auto-record-outgoing=Y` | >= 1.3.2 |

### video-save-directory

保存录制视频的目录。

**位置**：

1. **桌面** 设置 → 常规 → 录制 → 视频保存目录
2. **移动端** 设置 → 录制

默认值：

1. **macOS** ~/Movies/**app_name**
2. **Linux** ~/Videos/**app_name**
3. **Windows** %USERPROFILE%\Videos\\**app_name**
4. **Android** /Storage/emulated/0/**app_name**/ScreenRecord

**注意**：替换**app_name**表示当前应用名称。

### enable-confirm-closing-tabs

控制是否在关闭所有远程标签之前显示确认对话框。

**位置**：

1. **桌面** 设置 → 常规 → 其他 → 关闭多个标签前确认
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-confirm-closing-tabs=Y` |

### enable-abr

启用自适应比特率。

**位置**：

1. **桌面** 设置 → 常规 → 其他 → 自适应比特率
2. **移动端** 设置 → 屏幕共享 → 自适应比特率（测试版）

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-abr=Y` |

### allow-remove-wallpaper

在传入会话期间移除壁纸。

**位置**：

1. **桌面** 设置 → 常规 → 其他 → 传入会话期间移除壁纸
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `allow-remove-wallpaper=N` |

### enable-open-new-connections-in-tabs

控制是否使用新标签或新窗口打开新连接。

**位置**：

1. **桌面** 设置 → 常规 → 其他 → 在新标签中打开连接
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-open-new-connections-in-tabs=Y` |

### allow-always-software-render

始终使用软件渲染。

**位置**：

1. **桌面** 设置 → 常规 → 其他 → 始终使用软件渲染
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `allow-always-software-render=N` |

### allow-linux-headless

如果没有显示器，允许传入连接。

此选项需要桌面环境、Xorg服务器和GDM，请参阅[PR 3902](https://github.com/rustdesk/rustdesk/pull/3902)。

**位置**：

1. **桌面** 设置 → 常规 → 其他 → 允许Linux无头模式
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 是 | Y, N | N | `allow-linux-headless=N` |

### enable-hwcodec

启用硬件编码以使画面更流畅。

**位置**：

1. **桌面**
2. **移动端** 设置 → 硬件编解码器

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | Y | `enable-hwcodec=Y` |

### peer-card-ui-type

控制对等端卡片的视图，包括"大磁贴"、"小磁贴"和"列表"。

**位置**：

1. **桌面** 首页 → 对等端面板 → 右上角网格图标
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | 0, 1, 2 | 0 | `peer-card-ui-type=0` |

**0** 大磁贴  
**1** 小磁贴  
**2** 列表

### peer-sorting

控制对等端卡片的排序。

**位置**：

1. **桌面** 首页 → 对等端面板 → 右上角排序图标
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Remote ID, Remote Host, Username | Remote ID | `peer-sorting=Remote ID` |

### sync-ab-with-recent-sessions

控制是否将通讯录与最近会话同步。

**位置**：

1. **桌面** 首页 → 对等端面板 → 通讯录 → 标签 → 下拉菜单 → 与最近会话同步
2. **移动端** 首页 → 对等端面板 → 通讯录 → 标签 → 下拉菜单 → 与最近会话同步

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `sync-ab-with-recent-sessions=N` |

### sync-ab-tags

控制是否对通讯录标签进行排序。

**位置**：

1. **桌面** 首页 → 对等端面板 → 通讯录 → 标签 → 下拉菜单 → 标签排序
2. **移动端** 首页 → 对等端面板 → 通讯录 → 标签 → 下拉菜单 → 标签排序

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `sync-ab-tags=N` |

### filter-ab-by-intersection

按标签交集过滤通讯录。

**预览**：[PR #5985](https://github.com/rustdesk/rustdesk/pull/5985)

**位置**：

1. **桌面** 首页 → 对等端面板 → 通讯录 → 标签 → 下拉菜单 → 按交集过滤
2. **移动端** 首页 → 对等端面板 → 通讯录 → 标签 → 下拉菜单 → 按交集过滤

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `filter-ab-by-intersection=N` |

### use-texture-render

**位置**:

**桌面端** 设置 → 通用 → 其他 → 使用纹理渲染

使用纹理渲染可以使画面更流畅。如果遇到渲染问题，可以尝试禁用此选项。仅在桌面端可用。

| 可选值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | linux:Y, macOS:N, win7:N, win10+:Y | `use-texture-render=Y` |

### enable-udp-punch

**位置**:

**桌面端** 设置 → 通用 → 其他 → 启用 UDP 打洞
**移动端** 设置 → 启用 UDP 打洞

自 RustDesk 1.4.1, RustDesk Server Pro 1.6.2 起可用

| 可选值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | Y | `enable-udp-punch=N` |

### enable-ipv6-punch

**位置**:

**桌面端** 设置 → 通用 → 其他 → 启用 IPv6 P2P 连接
**移动端** 设置 → 通用 → 其他 → 启用 IPv6 P2P 连接

自 RustDesk 1.4.1, RustDesk Server Pro 1.6.2 起可用

| 可选值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | selfhost:N, 其它:Y | `enable-ipv6-punch=N` |

## 显示设置

### view-only

此选项将为每个对等端在首次连接后设置"仅查看"选项。

然后每个对等端设置中的"仅查看"选项将控制连接是否为仅查看模式。

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 查看模式
2. **移动端** 设置 → 显示设置 → 其他默认选项 → 查看模式

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `view-only=Y` |

### show-monitors-toolbar

控制是否在工具栏中显示监视器。

![show-monitors-toolbar](/docs/en/self-host/client-configuration/advanced-settings/images/show-monitors-toolbar.png)

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 显示监视器工具栏
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `show-monitors-toolbar=Y` |

### collapse-toolbar

控制连接后远程工具栏是否折叠。

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 折叠工具栏
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `collapse-toolbar=Y` |

### show-remote-cursor

此选项将为每个对等端在首次连接后设置"显示远程光标"选项。

然后每个对等端设置中的"显示远程光标"选项将控制是否在远程控制页面中显示远程光标。

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 显示远程光标
2. **移动端** 设置 → 显示设置 → 其他默认选项 → 显示远程光标

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `show-remote-cursor=N` |

### follow-remote-cursor

此选项将为每个对等端在首次连接后设置"跟随远程光标"选项。

然后每个对等端设置中的"跟随远程光标"选项将控制是否跟随远程光标。

**预览**：[PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 跟随远程光标
2. **移动端** 设置 → 显示设置 → 其他默认选项 → 跟随远程光标

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `follow-remote-cursor=Y` |

### follow-remote-window

此选项将为每个对等端在首次连接后设置"跟随远程窗口"选项。

然后每个对等端设置中的"跟随远程窗口"选项将控制是否跟随远程窗口。

**预览**：[PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 跟随远程窗口焦点
2. **移动端** 设置 → 显示设置 → 其他默认选项 → 跟随远程窗口焦点

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `follow-remote-window=Y` |

### zoom-cursor

此选项将为每个对等端在首次连接后设置"缩放光标"选项。

每个对等端设置中的"缩放光标"选项将控制光标是否根据当前图像缩放进行缩放。

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 缩放光标
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `zoom-cursor=Y` |

### show-quality-monitor

此选项将为每个对等端在首次连接后设置"显示质量监视器"选项。

每个对等端设置中的"显示质量监视器"选项将控制是否显示质量监视器。

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 显示质量监视器
2. **移动端** 设置 → 显示设置 → 其他默认选项 → 显示质量监视器

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `show-quality-monitor=Y` |

### disable-audio

此选项将为每个对等端在首次连接后设置"禁用音频"选项。

每个对等端设置中的"禁用音频"选项将控制是否播放声音。

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 静音
2. **移动端** 设置 → 显示设置 → 其他默认选项 → 静音

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `disable-audio=Y` |

### enable-file-copy-paste

此选项将为每个对等端在首次连接后设置"启用文件复制粘贴"选项。

每个对等端设置中的"启用文件复制粘贴"选项将控制是否在连接中启用文件复制粘贴。

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 启用文件复制粘贴（仅Windows）
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `enable-file-copy-paste=Y` |

### disable-clipboard

此选项将为每个对等端在首次连接后设置"禁用剪贴板"选项。

每个对等端设置中的"禁用剪贴板"选项将控制是否启用文本复制粘贴。

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 禁用剪贴板
2. **移动端** 设置 → 显示设置 → 其他默认选项 → 禁用剪贴板

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `disable-clipboard=Y` |

### lock-after-session-end

此选项将为每个对等端在首次连接后设置"会话结束后锁定"选项。

每个对等端设置中的"会话结束后锁定"选项将控制会话结束后是否锁定对等机器。

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 会话结束后锁定
2. **移动端** 设置 → 显示设置 → 其他默认选项 → 会话结束后锁定

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `lock-after-session-end=Y` |

### privacy-mode

此选项将为每个对等端在首次连接后设置"隐私模式"选项。

每个对等端设置中的"隐私模式"选项将控制连接后是否使用隐私模式。

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 隐私模式
2. **移动端** 设置 → 显示设置 → 其他默认选项 → 隐私模式

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `privacy-mode=Y` |

### touch-mode

此选项将为每个对等端在首次连接后设置"触控模式"选项。

每个对等端设置中的"触控模式"选项将控制是否使用触控模式或鼠标模式。

**位置**：

1. **桌面**
2. **移动端** 设置 → 显示设置 → 其他默认选项 → 触控模式

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `touch-mode=Y` |

### i444

此选项将为每个对等端在首次连接后设置"i444"选项。

每个对等端设置中的"i444"选项将控制是否使用真彩色。

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 真彩色（4:4:4）
2. **移动端** 设置 → 显示设置 → 其他默认选项 → 真彩色（4:4:4）

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `i444=Y` |

### reverse-mouse-wheel

此选项将为每个对等端在首次连接后设置"反转鼠标滚轮"选项。

每个对等端设置中的"反转鼠标滚轮"选项将控制是否反转鼠标滚轮。

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 反转鼠标滚轮
2. **移动端** 设置 → 显示设置 → 其他默认选项 → 反转鼠标滚轮

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `reverse-mouse-wheel=Y` |

### swap-left-right-mouse

此选项将为每个对等端在首次连接后设置"交换左右鼠标按钮"选项。

每个对等端设置中的"交换左右鼠标按钮"选项将控制是否交换左右鼠标按钮。

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 交换左右鼠标按钮
2. **移动端** 设置 → 显示设置 → 其他默认选项 → 交换左右鼠标按钮

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `swap-left-right-mouse=Y` |

### displays-as-individual-windows

此选项将为每个对等端在首次连接后设置"显示为单独窗口"选项。

每个对等端设置中的"显示为单独窗口"选项将控制是否将显示器显示为单独的窗口。

**预览**：[PR 5945](https://github.com/rustdesk/rustdesk/pull/5945)

**位置**：

1. **桌面** 设置 → 显示 → 其他默认选项 → 将显示器显示为单独窗口
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `displays-as-individual-windows=Y` |

### use-all-my-displays-for-the-remote-session

此选项将在首次连接后为每个设备设置“use-all-my-displays-for-the-remote-session”选项。

然后，每个设备设置中的“use-all-my-displays-for-the-remote-session”选项将控制是否为远程会话使用我的所有显示器。

**位置**:

1. **桌面端** 设置 → 显示 → 其他默认选项 → 为远程会话使用我的所有显示器
2. **移动端** 设置 → 显示设置 → 其他默认选项 → 为远程会话使用我的所有显示器

| 是否需要安装 | 可选值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `use-all-my-displays-for-the-remote-session=Y` |

### view-style

此选项将在首次连接后为每个设备设置“view-style”选项。

每个对等端设置中的"查看样式"选项将控制查看样式。

**位置**：

1. **桌面** 设置 → 显示 → 默认查看样式
2. **移动端** 设置 → 显示设置 → 默认查看样式

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | original, adaptive | original | `view-style=original` |

### scroll-style

此选项将为每个对等端在首次连接后设置"滚动样式"选项。

每个对等端设置中的"滚动样式"选项将控制滚动样式。

**位置**：

1. **桌面** 设置 → 显示 → 默认滚动样式
2. **移动端**

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | scrollauto, scrollbar | scrollauto | `scroll-style=scrollauto` |

### image-quality

此选项将为每个对等端在首次连接后设置"图像质量"选项。

每个对等端设置中的"图像质量"选项将控制图像质量。

**位置**：

1. **桌面** 设置 → 显示 → 默认图像质量
2. **移动端** 设置 → 显示设置 → 默认图像质量

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | best, balanced, low, custom | balanced | `image-quality=balanced` |

### custom-image-quality

此选项将为每个对等端在首次连接后设置"自定义图像质量"选项。

如果"图像质量"设置为自定义，每个对等端设置中的"自定义图像质量"选项将控制图像质量。

**位置**：

1. **桌面** 设置 → 显示 → 默认图像质量 → 自定义
2. **移动端** 设置 → 显示设置 → 默认图像质量 → 自定义

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | [10.0, 2000.0] | 50.0 | `custom-image-quality=50` |

### custom-fps

此选项将为每个对等端在首次连接后设置"自定义帧率"选项。

如果"图像质量"设置为自定义，每个对等端设置中的"自定义帧率"选项将控制帧率。

**位置**：

1. **桌面** 设置 → 显示 → 默认图像质量 → 自定义
2. **移动端** 设置 → 显示设置 → 默认图像质量 → 自定义

| 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | [5, 120] | 30 | `custom-fps=30` |

### codec-preference

此选项将在首次连接后为每个设备设置“codec-preference”选项。

然后，每个设备设置中的“codec-preference”选项将控制设备的首选编解码器。

**警告**: 除“vp8”和“vp9”以外的选项可能无法工作。这取决于您的设备支持。

### terminal-persistent

此选项将在首次连接后为每个设备设置“terminal-persistent”选项。

然后，每个设备设置中的“terminal-persistent”选项将控制断开连接时是否保留终端会话。

**位置**:

1. **桌面端** 设置 → 显示 → 其他默认选项 → 断开连接时保留终端会话
2. **移动端** 设置 → 显示设置 → 其他默认选项 → 断开连接时保留终端会话

| 是否需要安装 | 可选值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | Y, N | N | `terminal-persistent=Y` |

### trackpad-speed

此选项将在首次连接后为每个设备设置“trackpad-speed”选项。

然后，每个设备设置中的“trackpad-speed”选项将控制“trackpad-speed”设置为自定义时的 fps。

**位置**:

1. **桌面端** 设置 → 显示 → 默认触控板速度
2. **移动端** 设置 → 显示设置 → 默认触控板速度

| 是否需要安装 | 可选值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| 否 | [10, 1000] | 100 | `trackpad-speed=100` |

## 其他

### preset-address-book-name & preset-address-book-tag

预设通讯录名称和标签，https://github.com/rustdesk/rustdesk-server-pro/issues/257。
如果不想设置标签，可以仅设置preset-address-book-name。
请在Web控制台的通讯录页面上使用有效的通讯录名称和标签。

| 选项 | 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: | :------: |
| preset-address-book-name | 否 | | | `preset-address-book-name=<通讯录名称>` |
| preset-address-book-tag | 否 | | | `preset-address-book-tag=<通讯录标签名称>` |

### disable-group-panel

在RustDesk客户端上禁用组面板（在通讯录面板旁边，自1.3.8版本起命名为"可访问设备"），https://github.com/rustdesk/rustdesk-server-pro/issues/250。

| 选项 | 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: | :------: |
| disable-group-panel | 否 | Y, N | N | `disable-group-panel=Y` |

### pre-elevate-service

Windows便携版运行时自动提升权限，https://github.com/rustdesk/rustdesk-server-pro/issues/252。

| 选项 | 安装需要 | 值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: | :------: |
| pre-elevate-service | 否 | Y, N | N | `pre-elevate-service=Y` |

### disable-floating-window

当Android服务启动时，它会显示一个浮动窗口，这有助于防止系统杀死RustDesk服务。

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `disable-floating-window=Y` |

### floating-window-size

当Android服务启动时，它会显示一个浮动窗口，这有助于防止系统杀死RustDesk服务。当大小小于120时，浮动窗口将难以被点击。非常小的尺寸可能无法在某些设备上保持后台服务。

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| [32, 320] | 120 | `floating-window-size=120` |

### floating-window-untouchable

默认情况下，点击浮动窗口会弹出菜单。设置为"不可触摸"后，点击或滑动将穿过浮动窗口并传输到底层窗口。设置为"不可触摸"后，浮动窗口的位置无法更改，系统可能会自动将浮动窗口设置为半透明。但是，此功能可能在少数应用程序中不起作用，例如GitHub应用。

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `floating-window-untouchable=Y` |

### floating-window-transparency

Android浮动窗口具有可调节的透明度。如果要启用但隐藏浮动窗口，可以将透明度设置为0，浮动窗口将自动设置为"不可触摸"以穿透点击事件。

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| [0, 10] | 10 | `floating-window-transparency=5` |

### floating-window-svg

如果没有为Android浮动窗口设置图标，它将默认显示RustDesk图标。
设置时，请将SVG的文本内容写成一行，并注意[SVG支持限制](https://bigbadaboom.github.io/androidsvg/index.html)。

| 默认值 | 示例 |
| :------: | :------: |
| RustDesk图标 | `floating-window-svg=<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1717559129252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4248" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M950.857143 512c0 242.285714-196.571429 438.857143-438.857143 438.857143S73.142857 754.285714 73.142857 512 269.714286 73.142857 512 73.142857s438.857143 196.571429 438.857143 438.857143z" fill="#1296db" p-id="4249"></path></svg>` |

### keep-screen-on

这是针对Android受控端的。请注意，保持屏幕开启依赖于浮动窗口。

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| never, during-controlled, service-on | during-controlled | `keep-screen-on=never` |

### enable-directx-capture

这是针对Windows受控端的。如果没有遇到任何问题，建议使用默认设置，优先使用DirectX进行截图而不是直接使用GDI。

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | Y | `enable-directx-capture=N` |

### enable-android-software-encoding-half-scale

这是针对Android受控端的。默认情况下，当分辨率大于1200时，硬件编码使用原始分辨率，而软件编码使用一半分辨率，因为软件编码较慢。此选项用于设置软件编码是否应缩放到一半分辨率。

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | Y | `enable-android-software-encoding-half-scale=N` |

### allow-remote-cm-modification

控制是否允许控制端点击连接管理窗口来接受连接、更改权限等。

https://github.com/rustdesk/rustdesk/issues/7425

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-remote-cm-modification=Y` |

### remove-preset-password-warning

控制当自定义客户端中有预设密码时是否移除GUI上的安全警告。

https://github.com/rustdesk/rustdesk-server-pro/discussions/286

https://github.com/rustdesk/rustdesk/discussions/7956

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | Y | `remove-preset-password-warning=Y` |

### hide-security-settings / hide-network-settings / hide-server-settings / hide-proxy-settings / hide-websocket-settings / hide-remote-printer-settings

控制是否隐藏某些设置。请确保`禁用设置`已关闭，否则这些不会生效。

https://github.com/rustdesk/rustdesk-server-pro/issues/263

https://github.com/rustdesk/rustdesk-server-pro/issues/276

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `hide-security-settings=Y` |

### hide-username-on-card

控制是否在设备列表中显示用户名。因为有时用户名太长，会隐藏其他信息。

https://github.com/rustdesk/rustdesk-server-pro/issues/284#issuecomment-2216521407

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `hide-username-on-card=Y` |

### hide-help-cards

控制是否在GUI上显示UAC/权限警告。

https://github.com/rustdesk/rustdesk/issues/8687

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `hide-help-cards=Y` |

### display-name

更改将在连接到远程设备时弹出窗口中显示的显示名称。默认情况下，它首先显示登录用户的名称，否则显示您的操作系统用户名。

https://github.com/rustdesk/rustdesk-server-pro/issues/277

### disable-udp

控制是否仅使用TCP。它将不再使用UDP 21116，而是使用TCP 21116。

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `disable-udp=Y` |

### preset-user-name / preset-strategy-name / preset-device-group-name

将用户/策略/设备组分配给设备。您也可以通过[命令行](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/#assign-device-usersgroupsstrategies-to-devices)执行此操作。

https://github.com/rustdesk/rustdesk-server-pro/discussions/304

设备组在RustDesk客户端>=1.3.8、pro >= 1.5.0中可用

### default-connect-password

您使用`默认连接密码`来建立到远程设备的连接。此密码在控制端配置，不应与受控（仅传入）客户端上找到的任何[预设密码](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-can-we-set-up-a-client-with-a-fixed-password-for-unattended-remote-access)混淆。

例如 `default-connect-password=abcd1234`

### enable-trusted-devices

允许受信任的设备跳过2FA验证。

https://github.com/rustdesk/rustdesk/discussions/8513#discussioncomment-10234494

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | Y | `enable-trusted-devices=N` |

### hide-tray

禁用系统托盘中的托盘图标。

https://github.com/rustdesk/rustdesk-server-pro/issues/332

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `hide-tray=Y` |

### one-way-clipboard-redirection

禁用从受控端到控制端的剪贴板同步，在RustDesk客户端>=1.3.1（受控端）中可用

https://github.com/rustdesk/rustdesk/discussions/7837

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `one-way-clipboard-redirection=Y` |

### one-way-file-transfer

禁用从受控端到控制端的文件传输，在RustDesk客户端>=1.3.1（受控端）中可用

https://github.com/rustdesk/rustdesk/discussions/7837

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `one-way-file-transfer=Y` |


### sync-init-clipboard

建立连接时是否同步初始剪贴板（仅从控制端到受控端），在RustDesk客户端>=1.3.1（控制端）中可用

https://github.com/rustdesk/rustdesk/discussions/9010

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `sync-init-clipboard=Y` |

### allow-logon-screen-password

在使用[仅点击批准模式](https://rustdesk.com/docs/en/self-host/client-configuration/advanced-settings/#approve-mode)时是否允许在登录屏幕上输入密码，在RustDesk客户端>=1.3.1（受控端）中可用

https://github.com/rustdesk/rustdesk/discussions/9269

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-logon-screen-password=Y` |

### allow-https-21114

通常，HTTPS使用端口443。当API服务器的端口错误地设置为21114时，RustDesk客户端默认会移除21114端口设置。将选项设置为Y允许使用21114作为HTTPS端口。在RustDesk客户端>=1.3.9中可用。

https://github.com/rustdesk/rustdesk-server-pro/discussions/570

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-https-21114=Y` |

### allow-d3d-render

D3D渲染可以获得高帧率并减少CPU使用率，但在某些设备上远程控制屏幕可能会变黑。在RustDesk客户端>=1.3.9中可用，仅Windows。

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-d3d-render=Y` |


### allow-hostname-as-id

[使用主机名作为ID](https://github.com/rustdesk/rustdesk-server-pro/discussions/483)，主机名中的空格会被替换为'-'。这不是100%保证的，只在第一次运行RustDesk客户端时发生（即在新安装的客户端上）；如果发生冲突，将分配一个随机ID。

在RustDesk客户端版本1.4.0及更高版本中可用。

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-hostname-as-id=Y` |

### allow-websocket

使用WebSocket协议连接服务器和客户端。仅在RustDesk客户端>=1.4.0和Pro服务器>= 1.5.7中可用。请注意，WebSocket仅支持中继连接。

要使WebSocket工作，您需要正确配置反向代理， https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#8-add-websocket-secure-wss-support-for-the-id-server-and-relay-server-to-enable-secure-communication-for-all-platforms

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-websocket=Y` |

### allow-numeric-one-time-password

此选项启用或禁用仅数字一次性密码的使用。
仅在RustDesk客户端>=1.4.1和Pro服务器>= 1.5.9中可用。

**讨论**： https://github.com/rustdesk/rustdesk-server-pro/discussions/685

**预览**： https://github.com/rustdesk/rustdesk/pull/11846

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-numeric-one-time-password=Y` |

### register-device

不注册设备，您不会在Web控制台的设备页面中看到它。

**仅在Pro服务器>= 1.6.0中可用，需要[custom2许可证](https://rustdesk.com/pricing#custom2)且并发连接数>= 2。**

如果`register-device=N`，以下功能对此设备不起作用。
- 登录
- `--assign`命令
- `preset-address-book-name`, `--preset-address-book-tag`, `preset-user-name`, `preset-strategy-name`, `preset-device-group-name`
- 审计日志
- 策略

**讨论**： https://github.com/rustdesk/rustdesk-server-pro/discussions/672 和 https://github.com/rustdesk/rustdesk-server-pro/discussions/182

| 值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | Y | `register-device=N` |

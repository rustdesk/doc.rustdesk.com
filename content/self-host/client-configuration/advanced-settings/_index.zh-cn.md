---
title: 高级设置
weight: 49
---

## 设置项的优先级

一共有 4 中类型的设置项：

1. 覆盖设置, 在 "Web Console -> Custom Clients" 中。
1. 默认设置, 在 "Web Console -> Custom Clients" 中。
1. 用户设置, 在 RustDesk 客户端中。
1. 策略设置, 在 "Web Console -> Strategies" 中。

这些设置的优先级是：`覆盖 > 策略 > 用户 > 默认`。

## 安全设置

### access-mode

设置传入连接的访问模式（权限）。

**位置**:

1. **桌面端** 设置 -> 安全 -> 权限
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | custom, full, view | custom | `access-mode=custom` |

### enable-keyboard

允许传入连接控制键盘/鼠标。

**位置**:

1. **桌面端** 设置 -> 安全 -> 权限 -> 允许控制键盘/鼠标
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-keyboard=Y` |

### enable-clipboard

允许使用粘贴板。

**位置**:

1. **桌面端** 设置 -> 安全 -> 权限 -> 允许同步粘贴板
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-clipboard=Y` |

### enable-file-transfer

允许文件复制和粘贴或文件传输（会话）。

**位置**:

1. **桌面端** 设置 -> 安全 -> 权限 -> 允许传输文件
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-file-transfer=Y` |

### enable-audio

允许音频录制并传输给控制端。

**位置**:

1. **桌面端** 设置 -> 安全 -> 权限 -> 允许传输音频
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-audio=Y` |

### enable-tunnel

允许建立 TCP 隧道。

**位置**:

1. **桌面端** 设置 -> 安全 -> 权限 -> 允许建立 TCP 隧道
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-tunnel=Y` |

### enable-remote-restart

允许远程重启。

**位置**:

1. **桌面端** 设置 -> 安全 -> 权限 -> 允许远程重启
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-remote-restart=Y` |

### enable-record-session

允许录制会话。

**位置**:

1. **桌面端** 设置 -> 安全 -> 权限 -> 允许录制会话
1. **移动端** 设置 -> 共享屏幕 -> 允许录制会话

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-record-session=Y` |

### enable-block-input

允许控制端阻止其他用户的输入。

**位置**:

1. **桌面端** 设置 -> 安全 -> 权限 -> 允许阻止用户输入 (仅支持 Windows)
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-block-input=Y` |

### allow-remote-config-modification

允许控制方更改受控 RustDesk UI 中的设置。

**位置**:

1. **桌面端** 设置 -> 安全 -> 权限 -> 允许远程修改配置
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `allow-remote-config-modification=Y` |

### enable-lan-discovery

允许局域网发现。

局域网发现后, 如果支持 [WOL](https://en.wikipedia.org/wiki/Wake-on-LAN) , 则可使用 WOL 。

**位置**:

1. **桌面端** 设置 -> 安全 -> 安全 -> 拒绝局域网发现
1. **移动端** 设置 -> 共享屏幕 -> 拒绝局域网发现

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| Y | Y, N | Y | `enable-lan-discovery=Y` |

### direct-server

允许 IP 直接访问。

**位置**:

1. **桌面端** 设置 -> 安全 -> 安全 -> 允许 IP 直接访问
1. **移动端** 设置 -> 共享屏幕 -> IP 直接访问

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `direct-server=Y` |

### direct-access-port

IP 直接访问的端口。

**位置**:

1. **桌面端** 设置 -> 安全 -> 安全 -> "允许 IP 直接访问" 后显示
1. **移动端** 设置 -> 共享屏幕 -> IP 直接访问项中的 编辑 按钮

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N |  | 21118 | `direct-access-port=21118` |

### whitelist

只允许白名单上的 IP 访问。

**位置**:

1. **桌面端** 设置 -> 安全 -> 安全 -> 只允许白名单上的 IP 访问
1. **移动端** 设置 -> 共享屏幕 -> 只允许白名单上的 IP 访问

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | `,` 或者 `<ip1>,<ip2>,<ip3>` | `,` 表示不过滤 | `whitelist=,` |

### allow-auto-disconnect & auto-disconnect-timeout

用户不活动一段时间后自动关闭会话。

**位置**:

1. **桌面端** 设置 -> 安全 -> 安全 -> 自动关闭不活跃的会话
1. **移动端** 设置 -> 共享屏幕 -> 自动关闭不活跃的会话

| 设置项 | 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: | :------: |
| allow-auto-disconnect | N | Y, N | N | `allow-auto-disconnect=Y` |
| auto-disconnect-timeout | N | 按分钟计的超时时间 | 10 | `auto-disconnect-timeout=10` |

### allow-only-conn-window-open

仅当 RustDesk 窗口打开时才允许连接。

**位置**:

1. **桌面端** 设置 -> 安全 -> 安全 -> 仅当 RustDesk 窗口打开时允许连接
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-only-conn-window-open=N` |

### approve-mode

通过密码或手动单击接受传入连接。

**位置**:

1. **桌面端** 设置 -> 安全 -> 密码 -> 下拉框
1. **移动端** 共享屏幕 -> 右上角的下拉菜单

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | password, click, password-click | password-click | `approve-mode=password-click` |

### verification-method

可以使用什么类型的密码，"临时密码"是指一次性随机密码。

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | use-temporary-password, use-permanent-password, use-both-passwords | use-both-passwords | `verification-method=use-permanent-password` |

### proxy-url

代理的 url 。

目前支持 `http` 和 `socks5` 。

**位置**:

1. **桌面端** 设置 -> 网络 -> 代理 -> Socks5/Http(s) 代理
1. **移动端**

示例:

1. **http** `proxy-url=http://192.168.0.2:12345`
1. **https** `proxy-url=https://192.168.0.2:12345`
1. **socks5** `proxy-url=socks5://192.168.0.2:1080`

### proxy-username & proxy-password

代理的 用户名 和 密码。

**位置**:

1. **桌面端** 设置 -> 网络 -> 代理 -> Socks5/Http(s) 代理
1. **移动端**

| 设置项 | 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: | :------: |
| proxy-username | N | | | `proxy-username=user` |
| proxy-password | N | | | `proxy-password=pass` |

## 常规设置

### theme

控制 RustDesk 客户端的 UI 主题。

**位置**:

1. **桌面端** 设置 -> 常规 -> 主题
1. **移动端** 设置 -> 设置 -> 主题

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | dark, light, system | system | `theme=system` |

### lang

控制 RustDesk 客户端的语言。

**位置**:

1. **桌面端** 设置 -> 常规 -> 语言
1. **移动端** 设置 -> 设置 -> 语言

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | default, ar, bg, ... | default | `lang=default` |

当前可用的语言有:

ar, bg, ca, cs, da, de, el, en, eo, es, et, fa, fr, he, hr, hu, id, it, ja, ko, kz, lt, lv, nb, nl, pl, pt, ro, ru, sk, sl, sq, sr, sv, th, tr, uk, vn, zh-cn, zh-tw

您可以查看代码中的 [LANGS](https://github.com/rustdesk/rustdesk/blob/master/src/lang.rs#L45) 获取最新的语言列表。

### allow-auto-record-incoming

自动录制传入会话。

**位置**:

1. **桌面端** 设置 -> 常规 -> 录屏 -> 自动录制传入会话
1. **移动端** 设置 -> 录屏 -> 自动录制传入会话

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-incoming=Y` |

### allow-auto-record-outgoing

自动录制传出会话。

**位置**:

1. **桌面端** 设置 -> 常规 -> 录屏 -> 自动录制传出会话
1. **移动端** 设置 -> 录屏 -> 自动录制传出会话

| 是否需要安装 | 可设值 | 默认值 | 示例 | 版本 |
| :------: | :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-auto-record-outgoing=Y` | >= 1.3.2 |

### video-save-directory

保存录制的视频的目录。

**位置**:

1. **桌面端** 设置 -> 常规 -> 录屏 -> 目录
1. **移动端** 设置 -> 录屏

默认值:

1. **MacOS** ~/Movies/**app_name**
1. **Linux** ~/Videos/**app_name**
1. **Windows** %USERPROFILE%\Videos\\**app_name**
1. **Android** /Storage/emulated/0/**app_name**/ScreenRecord

**Note**: **app_name** 代表当前的 app 名。

### enable-confirm-closing-tabs

控制在关闭所有远程选项卡之前是否显示确认对话框。

**位置**:

1. **桌面端** 设置 -> 常规 -> 其他 -> 关闭多个标签时向您确认
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-confirm-closing-tabs=Y` |

### enable-abr

启用自适应码率。

**位置**:

1. **桌面端** 设置 -> 常规 -> 其他 -> 自适应码率
1. **移动端** 设置 -> 共享屏幕 -> 自适应码率 (beta)

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-abr=Y` |

### allow-remove-wallpaper

接受会话时移除桌面壁纸。

**位置**:

1. **桌面端** 设置 -> 常规 -> 其他 -> 接受会话时移除桌面壁纸
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-remove-wallpaper=N` |

### enable-open-new-connections-in-tabs

控制是否使用新选项卡或新窗口来打开新连接。

**位置**:

1. **桌面端** 设置 -> 常规 -> 其他 -> 在选项卡中打开新连接
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-open-new-connections-in-tabs=Y` |

### allow-always-software-render

始终使用软渲染。

**位置**:

1. **桌面端** 设置 -> 常规 -> 其他 -> 始终使用软渲染
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `allow-always-software-render=N` |

### allow-linux-headless

在没有显示器的时候, 允许传入会话。

启用次选项, 需要桌面环境, xorg 服务 和 gdm, 参考 [PR 3902](https://github.com/rustdesk/rustdesk/pull/3902).

**位置**:

1. **桌面端** 设置 -> 常规 -> 其他 -> Allow linux headless
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| Y | Y, N | N | `allow-linux-headless=N` |

### enable-hwcodec

启用硬件编码, 使画面更加流畅。

**位置**:

1. **桌面端**
1. **移动端** 设置 -> 硬件编解码

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | Y | `enable-hwcodec=Y` |

### peer-card-ui-type

控制 peer 卡片 的视图, 包括 "大磁贴"、"小磁贴" 和 "列表"。

**Location**:

1. **Desktop** 主页 -> Peer 面板 -> 右上角的网格图标
1. **Mobile**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | 0, 1, 2 | 0 | `peer-card-ui-type=0` |

**0** "大磁贴"  
**1** "小磁贴"  
**2** "列表"

### peer-sorting

控制 peer 卡片 的顺序。

**Location**:

1. **Desktop** 主页 -> Peer 面板 -> 右上角的排序图标
1. **Mobile**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Remote ID, Remote Host, Username | Remote ID | `peer-sorting=Remote ID` |

### sync-ab-with-recent-sessions

控制是否将地址簿与最近的会话同步。

**位置**:

1. **桌面端** 主页 -> Peer 面板 -> 地址簿 -> 标签 -> 下拉菜单 -> 同步最近会话
1. **移动端** 主页 -> Peer 面板 -> 地址簿 -> 标签 -> 下拉菜单 -> 同步最近会话

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-with-recent-sessions=N` |

### sync-ab-tags

控制是否对通讯录标签进行排序。

**位置**:

1. **桌面端** 主页 -> Peer 面板 -> 地址簿 -> 标签 -> 下拉菜单 -> 对标签进行排序
1. **移动端** 主页 -> Peer 面板 -> 地址簿 -> 标签 -> 下拉菜单 -> 对标签进行排序

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `sync-ab-tags=N` |

### filter-ab-by-intersection

按标签交集过滤地址簿。

**预览**: [PR #5985](https://github.com/rustdesk/rustdesk/pull/5985)

**位置**:

1. **桌面端** 主页 -> Peer 面板 -> 地址簿 -> 标签 -> 下拉菜单 -> 按交集过滤
1. **移动端** 主页 -> Peer 面板 -> 地址簿 -> 标签 -> 下拉菜单 -> 按交集过滤

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `filter-ab-by-intersection=N` |

## 显示设置

### view-only

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "view-only"。

被控端设置中的 "view-only" 会控制连接是否为浏览模式。

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 浏览模式
1. **移动端** 设置 -> 显示设置 -> 其他默认选项 -> 浏览模式

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `view-only=Y` |

### show-monitors-toolbar

控制是否在工具栏上显示监视器列表。

![show-monitors-toolbar](/docs/en/self-host/client-configuration/advanced-settings/images/show-monitors-toolbar.png)

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 在工具栏上显示监视器。
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-monitors-toolbar=Y` |

### collapse-toolbar

控制连接建立后, 是否折叠工具栏。

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 折叠工具栏
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `collapse-toolbar=Y` |

### show-remote-cursor

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "show-remote-cursor"。

被控端设置中的 "show-remote-cursor" 会控制是否显示被控端的光标。

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 显示远程光标
1. **移动端** 设置 -> 显示设置 -> 其他默认选项 -> 显示远程光标

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-remote-cursor=N` |

### follow-remote-cursor

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "follow-remote-cursor"。

被控端设置中的 "follow-remote-cursor" 控制画面是否跟随远程光标。

**预览** [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 跟随远程光标
1. **移动端** 设置 -> 显示设置 -> 其他默认选项 -> 跟随远程光标

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-cursor=Y` |

### follow-remote-window

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "follow-remote-window"。

被控端设置中的 "follow-remote-window" 控制画面是否跟随远程窗口焦点。

**预览** [PR 7717](https://github.com/rustdesk/rustdesk/pull/7717)

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 跟随远程窗口焦点
1. **移动端** 设置 -> 显示设置 -> 其他默认选项 -> 跟随远程窗口焦点

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `follow-remote-window=Y` |

### zoom-cursor

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "zoom-cursor"。

被控端设置中的 "zoom-cursor" 控制画面中的光标按照画面的比例进行缩放。

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 缩放光标
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `zoom-cursor=Y` |

### show-quality-monitor

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "show-quality-monitor"。

被控端设置中的 "show-quality-monitor" 控制是否显示质量监测。

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 显示质量监测
1. **移动端** 设置 -> 显示设置 -> 其他默认选项 -> 显示质量监测

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `show-quality-monitor=Y` |

### disable-audio

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "disable-audio"。

被控端设置中的 "disable-audio" 控制是否播放声音。

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 静音
1. **移动端** 设置 -> 显示设置 -> 其他默认选项 -> 静音

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-audio=Y` |

### enable-file-copy-paste

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "enable-file-copy-paste"。

被控端设置中的 "enable-file-copy-paste" 控制连接中, 是否可以复制粘贴文件。

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 静音允许复制粘贴文件 (仅支持 Windows)
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `enable-file-copy-paste=Y` |

### disable-clipboard

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "disable-clipboard"。

被控端设置中的 "disable-clipboard" 控制是否允许文本复制粘贴。

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 禁用粘贴板
1. **移动端** 设置 -> 显示设置 -> 其他默认选项 -> 禁用粘贴板

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-clipboard=Y` |

### lock-after-session-end

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "lock-after-session-end"。

被控端设置中的 "lock-after-session-end" 控制是否在连接结束后, 锁定被控端电脑。

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 会话结束后锁定远程电脑
1. **移动端** 设置 -> 显示设置 -> 其他默认选项 -> 会话结束后锁定远程电脑

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `lock-after-session-end=Y` |

### privacy-mode

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "privacy-mode"。

被控端设置中的 "privacy-mode" 控制是否在连接后, 启用隐私模式。

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 隐私模式
1. **移动端** 设置 -> 显示设置 -> 其他默认选项 -> 隐私模式

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `privacy-mode=Y` |

### touch-mode

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "touch-mode"。

被控端设置中的 "touch-mode" 控制是否在连接后, 使用触屏模式还是鼠标模式。

**位置**:

1. **桌面端**
1. **移动端** 设置 -> 显示设置 -> 其他默认选项 -> 触屏模式

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `touch-mode=Y` |

### i444

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "i444"。

被控端设置中的 "i444" 控制是否使用真彩模式 (4:4:4)。

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 真彩模式 (4:4:4)
1. **移动端** 设置 -> 显示设置 -> 其他默认选项 -> 真彩模式 (4:4:4)

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `i444=Y` |

### reverse-mouse-wheel

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "reverse-mouse-wheel"。

被控端设置中的 "reverse-mouse-wheel" 控制是否反转鼠标滚轮方向。

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 鼠标滚轮反向
1. **移动端** 设置 -> 显示设置 -> 其他默认选项 -> 鼠标滚轮反向

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `reverse-mouse-wheel=Y` |

### swap-left-right-mouse

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "swap-left-right-mouse"。

被控端设置中的 "swap-left-right-mouse" 控制是否交换鼠标左右键。

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 交换鼠标左右键
1. **移动端** 设置 -> 显示设置 -> 其他默认选项 -> 交换鼠标左右键

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `swap-left-right-mouse=Y` |

### displays-as-individual-windows

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "displays-as-individual-windows"。

被控端设置中的 "displays-as-individual-windows" 控制是否在在单个窗口打开显示器。

**预览** [PR 5945](https://github.com/rustdesk/rustdesk/pull/5945)

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 在单个窗口打开显示器
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `displays-as-individual-windows=Y` |

### use-all-my-displays-for-the-remote_session

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "use-all-my-displays-for-the-remote_session"。

被控端设置中的 "use-all-my-displays-for-the-remote_session" 控制是否在连接时, 尽量使用所有的本地显示器连接被控所有显示器。

**预览** [PR 6064](https://github.com/rustdesk/rustdesk/pull/6064)

**位置**:

1. **桌面端** 设置 -> 显示 -> 其他默认选项 -> 将我的所有显示器用于远程会话
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `use-all-my-displays-for-the-remote_session=Y` |

### view-style

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "view-style"。

被控端设置中的 "view-style" 控制是否显示方式。

**位置**:

1. **桌面端** 设置 -> 显示 -> 默认显示方式
1. **移动端** 设置 -> 显示设置 -> 默认显示方式

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | original, adaptive | original | `view-style=original` |

### scroll-style

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "scroll-style"。

被控端设置中的 "scroll-style" 控制是否滚动方式。

**位置**:

1. **桌面端** 设置 -> 显示 -> 默认滚动方式
1. **移动端**

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | scrollauto, scrollbar | scrollauto | `scroll-style=scrollauto` |

### image-quality

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "image-quality"。

被控端设置中的 "image-quality" 控制图像质量。

**位置**:

1. **桌面端** 设置 -> 显示 -> 默认图像质量
1. **移动端** 设置 -> 显示设置 -> 默认图像质量

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | best, balanced, low, custom | balanced | `image-quality=balanced` |

### custom-image-quality

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "custom-image-quality"。

被控端设置中的 "custom-image-quality" 控制图像质量（当 "image-quality" 为 custom 的时候）。

**位置**:

1. **桌面端** 设置 -> 显示 -> 默认图像质量 -> 自定义
1. **移动端** 设置 -> 显示设置 -> 默认图像质量 -> 自定义

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | [10.0, 2000.0] | 50.0 | `custom-image-quality=50` |

### custom-fps

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "custom-fps"。

被控端设置中的 "custom-fps" 控制 fps（当 "image-quality" 为 custom 的时候）。

**位置**:

1. **桌面端** 设置 -> 显示 -> 默认图像质量 -> 自定义
1. **移动端** 设置 -> 显示设置 -> 默认图像质量 -> 自定义

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | [5, 120] | 30 | `custom-fps=30` |

### codec-preference

这个选项会在第一次连接每个被控端的后, 设置关于该被控端的 "codec-preference"。

被控端设置中的 "codec-preference" 控制图像的编解码。

**Location**:

1. **桌面端** 设置 -> 显示 -> 默认编解码
1. **移动端** 设置 -> 显示设置 -> 默认编解码

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | auto, vp8, vp9, av1, h264, h265 | auto | `codec-preference=auto` |

**注意**: "vp8" 和 "vp9" 以外的选项可能不起作用。 这取决于您的机器支持什么。

### preset-address-book-name & preset-address-book-tag

预设地址簿名称和标签, https://github.com/rustdesk/rustdesk-server-pro/issues/257.
仅当您不想设置标签时，才可以设置预设地址簿名称。
请在 Web 控制台的地址簿页面上使用有效的地址簿名称和标签。

| 选项 | 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: | :------: |
| preset-address-book-name | N | | | `preset-address-book-name=<address book name>` |
| preset-address-book-tag | N | | | `preset-address-book-tag=<address book tag name>` |


### disable-group-panel

在 RustDesk 客户端上禁用组面板（地址簿面板旁边）, https://github.com/rustdesk/rustdesk-server-pro/issues/250

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `disable-group-panel=Y` |

### pre-elevate-service

Windows 非安装版运行时自动提升, https://github.com/rustdesk/rustdesk-server-pro/issues/252

| 是否需要安装 | 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: | :------: |
| N | Y, N | N | `pre-elevate-service=Y` |


### disable-floating-window

当Android服务启动时, 它会显示一个悬浮窗, 这有助于防止系统杀死RustDesk服务。

| 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `disable-floating-window=Y` |

### floating-window-size

当Android服务启动时, 它会显示一个浮动窗口, 这有助于防止系统杀死RustDesk服务。当尺寸小于120时, 浮动窗口将难以点击。设置成非常小的size时, 在有些设备上可能起不到保持后台服务的作用。

| 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| [32, 320] | 120 | `floating-window-size=120` |

### floating-window-untouchable

默认情况下, 点击浮动窗口会弹出菜单。但是将其设置为'不可触摸'状态后, 点击或滑动操作将穿透浮动窗口, 传递给下层窗口。当浮动窗口被设置为'不可触摸'状态后, 浮动窗口的位置不能再改变, 系统可能会自动将其设置为半透明。然而, 这个功能在少数应用程序中可能无法生效, 比如 GitHub 应用程序。

| 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `floating-window-untouchable=Y` |

### floating-window-transparency

Android 浮动窗口具有可调整的透明度。如果您想启用但隐藏浮动窗口, 可以将透明度设置为0, 此时浮动窗口将自动设置为'不可触摸'状态,以便能够通过点击事件进行交互操作。

| 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| [0, 10] | 10 | `floating-window-transparency=5` |

### floating-window-svg

如果没有为 Android 浮动窗口设置图标, 它将默认显示 RustDesk 图标。
设置时请将svg的文本内容写到一行里，并注意[svg支持限制](https://bigbadaboom.github.io/androidsvg/index.html)。

| 默认值 | 示例 |
| :------: | :------: |
| RustDesk icon | `floating-window-svg=<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1717559129252" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4248" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><path d="M950.857143 512c0 242.285714-196.571429 438.857143-438.857143 438.857143S73.142857 754.285714 73.142857 512 269.714286 73.142857 512 73.142857s438.857143 196.571429 438.857143 438.857143z" fill="#1296db" p-id="4249"></path></svg>` |

### keep-screen-on

用于Android 被控的。请注意，保持屏幕打开依赖于浮动窗口。

| 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| never, during-controlled, service-on | during-controlled | `keep-screen-on=never` |

### enable-directx-capture

这个选项用于Windows做被控。如果没有遇到任何问题,建议使用默认设置,默认设置会优先使用DirectX进行截图,而不是直接使用GDI。

| 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | Y | `enable-directx-capture=N` |

### enable-android-software-encoding-half-scale

这个选项用于Android做被控。默认情况下,当分辨率大于1200时,硬件编码使用原始分辨率,而软件编码使用一半的分辨率,因为软件编码比较慢。这个选项用于设置软件编码是否应该缩放到一半分辨率。

| 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | Y | `enable-android-software-encoding-half-scale=N` |

### allow-remote-cm-modification

是否允许控制端点击连接管理窗口，以接受连接、更改权限等。

| 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-remote-cm-modification=Y` |


### remove-preset-password-warning

当自定义客户端有预设密码时是否去除GUI上的安全警告。

https://github.com/rustdesk/rustdesk-server-pro/discussions/286

| 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | Y | `remove-preset-password-warning=Y` |

### hide-security-settings / hide-network-settings / hide-server-settings / hide-proxy-settings

是否隐藏某些设置，请确保`Disable settings`已关闭，否则这些设置将不起作用。

https://github.com/rustdesk/rustdesk-server-pro/issues/263

https://github.com/rustdesk/rustdesk-server-pro/issues/276

| 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `hide-security-settings=Y` |

### hide-username-on-card

是否在设备列表中显示用户名，因为有时用户名太长，会隐藏其他信息。

https://github.com/rustdesk/rustdesk-server-pro/issues/284#issuecomment-2216521407

| 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `hide-username-on-card=Y` |

### hide-help-cards

是否在 GUI 上显示 UAC/权限警告。

https://github.com/rustdesk/rustdesk/issues/8687

| 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `hide-help-cards=Y` |

### display-name

更改连接到远程设备时将在弹出窗口中显示的显示名称。默认情况下，它显示您的操作系统用户名。

https://github.com/rustdesk/rustdesk-server-pro/issues/277

### disable-udp

是否仅使用TCP，不再使用UDP 21116，而是使用TCP 21116。

| 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `disable-udp=Y` |


### preset-user-name / preset-strategy-name / preset-device-group-name

分配用户/策略/设备组到设备。您也可以通过[命令行](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/#assign-device-usersgroupsstrategies-to-devices)来完成此操作。

https://github.com/rustdesk/rustdesk-server-pro/discussions/304

设备组功能需要 RustDesk 客户端 >=1.3.8, pro >= 1.5.0

### default-connect-password

用于连接远程设备的默认密码，该密码的优先级低于通讯录密码和本地保存的密码。

e.g. `default-connect-password=abcd1234`

### enable-trusted-devices

允许可信设备跳过2FA验证。

https://github.com/rustdesk/rustdesk/discussions/8513#discussioncomment-10234494

| 可设值 | 默认值 | 示例 |
| :------: | :------: | :------: |
| Y, N | Y | `enable-trusted-devices=N` |

### allow-https-21114

通常，HTTPS 使用端口 443。当 API 服务器的端口错误地设置为 21114 时，默认操作将是移除 21114 端口设置。将选项设置为 Y 允许使用 21114 作为 HTTPS 端口。此功能在 RustDesk 客户端 >=1.3.9 中可用。

https://github.com/rustdesk/rustdesk-server-pro/discussions/570

| 可设值 | 可设值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-https-21114=Y` |

### allow-d3d-render

D3D渲染可以获得更高的帧率并减少CPU使用率，但在某些设备上远程控制画面可能会出现黑屏。仅在 RustDesk 客户端 >=1.3.9 版本和 Windows 系统上可用。

| 可设值 | 可设值 | 示例 |
| :------: | :------: | :------: |
| Y, N | N | `allow-d3d-render=Y` |
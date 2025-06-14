---
title: Synology DSM 6
weight: 22
---

> 第三方的另一个最新教程在[这里](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/)。

本教程基于最新的 DSM v6 和 v7。

{{% notice note %}}
DSM 7.2 更新后，Docker 升级为新的 "Container Manager"，请查看[这篇文章](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7)。
{{% /notice %}}

## 安装 Docker

| 打开套件中心 | 安装 Docker |
| --- | --- |
| ![](images/package-manager.png) | ![](images/docker.png) |

## 安装 RustDesk Server

| 在 Docker 注册表中搜索 rustdesk-server 并双击安装 | 已安装 rustdesk-server 镜像，双击创建 rustdesk-server 容器 |
| --- | --- |
| ![](images/pull-rustdesk-server.png) | ![](images/rustdesk-server-installed.png) |

## 创建 hbbs 容器

如上所述，双击 rustdesk-server 镜像创建新容器，设置名称为 `hbbs`。
![](images/hbbs.png)

点击上面的 `高级设置`。

- 启用 `启用自动重新启动`。
![](images/auto-restart.png)

- 启用 `使用与 Docker Host 相同的网络`。关于主机网络的更多信息，请[查看](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/docker/#net-host)。
![](images/host-net.png)

- 挂载主机目录（例如 `/home/rustdesk/`）到 `/root`，hbbs 将在此目录中生成一些文件（数据库和 `key` 文件），这些文件需要在重启后持久保存。

| 挂载 | 在主机目录中生成的文件 |
| --- | --- |
| ![](images/mount.png) | ![](images/mounted-dir.png) |

- 设置命令
{{% notice note %}}
Synology 的操作系统基于 Debian，所以主机网络 (--net=host) 工作良好，我们不需要用 `-p` 选项映射端口。

{{% /notice %}}

![](images/hbbs-cmd.png?v3)

- 完成

## 创建 hbbr 容器

请重复上面的 `hbbs` 步骤，但将容器命名为 `hbbr`，命令（设置命令步骤）应该是 `hbbr`。

![](images/hbbr-config.png)

## hbbr/hbbs 容器

![](images/containers.png)

| 双击容器并查看日志 | 再次确认 hbbs/hbbr 使用主机网络 |
| --- | --- |
| ![](images/log.png) | ![](images/network-types.png) |

## 获取您的密钥

使用 File Station 浏览到之前设置的文件夹，下载 `id_ed25519.pub` 并用文本编辑器打开以查看您的密钥。
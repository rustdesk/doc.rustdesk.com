---
title: 群晖
weight: 22
---


本手册基于DSM v6。

### 安装Docker

打开 package manager 并安装 docker

|             |                                                   |
| --------------- | -------------------------------------------------------- |
![](/docs/en/self-host/synogy/images/package-manager.png) | ![](/docs/en/self-host/synogy/images/docker.png)


### 安装 RustDesk Server

| 在 Docker's registery 里搜索 rustdesk-server 并双击安装  |   安装 rustdesk-server 镜像后, 双击镜像创建容器                                    |
| --------------- | -------------------------------------------------------- |
![](/docs/en/self-host/synogy/images/pull-rustdesk-server.png) | ![](/docs/en/self-host/synogy/images/rustdesk-server-installed.png)


### 创建 hbbs 容器

如上所述哦，双击 rustdesk-server 镜像创建新容器，设置名称 `hbbs`。
![](/docs/en/self-host/synogy/images/hbbs.png) 

点击上面的 "Advanced Settings"。

- 开启 auto-restart
![](/docs/en/self-host/synogy/images/auto-restart.png) 

- 开启 "Use the same network as Docker host", 关于 host net的更多解释，请[查看](/docs/zh-cn/self-host/install/#net-host)
![](/docs/en/self-host/synogy/images/host-net.png) 

- 将容器里的 home 目录 `/root` 挂在到宿主目录(比如 `Shared/test/`), hbbs将把产生的文件（包括`key`文件）放在该目录。
| 挂在 | 产生的文件 |
|-- | -- |
![](/docs/en/self-host/synogy/images/mount.png?width=500px) | ![](/docs/en/self-host/synogy/images/mounted-dir.png?width=300px) 

- 设置命令
{{% notice note %}}
Synogy 的操作系统是基于 debain 的，因此host net (--net=host) 可以正常工作，我们不需要使用 `-p` 选项映射端口。

`192.168.16.98`为内网ip，此处仅作演示，部署时请设置为公网ip。

{{% /notice %}}

![](/docs/en/self-host/synogy/images/hbbs-cmd.png?v2) 

- 搞定
  
![](/docs/en/self-host/synogy/images/hbbs-config.png) 

### 创建 hbbr 容器 

请重复上述 `hbbs` 步骤，请将容器名更改为 `hbbr` 并将命令更改为 `hbbr -m demo`。

![](/docs/en/self-host/synogy/images/hbbr-config.png) 

### hbbr/hbbs 容器创建完成 

![](/docs/en/self-host/synogy/images/containers.png?width=500px)


| 双击容器并查看日志 | 确认 hbbs/hbbr 在使用 host net |
|-- | -- |
![](/docs/en/self-host/synogy/images/log.png?width=500px) | ![](/docs/en/self-host/synogy/images/network-types.png?width=500px)

---
title: Synology DSM 7.2
weight: 20
---
<!-- For translators: When translating elements like "buttons", don't just translate, please refer actual naming in their interface. -->
DSM 7.2 更新后，Synology 将其"Docker"包重命名为"Container Manager"。它带来了新的 GUI，并在其 GUI 中提供了"docker-compose"，这使您可以更轻松地创建 Docker。

## 支持的型号和要求

Container Manager 为一些低端型号（如 J 系列）带来了 ARM64 支持，有关支持型号的详细列表，请查看 [Synology 网站](https://www.synology.com/en-us/dsm/packages/ContainerManager)。
大多数时候，您不需要为安装 Docker 和 RustDesk Server 安装额外的 RAM。

## 1. 安装 Container Manager（Docker）

打开"套件中心"，搜索并安装"Container Manager"。

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_install_container_manager_though_package_center.png)

## 2. 创建文件夹

安装"Container Manager"后，它将创建一个名为 `docker` 的共享文件夹，让我们将服务器数据放在这里。

打开您的 File Station，创建一个名为 `rustdesk-server`（或您喜欢的任何名称）的文件夹。然后在其中创建一个名为 `data` 的文件夹，如图所示。

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_create_required_folders.png)

## 3. 创建容器

打开您的 Container Manager，转到项目并单击创建。

输入项目名称 `rustdesk-server` 并将源从"上传 compose.yml"更改为"创建 compose.yml"，并将以下内容复制到框中。

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_creating_project_init.png?v2)

```yaml
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest # 如果您要安装 Pro，请将此更改为 rustdesk/rustdesk-server-pro:latest。
    command: hbbs
    volumes:
      - ./data:/root
    network_mode: host
    depends_on:
      - hbbr
    restart: always

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest # 如果您要安装 Pro，请将此更改为 rustdesk/rustdesk-server-pro:latest。
    command: hbbr
    volumes:
      - ./data:/root
    network_mode: host
    restart: always

# 因为使用 docker host 模式
# 以防您忘记端口：
# 21114 TCP 用于网页控制台，仅在 Pro 版本中可用
# 21115 TCP 用于 NAT 类型测试
# 21116 TCP TCP 打洞
# 21116 UDP 心跳/ID 服务器
# 21117 TCP 中继
```

请跳过"网页门户设置"然后完成。

## 4. 检查是否正常工作

打开您的 File Station，您应该在 `docker/rustdesk-server/data` 文件夹中看到 `id_ed25519`、`id_ed25519.pub`。您可以下载它并通过任何文本编辑器或使用 [Synology Text Editor](https://www.synology.com/en-us/dsm/packages/TextEditor) 打开它。这是您的 RustDesk 客户端需要的公钥。

公钥看起来像这样：

![](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/images/dsm7_viewing_public_key_though_syno_text_editor.png)

查看[这里](/docs/en/client)设置您的客户端。只需要 `ID 服务器` 和 `密钥`。不需要 `中继服务器`，因为我们已在 `hbbs` 中设置，`hbbs` 将自动提供此信息。

## 5. 在路由器上设置端口转发

转到您路由器的管理网页，找到与"端口转发"相关的任何内容，它应该出现在"WAN"或"防火墙"设置中。

如果仍然找不到设置，请在 Google 搜索 `{路由器品牌} + 端口转发` 或 `{路由器型号} + 端口转发`。如果此设备来自您的 ISP，请询问他们。

打开这些必需的端口：
  * `21114` TCP 用于网页控制台，仅在 Pro 版本中可用
  * `21115` TCP 用于 NAT 类型测试
  * `21116` TCP TCP 打洞
  * `21116` UDP 心跳/ID 服务器
  * `21117` TCP 中继
---
title:  安装
weight: 2
description: "RustDesk 的安装文档，提供安装、配置、部署和故障排查指南。"
keywords: ["rustdesk server pro install", "rustdesk self-host pro", "rustdesk pro docker", "rustdesk pro linux install", "rustdesk pro windows install"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## 快速回答

对于大多数团队，安装 RustDesk Server Pro 的最佳方式是 Docker，因为升级和回滚都更简单。如果您想要原生 Linux 服务，请使用 `install.sh`；如果已经在运行 OSS，请使用转换路径。

## 关键要点

- RustDesk Server Pro 许可证
- Linux 服务器、虚拟机或可用 Docker 的主机
- 所需端口，以及 Web 控制台和 API 需要的 `21114` 或 `443`
- 如果您想在域名上启用 HTTPS，可选配置 DNS

<!-- GEO-LOCALIZED-INTRO:END -->

## 方法1：Docker (推荐)

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
docker compose up -d
```

更多详情，请查看 [Docker](/docs/zh-cn/self-host/rustdesk-server-pro/installscript/docker/)。

## 方法 2：install.sh

如果您精通 Linux，请使用下面的脚本。否则，如果脚本执行失败，您可能会遇到严重问题，并且很难确定问题原因。

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

更多详情，请查看 [install.sh](/docs/zh-cn/self-host/rustdesk-server-pro/installscript/script/)。

## 从开源版本转换

### Docker
如果您使用 Docker 安装了开源版本，没有直接的转换方法。相反，您需要使用 Pro 镜像运行一个新容器。在执行此操作之前，请备份您的私钥（`id_ed25519` 文件，而不是 `id_ed25519.pub`）。设置新容器后，将旧的 `id_ed25519` 私钥文件复制到新容器的工作目录中，然后重启容器。

### install.sh
如果您使用 install.sh 安装了开源版本，请参考[这里](/docs/zh-cn/self-host/rustdesk-server-pro/installscript/script/#convert-from-open-source)。
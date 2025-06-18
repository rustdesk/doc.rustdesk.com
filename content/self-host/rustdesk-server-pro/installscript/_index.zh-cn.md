---
title:  安装
weight: 2
---

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
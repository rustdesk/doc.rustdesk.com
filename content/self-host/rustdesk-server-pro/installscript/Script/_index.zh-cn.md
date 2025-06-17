---
title: install.sh 
weight: 4
---

{{% notice note %}}
别忘了从 [https://rustdesk.com/pricing/](https://rustdesk.com/pricing/) 取得授权，查阅[授权](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/)页面以了解详情。

请在进行这个简单安装之前先阅读[OSS安装](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/)。您可以在那里了解更多底层细节。
{{% /notice %}}

## 安装

复制并在您的 Linux 控制台中贴上下列指令以安装 RustDesk 服务器专业版。

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh | bash`

{{% notice note %}}
我建议使用[Docker镜像](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/docker/#docker-compose)；它极大地简化了部署解决方案以及更新的过程。资源消耗非常低。

并且请在您的主目录下运行上述命令，而不是在您没有写权限的目录。
{{% /notice %}}

它做了什么：

- 安装一些依赖项
- 在可用情况下设定 UFW 防火墙
- 创建工作目录 `/var/lib/rustdesk-server` 和日志目录 `/var/log/rustdesk-server`
- 将可执行文件安装到 `/usr/bin`
- 下载并解压 RustDesk Pro 服务到上述文件夹
- 为 hbbs 和 hbbr 创建 systemd 服务（服务名称为 `rustdesk-hbbs.service` 和 `rustdesk-hbbr.service`）
- 如果您选择了域名，它将安装 Nginx 和 Certbot，让 API 能够在端口 `443` (HTTPS) 上访问，并通过端口 `80` 获取 SSL 证书，它会自动续期。当 https 准备就绪后，请使用 `https://yourdomain.com` 访问，而不是 `https://yourdomain.com:21114`。

{{% notice note %}}
如何[手动为 Web 控制台设置 HTTPS](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually)。
{{% /notice %}}

{{% notice note %}}
如果 systemd 服务启动失败，可能与 SELinux 有关，请查看[这里](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#selinux)。
{{% /notice %}}

{{% notice note %}}
如果您的客户端无法连接到您的服务器或您无法访问 Web 控制台，请查看[这里](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#firewall)。
{{% /notice %}}

## 升级

复制并在您的 Linux 终端机中贴上下列指令以升级现有的 RustDesk 服务器专业版安装。您可以使用 cron 定期执行此命令。

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh | bash`

{{% notice note %}}
如果您在使用此脚本时遇到问题，我建议您浏览脚本并逐步手动执行步骤。

并且请在您的主目录下运行上述命令，而不是在您没有写权限的目录。
{{% /notice %}}

它做了什么：

- 检查 RustDesk-Server-Pro 的新版本
- 如果找到新版本，移除 API 文件并下载新可执行文件和 API 文件

## 从开源版本转换

复制并在您的 Linux 终端机中贴上下列指令以从 RustDesk 伺服器转换至 RustDesk 伺服器专业版。

`wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh | bash`

{{% notice note %}}
请将 `21114` TCP 端口添加到您的防火墙，这是 Web 控制台和 RustDesk 客户端中用户登录的额外端口。
{{% /notice %}}

{{% notice note %}}
如果您在使用此脚本时遇到问题，我建议切换到 Docker 安装。或者，您可以浏览脚本并逐步手动执行步骤。
{{% /notice %}}

它做了什么：

- 停用并移除旧服务
- 安装依赖包
- 在可用情况下设定 UFW 防火墙
- 创建文件夹 `/var/lib/rustdesk-server` 并将证书复制到这里
- 删除 `/var/log/rustdesk` 并创建 `/var/log/rustdesk-server`
- 下载并解压 RustDesk Pro 服务到上述文件夹
- 为 hbbs 和 hbbr 创建 systemd 服务（服务名称为 rustdesk-hbbs.service 和 rustdesk-hbbr.service）
- 如果您选择了域名，它将安装 Nginx 和 Certbot，让 API 能够在端口 443 (HTTPS) 上访问，并通过端口 80 获取 SSL 证书，它会自动续期

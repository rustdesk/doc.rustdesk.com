---
title: install.sh 
weight: 100
---

{{% notice note %}}
别忘了从 https://rustdesk.com/pricing.html 取得授权，查阅[授权](/docs/en/self-host/rustdesk-server-pro/license)页面以了解详情。
{{% /notice %}}

## 安装

复制并在您的 Linux 控制台中贴上下列指令以安装 RustDesk 服务器专业版。

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/install.sh)`

流程：

- 安装依赖包
- 在可用情况下设定 ufw 防火墙
- 建立文件夹 /var/lib/rustdesk-server 和 /var/log/rustdesk-server
- 在 /usr/bin 安装可执行文件
- 下载 RustDesk 专业版服务并解压缩到上述文件料夹
- 为 hbbs 和 hbbr 建立 systemd 服务
- 如果您选择了 Domain，将安装 Nginx 和 certbot，让 API 能够在端口 443 (https) 存取，并透过端口 80 取得 SSL 证书，这将自动更新

## 升级

复制并在您的 Linux 终端机中贴上下列指令以升级现有的 RustDesk 服务器专业版安装。您可以使用 cron 定期执行此命令。

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/update.sh)`

流程：

- 检查 RustDesk-Server-Pro 的新版本
- 如果找到新版本，移除 API 文件并下载新可执行文件和 API 文件

## 从开源版本转换

复制并在您的 Linux 终端机中贴上下列指令以从 RustDesk 伺服器转换至 RustDesk 伺服器专业版。

`bash <(wget -qO- https://raw.githubusercontent.com/rustdesk/rustdesk-server-pro/main/convertfromos.sh)`

流程：

- 停用并移除旧服务
- 安装依赖包
- 在可用情况下设定 ufw 防火墙
- 建立文件夹 /var/lib/rustdesk-server 并将证书复制到该文件夹
- 删除 /var/log/rustdesk 并建立 /var/log/rustdesk-server
- 下载 RustDesk 专业版服务并解压缩到上述文件夹
- 为 hbbs 和 hbbr 建立 systemd 服务
- 如果您选择了 Domain，将安装 Nginx 和 certbot，让 API 能够在端口 443 (https) 存取，并透过端口 80 取得 SSL 证书，这将自动更新

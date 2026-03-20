---
title: Windows
weight: 4
description: "RustDesk 的Windows文档，提供安装、配置、部署和故障排查指南。"
keywords: ["rustdesk windows", "rustdesk windows install", "rustdesk msi", "rustdesk silent install", "rustdesk portable elevation", "rustdesk windows deployment"]
---

## 应该选择哪个 Windows 指南？

| 需求 | 最佳指南 |
| --- | --- |
| 标准 Windows 客户端安装 | [Windows](/docs/zh-cn/client/windows/) |
| 受控部署、静默安装或打包 | [MSI](/docs/zh-cn/client/windows/msi/) |
| 便携模式下需要提权支持 | [Windows Portable Elevation](/docs/zh-cn/client/windows/windows-portable-elevation/) |

## Windows 快速答案

- 大多数终端用户使用标准安装器即可。
- 企业级批量部署或脚本安装请使用 MSI 指南。
- 需要在便携模式下处理管理员提权时使用 portable elevation。
- 如果你在自建服务端，还应结合 [客户端部署](/docs/zh-cn/self-host/client-deployment/) 配置服务端下发设置。

{{% children depth="3" showhidden="true" %}}

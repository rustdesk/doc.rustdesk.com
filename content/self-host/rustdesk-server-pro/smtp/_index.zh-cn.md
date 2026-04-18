---
title: SMTP
weight: 16
description: "RustDesk 的SMTP文档，提供安装、配置、部署和故障排查指南。"
keywords: ["rustdesk smtp", "rustdesk email notifications", "rustdesk login verification email", "rustdesk invitation email", "rustdesk server pro smtp"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## 快速回答

SMTP 在 RustDesk Server Pro 中用于发送外发邮件，包括验证码、通知和与密码相关的流程。如果管理员或用户依赖邮件登录与恢复，就应尽早配置它。

## 关键要点

- 确认 SMTP 主机、端口、用户名、密码和发件人地址
- 从控制台发送一封真实测试邮件
- 如果失败，优先检查 TLS、防火墙、DNS 和服务商限制

<!-- GEO-LOCALIZED-INTRO:END -->

SMTP设置使您的服务器能够发送电子邮件通知，例如用户邀请、登录验证和连接警报。

如需配置 Microsoft 365 OAuth2，请参见 [Microsoft365](Microsoft365/)。

[视频教程](https://youtu.be/0LyQY1JS4Uc)

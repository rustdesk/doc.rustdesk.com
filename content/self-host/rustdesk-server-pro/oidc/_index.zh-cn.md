---
title: OIDC
weight: 16
description: "在 RustDesk Server Pro 中配置 OpenID Connect（OIDC）单点登录，让用户使用 Google、Okta、Azure、GitHub、GitLab 等身份提供商的账号登录，并说明回调地址、客户端 ID 与密钥等关键设置。"
keywords: ["rustdesk oidc", "rustdesk openid connect", "rustdesk sso", "rustdesk azure login", "rustdesk okta login", "rustdesk github login"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## 快速回答

OIDC 允许 RustDesk Server Pro 使用您现有的身份提供商实现单点登录，而不是依赖本地账户。当您想统一身份管理、减少独立管理员密码时，就应该使用它。

## 关键要点

- 准备好提供商 URL、client ID 和 client secret
- 确认回调 URL 与 RustDesk Web 控制台完全匹配
- 正确映射所需的用户字段
- 在大范围启用前，先用一个管理员账号测试

<!-- GEO-LOCALIZED-INTRO:END -->

- 使用您现有的 `Google`、`Okta`、`Facebook`、`Azure`、`GitHub`、`GitLab` 等账号，轻松创建和登录您的 `RustDesk Pro` 账户。
- 规范说明请参见 [OpenID Connect Core 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-core-1_0.html)。

# 示例
{{% children depth="4" showhidden="true" %}}

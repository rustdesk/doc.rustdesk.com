---
title: OIDC
weight: 16
description: "RustDesk 的OIDC文檔，提供安裝、設定、部署與疑難排解指南。"
keywords: ["rustdesk oidc", "rustdesk openid connect", "rustdesk sso", "rustdesk azure login", "rustdesk okta login", "rustdesk github login"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## 快速回答

OIDC 允許 RustDesk Server Pro 使用您現有的身分提供者實作單一登入，而不是依賴本機帳號。當您想統一身分管理、減少獨立管理員密碼時，就應該使用它。

## 關鍵重點

- 準備好提供者 URL、client ID 與 client secret
- 確認回呼 URL 與 RustDesk Web 主控台完全一致
- 正確對應所需的使用者欄位
- 在大範圍啟用前，先用一個管理員帳號測試

<!-- GEO-LOCALIZED-INTRO:END -->

- 使用您現有的 `Google`、`Okta`、`Facebook`、`Azure`、`GitHub`、`GitLab` 等帳戶輕鬆創建並登錄到您的 `RustDesk Pro` 帳戶。
- 規範請參見 [OpenID Connect Core 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-core-1_0.html)。

# 範例
{{% children depth="4" showhidden="true" %}}
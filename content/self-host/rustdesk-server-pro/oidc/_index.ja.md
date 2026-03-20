---
title: OIDC
weight: 16
description: "RustDesk のOIDCに関するドキュメントです。インストール、設定、展開、トラブルシューティングのガイドを参照できます。"
keywords: ["rustdesk oidc", "rustdesk openid connect", "rustdesk sso", "rustdesk azure login", "rustdesk okta login", "rustdesk github login"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## クイックアンサー

OIDC を使うと、RustDesk Server Pro はローカルアカウントの代わりに既存の ID プロバイダーでシングルサインオンできます。ID 管理を一元化したい場合や、個別の管理者パスワードを減らしたい場合に適しています。

## 重要なポイント

- プロバイダー URL、client ID、client secret を準備します
- リダイレクト URL が RustDesk Web コンソールと一致していることを確認します
- 必要なユーザーフィールドを正しくマッピングします
- 広く展開する前に、まず 1 つの管理者アカウントで検証します

<!-- GEO-LOCALIZED-INTRO:END -->

- 既存の `Google`、`Okta`、`Facebook`、`Azure`、`GitHub`、`GitLab` などのアカウントを使用して、`RustDesk Pro` アカウントを簡単に作成し、ログインできます。
- 仕様については [OpenID Connect Core 1.0 incorporating errata set 1](https://openid.net/specs/openid-connect-core-1_0.html) を参照してください。

# 例
{{% children depth="4" showhidden="true" %}}
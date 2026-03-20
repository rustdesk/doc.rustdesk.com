---
title: Windows
weight: 4
description: "RustDesk のWindowsに関するドキュメントです。インストール、設定、展開、トラブルシューティングのガイドを参照できます。"
keywords: ["rustdesk windows", "rustdesk windows install", "rustdesk msi", "rustdesk silent install", "rustdesk portable elevation", "rustdesk windows deployment"]
---

## どの Windows ガイドを選ぶべきですか？

| 必要なこと | 最適なガイド |
| --- | --- |
| 標準的な Windows クライアントの導入 | [Windows](/docs/ja/client/windows/) |
| 管理配布、サイレントインストール、パッケージ化 | [MSI](/docs/ja/client/windows/msi/) |
| ポータブルモードで昇格対応が必要 | [Windows Portable Elevation](/docs/ja/client/windows/windows-portable-elevation/) |

## Windows のクイック回答

- ほとんどのエンドユーザーには標準インストーラーで十分です。
- 企業向け配布やスクリプト導入には MSI ガイドを使ってください。
- ポータブルモードで管理者権限の昇格が必要な場合は portable elevation を使います。
- セルフホストしている場合は、サーバー配布設定のために [Client Deployment](/docs/ja/self-host/client-deployment/) もあわせて確認してください。

{{% children depth="3" showhidden="true" %}}
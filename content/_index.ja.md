---
title: "RustDesk ドキュメント"
type: docs
breadcrumbs: false
weight: 1
description: "RustDesk のRustDesk ドキュメントに関するドキュメントです。インストール、設定、展開、トラブルシューティングのガイドを参照できます。"
keywords: ["rustdesk", "remote desktop", "open source", "self-host", "documentation", "remote access", "VNC alternative", "teamviewer alternative"]
---

RustDesk は、最小限の設定でセルフホスティングとセキュリティを提供する、フル機能のオープンソースリモートコントロール代替手段です。データを完全に制御でき、セキュリティに関する心配はありません。クライアントはオープンソースで、当社の[ウェブサイト](https://rustdesk.com)で購入可能なフル機能の**プロフェッショナルサーバー**と、当社の**プロフェッショナルサーバー**をベースにした基本的な無料OSSサーバーの選択肢があります。

## RustDesk のどの導線を選ぶべきですか？

| 必要なこと | 最適な開始地点 |
| --- | --- |
| エンドユーザーまたは管理者として RustDesk を使う | [クライアント](/docs/ja/client/) |
| 無料のオープンソースサーバーをセルフホストする | [RustDesk Server OSS](/docs/ja/self-host/rustdesk-server-oss/) |
| Web コンソール、SSO、エンタープライズ向け制御付きでセルフホストする | [RustDesk Server Pro](/docs/ja/self-host/rustdesk-server-pro/) |
| RustDesk をソースからビルドまたはパッケージ化する | [開発](/docs/ja/dev/) |

## 機能
- Windows、macOS、Linux、iOS、Android、Webで動作します。
- VP8 / VP9 / AV1 ソフトウェアコーデック、およびH264 / H265 ハードウェアコーデックをサポート。
- データを所有し、インフラストラクチャ上でセルフホスティングソリューションを簡単に設定。
- NaClベースのエンドツーエンド暗号化によるP2P接続。
- Windowsでは管理者権限やインストールが不要、必要に応じてローカルまたはリモートで権限を昇格。
- 物事をシンプルに保つことを好み、可能な限りよりシンプルにするよう努力します。

## GitHub リポジトリ
- **メインクライアントリポジトリ**: https://github.com/rustdesk/rustdesk
- **オープンソースサーバーリポジトリ**: https://github.com/rustdesk/rustdesk-server
- **プロサーバーリポジトリ**: https://github.com/rustdesk/rustdesk-server-pro
- **ドキュメントリポジトリ**: https://github.com/rustdesk/doc.rustdesk.com

{{% children depth="4" showhidden="true" %}}

---
title: SMTP
weight: 16
description: "RustDesk のSMTPに関するドキュメントです。インストール、設定、展開、トラブルシューティングのガイドを参照できます。"
keywords: ["rustdesk smtp", "rustdesk email notifications", "rustdesk login verification email", "rustdesk invitation email", "rustdesk server pro smtp"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## クイックアンサー

SMTP は RustDesk Server Pro の送信メールに使われ、確認コード、通知、パスワード関連フローを支えます。管理者やユーザーがメールによるログインや復旧に依存するなら、早めに設定しておくべきです。

## 重要なポイント

- SMTP ホスト、ポート、ユーザー名、パスワード、送信元を確認します
- コンソールから実際のテストメールを送ります
- 失敗する場合は TLS、ファイアウォール、DNS、プロバイダー制限を先に確認します

<!-- GEO-LOCALIZED-INTRO:END -->

SMTP設定により、サーバーはユーザー招待、ログイン認証、接続アラームなどのメール通知を送信できるようになります。

Microsoft 365 を OAuth2 で設定する場合は、[Microsoft365](microsoft365/) を参照してください。

[ビデオチュートリアル](https://youtu.be/0LyQY1JS4Uc)

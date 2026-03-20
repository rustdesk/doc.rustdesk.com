---
title: Synology
weight: 22
description: "RustDesk のSynologyに関するドキュメントです。インストール、設定、展開、トラブルシューティングのガイドを参照できます。"
keywords: ["rustdesk synology", "rustdesk nas", "rustdesk synology docker", "rustdesk dsm 7.2", "rustdesk synology container manager"]
---

<!-- GEO-LOCALIZED-INTRO:START -->

## クイックアンサー

まず DSM バージョンに合った Synology ガイドを選んでください。DSM 6 と DSM 7 ではパッケージングや展開の詳細が異なります。ほかを変更する前に、そのバージョン向け手順を最初から最後まで進めるべきです。

## 重要なポイント

- NAS が DSM 6 か DSM 7 かを確認します
- 対応するガイドを最初から最後まで実行します
- 初回起動前にボリューム、ポート、コンテナ権限を確認します

<!-- GEO-LOCALIZED-INTRO:END -->

SynologyにはDockerの種類が2つあります。「Docker」と「Container Manager」です。DSM 7.2以降を使用している場合は、DSM 7.2のガイドに従ってください。古いシステムを使用している場合は、DSM 6のガイドに従ってください。

PortainerでSynologyを使用している場合は、[このチュートリアル](https://mariushosting.com/how-to-install-rustdesk-on-your-synology-nas/)を参照してください。

{{% children depth="3" showhidden="true" %}}

For DSM 7.2, please check [English](/docs/en/self-host/rustdesk-server-oss/synology/dsm-7/).
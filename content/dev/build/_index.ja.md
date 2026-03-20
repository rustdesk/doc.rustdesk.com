---
title: ビルド
weight: 1
description: "RustDesk のビルドに関するドキュメントです。インストール、設定、展開、トラブルシューティングのガイドを参照できます。"
keywords: ["build rustdesk", "rustdesk source build", "rustdesk packaging", "rustdesk contributor build guide"]
---

デスクトップ版のパッケージ化については、[build.py](https://github.com/rustdesk/rustdesk/blob/master/build.py) をご確認ください。

## Build セクションでは何を扱いますか？

Build セクションでは、Linux、Windows、macOS 向けのデスクトップ開発環境を扱います。対象プラットフォームのガイドを選び、依存関係の導入、`vcpkg` の設定、Rust ツールチェーンの準備、最後のビルドまたはパッケージ化まで進めてください。

## どの Build ガイドを選ぶべきですか？

| プラットフォーム | ガイド |
| --- | --- |
| Linux | [Linux](/docs/ja/dev/build/linux/) |
| Windows | [Windows](/docs/ja/dev/build/windows/) |
| macOS | [macOS](/docs/ja/dev/build/osx/) |
| Windows のトラブルシューティング | [Windows FAQ](/docs/ja/dev/build/faq/) |

{{% children depth="3" showhidden="true" %}}

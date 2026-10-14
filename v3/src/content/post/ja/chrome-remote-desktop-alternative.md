---
publishDate: 2026-07-01T08:14:00Z
updateDate: 2026-10-14T00:00:00Z
lang: ja
translationKey: chrome-remote-desktop-alternative
draft: false
title: 'Chrome Remote Desktop の代替:セルフホスト型 RustDesk'
excerpt: 'Google が運用する Chrome Remote Desktop と RustDesk を比較。セルフホストのランデブーサーバーとリレー、オープンなクライアント、無料の Server OSS、Pro のチーム管理機能を解説します。'
image: ~/assets/images/blog/chrome-remote-desktop-alternative-og.webp
category: '代替ツール'
tags: ['RustDesk', 'Chrome Remote Desktop', '代替', 'セルフホスティング']
author: RustDesk Team
slug: 'chrome-remote-desktop-alternative-ja'
faq:
  - question: 'Google アカウントを必要としない Chrome Remote Desktop の代替ソフトはありますか？'
    answer: 'はい。セルフホストしたサーバーに接続する RustDesk クライアントは、デバイス ID とパスワードで接続するため、Google やその他のサードパーティのアカウントは不要です。Server Pro では、ローカルで管理するアカウントや自社の ID プロバイダーを追加できます。無料のコントローラーサインインが必要なのは、RustDesk の公開デモサーバーを使う場合だけです。Chrome Remote Desktop は Google の ID と Google が運用する接続調整を使います。'
  - question: 'Chrome Remote Desktop はファイル転送に対応していますか？'
    answer: 'はい。ただし基本的なアップロードとダウンロードのみです。Chrome Remote Desktop はドラッグ＆ドロップでの転送には対応していません。RustDesk はリモート操作に加えて双方向のファイル転送を標準で備えているため、技術者はセッションを離れたり別のツールに切り替えたりせずに、ファイルを双方向に移動できます。'
  - question: 'Chrome Remote Desktop は無人アクセスに対応していますか？'
    answer: 'はい。Chrome Remote Desktop は、対象マシンがオンラインであれば、アカウントと PIN で保護された無人アクセスに対応しています。RustDesk は、ホスト上で RustDesk サービスが動いている状態で、デフォルト設定のまま使える固定パスワードによって無人アクセスを行い、Server Pro ではそれらのデバイスを一元管理できます。どちらのツールも、電源が切れたマシンを単独で起動することはできません。'
  - question: 'RustDesk は Chrome Remote Desktop のように無料ですか？'
    answer: 'はい。RustDesk のクライアントと RustDesk Server OSS（無料のコミュニティサーバー）は AGPL ライセンスで、ライセンス料も有効期限もなく無料です。ホスティングと帯域はご自身で用意します。商用のプロプライエタリ製品である Server Pro は、Web コンソール、デバイスグループ、LDAP/OIDC による SSO など、セルフホスト型のチーム管理機能を追加します。詳しくは rustdesk.com/pricing をご覧ください。'
metadata:
  description: 'Chrome Remote Desktop は無料でシンプルですが、Google に縛られ、重要な機能が欠けています。オープンソースのセルフホスト型代替ソフトである RustDesk と比較してみましょう。'
  keywords: 'Chrome Remote Desktop 代替, セルフホスト型 Chrome Remote Desktop 代替, Google アカウント不要のリモートデスクトップ, RustDesk と Chrome Remote Desktop の比較'
---

Chrome Remote Desktop のセルフホスト型・オープンソースの代替となるのが RustDesk です。アクセスを Google アカウントと Google が運用する接続調整に結びつけるのではなく、RustDesk Server OSS（無料のコミュニティサーバー）で ID/ランデブーサーバーとリレーサーバーを自分で運用し、クライアントのソースコードを読むこともできます。商用の Server Pro は、同じセルフホストの基盤の上にチーム向けの管理機能を追加します。

## Chrome Remote Desktop の代替を探す理由

[Chrome Remote Desktop](https://support.google.com/chrome/answer/1649523) は、Google が提供する無料のブラウザベースのリモートアクセスツールです。小さなホストプログラムをインストールしてサインインするだけで、数分後には別のデバイスから自分のマシンにアクセスできます。シンプルで速く、気軽な個人利用にはまさにぴったりです。

しかし、「ソファに座ったまま自分のノートパソコンを操作する」程度の用途を超えると、途端に限界が見えてきます。Google の ID とシグナリングに縛られ、サポートチーム向けの機能の一部が欠けており、コントロールプレーンをセルフホストすることもできません。Google の[ネットワークガイド](https://support.google.com/chrome/a/answer/16364503)はその境界を説明しています。接続は Google のサービスを介してネゴシエーションされ、実際のセッションのトラフィックは Direct、STUN、TURN/リレーのいずれかの経路を使い、Google のデータセンターを通るのは TURN/リレーのパケットだけです。

## Chrome Remote Desktop の優れている点

評価すべき点は正当に評価しましょう。[TechRadar のレビュー](https://www.techradar.com/reviews/chrome-remote-desktop-review)は、「サブスクリプションもプレミアムプランもない完全無料」で、セットアップが簡単であり、個人利用に十分適していると評しています。Windows、macOS、Linux で動作し、ライセンス交渉も不要で、何かをホストする必要もありません。自宅の PC をスマートフォンから確認したいだけなら、CRD はほとんど手間がかかりません。

そのシンプルさこそが製品の価値です。問題が始まるのは、サポートチームや複数台のマシンを扱う環境が実際に必要とすることをさせようとしたときです。

## Chrome Remote Desktop の限界

### 不足している機能：セルフホスト型の管理、デバイス管理、チームのワークフロー

Google のヘルプページには、ファイルやアプリケーションへのリモートアクセスについての説明があり、管理者がアクセスやネットワークの挙動を制御できることも書かれています。しかし、そこで説明されているのはあくまで Google アカウントを基盤とし、Google が接続調整を担うサービスです。冒頭で触れた、シグナリングとリレーの分担がそのまま当てはまります。つまり CRD はシンプルなアクセスには十分ですが、RustDesk のようなデバイスグループやカスタムブランディングを備えたセルフホスト型のサポートコンソールではありません。

### 無人アクセスとスリープ中のマシン

CRD は PIN で保護された無人アクセスに対応していますが、対象マシンの電源が入っていてオンラインであり、同じ Google アカウントに関連付けられている必要があります。RustDesk でもホストがオンラインで、サービスが動作し、プラットフォームの権限が付与されている必要があります。どちらのツールも電源が切れたマシンを単独で起動することはできません。RustDesk のドキュメントでは、LAN 内で検出した後であれば、ローカル環境が対応していれば Wake-on-LAN を使えると説明しています。

### ユーザー管理と Google アカウントの要件

参加者全員が Google アカウントを必要とし、共有（無人ではない）セッションでは、アクセスを許可するために誰かがその場にいなければなりません。Google Workspace の管理者は[CRD の有効化・無効化やファイアウォール通過の制限](https://support.google.com/chrome/a/answer/2799701)を行えますが、これはデバイスグループや範囲を限定した技術者アクセスを備えたセルフホスト型のサポートコンソールとは異なります。しかも冒頭で説明したとおり、ID とセッション確立の経路には引き続き Google が介在します。（セキュリティ面について詳しくは、[Chrome Remote Desktop は安全か？](/ja/blog/is-chrome-remote-desktop-safe-ja)をご覧ください。）

## ひと目でわかる Chrome Remote Desktop と RustDesk の比較

| | Chrome Remote Desktop | RustDesk |
| --- | --- | --- |
| コスト | 無料 | クライアントと Server OSS は無料、Server Pro は有償 |
| コントロールプレーンとトラフィック | Google の ID／シグナリング。メディアは直接接続、STUN、または Google のリレー経由 | [セルフホスト](/ja/blog/why-self-host-remote-desktop-software-ja)のサーバー群。メディアは直接接続または自社リレー経由 |
| ソースコード | [Chromium の remoting コンポーネントを公開](https://chromium.googlesource.com/chromium/src/+/main/remoting/)。Google のサービスはセルフホスト向けに提供されていない | クライアントと Server OSS は AGPL、Server Pro の管理機能はプロプライエタリ |
| 必要なアカウント | 両端で Google アカウントが必要 | 自分の ID のみ。サードパーティのアカウントは不要 |
| ファイル転送・転送のワークフロー | アップロード／ダウンロードのみ（ドラッグ＆ドロップ不可） | 標準搭載 |
| [無人アクセス](/ja/blog/rustdesk-unattended-access-setup-ja) | アカウントと PIN による。対象マシンがオンラインである必要あり | 固定パスワード。サービスの稼働と OS の権限付与が必要。対象マシンがオンラインである必要あり |
| 一元管理 | Google 管理コンソールのポリシー。顧客が運用できる CRD の管理サービスはない | Server Pro のコンソール、アクセス制御、デバイスグループ、共有アドレス帳 |
| カスタムブランディング | なし | カスタムブランドのクライアント生成機能（Basic プラン以上） |
| 対応プラットフォーム | Win/macOS/Linux（Chrome 内） | Win/macOS/[Linux](/ja/blog/rustdesk-for-linux-ja)/Android。iOS はコントローラーアプリ |

## RustDesk が適している理由：セルフホストとオープンソース

RustDesk の特長は、**実際に展開できるセルフホスト型のサーバー**があることです。[Chromium は CRD の remoting のソースコードを公開しています](https://chromium.googlesource.com/chromium/src/+/main/remoting/)が、Google の接続調整サービスはセルフホストできません。RustDesk なら、Server OSS または Server Pro を自分で運用できます。

**RustDesk のクライアントと Server OSS は AGPL ライセンス**で、誰でも独自に検証し、ビルドできます。Server OSS は、セルフホストの ID/ランデブーサーバーとリレーサーバーをライセンス料も有効期限もなく提供します。**Server Pro は商用のプロプライエタリなセルフホスト型サーバーソフトウェア**で、自社インフラ上に管理機能を追加します。直接接続のセッションはエンドポイント間を流れ、リレー経由のセッションは自社のリレーを使います。サーバーの設置場所とあわせて、[データ主権への影響](/ja/blog/remote-desktop-data-sovereignty-gdpr-ja)も確認してください。

Server Pro は CRD にないチーム向け機能を追加します。セルフホスト型の Web コンソール、デバイスグループ、共有アドレス帳、ユーザー単位・デバイスグループ単位の[アクセス制御](https://rustdesk.com/docs/ja/self-host/rustdesk-server-pro/permissions/)に加え、Basic プランからはカスタムクライアント生成と LDAP/OIDC による SSO も利用できます。固定パスワードによる無人アクセスは、サービスが動作し OS の権限が付与されていれば、Windows、macOS、Linux のホストで機能します。Android のホストではさらに画面キャプチャの同意と入力の権限が必要で、メーカー独自のバックグラウンド制限の影響も受けます。iOS アプリはコントローラー専用です。

## Google のクラウドから、自分のサーバーへ

Chrome Remote Desktop から乗り換えて得られるのは「コントロール」です。接続の仲介、アクセスポリシー、管理データが Google のサーバーから自分で運用するサーバーへ移り、クライアントも監査できるようになります。その代わり、パッチ適用、可用性、障害復旧の責任も自分で負うことになります。

## 営業に問い合わせずに試せます

RustDesk は、Google アカウントを一切介さずに、自分のペースで評価できます。Server OSS はライセンス料も有効期限もなく無料で運用できます。Pro のチーム向け機能が必要になったら、[sales@rustdesk.com](mailto:sales@rustdesk.com) が現在の評価条件をご案内し、[rustdesk.com/pricing](https://rustdesk.com/pricing) で各プランの料金を確認できます。

[GitHub](https://github.com/rustdesk/rustdesk) でコードを自分の目で確認し、いくつかのデバイスを自分のサーバーに接続してみて、何かを決める前にそのトレードオフが自分に合っているかを判断してください。

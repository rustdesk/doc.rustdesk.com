---
publishDate: 2026-07-05T18:49:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ja'
translationKey: 'is-chrome-remote-desktop-safe'
draft: false
title: 'Chrome Remote Desktopは安全か?セキュリティと展開上の制約'
excerpt: 'Chrome Remote Desktopは安全か？暗号化、PINとGoogleアカウントによる仕組み、実際のリスク、そしてセルフホスティングとの違いを公平な視点で検証します。'
image: '~/assets/images/blog/is-chrome-remote-desktop-safe-og.webp'
category: 'セキュリティ'
tags: ['Chrome Remote Desktop', 'セキュリティ']
author: 'RustDesk Team'
slug: 'is-chrome-remote-desktop-safe-ja'
faq:
  - question: 'Chrome Remote Desktopは使用しても安全ですか？'
    answer: 'はい、個人利用であれば安全です。Googleは、Chrome Remote Desktopのセッションが完全に暗号化されること、無人アクセスにはPINが必要なこと、サポート用のセッションでは一度しか使えないアクセスコードを使うことを説明しています。主なリスクは、弱いPIN、Googleアカウントの乗っ取り、そしてコードを教えるよう言いくるめる詐欺師です。Googleアカウントで二要素認証を有効にし、推測されにくいPINを選んでください。'
  - question: 'Chrome Remote Desktopは暗号化されていますか？'
    answer: 'はい。Googleは、Chrome Remote Desktopのすべてのセッションが完全に暗号化されると述べています。企業向けのネットワークガイドでは、可能な場合はコンピューター間を直接、それ以外はTURNリレーを経由するWebRTC/ICE接続が説明されています。またChromiumはremotingのソースコードを公開しているため、ホスト、クライアント、プロトコルの各コンポーネントを調べることができます。'
  - question: 'Chrome Remote Desktopのセキュリティリスクにはどのようなものがありますか？'
    answer: '実際のリスクは3つです。弱いPINや推測されやすいPIN（最低6桁）、ホストに関連付けられたGoogleアカウントの乗っ取り、そして被害者を言いくるめてアクセスコードを教えさせるソーシャルエンジニアリング詐欺です。Googleアカウントの二要素認証、推測されにくいPIN、そして向こうから連絡してきた相手には決してコードを教えないことで、現実の危険の大半に対処できます。'
  - question: 'Chrome Remote Desktopはセルフホスティングできますか？'
    answer: 'いいえ。ChromiumはChrome Remote Desktopのremotingのソースコードを公開していますが、Googleの接続調整サービスはセルフホストできないため、すべての接続はGoogleを介して確立されます。セルフホストできる代替製品がRustDeskです。無料のコミュニティサーバーであるRustDesk Server OSSで自社のID/ランデブーサーバーとリレーサーバーを運用でき、RustDesk Server ProはWebコンソール、アクセス制御、ブランド化したクライアントを追加します。'
metadata:
  description: 'Chrome Remote Desktopは安全か?CRDの暗号化、PIN保護、実際のリスク、Googleアカウントによる信頼モデルについてGoogleが公表している内容を解説します。'
  keywords: 'Chrome Remote Desktop 安全性, Chrome Remote Desktop セキュリティ, Chrome Remote Desktop 暗号化, Chrome Remote Desktop PIN, Chrome Remote Desktop リスク, CRD 安全性'
---

要点を先に言うと、個人利用であればChrome Remote Desktop（CRD）は十分に安全です。Googleが提供する無料のシンプルなツールで、セッションを暗号化し、PINとGoogleアカウントでアクセスを保護しています。注意点は、接続の調整サービスをGoogleが運用していること、管理はサポートコンソールではなくGoogleの企業向けポリシーで行うこと、そしてほかのリモートツールと同じく詐欺師に悪用されうることです。以下で、出典に基づいて詳しく見ていきます。

## 手短な結論

はい、個人利用であれば安全です。CRDは、Googleが保護する接続で自分のマシンにアクセスしたり、家族をサポートしたりするという本来の用途には十分に安全です。[Google公式のサポートドキュメント](https://support.google.com/chrome/answer/1649523)によれば、すべてのリモートデスクトップセッションは完全に暗号化され、無人アクセスにはPINが必要で、単発のサポートセッションでは一度しか使えないアクセスコードが使われます。個人利用としては妥当な水準です。

組織で使う場合は、Googleの[企業向け管理ポリシー](https://support.google.com/chrome/a/answer/2799701)と[ネットワークガイド](https://support.google.com/chrome/a/answer/16364503)によって、管理者がCRDを使える人や接続方法を制限できます。ただし、接続の調整サービスは引き続きGoogleが運用します。

## Chrome Remote Desktopがセッションを保護する仕組み

実際に機能しているのは3つの仕組みで、いずれも[Googleのヘルプページ](https://support.google.com/chrome/answer/1649523)に記載されています。

- **暗号化と経路。** Googleはセッションが完全に暗号化されると説明しています。[ネットワークガイド](https://support.google.com/chrome/a/answer/16364503)には、直接接続、STUNの補助による接続、TURNリレー経由の接続がありうるICE/WebRTC接続が記載されています。接続の調整にはGoogleのサービスを使いますが、セッションの映像や操作が常にGoogleのリレーを通るわけではありません。
- **無人アクセス用のPIN。** 継続的なリモートアクセス用に設定したコンピューターに接続するには、PINの入力が必要です。これにより、Googleのログイン状態を手に入れただけの第三者が、気づかれずに接続することを防いでいます。
- **サポート用のワンタイムアクセスコード。** その場で誰かをサポートするとき、ホスト側はコードを生成します。Googleによれば、このコードは一度しか使えず、共有を続けるには定期的な再確認が必要です。

これらに加えてGoogleアカウント自体を二要素認証で保護でき、リモートアクセスに使うなら必ずそうすべきです。信頼できるネットワークでの個人利用であれば、この仕組みで十分です。

## 実際のリスクはどこにあるのか

CRDの弱点は特殊なものではありません。設計から生じる、次の3つです。

**弱いPIN。** PINは無人アクセスを守る鍵ですが、Googleが定める最低桁数は6桁にすぎません。見知らぬ人が一度推測する程度なら6桁で十分ですが、人は誕生日、同じ数字の繰り返し、連番など予測しやすい数字を選びがちで、実質的な組み合わせは桁数から想像されるよりずっと少なくなります。常時アクセスできる状態にしておくマシンでは、安易なPINが最も侵入されやすい入り口です。推測されにくい数字を選んでください。

**Googleアカウントの乗っ取り。** GoogleアカウントはCRDのアクセス境界の一部です。誰かがフィッシングでパスワードを盗み、二要素認証が設定されていなければ、リモートデスクトップの一覧も相手の手に渡ります。アカウントを2FAで保護し、ログイン中のデバイスを確認し、不要になったアクセスは取り消してください。なお無人アクセスにはホストのPINも必要なので、アカウントのパスワードだけですべてのホストに入れるわけではありません。

**詐欺。** 電話をかけてきた相手が、被害者を説得してアクセスコードを教えさせ、セッションを承認させることがあります。[FBIはリモートアクセスソフトウェアの悪用について警告しています](https://www.fbi.gov/contact-us/field-offices/boston/news/press-releases/fbi-warns-public-to-beware-of-tech-support-scammers-targeting-financial-accounts-using-remote-desktop-software)。サポートの依頼は自分で別途確認してください。詐欺師に自分から許可したセッションは、暗号化では守れません。詳しくは[リモートデスクトップ詐欺の見分け方と回避策](/ja/blog/avoid-remote-desktop-scams-ja)をご覧ください。

## CRDにないもの

CRDは意図的にシンプルに作られており、多くの人にとってはそれが魅力です。ただ、特に個人利用を超える用途を検討しているなら、トレードオフをはっきりさせておく価値があります。

[ChromiumはCRDのremotingのソースコードを公開しており](https://chromium.googlesource.com/chromium/src/+/main/remoting/)、ホスト、クライアント、プロトコルのコンポーネントが含まれていますが、Googleの接続調整サービスはセルフホストできません。Googleの[企業向けポリシー](https://support.google.com/chrome/a/answer/2799701)で管理できるのはCRDを使える人であり、CRDを、デバイスグループ、ユーザー単位のアクセスルール、ブランド化したクライアントを備えた、顧客が運用するサポートコンソールにするものではありません。これはGoogleへの批判ではなく、CRDがそのための製品ではないというだけです。そうした機能が必要なら、次に検討すべきは[Chrome Remote Desktopの代替](/ja/blog/chrome-remote-desktop-alternative-ja)です。

RustDeskの<strong>クライアントとRustDesk Server OSS（無料のコミュニティサーバー）は[AGPLライセンス](https://github.com/rustdesk/rustdesk)</strong>で、**Server Proは商用のプロプライエタリなセルフホスト型サーバーソフトウェア**です。Server OSSで自社のID/ランデブーサーバーとリレーサーバーを運用でき、Server ProはWebコンソール、ユーザー単位・デバイスグループ単位のアクセス制御、ブランド化したクライアントを追加します。そのため、接続の調整とアクセスポリシーは、1つのクラウドのログインの向こう側ではなく、自分で管理するインフラ上に置かれます。これは[データ主権とGDPR](/ja/blog/remote-desktop-data-sovereignty-gdpr-ja)の要件に対応しやすい構成です。

はっきり言っておくと、このオープンさには両面があります。コードが公開されているということは、RustDesk自身の脆弱性も公開されるということなので、[最新リリース](https://github.com/rustdesk/rustdesk/releases)と脆弱性の開示情報に注意してください。また、セルフホスティングはある種の手間を別の手間に置き換えるだけです。CRDで必要なアカウントとPINの管理が、自分でパッチを当てるサーバーの管理に変わり、トラフィックは引き続きエンドポイント間を直接流れることがあります。安心の根拠が変わるのであって、手間が軽くなるわけではありません。

## 最終評価

Chrome Remote Desktopは安全か。自分のPCにアクセスしたり親戚をサポートしたりする個人利用であれば、答えはイエスです。CRDはセッションを暗号化し、無人アクセスをPINで保護し、サポートには一度しか使えないコードを使います。Googleアカウントで二要素認証を有効にし、誕生日ではないPINを選び、先に連絡してきた相手には決してアクセスコードを読み上げない。これで重要なリスクには対処できます。

CRDが行き詰まるのは、管理権限と規模の面です。接続の調整サービスはGoogleが運用し、管理はサポートコンソールではなくGoogleの企業向けポリシーで行います。接続の調整を自社のインフラに置きたい、技術者の対象をデバイスグループで限定したい、1つのコンソールでフリートを管理したいという段階になったら、セルフホスト型のRustDeskを検討するタイミングです。CRDが安全でないからではなく、CRDがもともとそのためのツールではないからです。

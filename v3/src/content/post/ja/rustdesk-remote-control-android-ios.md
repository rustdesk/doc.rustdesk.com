---
publishDate: 2026-07-07T17:09:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ja'
translationKey: 'rustdesk-remote-control-android-ios'
draft: false
title: 'RustDeskのAndroid・iOSリモートコントロール：実際にできること'
excerpt: 'RustDeskはAndroidスマートフォンをリモート操作でき、Android、iPhone、iPadをコンピューターの操作端末として使えます。iOSアプリは操作側（コントローラー）専用です。'
image: ~/assets/images/blog/rustdesk-remote-control-android-ios-og.webp
category: 'ガイド'
tags: ['RustDesk', 'モバイル']
author: 'RustDesk Team'
slug: 'rustdesk-remote-control-android-ios-ja'
faq:
  - question: 'RustDeskでAndroidスマートフォンをリモート操作できますか？'
    answer: 'はい。Android端末でRustDeskの画面キャプチャサービスを開始し（画面上での同意が必要です）、ユーザー補助サービス「RustDesk Input」を有効にすると、リモートからのタップやスワイプを受け付けるようになります。画面共有にはAndroid 6以降、内部のシステム音声の共有にはAndroid 10以降が必要です。メーカーによってはサイドロードしたアプリのユーザー補助機能を制限しているため、先に「制限付きの設定」を許可する必要がある場合があります。'
  - question: 'RustDeskでiPhoneやiPadを操作できますか？'
    answer: 'いいえ。RustDeskのiOS/iPadOSアプリは操作側（コントローラー）専用で、iPhoneやiPadからWindows、macOS、Linux、Androidのデバイスを操作するためのものです。RustDeskはiOSのホスティング、画面共有、リモート入力を実装していません。ほかのベンダーには有人でのiOS画面閲覧を提供しているものがあり、AppleもFaceTime通話中に同意に基づくリモート操作を提供しています。'
  - question: 'スマートフォンでコンピューターを操作できますか？'
    answer: 'はい。AndroidとiOSのRustDeskアプリは、どちらも本格的なコントローラーです。IDを指定してWindows、macOS、Linuxのマシンに接続し、画面上のタッチパッドまたはマウスモードとソフトウェアキーボードで操作できます。クリップボード、ファイル転送、特殊キーの扱いはモバイルOSによって一部異なります。スマートフォンからコンピューターを操作するのは、モバイルで最も確実に使える用途です。'
  - question: 'RustDeskのモバイルアプリはオープンソースですか？'
    answer: 'はい。モバイルクライアントは、デスクトップクライアントと同じAGPLのオープンソースのコードベースを共有しています。Androidビルドは、RustDesk公式のGitHubリリースとF-Droidからcom.carriez.flutter_hbbとして入手でき、iOSのコントローラーはApple App Storeで入手できます。RustDeskは現在、Google Playでは配布していません。'
  - question: 'Android端末を無人操作用に設定したままにできますか？'
    answer: '部分的にはできます。RustDeskはフォアグラウンド通知でキャプチャサービスを維持し、起動時に再開させられます。しかし、画面キャプチャへの同意、ロック画面でキーボード入力がブロックされること、再起動後に手動でのロック解除が必要なことから、完全に無人でのAndroidの操作は安定しません。Androidの操作は、設定して放置できるアクセスではなく、有人サポートとして扱ってください。'
metadata:
  description: 'AndroidとiOSでのRustDeskを解説。Androidをリモート操作する方法、どちらのモバイルアプリでもデスクトップを操作できること、iPhone・iPadアプリが操作側専用である理由を紹介します。'
  keywords: 'RustDesk Android iOS リモート操作, RustDesk スマホ 遠隔操作, RustDesk Android ホスト, Android リモート操作, RustDesk iOS, iPhone リモート操作, RustDesk モバイルアプリ'
---

RustDeskは、所有者が画面キャプチャと入力の権限を与えれば、Android端末を実際に操作できます。また、どちらのモバイルアプリも、コンピューターを操作する優れた*コントローラー*になります。iOSアプリは操作側（コントローラー）専用です。RustDeskはiOSのホスティングや画面共有を実装していないため、RustDeskでiPhoneやiPadにリモート接続することはできません。このガイドでは、何ができて何ができないのか、その理由とともに説明します。実際の機能を前提に計画を立ててください。

どちらのモバイルアプリも、AGPLライセンスのRustDeskクライアントのコードベースを共有しています。RustDesk Server OSS（無料のコミュニティサーバー）もAGPLライセンスで、Server Proは商用のプロプライエタリなセルフホスト型サーバーソフトウェアです。Androidビルドは[RustDesk公式のGitHubリリース](https://github.com/rustdesk/rustdesk/releases)と[F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/)から`com.carriez.flutter_hbb`として入手でき、arm64、arm32、x86_64の各ビルドとユニバーサルAPKで幅広い端末に対応しています。iOSのコントローラーはApp Storeで提供しています。RustDeskは[現在Google Playでは配布していません](/ja/blog/rustdesk-and-remote-access-scams-ja)。詐欺への悪用を受けて、Androidアプリを自主的に公開停止したためです。コードベースは同じで、監査できる中核部分も共通です。

## 早見表

| シナリオ                                               | 対応     | 補足                                                       |
| ------------------------------------------------------ | -------- | ---------------------------------------------------------- |
| Android**から**Windows/macOS/LinuxのPCを操作する       | 対応     | 本格的なコントローラー。タッチパッドまたはマウスモード     |
| iPhone/iPad**から**PCを操作する                        | 対応     | 本格的なコントローラー。タッチパッドまたはマウスモード     |
| **Android端末**を操作する（ホストとして）              | 対応     | 画面キャプチャへの同意とユーザー補助サービスが必要         |
| RustDeskで**iOS端末**を操作する                        | **不可** | RustDeskのiOS版はコントローラーアプリ                      |
| RustDeskでiOSの画面をリモートで閲覧する                | **不可** | RustDeskはiOSの画面を受信して表示する機能を実装していない |

以降では、各行の詳細を説明します。

## スマートフォンをコントローラーとして使う（簡単なほう）

これは「そのまま使える」用途です。AndroidまたはiOSの端末にRustDeskをインストールすれば、Windowsのデスクトップ、[Mac](https://rustdesk.com/docs/ja/client/mac/)、[Linuxマシン](/ja/blog/rustdesk-for-linux-ja)など、あらゆるRustDeskホストを操作できる本格的なコントローラーになります。接続先のIDとパスワードを入力すると、リモートの画面が表示され、画面上のタッチパッド、マウスモード、ソフトウェアキーボードで操作できます。クリップボード、ファイル、特殊キーの扱いはモバイルOSによって一部異なります。スマートフォン側では特別な設定は要りません。操作を*送る*側であって、操作される側ではないからです。

「どこにいてもコンピューターを直す」のが仕事なら、RustDeskを入れたスマートフォンは本当に頼れる道具です。

## Android端末を操作する（ホストとして）

RustDeskは、Androidのスマートフォンやタブレットを操作可能なホストにできます。画面キャプチャとリモート入力はAndroidの別々のサービスを使い、どちらも設定が必要です。

**画面キャプチャ。** RustDeskはAndroidの`MediaProjection` APIで画面を取得します。アプリで**サービスを開始**をタップすると、Androidが画面の録画を許可するかを尋ねる同意画面を表示します。このダイアログは必須で、黙って省略することはできません。画面共有には**Android 6以降**、端末の**内部のシステム音声**のキャプチャには**Android 10以降**が必要です。このキャプチャの権限が与えられるまで、着信した接続からは何も見えません。

**リモート入力。** 画面が見えることと、操作できることは別です。タップ、スワイプ、キー入力を送り込むために、RustDeskは**RustDesk Input**という[`AccessibilityService`](https://deepwiki.com/rustdesk/rustdesk/6.5-mobile-platforms)を登録します。これは**設定 → ユーザー補助**で有効にします。このサービスは、リモートのマウスやジェスチャーのイベントをAndroidのジェスチャーに変換し、「戻る」「ホーム」「最近使ったアプリ」といったシステム操作も実行できます。

**動作の維持。** RustDeskはフォアグラウンドサービスの通知と、必要に応じてフローティングのオーバーレイウィンドウを表示して、Androidがキャプチャのプロセスを終了させないようにします。起動時にサービスを再開させることもできます。

ここからは制限事項です。Androidのセキュリティモデルには、無視できない制約があります。

- **キャプチャの開始には同意が必要。** 誰かが（または事前の承認によって）画面録画の同意画面を承諾しなければなりません。
- **ロック画面では入力がブロックされる。** Androidはユーザー補助サービスがセキュアなロック画面に入力することを許可していないため、端末がロックされると、通常はリモートからロック解除コードを入力できません。[実際に使ったユーザーも報告している](https://blog.wirelessmoves.com/2025/10/remote-android-support-with-rustdesk-part-1.html)制限です。
- **再起動後は手動でのロック解除が必要。** 再起動すると、たいていは端末を直接手に取ってロックを解除しないと操作を再開できません。
- **メーカーによる制限。** 一部のメーカーの端末では、サイドロードしたアプリの**RustDesk Input**のユーザー補助のスイッチがグレーアウトしており、「制限付きの設定」を許可する（アプリのアイコンを長押し → アプリ情報 → 制限付きの設定を許可）まで有効にできません。一部のメーカーの強力なバッテリー管理機能が、バックグラウンドのサービスを終了させることもあります。

実務上の結論はこうです。Androidの操作は、スマートフォンを手にしている相手を助ける**有人サポート**には非常に優れていますが、**設定して放置する無人**アクセスはデスクトップのホストのほうが得意です。モバイルOSは常時のバックグラウンドアクセスを制限しているからです。用途に合わせてプラットフォームを選んでください。（デスクトップの本格的な無人アクセスは、[無人アクセスの設定ガイド](/ja/blog/rustdesk-unattended-access-setup-ja)で説明しています。）

## iOS：RustDeskのコントローラー、画面の閲覧、入力操作

**RustDeskのiOS版はコントローラーであり、ホストではありません。** 対応するコンピューターやAndroid端末の操作に使います。iOSの画面を受信して閲覧する機能や入力操作はRustDeskでは実装しておらず、[iOSホスト機能の要望](https://github.com/rustdesk/rustdesk/discussions/4839)でも議論されています。

ほかのベンダーは別のアプローチをとっています。Appleのブロードキャスト用APIはユーザー自身が開始する画面共有を認めており、[AnyDeskはiOS/iPadOS 12以降での画面のリモート閲覧を文書化](https://support.anydesk.com/docs/anydesk-for-ios-ipados-tvos)していますが、リモートからの入力操作には対応していません。所有者が自分でタップしているのを技術者が見るのは、画面を操作するのとは別のワークフローです。

Appleも[FaceTimeでの同意に基づくリモート操作](https://support.apple.com/guide/iphone/request-give-remote-control-a-facetime-call-iph5d70f34a3/ios)を提供していますが、デバイス、地域、OSの要件があります。サポート業務でiPhoneの画面を見る必要があるなら、そのワークフローを実装したツールを使ってください。iPhoneやiPadからコンピューターを操作するなら、RustDeskのコントローラーアプリが適しています。

## プライバシーとセルフホスティングについて

モバイルアプリはオープンソースで、デスクトップクライアントと同じプロトコルを使うため、パブリックネットワークの代わりに[セルフホストしたRustDeskサーバー](/ja/blog/why-self-host-remote-desktop-software-ja)を接続先に指定できます。つまり、モバイルのセッションも、IDを含めて自社で管理するインフラが仲介します。個人の端末に関わるリモートサポートでは、このデータ主権の観点がいつも以上に重要になります。

トレードオフはいつもと同じです。そのサーバーの運用とセキュリティの確保は、アップデート、監視、バックアップ、キャパシティ計画を含めて自社で行います。それでも多くのチームにとって、セッションのデータを自社の管理下に置く価値は十分にあります。

## はじめに

Androidビルドは[公式のGitHubリリース](https://github.com/rustdesk/rustdesk/releases)からダウンロードするか、[F-Droid](https://f-droid.org/packages/com.carriez.flutter_hbb/)からパッケージをインストールしてください。RustDeskは[現在Google Playでは配布していません](/ja/blog/rustdesk-and-remote-access-scams-ja)。iOSのコントローラーは引き続きApple App Storeで入手できます。スマートフォンを操作したい場合、そのスマートフォンはAndroidである必要があります。画面キャプチャの同意画面を承諾し、ユーザー補助サービス「RustDesk Input」を有効にしてください。スマートフォンからコンピューターを操作するなら、どちらのモバイルアプリもそのまま使えます。最新のプランは[rustdesk.com/pricing](https://rustdesk.com/pricing)に掲載しており、Server Proについては[sales@rustdesk.com](mailto:sales@rustdesk.com)がご相談に応じます。まず動作を見てみたい方は、[RustDeskの動作をご覧ください](https://www.youtube.com/@rustdesk)。

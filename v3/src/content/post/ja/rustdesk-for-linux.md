---
publishDate: 2026-07-09T08:32:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ja'
translationKey: rustdesk-for-linux
draft: false
title: 'RustDesk for Linux：オープンソースのリモートデスクトップ'
excerpt: 'Linux で RustDesk をインストールして使う方法を解説：.deb、.rpm、Flatpak、AppImage、X11 と Wayland の違い、ヘッドレス環境と無人アクセス、サーバーのセルフホスティングまで。'
image: ~/assets/images/blog/rustdesk-for-linux-og.webp
category: 'ガイド'
tags: ['RustDesk', 'Linux', 'セルフホスティング']
author: 'RustDesk Team'
slug: 'rustdesk-for-linux-ja'
faq:
  - question: 'RustDesk は Wayland で動作しますか？'
    answer: 'はい。標準の RustDesk ビルドは、ログイン中のセッションで PipeWire と xdg-desktop-portal を通じて Wayland のデスクトップをキャプチャし、バージョン 1.4.3 以降は複数モニターにも対応しています。画面共有の開始時にはポータルが同意を求め、ポータルのバージョン 4 以降では選択を記憶できます。別のプレビュービルドでは、無人アクセスと再起動後のログイン画面へのアクセスが加わります。プレビューの対象は x86_64 の Debian/Ubuntu 系システムです。'
  - question: 'Linux ではどのパッケージをインストールすればよいですか？'
    answer: 'Debian、Ubuntu、Linux Mint では .deb を、Fedora、RHEL、openSUSE では .rpm を使ってください。サンドボックス化された互換性の高いビルドが必要なら Flathub の Flatpak を、単一ファイルの代替手段としてはポータブルな AppImage を使います。.deb と .rpm のパッケージは systemd サービスを登録して起動するため、再起動後も RustDesk が動き続けます。Flatpak と AppImage はデフォルトではサービスを登録しません。'
  - question: 'なぜヘッドレスの Linux マシンで黒い画面が表示されるのですか？'
    answer: '多くの場合、ヘッドレスの Linux マシンに RustDesk がキャプチャできるアクティブなディスプレイがないためです。モニターがないとグラフィックスタックが出力を用意しないことが多く、セッションは接続しても黒い画面や画像待ちの画面になります。HDMI または DisplayPort のダミープラグを接続するか、X11 では xserver-xorg-video-dummy などの仮想ディスプレイを設定してから、再接続してください。'
  - question: 'Linux で RustDesk サーバーをセルフホストできますか？'
    answer: 'はい。RustDesk サーバー（hbbs の ID/ランデブープロセスと hbbr のリレープロセス）は Linux 向けに作られており、Linux で動かすのが標準的な方法です。RustDesk Server OSS（無料のコミュニティサーバー）にはライセンス料も有効期限もなく、Server Pro はさらに Web コンソール、デバイスグループ、カスタムクライアント生成機能を追加します。どちらも通常の Linux VM やベアメタルのホストにインストールできます。'
metadata:
  description: 'Linux 版 RustDesk を網羅的に解説：各ディストリビューションや ARM ボード向けのパッケージ選び、Wayland と X11 でのキャプチャ、ヘッドレス設定、自前のサーバー運用まで。'
  keywords: 'RustDesk Linux, RustDesk Ubuntu, RustDesk Wayland, RustDesk X11, RustDesk Linux インストール'
---

RustDesk は Linux 向けのオープンソースのリモートデスクトップです。クライアントと RustDesk Server OSS（無料のコミュニティサーバー）は AGPL ライセンスで、主要なディストリビューション向けにネイティブパッケージが用意されており、すべてのクライアントを自分でホストする ID/ランデブーサーバーとリレーサーバーに接続できます。Server Pro は、その上に Web コンソールと集中管理機能を追加する、商用のプロプライエタリなセルフホスト型サーバーソフトウェアです。監査可能なコード、ネイティブな Linux クライアント、そしてセルフホストできるインフラ。Linux 向けのオープンソースのリモートデスクトップを探す人に RustDesk がよく勧められるのは、このためです。

このガイドでは、インストール方法、誰もがつまずきがちなポイント（X11 と Wayland の違い）、無人アクセスとヘッドレスアクセスを機能させる方法、そしてサーバーの位置づけを解説します。

## Linux への RustDesk のインストール

RustDesk は一般的な Linux のパッケージ形式すべてに対応しているため、ソースからビルドする必要はほとんどありません。[GitHub の RustDesk リリースページ](https://github.com/rustdesk/rustdesk/releases)または [Linux 版のインストールドキュメント](https://rustdesk.com/docs/ja/client/linux/)から最新リリースを入手し、お使いのディストリビューションに合った形式を選んでください。

| 形式 | 最適な用途 | サービスの自動起動 | 備考 |
| --- | --- | --- | --- |
| `.deb` | Debian、Ubuntu、Linux Mint | あり（systemd） | `sudo apt install ./rustdesk-*.deb` |
| `.rpm` | Fedora、RHEL/CentOS、openSUSE | あり（systemd） | `sudo dnf install ./rustdesk-*.rpm` |
| Flatpak | 全ディストリビューション、サンドボックス | なし | `flatpak install flathub com.rustdesk.RustDesk`（[Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)） |
| AppImage | 全ディストリビューション、ポータブル | なし | 最近の Ubuntu では `libfuse2` が必要な場合あり。`chmod +x` してから実行 |
| AUR | Arch、Manjaro | パッケージによる | コミュニティによるメンテナンス（`rustdesk-bin`、`rustdesk-appimage`） |

再起動後もバックグラウンドサービスとして RustDesk を動かしたい場合は、`.deb` または `.rpm` パッケージを使ってください。どちらも systemd ユニットを自動的に登録して起動します。Flatpak 版（[Flathub](https://flathub.org/apps/com.rustdesk.RustDesk) の `com.rustdesk.RustDesk`）はサンドボックス化されたビルドで、デスクトップでの利用には便利ですが、デフォルトではシステムサービスをインストールしません。RustDesk が直接パッケージを提供していないディストリビューションでは、まず **Flatpak** を試してください。独自のランタイムを同梱しているため、最も互換性が高い傾向があります。AppImage はポータブルな単一ファイルの代替手段ですが、実際には互換性にばらつきがあります（たとえば最近の Ubuntu では `libfuse2` が必要になることがあります）。

実際、RustDesk は Ubuntu、Debian、Fedora、RHEL/CentOS、openSUSE、Arch、NixOS など幅広い環境で使われています。**x86_64、ARM64（aarch64）、ARM32（ARMv7）** 向けのビルドがあるため、一般的な PC だけでなく ARM ボードやサーバーでも動作します。

## X11 vs Wayland：ここが重要なポイント

これは Linux 版 RustDesk を理解するうえで最も重要なポイントです。リモート操作がすぐに「そのまま使える」のか、それとも先にちょっとした設定が必要なのかを左右するからです。

**X11（Xorg）：ディストリビューションがまだ提供していれば、最も直接的なキャプチャ経路。** X11 では RustDesk がフレームバッファを直接読み取り、入力も直接送り込むため、画面のキャプチャとマウス・キーボード操作はこれ以上ないほど直接的で、モニターの変更も動的に検出されます。多くのディスプレイマネージャーでは、ログイン画面の歯車メニューから今でも「Xorg」や「X11」を選べます。ただし、Wayland のみへの移行を進めて X11 セッションを廃止しつつあるディストリビューションもあります。X11 は使える場合に便利な選択肢として扱い、展開の前提にはしないでください。

**Wayland：標準ビルドで対応し、無人アクセスはプレビューで提供。** Wayland のコンポジターはフレームバッファへの直接アクセスを許可しないため、標準の RustDesk ビルドは、ログイン中のセッションで `xdg-desktop-portal` と [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support) を通じて画面をキャプチャし、カーネルの `uinput` モジュールで入力を送ります。RustDesk 1.4.3（2025年10月）では [Wayland での複数モニターの共有に対応しました](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/)。別途提供されている[無人アクセス対応の Wayland プレビュー](/ja/blog/unattended-remote-access-wayland-ja)では、無人アクセスと再起動後のログイン画面へのアクセスが加わります。対象は **x86_64 の Debian/Ubuntu 系システム**です。

- **共有開始時の同意。** ポータルが、どのディスプレイを共有するかを尋ねるダイアログを表示します。これは RustDesk の不具合ではなく Wayland のセキュリティ機能で、バックグラウンドのアプリが勝手に画面の録画を始めることはできません。ポータル v4 以降は「リストアトークン」に対応しているため、接続のたびに確認を求められることはありません。
- **ログイン画面へのアクセス。** 標準ビルドがキャプチャするのはログイン中のセッションです。再起動後のログイン画面にアクセスするには、x86_64 の Debian/Ubuntu 系システムで無人アクセスのプレビューを使うか、ディストリビューションがまだ提供していれば X11 のログイン画面を使ってください。

標準ビルドで Wayland のマシンに接続して黒い画面が表示される場合、たいていはポータル／PipeWire の経路の条件が満たされていません。確認ダイアログが承認されていないか、`xdg-desktop-portal` や PipeWire が動いていないかのどちらかです。[RustDesk が接続済みなのに画像待ちになる場合](/ja/blog/rustdesk-connected-waiting-for-image-ja)のガイドで、Wayland のケースを順を追って解説しています。

## Linux での無人アクセス

無人アクセスとは、前に誰も座っていないマシンに接続することです。典型的なリモートサポートのシナリオです。Linux での手順は次のとおりです。

1. `.deb` または `.rpm` でインストールして systemd サービスを登録するか、アプリで **サービスを有効化する** をクリックします。
2. **設定 → セキュリティ**で強力な**固定パスワード**を設定します。デフォルトの承認モードのままで固定パスワードを受け付けます。2 要素目が必要なら、被操作デバイスの接続に 2FA を追加してください。詳しくは[無人アクセス設定ガイド](/ja/blog/rustdesk-unattended-access-setup-ja)をご覧ください。
3. Wayland でログイン前にアクセスするには、x86_64 の Debian/Ubuntu 系システムで[無人アクセス対応の Wayland プレビュー](/ja/blog/unattended-remote-access-wayland-ja)を使うか、対応していればディスプレイマネージャーのログイン画面が X11 を使うように設定します。X11 のデスクトップセッションを選ぶだけでは、ログイン後のセッションにしか影響しません。

## ヘッドレス Linux：モニターのないサーバー

Linux でよくある使い方が、ディスプレイがまったく接続されていないマシンです。ホームサーバー、検証用マシン、VM などです。モニターがないと、グラフィックスタックがアクティブな出力を用意しないことが多く、キャプチャする画像がないため黒い画面になります。

描画対象を用意する方法は 2 つあります。

- **ダミープラグ** — GPU にモニターが接続されていると認識させる、安価な物理的な HDMI/DisplayPort の「ヘッドレス」ドングルです。
- **仮想ディスプレイドライバー** — X11 では `xserver-xorg-video-dummy`、あるいは VKMS のようなカーネルレベルの選択肢があります。

## Linux での RustDesk サーバーのセルフホスティング

ここまでは _クライアント_ の話です。RustDesk と Linux のもう一つの側面は、**サーバー**（`hbbs` の ID/ランデブーサービスと `hbbr` のリレー）が Linux ネイティブのアプリケーションであり、Linux こそが本来の居場所だという点です。これにより、セッションの仲介とリレーされるトラフィックを、ベンダーのクラウドを経由させずに自社のインフラ上に置けます。

選択肢は 2 つあります。**Server OSS** はライセンス料も有効期限もなく無料で、接続とリレーというコア機能をカバーします。**RustDesk Server Pro** は、セルフホスト型の Web コンソール、デバイスグループ、共有アドレス帳を追加し、Basic プラン以上ではカスタムブランドのクライアント生成機能と [LDAP/Active Directory および OIDC による SSO](https://rustdesk.com/docs/ja/self-host/rustdesk-server-pro/ldap/) も利用できます。Docker も必須ではありません。通常の VM やベアメタルへのインストールについては、[Docker を使わずに Server Pro を動かす方法](https://rustdesk.com/docs/ja/self-host/rustdesk-server-pro/installscript/)をご覧ください。

セルフホスティングについてひとつ注意点があります。Server OSS も Server Pro も、運用、パッチ適用、セキュリティ確保は自分で行います。[ハードウェア要件は非常に低く](https://rustdesk.com/docs/ja/self-host/rustdesk-server-oss/install/)（Server OSS なら基本的なクラウドサーバーや Raspberry Pi でも動きます）、オンラインのデバイス数とリレーのトラフィックに合わせてサイジングし、更新、監視、バックアップの担当者を決めておいてください。有償プランにはサポートが含まれます。（なお、Server Pro は 1 日に 1 回程度、送信方向の HTTPS でライセンスを確認するため、rustdesk.com への通信経路が必要です。）

## はじめに

お使いのディストリビューション向けのパッケージをインストールし、無人アクセス用に固定パスワードを設定し、データ主権がこのページを読んでいる理由なら Server OSS を立ち上げましょう。最新のプランの詳細は [rustdesk.com/pricing](https://rustdesk.com/pricing) が正式な情報源です。Server Pro について相談したい場合は [sales@rustdesk.com](mailto:sales@rustdesk.com) までお問い合わせください。まず動作を見てみたい方は、[RustDesk の動作をご覧ください](https://www.youtube.com/@rustdesk)。

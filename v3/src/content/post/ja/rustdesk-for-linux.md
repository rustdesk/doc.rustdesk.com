---
publishDate: 2026-07-09T08:32:00Z
lang: 'ja'
translationKey: rustdesk-for-linux
draft: false
title: 'RustDesk for Linux：オープンソースのリモートデスクトップ'
excerpt: 'Linux で RustDesk をインストールして実行する方法を解説：.deb、.rpm、Flatpak、AppImage の選び方、X11 と Wayland の違い、ヘッドレス環境や無人アクセスの設定、サーバーのセルフホスティングまで。'
image: ~/assets/images/blog/rustdesk-for-linux-og.webp
category: 'ガイド'
tags: ['RustDesk', 'Linux', 'セルフホスティング']
author: 'RustDesk Team'
slug: 'rustdesk-for-linux-ja'
faq:
  - question: 'RustDesk は Wayland で動作しますか？'
    answer: 'はい。RustDesk はリモートデスクトップツールの中でも屈指の Wayland サポートを備えており、1.4.3 で追加されたマルチモニター共有もその一つです。Wayland では PipeWire と XDG デスクトップポータルを通じて画面をキャプチャします。ポータルはディスプレイを選択するための同意ダイアログを表示しますが、多くの場合その選択内容は記憶されるため、毎回確認を求められることはありません。また、ログイン中のアクティブなセッション内で動作します。この同意のステップは、あらゆる画面共有アプリに共通する Wayland のセキュリティ設計によるものです。現時点でログイン前や完全な無人アクセスが必要なマシンについては、ヘッドレス仮想ディスプレイ構成を使用してください（あるいは、複数のディストリビューションが Wayland 専用への移行を進めているとはいえ、まだ X11 セッションを提供しているディストリビューションであれば X11 セッションでも構いません）。完全な無人 Wayland キャプチャは現在活発に開発が進められています（github.com/rustdesk/rustdesk/pull/15420 を参照）。'
  - question: 'Linux ではどのパッケージをインストールすればよいですか？'
    answer: 'Debian、Ubuntu、Linux Mint では .deb を、Fedora、RHEL、openSUSE では .rpm を使用してください。サンドボックス化された、広く互換性のあるビルドが必要な場合は Flathub の Flatpak を、単一ファイルのフォールバックとしてはポータブルな AppImage を使用します。.deb と .rpm パッケージは systemd サービスを登録・起動するため、再起動後も RustDesk が動作し続けます。Flatpak と AppImage はデフォルトではそうなりません。'
  - question: 'なぜヘッドレスの Linux マシンで黒い画面が表示されるのですか？'
    answer: 'モニターが接続されていない場合、X も Wayland もフレームバッファを確保しないため、RustDesk がキャプチャできるものが何もなく、ビューア側には黒い画面または画像待ちの画面が表示されます。ダミーの HDMI/DisplayPort プラグを接続するか、xserver-xorg-video-dummy や VKMS などの仮想ディスプレイを設定するか、あるいは RustDesk のオプトイン式 Linux ヘッドレスモードを有効にして仮想ディスプレイを自動的に作成させてください。'
  - question: 'Linux で RustDesk サーバーをセルフホストできますか？'
    answer: 'はい。RustDesk サーバー（hbbs の ID／ランデブープロセスと hbbr のリレープロセス）は Linux 向けに構築されており、これが標準的な実行方法です。無料でオープンソースのコミュニティサーバーは無期限で無償で稼働し、Server Pro はそれに加えて Web コンソール、デバイスグループ、カスタムクライアント生成機能を追加します。どちらも通常の Linux VM やベアメタルホストにインストールできます。'
metadata:
  description: 'Linux 版 RustDesk を網羅的に解説：各ディストリビューションや ARM ボード向けのパッケージ選び、Wayland と X11 でのキャプチャ、ヘッドレス設定、自前のサーバー運用まで。'
  keywords: 'RustDesk Linux, RustDesk Ubuntu, RustDesk Wayland, RustDesk X11, RustDesk Linux インストール'
---

Linux ユーザーには、これまで優れたリモートデスクトップツールの選択肢がほとんどありませんでした。存在するものといえば、クローズドソースの商用製品か、古びた VNC スタックのどちらかが定番です。RustDesk はそれらとは一線を画す存在です。AGPL ライセンスのオープンソースのリモートデスクトップクライアントであり、主要なディストリビューションすべてでネイティブに動作し、しかも自分でホストするサーバーに接続できます。監査可能なコード、ネイティブな Linux クライアント、そしてセルフホスト可能なインフラという組み合わせこそが、Linux 向けのオープンソースのリモートデスクトップを探す人にとって RustDesk が定番の答えの一つになっている理由です。

このガイドでは、インストール方法、誰もがつまずきがちなポイント（X11 と Wayland の違い）、無人アクセスとヘッドレスアクセスを機能させる方法、そしてサーバーがどのように関わってくるかを解説します。

## Linux への RustDesk のインストール

RustDesk は一般的な Linux のパッケージ形式すべてに対応しているため、ソースからビルドする必要はほとんどありません。[GitHub の RustDesk リリースページ](https://github.com/rustdesk/rustdesk/releases)または [Linux インストールドキュメント](https://rustdesk.com/docs/en/client/linux/)から最新リリースを入手し、お使いのディストリビューションに合った形式を選んでください。

| 形式     | 最適な用途                                   | サービスの自動起動 | 備考                                                                                                         |
| -------- | -------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------ |
| `.deb`   | Debian、Ubuntu、Linux Mint                   | あり（systemd）    | `sudo apt install ./rustdesk-*.deb`                                                                          |
| `.rpm`   | Fedora、RHEL/CentOS、openSUSE                | あり（systemd）    | `sudo dnf install ./rustdesk-*.rpm`                                                                          |
| Flatpak  | 全ディストリビューション、サンドボックス環境 | なし               | `flatpak install flathub com.rustdesk.RustDesk`（[Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)） |
| AppImage | 全ディストリビューション、ポータブル環境     | なし               | 最近の Ubuntu では `libfuse2` が必要な場合あり。`chmod +x` してから実行                                      |
| AUR      | Arch、Manjaro                                | パッケージによる   | コミュニティによるメンテナンス（`rustdesk-bin`、`rustdesk-appimage`）                                        |

再起動後も RustDesk をバックグラウンドサービスとして動作させたい場合は、`.deb` と `.rpm` パッケージを使ってください。どちらも systemd ユニットを自動的に登録・起動します。Flatpak 版（[Flathub](https://flathub.org/apps/com.rustdesk.RustDesk) 上の `com.rustdesk.RustDesk`）はサンドボックス化されたビルドで、デスクトップ用途には便利ですが、デフォルトではシステムサービスをインストールしません。RustDesk が直接パッケージを提供していないディストリビューションの場合は、まず **Flatpak** を試すのがおすすめです。独自のランタイムを同梱しているため、最も広く互換性がある傾向があります。AppImage はポータブルな単一ファイル形式の代替手段ですが、実際には互換性にばらつきがあります（たとえば最近の Ubuntu では `libfuse2` が必要になる場合があります）。

実際に RustDesk は Ubuntu、Debian、Fedora、RHEL/CentOS、openSUSE、Arch、NixOS など幅広い環境で使われており、**x86_64、ARM64（aarch64）、ARM32（ARMv7）** 向けのビルドも用意されているため、標準的な PC だけでなく ARM ボードやサーバーでも動作します。

## X11 vs Wayland：ここが重要なポイント

これは Linux 版 RustDesk を理解するうえで最も重要なポイントです。というのも、リモート操作がそのまま「すぐに使える」のか、それとも事前にちょっとした設定調整が必要なのかを左右するからです。

**X11（Xorg）：ディストリビューションがまだ提供している場合、最も直接的なキャプチャ経路です。** X11 では RustDesk がフレームバッファを直接読み取り、入力も直接注入するため、画面キャプチャとマウス・キーボード操作はこれ以上ないほど直接的で、モニターの変更も動的に検出されます。多くのディスプレイマネージャーでは、ログイン画面の歯車メニューから今でも「Xorg」/「X11」を選択できます。ただし、複数のディストリビューションが Wayland 専用への移行を進めており、X11 セッションを廃止しつつある点には注意してください。そのため X11 は「たまたま使える場合に便利なもの」として扱い、それを前提に導入計画を立てないようにしましょう。

**Wayland：RustDesk はリモートデスクトップツールの中でもおそらく最も強力な Wayland サポートを備えています。** RustDesk はバージョン 1.2.0 から Wayland に対応しており、その後も継続的に機能を拡張してきました。Wayland のコンポジターは直接的なフレームバッファへのアクセスを許可しないため、RustDesk は `xdg-desktop-portal` サービスと [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support) を通じて画面をキャプチャし、カーネルの `uinput` モジュール経由で入力を注入します。この Wayland 自体の設計から、2つの帰結が生じます。これは RustDesk に限らず、Wayland 上で動作するすべての画面共有ツールに当てはまることです。

- **接続のたびに同意が必要。** ポータルがダイアログを表示し、どのディスプレイを共有するかを選択するよう求めます。これは RustDesk の不具合ではなく、意図的な Wayland のセキュリティ機能です。バックグラウンドアプリが密かに画面の録画を開始することはできない、という仕組みです。ポータル v4 以降では「リストアトークン」に対応しており、毎回確認を求められるわけではありませんが、最初の共有時には画面上でのクリックが必要です。
- **アクティブなセッションに限定。** Wayland のキャプチャは、ログイン済みのグラフィカルセッションに紐づいています。Wayland のログイン画面（グリーター）のキャプチャはまだサポートされておらず、現在活発に開発が進められています（[PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)）。現時点でログイン前にアクセスしたい場合は、後述のヘッドレス／仮想ディスプレイ構成を使うか、まだ X11 セッションを提供しているディストリビューションであれば X11 セッションを利用してください。

Wayland サポートは今も改善が続いており、たとえば RustDesk 1.4.3（2025年10月）では [Wayland 向けのマルチモニター共有が追加されました](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/)。とはいえ、Wayland 環境で接続後に黒い画面が表示される場合、そのほとんどはポータル／PipeWire の経路が正しく満たされていないことが原因です。[RustDesk が接続済みなのに画像待ちになる場合](/ja/blog/rustdesk-connected-waiting-for-image-ja)についての専用記事では、この Wayland での黒画面のケースを具体的に取り上げています。

## Linux での無人アクセス

無人アクセスとは、目の前に誰も座っていないマシンに接続することを指します。典型的なリモートサポートのシナリオです。Linux での手順は次のとおりです。

1. `.deb` または `.rpm` でインストールして systemd サービスを登録するか、アプリ内で **サービスを有効にする** をクリックします。
2. RustDesk の接続設定で強力な **永続パスワード** を設定します（できれば二要素認証も有効にしてください）。
3. ユーザーログイン前や複数ログインをまたいでアクセスする場合は、後述のヘッドレス仮想ディスプレイ構成を使用してください（前述の Wayland のログイン画面に関する制約がここにも当てはまります）。

計画時に考慮すべき Wayland の現実として、Wayland のセクションで説明した同意ベースのポータルにより、開発中の無人アクセスサポートが実装されるまでは、完全な無人キャプチャは X11 より難しくなります。そのため、人手を介さないマシンについては、ヘッドレス仮想ディスプレイ構成を前提に計画してください。

## ヘッドレス Linux：モニターのないサーバー

Linux の非常によくある使用例が、ディスプレイがまったく接続されていないマシンです。ホームサーバー、検証用マシン、VM などです。この場合、問題は RustDesk ではなくグラフィックスタック側にあります。モニターが接続されていないと、X も Wayland もフレームバッファを確保しないため、文字どおりキャプチャする画像が存在せず、黒い画面が表示されてしまいます。

描画対象を用意する方法は3つあります。

- **ダミープラグ** — GPU にモニターが接続されていると誤認させる、安価な物理的な HDMI/DisplayPort の「ヘッドレス」ドングルです。
- **仮想ディスプレイドライバー** — X11 では `xserver-xorg-video-dummy`、あるいは VKMS のようなカーネルレベルの選択肢があります。
- **RustDesk のオプトイン式ヘッドレスモード** — `sudo rustdesk --option allow-linux-headless Y` で有効化します。[Headless Linux Support のウィキ](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support)によると、これはデフォルトでは無効になっており、主に GNOME を使った Ubuntu でテストされていて、`xserver-xorg-video-dummy` や `lightdm` といったパッケージが必要になります。マシンの ID は `sudo rustdesk --get-id` で取得でき、パスワードは `sudo rustdesk --password <password>` で設定できます。

ヘッドレスモードはまだ細部が洗練されておらず発展途上のため、「そのまま使える」ものというより「注意しながら使えば動く」ものとして扱ってください。

## Linux での RustDesk サーバーのセルフホスティング

ここまでは _クライアント_ 側の話です。RustDesk と Linux のもう一つの側面は、**サーバー**（`hbbs` の ID／ランデブーサービスと `hbbr` のリレー）が Linux ネイティブなアプリケーションであり、Linux こそがその本来の居場所であるという点です。これにより、セッションの仲介やリレーされるトラフィックを、ベンダーのクラウドを経由させることなく、自分が所有するインフラ上に保持できます。

選択肢は2つあります。無料でオープンソースの **コミュニティサーバー** は無期限で無償で稼働し、接続とリレーというコア機能をカバーします。**RustDesk Server Pro** は、セルフホスト型の Web コンソール、デバイスグループ、共有アドレス帳、カスタムブランドのクライアント生成機能、そして [LDAP/Active Directory と OIDC SSO](https://rustdesk.com/docs/ja/self-host/rustdesk-server-pro/ldap/) を追加します。Docker の利用が必須というわけでもありません。通常の VM やベアメタルへのインストールについては、[Docker を使わずに Server Pro を実行する方法](https://rustdesk.com/docs/ja/self-host/rustdesk-server-pro/installscript/)をご覧ください。大規模な台数向けにハードウェアをサイジングする場合は、確定する前に、実際の同時接続数とリレーのプロファイルに基づいてキャパシティを計画してください。

セルフホスティングについて一つ補足すると、無料のコミュニティサーバーと Server Pro は、どちらも自分自身で運用し、パッチを適用し、セキュリティを確保するものです。ハードウェア要件は低く、一度セットアップしてしまえば運用の手間もわずかです。何か疑問が出てきた場合は RustDesk のサポートに相談することもできます。この「自分で所有する」という点こそが本質です。（なお、Server Pro のライセンスをアクティベートし、有効な状態を維持するには、rustdesk.com へのアウトバウンド通信経路も必要です。）

## はじめに

お使いのディストリビューション向けのパッケージをインストールし、無人アクセス用に永続パスワードを設定し、そしてもしデータ主権がこのガイドを読んでいる理由であれば、無料のコミュニティサーバーを立ち上げましょう。最新のプラン詳細については [rustdesk.com/pricing](https://rustdesk.com/pricing) が正式な情報源であり、Server Pro について相談したい場合は [sales@rustdesk.com](mailto:sales@rustdesk.com) までお問い合わせください。まずは動作を見てみたいという方は、[RustDesk の実際の動作を見る](https://www.youtube.com/@rustdesk)をご覧ください。

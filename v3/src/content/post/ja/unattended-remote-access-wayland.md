---
publishDate: 2026-08-14T10:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'ja'
translationKey: 'unattended-remote-access-wayland'
draft: false
title: 'RustDeskのWaylandプレビュー：無人アクセスとログイン画面へのアクセス'
excerpt: 'x86_64 の Debian/Ubuntu 系システム向けの RustDesk プレビュー版で、マルチモニター環境や再起動後のログイン画面を含む、Wayland での無人アクセスが可能になりました。'
image: '~/assets/images/blog/unattended-remote-access-wayland-og.webp'
category: 'リリース'
tags: ['RustDesk', 'Wayland', 'Linux', '無人アクセス']
author: 'RustDesk Team'
slug: 'unattended-remote-access-wayland-ja'

metadata:
  description: 'x86_64 の Debian/Ubuntu 系システム向け RustDesk Wayland プレビュー版をお試しください。複数モニターでも、再起動後のログイン画面でも無人アクセスが可能です。'
  keywords: 'RustDesk Wayland, Wayland 無人アクセス, Wayland リモートデスクトップ, Linux リモートデスクトップ Wayland, RustDesk Linux, 無人リモートアクセス'
---

Wayland への対応は、Linux のリモートデスクトップの中でも特に難しい課題のひとつでした。

標準の RustDesk ビルドは、ログイン中のセッションで PipeWire と `xdg-desktop-portal` を通じて、すでに Wayland のデスクトップをキャプチャでき、バージョン 1.4.3 以降は複数モニターにも対応しています。新しい **x86_64 の Debian/Ubuntu 系システム向け RustDesk Wayland プレビュー版**では、**Wayland での本当の意味での無人アクセス**が加わります。初回のセットアップを済ませれば、セッションのたびにリモート側の誰かが承認する必要はありません。**無人セッションでもマルチモニター環境が使えます。**

誰もログインしていない状態でも接続できます。再起動後の**ログイン画面**からでも接続できます。

<div class="twitter-embed" style="display:flex;justify-content:center;">
<blockquote class="twitter-video" data-media-max-width="560"><a href="https://twitter.com/rustdesk/status/2087945266855026744">X でデモ動画を見る</a></blockquote>
</div>
<script data-astro-rerun>
(function () {
  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load();
  } else if (!document.getElementById('twitter-wjs')) {
    var s = document.createElement('script');
    s.id = 'twitter-wjs';
    s.async = true;
    s.src = 'https://platform.twitter.com/widgets.js';
    document.head.appendChild(s);
  }
})();
</script>

現時点では、**x86_64 の Debian/Ubuntu 系システム**向けの独立したプレビュービルドとして公開しています。

**[Wayland 無人アクセス版をダウンロード](https://github.com/rustdesk/rustdesk/releases/download/nightly/rustdesk-unattended-wayland-1.4.9-x86_64.deb)**

比較として、[AnyDesk は Linux への着信接続に Xorg が必要だと説明しており](https://support.anydesk.com/anydesk-for-linux-raspberry-pi)、[TeamViewer は Wayland への対応を実験的なものと位置づけています](https://community.teamviewer.com/English/discussion/122410)。

これをデフォルトにする前に、より多くの実環境でのテストを重ねたいと考えています。

実装が安定したら、**Fedora や Arch Linux** をはじめ、より多くの Linux ディストリビューションに Wayland での無人アクセスを広げ、最終的には RustDesk の標準リリースに組み込む予定です。

Wayland をお使いの方、特にマルチモニター環境の方は、ぜひプレビュービルドを試して、うまく動いた点と動かなかった点を教えてください。確認していただきたいのは、再起動後に誰もログインする前に接続できるか、ログアウト後に再接続できるか、各モニターを選択できるか、といった点です。フィードバックにはディストリビューション、デスクトップ環境、ディスプレイマネージャー、ビルドのバージョンを添えてください。これらの確認が済むまでは、既存のアクセス手段も残しておいてください。

## 関連記事

- [RustDesk for Linux](/ja/blog/rustdesk-for-linux-ja)
- [RustDesk無人アクセス設定ガイド](/ja/blog/rustdesk-unattended-access-setup-ja)
- [RustDesk vs AnyDesk](/ja/blog/rustdesk-vs-anydesk-ja)
- [RustDesk vs TeamViewer](/ja/blog/rustdesk-vs-teamviewer-ja)
- [Wayland キャプチャの実装（DRM/KMS）](https://github.com/rustdesk/rustdesk/pull/15420)

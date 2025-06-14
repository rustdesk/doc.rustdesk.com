---
title: RustDesk クライアント
weight: 2
pre: "<b>1. </b>"
---

### 紹介
RustDesk クライアントは、オープンソースまたはプロ版の RustDesk サーバー経由で接続するためにデバイスで使用されます。[GitHub](https://github.com/rustdesk/rustdesk/releases/latest) からダウンロードできます。

### サポートされているプラットフォーム
- Microsoft Windows
- macOS
- Debian 派生 (Ubuntu ≥ 16、Linux Mint など)
- Red Hat 派生 (CentOS、Fedora ≥ 18、Rocky Linux など)
- Arch Linux/Manjaro
- openSUSE
- NixOS
- AppImage / Flatpak
- Android
- iOS (制御されることはサポートしていません)
- Web

### インストール

#### Windows

GitHub から exe をダウンロードしてインストールします。

サイレントインストールするには、`--silent-install` でインストール exe を呼び出します。

#### macOS

GitHub から dmg ファイルをダウンロードします。詳細については [macOS ページ](https://rustdesk.com/docs/en/client/mac/) をご覧ください。

dmg ファイルを開き、`RustDesk` を `Applications` にドラッグします。

RustDesk の実行を許可します。

要求された権限を有効にし、RustDesk の左側のプロンプトに従ってセットアップを完了します。

#### Linux

さまざまな Linux の「フレーバー」にインストールするための以下の手順をご覧ください（インストーラーは GitHub にあるか、ディストリビューションのリポジトリから利用できます）。

##### Debian 派生

```sh
# 間違ったディスク使用量レポートを無視してください
sudo apt install -fy ./rustdesk-<version>.deb
```

##### Red Hat 派生

```sh
sudo yum localinstall ./rustdesk-<version>.rpm
```

##### Arch Linux/Manjaro

```sh
sudo pacman -U ./rustdesk-<version>.pkg.tar.zst
```

##### openSUSE (≥ Leap 15.0)

```sh
sudo zypper install --allow-unsigned-rpm ./rustdesk-<version>-suse.rpm
```

##### Nix / NixOS (≥ 22.05)

`rustdesk` を実行する準備ができたシェルに一時的に入る：

```sh
nix shell nixpkgs#rustdesk
```

現在のユーザープロファイルにインストール：

```sh
nix profile install nixpkgs#rustdesk
```

NixOS でシステム全体にインストールするには、`configuration.nix` を編集した後に `nixos-rebuild switch --flake /etc/nixos` を実行します：

```
  environment.systemPackages = with pkgs; [
    ...
    rustdesk
  ];
```

#### Android
GitHub から apk をインストールします。詳細については [Android ページ](https://rustdesk.com/docs/en/client/android/) をご覧ください。

#### iOS (iPhone、iPad)
[App Store](https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015) からアプリをダウンロードします。

### 使用方法
インストール後（または一時的な実行可能ファイルとして実行）、RustDesk はパブリックサーバーに接続します。下部に (1) "Ready, For faster connection, please set up your own server"（準備完了、より高速な接続のために独自のサーバーをセットアップしてください）というメッセージが表示されます。左上に (2) ID、(3) ワンタイムパスワードが表示され、右側に他のコンピューターの ID を知っている場合に接続するための (4) ボックスがあります。

![](/docs/en/client/images/client.png)

設定にアクセスするには、ID の右側にある (5) メニューボタン [ &#8942; ] をクリックします。

設定では以下が見つかります：
- 一般 - サービス制御、テーマ、ハードウェアコーデック、オーディオ、録画、言語
- セキュリティ - 制御を取る人の権限、パスワードオプション、ID を変更する機能、高度なセキュリティ設定
- ネットワーク - 独自のサーバー設定とプロキシをここで設定
- ディスプレイ - リモートセッションのディスプレイ設定とその他のデフォルトオプション、クリップボード同期など
- アカウント - これはプロサーバーと組み合わせて API にサインインするために使用できます
- バージョン情報 - ソフトウェアに関する情報を表示

### RustDesk の設定
RustDesk を設定する方法は複数あります。

最も簡単な方法は RustDesk Server Pro を使用することです。暗号化された設定文字列を取得でき、これを `--config` と組み合わせて設定をインポートできます。これを行うには：
1. 使用している OS でコマンドラインを開き、RustDesk がインストールされているフォルダー（Windows では `C:\Program Files\RustDesk`、Linux では `/usr/bin`）に移動します。
2. `rustdesk.exe --config your-encrypted-string` コマンドを使用します。例：`rustdesk.exe --config 9JSPSvJzNrBDasJjNSdXOVVBlERDlleoNWZzIHcOJiOikXZr8mcw5yazVGZ0NXdy5CdyciojI0N3boJye`。

手動でクライアントを設定することもできます。これを行うには：
1. 設定をクリックします。
2. ネットワークをクリックします。
3. ネットワーク設定のロック解除をクリックします。
4. ID、リレー、API（プロサーバーを使用している場合）、およびキーを入力します。

![](/docs/en/client/images/network-settings.png)

手動でクライアントを設定した場合、`RustDesk2.toml` ファイル（ユーザーフォルダー内）を取得し、上記の例と同様の方法で `--import-config` を使用できます。

### コマンドラインパラメーター
- `--password` は永続的なパスワードを設定するために使用できます。
- `--get-id` は ID を取得するために使用できます。
- `--set-id` は ID を設定するために使用できます。ID は文字で始まる必要があることに注意してください。
- `--silent-install` は Windows で RustDesk をサイレントインストールするために使用できます。

追加の高度なパラメーターは[こちら](https://github.com/rustdesk/rustdesk/blob/bdc5cded221af9697eb29aa30babce75e987fcc9/src/core_main.rs#L242)で見つけることができます。

{{% children depth="3" showhidden="true" %}}

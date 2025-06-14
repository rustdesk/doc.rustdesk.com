---
title: macOS
weight: 21
---

これを行う方法は複数ありますが、このガイドでは `Xcode`、`Git`、`Homebrew` が既にインストールされていることを前提としています。

最大の課題は、特に Xcode や LLVM などのツールチェーンの一部が macOS バージョンによって決まるため、すべてのツールが連携して動作するバージョンを見つけることです。このガイドで使用されているバージョンは、あなたが使用すべきバージョンではない可能性があります。使用するバージョンを決定する開始点として、ビルドしたい RustDesk バージョンの [GitHub ビルドワークフロー](https://github.com/rustdesk/rustdesk/blob/master/.github/workflows/flutter-build.yml) を参照してください。ページの左上でファイルを表示するタグを選択してください。ただし、GitHub ランナーに付属する macOS ツールが、ローカルシステムのものと同じバージョンでない可能性があるため、これが必ずしも機能するとは限りません。

### Export
`export` は様々な環境変数を設定するために使用されます。`export` を実行すると、その変数は現在のターミナルセッションのみに設定され、現在または将来 RustDesk をビルドするために使用したい新しいターミナルウィンドウごとに繰り返す必要があります。一般的には、すべての `export` を、開かれるすべてのターミナルに対して自動的に実行されるスクリプト（例：`~/.bash_profile`）に追加することが望ましいです。ここに記載されている完全な `export` コマンドは、単純にファイルに追加できますが、ファイルは *新しい* ターミナルが開かれるまで読み込まれないため、現在のターミナルでも実行する必要があります。

## Homebrew から使用するツールをインストールする

```sh
brew install python3 create-dmg nasm cmake gcc wget ninja pkg-config wget rustup
```

対象フォルダがシステムに存在しないため、一部のインストールが失敗する場合があります。その場合は、フォルダを作成し、所有者と権限を設定して、`brew` コマンドを再度実行してください。例えば、`/usr/local/include` が存在しない場合：
```sh
sudo mkdir /usr/local/include
sudo chown <username>:admin /usr/local/include
sudo chmod 775 /usr/local/include
```

## vcpkg をインストールする
Vcpkg は RustDesk が使用する C/C++ 依存関係を管理するために使用されます。インストール場所を決定し、`vcpkg` フォルダを配置したいフォルダから以下を実行してください。この例では、場所として `/Users/<username>/repos/` を使用し、バージョンとしてタグ `2023.04.15` を使用しています。

```sh
git clone https://github.com/microsoft/vcpkg
cd vcpkg
git checkout 2023.04.15
./bootstrap-vcpkg.sh -disableMetrics
./vcpkg install libvpx libyuv opus aom
export VCPKG_ROOT=~/repos/vcpkg
```

## Rust をインストールして設定する
Rust の管理には `rustup` を使用しますが、これは上記で Homebrew を使用して既にインストールされています。ただし、まだ設定が必要です。指示に従い、`rustup` と `rustc` の両方が `PATH` にあることを確認してください。この例では Rust バージョン `1.75.0` を使用していますが、異なるバージョンを使用する必要がある場合があります。`rustup` を使用して複数のバージョンの Rust をインストールして管理できます。

```sh
rustup-init
rustup default 1.75.0
rustup component add rustfmt
```
インストールされたデフォルトの Rust ツールチェーンの概要を確認するには、`rustup show` を実行してください。

## RustDesk ソースファイルをダウンロードする

RustDesk ソースファイルを配置する場所を決定し、`rustdesk` フォルダを配置したいフォルダから以下を実行してください。この例では、場所として `/Users/<username>/repos/` を使用しています。

```sh
git clone --recurse-submodules https://github.com/rustdesk/rustdesk
cd rustdesk/libs/portable/
python3 -m pip install --upgrade pip
pip3 install -r requirements.txt
```

`python3` または `pip` が不明な場合は、以下のようにして `PATH` に追加してください（実際のフォルダ名を使用してください）：
```sh
export PATH=~/Library/Python/3.9/bin:$PATH
```
それが完了したら、失敗したコマンドを再度実行してください。`~/.bash_profile` も編集することを忘れないでください。

## ユーザーインターフェイスコンポーネントをインストールする
RustDesk は [Sciter](https://sciter.com/) と [Flutter](https://flutter.dev/) の両方を使用してビルドできます。これらの両方には追加のコンポーネントが必要なので、関連するバージョンまたは両方の手順に従ってください。

### Sciter

`rustdesk` フォルダから実行してください：
```sh
wget https://github.com/c-smile/sciter-sdk/raw/master/bin.osx/libsciter.dylib
```

### Flutter

[FVM](https://fvm.app/) を使用すると、使用する Flutter のバージョンを管理でき、異なる Flutter バージョンを簡単に試すための最も簡単な方法です。

```sh
brew tap leoafarias/fvm
brew install fvm cocoapods
```
例えば Flutter `3.16.9` をインストールして使用するには：

```sh
fvm global 3.16.9
```
FVM は、異なるプロジェクトに異なる Flutter バージョンを提供できるより複雑な設定を使用することを意図していますが、それはこのガイドの範囲を超えています。代わりに、FVM によって提供されるデフォルトの Flutter の場所を手動で `PATH` に追加するだけで、Flutter バージョンを切り替えるために `fvm global` を使用する必要があります：

```sh
export PATH=$HOME/fvm/default/bin:$PATH
```

それが完了したら、テレメトリを無効にし、すべてが正常かどうかを確認する必要があります：

```sh
flutter --disable-analytics
dart --disable-analytics
flutter doctor -v
```
一部のチェックが失敗しても問題ありません。通常は失敗します。重要なのは、使用を意図している環境、つまり `Xcode` のチェックが正常であることです。問題が報告された場合は、先に進む前にそれらに対処してください。

Flutter が起動して実行されたら、Rust と Flutter を結びつける「ブリッジ」をインストールする時です。これは、他のすべてと連携して動作する必要があるバージョンのもう1つです。この例では `1.80.1` を使用します：

```sh
cargo install flutter_rust_bridge_codegen --version "1.80.1" --features "uuid"
```

## ビルド

`rustdesk` フォルダからビルドしてください。Sciter バージョンをビルドするには：

```sh
python3 ./build.py
```

Flutter バージョンをビルドするには：
```sh
flutter_rust_bridge_codegen --rust-input ./src/flutter_ffi.rs --dart-output ./flutter/lib/generated_bridge.dart --c-output ./flutter/macos/Runner/bridge_generated.h
python3 ./build.py --flutter
```
すべてがうまくいけば、`rustdesk` フォルダにインストール準備完了の `dmg` ファイルができているはずです。
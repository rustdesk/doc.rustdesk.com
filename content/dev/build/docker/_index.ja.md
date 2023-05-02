---
title: Docker 
weight: 30
---

## Dockerでビルドする方法

リポジトリのクローンを作成し、Dockerコンテナを構築することから始めます。

```sh
git clone https://github.com/rustdesk/rustdesk
cd rustdesk
docker build -t "rustdesk-builder" .
```

その後、アプリケーションをビルドする必要があるたびに、以下のコマンドを実行します。

```sh
docker run --rm -it -v $PWD:/home/user/rustdesk -v rustdesk-git-cache:/home/user/.cargo/git -v rustdesk-registry-cache:/home/user/.cargo/registry -e PUID="$(id -u)" -e PGID="$(id -g)" rustdesk-builder
```

なお、最初のビルドでは、依存関係がキャッシュされるまで時間がかかることがありますが、その後のビルドではより速くなります。さらに、ビルドコマンドに別の引数を指定する必要がある場合は、コマンドの最後にある `<OPTIONAL-ARGS>` の位置で指定することができます。例えば、最適化されたリリースバージョンをビルドしたい場合は、上記のコマンドの後に
`--release` を実行します。できあがった実行ファイルは、システムのターゲット・フォルダに格納され、次のコマンドで実行できます。

```sh
target/debug/rustdesk
```

あるいは、リリース用の実行ファイルを実行している場合:

```sh
target/release/rustdesk
```

これらのコマンドをRustDeskリポジトリのルートから実行していることを確認してください。そうしないと、アプリケーションが必要なリソースを見つけられない可能性があります。また、 `install` や `run` などの他の cargo サブコマンドは、ホストではなくコンテナ内にプログラムをインストールまたは実行するため、現在この方法ではサポートされていないことに注意してください。

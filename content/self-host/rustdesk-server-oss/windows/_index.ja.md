---
title: Windows & PM2 または NSSM
weight: 20
---

{{% notice note %}}
Windowsのセキュリティポリシーは扱いが難しく、このチュートリアルがうまくいかない場合、または不安定な接続に遭遇した場合は、Linuxサーバーに移行してください。
{{% /notice %}}

{{% notice note %}}
GUI版の `RustDeskServer.setup.exe` はもうメンテナンスされていないため、推奨されません。
{{% /notice %}}

## 分岐点
RustDeskサーバーを起動するために、PM2（より簡単）またはNSSM（少し難しい）のいずれかを使用する2つの選択肢があります。
NSSMを使用する利点：
- 古いWindowsとの下位互換性（Windows Server 2008 R2/Windows 7以前、ただし未テスト）。
- Windows Serverに最適
- ログインなしでの起動時の自動開始（起動エントリを作成したユーザーがログオンする必要がありません）。
- 両方のバイナリをサービスとして実行。
- スタンドアロン（Node.jsへの依存なし）

一方、PM2の利点：
- メインの作業用コンピュータと同じコンピュータでサーバーを実行する場合に適しています
- RustDeskの起動エントリを作成したユーザーに定期的にログオンする場合
- よりユーザーフレンドリー

## NSSMを使用したインストール

### NSSMのインストール
[ダウンロード](https://github.com/dkxce/NSSM/releases/download/v2.25/NSSM_v2.25.zip)してNSSMを展開し、Windowsシステムに適したアーキテクチャを選択してください（x86の場合はwin32フォルダの内容を使用、x64の場合はwin64フォルダの内容を使用）。また、NSSMのバイナリをインストールドライブ（通常はC:ドライブ）の`Program Files\NSSM`ディレクトリに移動することをお勧めします（NSSMはサービスとして開始されると、配置されたディレクトリから移動できないため、`Program Files`に格納しておくのが最善です）。パス（`C:\Program Files\NSSM`など）をパス変数に追加することも推奨されます。

### NSSMが正しくインストールされているか確認
すべて正しく行った場合、`C:\Program Files\NSSM`フォルダ（この例ではC:ドライブを使用していますが、Windowsをインストールしたドライブや任意のパスを使用できます）には`nssm.exe`ファイルのみが含まれているはずです。

この例では`C:\Program Files\NSSM`を使用します。

コマンドプロンプトを開いて`nssm`を実行し、ヘルプページが表示されたら次のステップに進む準備ができています。

### hbbrとhbbsの実行
[RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases)のWindows版をダウンロードしてください。
プログラムを`C:\Program Files\RustDesk Server`に解凍します（または任意の場所に解凍しますが、サービスがインストールされた後に変更されないようにしてください）。コマンドプロンプトに戻ります。

この例では`C:\Program Files\RustDesk Server`を使用します。
```cmd
nssm install "RustDesk hbbs service" "C:\Program Files\RustDesk Server\hbbs.exe"
nssm install "RustDesk hbbr service" "C:\Program Files\RustDesk Server\hbbr.exe"
```
**注意：**
- `RustDesk hbbs service`はhbbsサービスに付けたい名前に変更できます
- `RustDesk hbbr service`はhbbrサービスに付けたい名前に変更できます
- `C:\Program Files\RustDesk Server\hbbs.exe`はRustDeskバイナリを配置した場所に変更できます
- `C:\Program Files\RustDesk Server\hbbr.exe`はRustDeskバイナリを配置した場所に変更できます

**コマンドテンプレート：**

コピー、ペースト、編集するためのコマンドテンプレート。

```cmd
nssm install <希望のhbbsサービス名> <RustDesk hbbsバイナリパス> <RustDesk hbbs引数>
nssm install <希望のhbbrサービス名> <RustDesk hbbrバイナリパス> <RustDesk hbbr引数>
```

**サービスの開始**

サービスのインストールが成功したら、それらを開始する必要があります。
```cmd
nssm start <希望のhbbsサービス名>
nssm start <希望のhbbrサービス名>
```

**完了！**

（上記の方法はWindows Server Core 2022 Standardでテストされています）。

## または

## PM2を使用したインストール

### Node.js をインストール

[ダウンロード](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi)してNode.jsをインストールしてください。
Node.jsはPM2の実行環境ですので、最初にNode.jsをインストールする必要があります。

### PM2 をインストール

`cmd.exe`に以下を入力し、各行で<kbd>Enter</kbd>キーを押して、1行ずつ実行してください。

```cmd
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### hbbr と hbbs を実行

[RustDesk Server](https://github.com/rustdesk/rustdesk-server/releases)のWindows版をダウンロードしてください。プログラムをC:ドライブに解凍します。次の4つのコマンドを実行してください：

```cmd
cd C:\rustdesk-server-windows-x64
pm2 start hbbs.exe
pm2 start hbbr.exe
pm2 save
```

### ログを表示

```cmd
pm2 log hbbr
pm2 log hbbs
```

## 代替チュートリアル
https://pedja.supurovic.net/setting-up-self-hosted-rustdesk-server-on-windows/?lang=lat

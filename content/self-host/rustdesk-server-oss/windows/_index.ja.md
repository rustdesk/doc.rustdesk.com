---
title: Windows & pm2
weight: 20
---


### NodeJs をインストール
[ダウンロード](https://nodejs.org/dist/v16.14.2/node-v16.14.2-x86.msi) してインストールしてください。
NodeJs は pm2 の実行環境ですので先にNodeJsをインストールする必要があります。

### pm2 をインストール
cmd.exe に下記を入力し1行ごとにEnterキーを押して1行ずつ実行します。
```
npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install
```

### hbbr と hbbs を実行
Windows版のサーバープログラムをダウンロードします。Cドライブに解凍するのであれば以下の4行のコマンドをそれぞれ実行します。
```
cd c:\rustdesk-server-windows-x64
pm2 start hbbs.exe 
pm2 start hbbr.exe 
pm2 save
```

### ログを確認
```
pm2 log hbbr
pm2 log hbbs
```

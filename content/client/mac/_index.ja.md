---
title: Mac 
weight: 3
---

## インストール

.dmgファイルを開き、以下のように`RustDesk`を`アプリケーション`にドラッグします。

![](/docs/en/client/mac/images/dmg.png)

実行中のすべてのRustDeskを終了したことを確認してください。また、トレイに表示されているRustDeskサービスも終了してください。

![](/docs/en/client/mac/images/tray.png)

## RustDeskの実行を許可する

| ロックを解除して変更 | `App Storeと確認済みの開発者からのアプリケーションを許可`をクリック |
| --- | --- |
| ![](/docs/en/client/mac/images/allow2.png) | ![](/docs/en/client/mac/images/allow.png) |

## 権限を有効にする

{{% notice note %}}
macOSのセキュリティポリシーの変更により、ローカル側で入力をキャプチャする私たちのAPIが機能しなくなりました。ローカルMac側で「入力監視」権限を有効にする必要があります。
こちらに従ってください
[https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923](https://github.com/rustdesk/rustdesk/issues/974#issuecomment-1185644923)。

バージョン1.2.4では、ツールバーのキーボードアイコンをクリックすることで表示される`Input source 2`を試すことができます。
{{% /notice %}}

画面をキャプチャするには、RustDeskに**アクセシビリティ**権限と**画面収録**権限を付与する必要があります。RustDeskが設定ウィンドウに案内します。

| RustDeskウィンドウ | 設定ウィンドウ |
| --- | --- |
| ![](/docs/en/client/mac/images/acc.png) | ![](/docs/en/client/mac/images/acc3.png?v2) |

設定ウィンドウで有効にしたにもかかわらず、RustDeskがまだ警告を表示する場合。設定ウィンドウから`-`ボタンで`RustDesk`を削除し、`+`ボタンをクリックして、`アプリケーション`から`RustDesk`を選択してください。

{{% notice note %}}
[https://github.com/rustdesk/rustdesk/issues/3261](https://github.com/rustdesk/rustdesk/issues/3261) <br>
その他の無力な試み： <br>
`tccutil reset ScreenCapture com.carriez.RustDesk` <br>
`tccutil reset Accessibility com.carriez.RustDesk` <br>
それでも再起動が必要です。
{{% /notice %}}

| `-`と`+`ボタン | `RustDesk`を選択 |
| --- | --- |
| ![](/docs/en/client/mac/images/acc2.png) | ![](/docs/en/client/mac/images/add.png?v2) |

**画面収録**権限についても上記の手順を繰り返してください。

![](/docs/en/client/mac/images/screen.png?v2)
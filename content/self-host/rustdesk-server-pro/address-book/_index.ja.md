---
title: アドレス帳
weight: 201
description: "RustDesk Server Pro のアドレス帳を使用して、リモートデバイスの保存、デバイスリストの共有、タグによるデバイス整理、共有パスワードを使った RustDesk クライアントからの接続を行います。"
keywords: ["rustdesk address book", "rustdesk server pro address book", "rustdesk shared address book", "rustdesk device tags", "rustdesk shared password"]
---

アドレス帳では、ユーザーが RustDesk デバイス ID を保存し、タグで整理し、デバイスリストを共有し、保存済みパスワードを使って RustDesk クライアントから接続できます。

## クイック回答

- **あなたのアドレス帳** は、サインイン中のユーザー専用です。手動入力して記憶されたパスワードは **あなたのアドレス帳** に保存され、そのユーザーのデバイス間で同期できます。
- **共有** アドレス帳は、特定のユーザー、ユーザーグループ、またはすべてのユーザーと共有できます。
- 共有アドレス帳にはアドレス帳レベルのパスワードを保存でき、各デバイス項目にはデバイスレベルのパスワードを保存できます。デバイスレベルのパスワードが設定されていない場合は、アドレス帳レベルのパスワードが使用されます。
- タグは、Web コンソールと RustDesk クライアントでデバイスをフィルタリングするために使用できます。

## 共有アドレス帳によるワンクリック接続

ユーザーが毎回リモートパスワードを手動入力せずに接続する必要がある場合は、共有アドレス帳を使用します。

1. 共有アドレス帳を作成するか開きます。必要に応じて、そのアドレス帳に **アドレス帳レベルのパスワード** を設定します。

2. アドレス帳名をクリックしてデバイスページを開きます。**インポート** をクリックし、アドレス帳にインポートするデバイスを選択して、下部の **保存** をクリックし、選択したデバイスを保存します。または **追加** をクリックして ID でデバイスを追加します。直接 IP アクセスの場合は、IP アドレスを ID として使用できます。必要に応じて、個別のデバイス項目に **デバイスレベルのパスワード** を設定します。

3. アドレス帳を特定のユーザー、ユーザーグループ、またはすべてのユーザーと共有します。

4. ユーザーが RustDesk クライアントにサインインし、**アドレス帳** タブを開きます。

5. ユーザーが共有アドレス帳を選択し、デバイスカードをクリックします。

![クライアントで共有アドレス帳のデバイスカードをクリック](/docs/en/self-host/rustdesk-server-pro/address-book/images/click-peer-card.png)

{{% notice warning %}}
共有パスワードは、対応する共有アドレス帳から接続する場合にのみ使用されます。デバイスカードをクリックする場合、またはそのドロップダウンメニューを使用する場合が対象です。別のデバイスタブ、ID 入力ボックス横の **接続** ボタン、または別の共有アドレス帳から接続する場合は使用されません。
{{% /notice %}}

## 共有アドレス帳の権限

| 権限 | ユーザーが実行できること |
| --- | --- |
| **読み取り専用** | デバイスとタグを表示でき、パスワードを使用できます。 |
| **読み取り/書き込み** | デバイスとタグを編集できます。 |
| **フルコントロール** | アドレス帳の再共有、削除、名前変更ができます。 |

複数のルールが同じユーザーに一致する場合、優先順位は次のとおりです。

1. ユーザー
2. グループ
3. 全員

たとえば、**全員** が読み取り専用で、特定のユーザーがフルコントロールの場合、そのユーザーにはフルコントロール権限が付与されます。

![アドレス帳共有権限](/docs/en/self-host/rustdesk-server-pro/address-book/images/share-list.png)

![Web コンソールの共有アドレス帳権限](/docs/en/self-host/rustdesk-server-pro/address-book/images/user1-permission.png)

## Web コンソール

### 共有アドレス帳の作成または編集

**アドレス帳 > 共有** で、名前、任意のメモ、任意の **デフォルト共有パスワード** を持つ共有アドレス帳を作成します。これがアドレス帳レベルのパスワードです。

![デフォルト共有パスワード付きの共有アドレス帳を作成](/docs/en/self-host/rustdesk-server-pro/address-book/images/create-shared-address-book.png)

### デバイスとパスワードの追加

デバイスは ID で手動追加するか、Server Pro のデバイスリストからインポートできます。各項目には、エイリアス、タグ、メモを設定できます。共有アドレス帳の場合は、デバイスレベルのパスワードも設定できます。

![共有アドレス帳にデバイスを追加](/docs/en/self-host/rustdesk-server-pro/address-book/images/import-device.png)

![デバイス](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-addressbook-devices.png)

![共有アドレス帳のデバイスを編集](/docs/en/self-host/rustdesk-server-pro/address-book/images/web-console-edit-device.png)

### タグとフィルタリング

タグはデバイスの整理とフィルタリングに使用します。`タグなし` はタグのないデバイスをフィルタリングします。**交差でフィルタ** をオンにすると、選択したすべてのタグに一致するデバイスのみが表示されます。

### ごみ箱

アドレス帳からデバイスを削除すると、その項目はそのアドレス帳のごみ箱に移動します。RustDesk Server Pro からデバイスが削除されるわけではありません。

## 共有パスワードの動作

| パスワードレベル | 優先順位 |
| --- | --- |
| デバイスレベルのパスワード | デバイス項目にパスワードがある場合、最初に使用されます。 |
| アドレス帳レベルのパスワード | デバイス項目にパスワードがない場合に使用されます。 |

どちらのパスワードも設定されていない場合、ユーザーは通常どおり接続し、必要に応じて手動でパスワードを入力します。Web コンソールでは、パスワード列はパスワードが設定されているかどうかだけを表示します。

## RustDesk クライアント

サインイン後、アドレス帳セレクターを使用して **あなたのアドレス帳** と共有アドレス帳を切り替えます。共有アドレス帳では、クライアントに現在のユーザーの権限が表示されます。

![RustDesk クライアントのアドレス帳セレクター](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-selector.png)

![読み取り専用アドレス帳](/docs/en/self-host/rustdesk-server-pro/address-book/images/read-only-address-book.png)

### クライアントから編集

書き込み権限を持つユーザーは、ID の追加、タグの追加、エイリアスの編集、タグの編集、メモの編集、共有パスワードの設定、または項目の削除ができます。

![RustDesk クライアントのアドレス帳デバイスメニュー 1](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu1.png)

![RustDesk クライアントで ID を追加](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-add-id.png)

![RustDesk クライアントのアドレス帳デバイスメニュー 2](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-address-book-device-menu2.png)

![RustDesk クライアントでパスワードを変更](/docs/en/self-host/rustdesk-server-pro/address-book/images/client-change-password.png)

## デプロイメントプリセット

RustDesk クライアント設定では、アドレス帳の割り当てを事前設定できます。

- `preset-address-book-name`
- `preset-address-book-tag`
- `preset-address-book-alias`
- `preset-address-book-password`
- `preset-address-book-note`

`preset-address-book-alias`、`preset-address-book-password`、`preset-address-book-note` には、RustDesk クライアント 1.4.3 以降、および RustDesk Server Pro 1.6.6 以降が必要です。

詳細については、[高度なクライアント設定](/docs/en/self-host/client-configuration/advanced-settings/#preset-address-book-name--preset-address-book-tag--preset-address-book-alias--preset-address-book-password--preset-address-book-note)を参照してください。

## 関連設定

| 設定 | 場所 | 効果 |
| --- | --- | --- |
| **管理者以外がアドレス帳を他のグループに共有することを許可** | **設定 > その他** | 管理者以外のユーザーがアドレス帳を他のユーザーグループと共有できるようにします。 |
| **アドレス帳を無効化** | **カスタムクライアント** | 生成されたカスタムクライアントでアドレス帳を非表示または無効化します。 |

## トラブルシューティング

### パスワードが間違っています

共有アドレス帳に保存されたパスワードは、制御側の RustDesk クライアントによって使用されます。制御されるデバイスには設定されません。制御されるデバイス側の **設定 > セキュリティ > パスワード** で、そのデバイスのパスワードを設定してください。

共有パスワードを使用するには、対応する共有アドレス帳からデバイスカードをクリックして接続します。別のアドレス帳、別のデバイスタブ、または ID 入力ボックス横の **接続** ボタンから接続しても、このアドレス帳の共有パスワードは使用されません。

---
title: ウェブコンソール
weight: 10
---

ウェブコンソールはRustDesk Server Proに統合されており、`21114`ポートで提供されます。

機能：

- デバイスの参照
- ユーザーとユーザーグループの追加/変更
- デバイスアクセス権限の変更
- デバイス接続ログと他のログの参照
- 設定の更新
- クライアント設定同期戦略の管理
- 共有アドレス帳の管理
- カスタムクライアントビルドの生成

## ログイン

ウェブコンソールのデフォルトポートは21114です。ブラウザで`http://<サーバーIP>:21114`を入力してコンソールページにアクセスします。下図に示すように、デフォルトの管理者ユーザー名/パスワードは`admin`/`test1234`です：

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-login.png)

HTTPSサポートが必要な場合は、`Nginx`などのウェブサーバーをインストールするか、WindowsでIISを使用してください。

ログイン後は必ずパスワードを変更してください。右上隅のアカウントメニューで`設定`を選択してパスワード変更ページに移動します（下図参照）。別の管理者アカウントを作成してこのアカウントを削除することもできます。メールログイン認証を有効にすることをお勧めします。

<a name=console-home></a>
![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

管理者以外のユーザーもログインして自分のデバイスとログを参照し、ユーザー設定を変更できます。

## 自動設定
`Windows EXE`をクリックすると、独自のRustDesk Server Proの設定を取得でき、クライアントの設定に役立ちます。

Windowsクライアントの場合、カスタムサーバー設定を省略して、代わりに`rustdesk.exe`ファイル名に設定情報を入れることができます。上図に示すように、コンソールのウェルカムページに移動して`Windows EXE`をクリックしてください。**クライアント ≥ 1.1.9が必要です。**

これを[クライアント設定](https://rustdesk.com/docs/en/self-host/client-configuration/)と[デプロイメントスクリプト](https://rustdesk.com/docs/en/self-host/client-deployment/)と組み合わせて使用し、クライアントを設定できます。

## デフォルトの`admin`ユーザー以外の新しいユーザーの作成

{{% notice note %}}
`Individual`プランにはこの機能がありません。
{{% /notice %}}

1. 左側のメニューで`ユーザー`をクリックします。
2. `管理者`を有効にして別のアカウントを作成します。
3. 新しい管理アカウントでログインします。
4. `ユーザー`ページで`admin`を削除します。

## 新しいユーザーの作成
1. 左側のメニューで`ユーザー`をクリックします。
2. 新しいユーザーを作成します。
3. 所属するグループを選択します（新しいグループを追加する必要がある場合は、続きをお読みください）。

## 新しいグループの追加
1. 左側のメニューで`グループ`をクリックします。
2. 新しいグループを作成します。
3. 作成後、グループ間のアクセスを許可できます。`編集`をクリックします。
4. アクセスを希望する関連グループを選択します（対応するグループに自動的に追加されます）。

## 複数のリレーサーバーの設定
1. 左側のメニューで`設定`に移動します。
2. サブメニューで`リレー`をクリックします。
3. `リレーサーバー`の横の`+`をクリックします。
4. 表示されたボックスにリレーサーバーのDNSアドレスまたはIPアドレスを入力し、<kbd>Enter</kbd>を押します。
5. 複数のリレーサーバーがある場合は、`+`をクリックし続けて、必要に応じて地理的設定を調整できます（キーを他のサーバーにコピーすることを忘れないでください）。

## ライセンスの設定または変更
1. 左側のメニューで`設定`に移動します。
2. サブメニューで`ライセンス`をクリックします。
3. `編集`をクリックしてライセンスコードを貼り付けます。
4. `OK`をクリックします。

## ログの表示
左側で`ログ`をクリックします。

## メール設定
この例ではGmail

1. 左側のメニューで`設定`に移動します。
2. サブメニューで`SMTP`をクリックします。
3. SMTPアドレス`smtp.gmail.com`を入力します。
4. `SMTPポート`にポート587を入力します。
5. `メールアカウント`にGmailアカウント（例：`myrustdeskserver@gmail.com`）を入力します。
6. パスワードを入力します（アプリパスワードが必要な場合があります）。
7. `送信者`にGmailアカウント（例：`myrustdeskserver@gmail.com`）を入力します。
8. `確認`をクリックして保存します。

## Webコンソールを使用したデバイスへのユーザー/戦略/デバイスグループの割り当て

ユーザーは、デバイスにログインしているRustDeskユーザー、またはデバイスの横にある**編集**をクリックし、**ユーザー**ボックスをクリックしてドロップダウンからユーザーを選択することでデバイスに割り当てられます。  
また、**ユーザーリスト**で**その他 → デバイスを割り当て**をクリックすることで、複数のデバイスをユーザーに一括割り当てすることもできます。

デバイスをデバイスグループに追加するには、**デバイスリスト**でデバイスの横にある**編集**をクリックして**グループ**を変更するか、**デバイスグループ**リストに移動してグループ名をクリックし、そのグループ内のデバイスを調整します。

デバイスに戦略を割り当てるには、**戦略**リストの右側にカーソルを合わせ、メニューから**デバイスを編集**、**ユーザーを編集**、または**デバイスグループを編集**をクリックして、選択した戦略に対応するデバイス、ユーザーデバイス、またはデバイスグループのデバイスを追加します。

---

## APIトークン

まず、**設定 → トークン → 作成**に移動し、必要な権限（**デバイス、監査ログ、ユーザー、グループ、戦略、アドレス帳**）を持つトークンを作成する必要があります。

作成後、これらのトークンを**コマンドライン**または**Python CLI**を通じて使用し、対応する権限で操作を実行できます。

### コマンドラインからトークンを使用して割り当て

`--assign`パラメータを使用してRustDesk実行ファイルで割り当てを行うこともできます。  
これにより、ユーザー、戦略、アドレス帳、またはデバイスグループをコマンドラインから直接デバイスに割り当てることができます。

**例：**

    "C:\Program Files\RustDesk\rustdesk.exe" --assign --token <generatedtoken> --user_name <username>

サポートされているパラメータ

| パラメータ                               | 説明                                      | RustDesk Server Pro | RustDesk Client | 
| --------------------------------------- | ---------------------------------------- | ----------------- | --------------- | 
| `--user_name <username>`                | デバイスにユーザーを割り当て             |                   |                 | 
| `--strategy_name <strategyname>`        | デバイスに戦略を割り当て                 |                   |                 | 
| `--address_book_name <addressbookname>` | デバイスをアドレス帳に割り当て           |                   |                 | 
| `--address_book_tag <addressbooktag>`   | アドレス帳タグで割り当て                 |                   |                 | 
| `--address_book_alias <alias>`          | アドレス帳のエイリアスで割り当て         | 1.5.8             | 1.4.1           | 
| `--address_book_password <password>`    | アドレス帳エントリのパスワードを設定     | 1.6.6             | 1.4.3           | 
| `--address_book_note <note>`            | アドレス帳エントリにメモを設定           | 1.6.6             | 1.4.3           | 
| `--device_group_name <devicegroupname>` | デバイスをデバイスグループに割り当て     |                   |                 | 
| `--note <note>`                         | デバイスにメモを追加                     | 1.6.6             | 1.4.3           | 
| `--device_username <device_username>`   | デバイスのユーザー名を設定               | 1.6.6             | 1.4.3           | 
| `--device_name <device_name>`           | デバイス名を設定                          | 1.6.6             | 1.4.3           | 

Windowsのコマンドラインはデフォルトでは出力を表示しません。出力を取得するには次のように実行してください：

    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | more
    "C:\Program Files\RustDesk\rustdesk.exe" <arg1> <arg2> ... | Out-String

詳細は[こちら](https://github.com/rustdesk/rustdesk/discussions/6377#discussioncomment-8094952)。

### Python CLI管理ツール

#### ユーザー管理 (`users.py`)

**ヘルプ表示：**  
`./users.py -h`

**ユーザー表示：**  
`./users.py --url <url> --token <token> view [--name <username>] [--group_name <group_name>]`

**フィルター：**
- `--name`：ユーザー名（あいまい検索）
- `--group_name`：ユーザーグループ名（完全一致）

**例：**  
`./users.py --url https://example.com --token <token> view --group_name Default`

**基本操作：**

- **ユーザーを無効化：**  
  `./users.py --url <url> --token <token> disable --name testuser`

- **ユーザーを有効化：**  
  `./users.py --url <url> --token <token> enable --name testuser`

- **ユーザーを削除：**  
  `./users.py --url <url> --token <token> delete --name testuser`

**ユーザーの作成と招待：**

- **新規ユーザーの作成：**  
  `./users.py --url <url> --token <token> new --name username --password 'password123' --group_name Default [--email user@example.com] [--note "メモ"]`
  
  必須パラメータ：`--name`、`--password`、`--group_name`  
  オプションパラメータ：`--email`、`--note`

- **メールでユーザーを招待：**  
  `./users.py --url <url> --token <token> invite --email user@example.com --name username --group_name Default [--note "メモ"]`
  
  必須パラメータ：`--email`、`--name`、`--group_name`  
  オプションパラメータ：`--note`

**2FAとセキュリティ操作：**

- **2FA強制を有効化：**  
  `./users.py --url <url> --token <token> enable-2fa-enforce --name username --web-console-url <console_url>`
  
  必須パラメータ：`--web-console-url`

- **2FA強制を無効化：**  
  `./users.py --url <url> --token <token> disable-2fa-enforce --name username [--web-console-url <console_url>]`
  
  オプションパラメータ：`--web-console-url`

- **2FAをリセット：**  
  `./users.py --url <url> --token <token> reset-2fa --name username`

- **メール認証を無効化：**  
  `./users.py --url <url> --token <token> disable-email-verification --name username`

- **強制ログアウト：**  
  `./users.py --url <url> --token <token> force-logout --name username`

**注意事項：**
- 複数のユーザーに対して操作を行う場合（フィルターでマッチ）、確認プロンプトが表示されます
- 一致するユーザーがいない場合は「Found 0 users」と表示されます

---

#### ユーザーグループ管理 (`user_group.py`)

**ヘルプ表示：**  
`./user_group.py -h`

**ユーザーグループ表示：**  
`./user_group.py --url <url> --token <token> view [--name <group_name>]`

**例：**  
`./user_group.py --url https://example.com --token <token> view --name "営業チーム"`

**グループ操作：**

- **ユーザーグループの作成：**  
  `./user_group.py --url <url> --token <token> add --name "グループ名" [--note "説明"] [--accessed-from '<json>'] [--access-to '<json>']`
  
  アクセス制御付きの例：  
  `./user_group.py --url <url> --token <token> add --name "エンジニアリング" --accessed-from '[{"type":0,"name":"マネージャー"}]' --access-to '[{"type":1,"name":"開発サーバー"}]'`

- **ユーザーグループの更新：**  
  `./user_group.py --url <url> --token <token> update --name "グループ名" [--new-name "新しい名前"] [--note "新しいメモ"] [--accessed-from '<json>'] [--access-to '<json>']`

- **ユーザーグループの削除：**  
  `./user_group.py --url <url> --token <token> delete --name "グループ名"`
  
  カンマ区切りで複数指定可能：`--name "グループ1,グループ2,グループ3"`

**グループ内ユーザー管理：**

- **グループ内のユーザーを表示：**  
  `./user_group.py --url <url> --token <token> view-users [--name <group_name>] [--user-name <username>]`
  
  フィルター：
  - `--name`：グループ名（完全一致、オプション）
  - `--user-name`：ユーザー名（あいまい検索、オプション）
  
  例：  
  `./user_group.py --url <url> --token <token> view-users --name Default --user-name john`

- **グループにユーザーを追加：**  
  `./user_group.py --url <url> --token <token> add-users --name "グループ名" --users "user1,user2,user3"`

**アクセス制御パラメータ：**

- `--accessed-from`：このユーザーグループにアクセスできるユーザー/グループを定義するJSON配列
  - Type 0 = ユーザーグループ（例：`[{"type":0,"name":"管理者"}]`）
  - Type 2 = ユーザー（例：`[{"type":2,"name":"john"}]`）

- `--access-to`：このユーザーグループがアクセスできる対象を定義するJSON配列
  - Type 0 = ユーザーグループ（例：`[{"type":0,"name":"サポート"}]`）
  - Type 1 = デバイスグループ（例：`[{"type":1,"name":"サーバー"}]`）

**注意：** シェルの解析問題を避けるため、JSON配列は単一引用符で囲んでください。

**権限要件:**
- `view/add/update/delete/add-users` コマンドには **ユーザーグループ権限** が必要
- `view-users` コマンドには **ユーザー権限** が必要

---

#### デバイスグループ管理 (`device_group.py`)

**ヘルプ表示：**  
`./device_group.py -h`

**デバイスグループ表示：**  
`./device_group.py --url <url> --token <token> view [--name <group_name>]`

**例：**  
`./device_group.py --url https://example.com --token <token> view`

**グループ操作：**

- **デバイスグループの作成：**  
  `./device_group.py --url <url> --token <token> add --name "グループ名" [--note "説明"] [--accessed-from '<json>']`
  
  例：  
  `./device_group.py --url <url> --token <token> add --name "本番環境" --accessed-from '[{"type":0,"name":"管理者"}]'`

- **デバイスグループの更新：**  
  `./device_group.py --url <url> --token <token> update --name "グループ名" [--new-name "新しい名前"] [--note "新しいメモ"] [--accessed-from '<json>']`

- **デバイスグループの削除：**  
  `./device_group.py --url <url> --token <token> delete --name "グループ名"`
  
  カンマ区切りで複数指定可能：`--name "グループ1,グループ2,グループ3"`

**グループ内デバイス管理：**

- **グループ内のデバイスを表示：**  
  `./device_group.py --url <url> --token <token> view-devices [フィルター]`
  
  利用可能なフィルター：
  - `--name`：デバイスグループ名（完全一致）
  - `--id`：デバイスID（あいまい検索）
  - `--device-name`：デバイス名（あいまい検索）
  - `--user-name`：ユーザー名/所有者（あいまい検索）
  - `--device-username`：デバイスにログインしているユーザー名（あいまい検索）
  
  例：  
  ```bash
  # グループ内のすべてのデバイスを表示
  ./device_group.py --url <url> --token <token> view-devices --name 本番環境
  
  # デバイス名で検索
  ./device_group.py --url <url> --token <token> view-devices --device-name server
  
  # フィルターを組み合わせ
  ./device_group.py --url <url> --token <token> view-devices --name 本番環境 --user-name john
  ```


- **グループにデバイスを追加：**  
  `./device_group.py --url <url> --token <token> add-devices --name "グループ名" --ids "deviceid1,deviceid2"`

- **グループからデバイスを削除：**  
  `./device_group.py --url <url> --token <token> remove-devices --name "グループ名" --ids "deviceid1,deviceid2"`

**アクセス制御パラメータ：**

- `--accessed-from`：このデバイスグループにアクセスできるユーザー/グループを定義するJSON配列
  - Type 0 = ユーザーグループ（例：`[{"type":0,"name":"エンジニア"}]`）
  - Type 2 = ユーザー（例：`[{"type":2,"name":"admin"}]`）

**権限要件：**
- `view/add/update/delete/add-devices/remove-devices` コマンドには **デバイスグループ権限** が必要
- `view-devices` コマンドには **デバイス権限** が必要

---

#### デバイス管理 (`devices.py`)

**ヘルプ表示：**

    ./devices.py -h

**デバイス表示：**

    ./devices.py --url <url> --token <token> view [--id <device_id>] [--device_name <device_name>] [--user_name <user_name>] [--group_name <group_name>] [--device_group_name <device_group_name>] [--offline_days <days>]

**フィルター：**

    --id : デバイスID
    --device_name : デバイス名
    --user_name : 割り当てユーザー
    --group_name : ユーザーグループ
    --device_group_name : デバイスグループ
    --offline_days : オフライン日数

**例：**

    ./devices.py --url https://example.com --token <token> view --user_name mike

**操作：**

`view`は`enable`、`disable`、`delete`、`assign`に置き換え可能です。

**例（デバイスを割り当てる）：**

    ./devices.py --url https://example.com --token <token> assign --device_name PC01 --assign_to user_name=mike

---

#### アドレス帳管理 (`ab.py`)

**ヘルプ表示：**

    ./ab.py -h

**共有アドレス帳表示：**

    ./ab.py --url <url> --token <token> view-ab [--ab-name <address_book_name>]

**個人アドレス帳GUID取得：**

    ./ab.py --url <url> --token <token> get-personal-ab

**共有アドレス帳追加：**

    ./ab.py --url <url> --token <token> add-ab --ab-name <name> [--note <note>] [--password <password>]

**共有アドレス帳の更新または削除：**

    ./ab.py --url <url> --token <token> update-ab --ab-guid <guid> [--ab-update-name <new_name>] [--note <note>]
    ./ab.py --url <url> --token <token> delete-ab --ab-guid <guid>

**アドレス帳内のピア表示：**

    ./ab.py --url <url> --token <token> view-peer --ab-guid <guid> [--peer-id <peer_id>] [--alias <alias>]

**ピアの追加、更新、削除：**

    ./ab.py --url <url> --token <token> add-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> update-peer --ab-guid <guid> --peer-id <peer_id> [--alias <alias>] [--note <note>] [--tags tag1,tag2]
    ./ab.py --url <url> --token <token> delete-peer --ab-guid <guid> --peer-id <peer_id>

**タグ管理：**

    ./ab.py --url <url> --token <token> view-tag --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-tag --ab-guid <guid> --tag-name <name> [--tag-color 0xFF00FF00]
    ./ab.py --url <url> --token <token> update-tag --ab-guid <guid> --tag-name <name> --tag-color 0xFFFF0000
    ./ab.py --url <url> --token <token> delete-tag --ab-guid <guid> --tag-name <name>

**アクセスルール管理：**

    ./ab.py --url <url> --token <token> view-rule --ab-guid <guid>
    ./ab.py --url <url> --token <token> add-rule --ab-guid <guid> [--rule-type user|group|everyone] [--rule-user <user>] [--rule-group <group>] --rule-permission ro|rw|full
    ./ab.py --url <url> --token <token> update-rule --rule-guid <rule_guid> --rule-permission rw
    ./ab.py --url <url> --token <token> delete-rule --rule-guid <rule_guid>

**例（ユーザー "mike" に読み取り専用ルールを追加）：**

    ./ab.py --url https://example.com --token <token> add-rule --ab-guid <guid> --rule-user mike --rule-permission ro

---

#### ストラテジー管理 (`strategies.py`)

**ヘルプを表示:**  
`./strategies.py -h`

**すべてのストラテジーを一覧表示:**  
`./strategies.py --url <url> --token <token> list`

**特定のストラテジーを表示:**  
```bash
# 名前で
./strategies.py --url <url> --token <token> view --name "Default"

# GUIDで
./strategies.py --url <url> --token <token> view --guid "01983006-fcca-7c12-9a91-b1df483c6073"
```

**ストラテジーを有効化または無効化:**  
```bash
./strategies.py --url <url> --token <token> enable --name "ストラテジー名"
./strategies.py --url <url> --token <token> disable --name "ストラテジー名"
```

**デバイス、ユーザー、またはデバイスグループにストラテジーを割り当て:**  
```bash
# デバイスに割り当て（デバイスIDで）
./strategies.py --url <url> --token <token> assign --name "Default" --peers "1849118658,1337348840"

# ユーザーに割り当て（ユーザー名で）
./strategies.py --url <url> --token <token> assign --name "Default" --users "admin,user1"

# デバイスグループに割り当て（グループ名で）
./strategies.py --url <url> --token <token> assign --name "Default" --device-groups "device_group1,Production"

# 混合割り当て
./strategies.py --url <url> --token <token> assign \
  --name "Default" \
  --peers "1849118658" \
  --users "admin" \
  --device-groups "device_group1"
```

**ストラテジーの割り当てを解除:**  
```bash
# デバイスから解除
./strategies.py --url <url> --token <token> unassign --peers "1849118658,1337348840"

# ユーザーから解除
./strategies.py --url <url> --token <token> unassign --users "admin"

# デバイスグループから解除
./strategies.py --url <url> --token <token> unassign --device-groups "device_group1"
```

**注意:**
- スクリプトはユーザーとデバイスグループの名前とGUIDの両方をサポートします
- デバイスIDは自動的にGUIDに変換されます
- すべてのassign/unassign操作は一度に複数のターゲットを処理できます

**権限要件:**
- `list/view/enable/disable/assign/unassign` コマンドには **ストラテジー権限** が必要
- `--peers` には **デバイス権限:r** が必要（IDからGUIDへの検索用）
- `--users` には **ユーザー権限:r** が必要（ユーザー名からGUIDへの検索用）
- `--device-groups` には **デバイスグループ権限:r** が必要（グループ名からGUIDへの検索用）

---


#### 監査 (`audits.py`)

**ヘルプ表示：**

    ./audits.py -h

**接続監査の表示：**

    ./audits.py --url <url> --token <token> view-conn [--remote <peer_id>] [--conn-type <type>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**ファイル監査の表示：**

    ./audits.py --url <url> --token <token> view-file [--remote <peer_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**アラーム監査の表示：**

    ./audits.py --url <url> --token <token> view-alarm [--device <device_id>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**コンソール監査の表示：**

    ./audits.py --url <url> --token <token> view-console [--operator <username>] [--page-size <n>] [--current <n>] [--created-at <"YYYY-MM-DD HH:MM:SS">] [--days-ago <n>]

**フィルター：**

    --remote : ピアID（接続またはファイル監査用）
    --conn-type : 0=リモートデスクトップ, 1=ファイル転送, 2=ポート転送, 3=カメラビュー, 4=ターミナル
    --device : デバイスID（アラーム監査用）
    --operator : オペレーター名（コンソール監査用）
    --created-at : ローカル時間フィルター、例 "2025-09-16 14:15:57"
    --days-ago : 指定日数以内の新しいレコードをフィルター
    --page-size / --current : ページネーション

**例：**

    ./audits.py --url https://example.com --token <token> view-conn --remote 123456789 --days-ago 7

## デバイスの検索
1. デバイスに移動します。
2. デバイス名検索フィールドに名前を入力し、`クエリ`をクリックするか<kbd>Enter</kbd>を押します。
3. ワイルドカードを使用するには、検索語の開始、終了、または両方に`%`を追加します。
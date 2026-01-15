---
title: 管理者ロール
weight: 17
---

管理者ロールにより、管理者は非管理者ユーザーに部分的な管理権限を委任できます。グローバルリソース（戦略、コントロールロール、カスタムクライアントなど）およびさまざまなスコープ内のユーザーとデバイスに対する権限を定義できます。

管理者ロールがユーザーに割り当てられると、付与された権限に基づいてWebコンソールに対応するページとメニューが表示されます。

## 管理者と管理者ロール

- 管理者のみが管理者ロールを編集し、ユーザーに割り当てることができます。
- 管理者は管理者ロールの制限を受けませんが、管理者ロールを割り当てることは可能です。
- 非管理者ユーザーは、グローバルユーザー権限が付与されていても管理者アカウントを編集できません。

## ロールタイプ

管理者ロールには3つのタイプがあり、それぞれ異なるスコープと利用可能な権限があります。

| タイプ | 説明 |
|------|-------------|
| **グローバル** | チーム全体のすべてのリソースを管理可能 |
| **個人** | 自分のデバイスと監査ログのみ管理可能 |
| **グループスコープ** | 指定されたグループ内のユーザーとデバイスを管理可能 |

### グループスコープについて

| 選択された権限 | 適用対象 |
|-------|-------------|
| **ユーザー権限** | 選択されたユーザーグループ内のユーザーに適用 |
| **デバイス権限** | 以下のデバイスに適用：<ul><li>選択されたデバイスグループ</li><li>選択されたユーザーグループ内のユーザーに割り当てられたデバイス</li><li>未割り当てデバイス（有効な場合）</li></ul> |

## 権限ルール

### すべての編集権限には対応する表示権限が含まれる

編集権限には対応する表示権限が自動的に含まれます。

### 編集権限には割り当て権限が含まれない

リソースの編集権限はリソース自体の編集のみを許可し、割り当て権限は含まれません。

### 表示権限にはメンバー表示が含まれない

リソースの表示権限はリソース自体の表示のみを許可し、メンバーの表示権限は含まれません。

{{% notice note %}}
アドレス帳のデバイス読み取りは管理者ロールの影響を受けません。クライアントのアクセス可能なデバイスのピアタブは、コンソールの **設定 → その他 → アクセス可能なデバイスの取得を無効にする** によってのみ制御され、管理者ロールによる制限も受けません。
{{% /notice %}}

## コンソール操作

### ロールの作成

1. **管理者ロール**ページに移動し、**作成**をクリック
2. ロールの**名前**を入力
3. **タイプ**を選択（**グループスコープ**の場合はスコープも設定）
4. 付与する**権限**を選択

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-name.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-create-permission.png)

### ロールの割り当て

管理者ロールをユーザーに割り当てる方法は2つあります：

1. **ユーザーページ** → ユーザーの**編集**をクリック → **管理者ロール**フィールドでロールを選択
2. **管理者ロールページ** → **ユーザー数**または**ユーザーを割り当て**をクリック → ユーザーを追加または削除

![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-user-page.png)
![](/docs/en/self-host/rustdesk-server-pro/admin-role/images/admin-role-assign-role-page.png)

{{% notice note %}}
- ユーザーには複数の管理者ロールを割り当てることができます。すべてのロールの権限が結合されます。
{{% /notice %}}

## 権限リファレンス

### グローバル権限

| 権限 | 説明 |
|------------|-------------|
| Users-View | すべてのユーザー情報を読み取る。 |
| Users-Create | 非管理者ユーザーを作成。 |
| Users-Invite | メールでユーザーを招待。 |
| Users-Delete | 非管理者ユーザーを削除。 |
| Users-Enable/Disable | 非管理者ユーザーを有効/無効化。 |
| Users-Edit Email | ユーザーのメールを変更。 |
| Users-Edit Password | ユーザーのパスワードを変更。 |
| Users-Edit Note | ユーザーのメモを変更。 |
| Users-Manage 2FA | ユーザーの2FA認証を管理。 |
| Users-Force Logout | ユーザーを強制ログアウト。 |
| Users-Update Group | ユーザーのグループを変更。 |
| Users-Update Strategy | ユーザーの戦略を変更。 |
| Users-Update Control Role | ユーザーのコントロールロールを変更。 |
| Devices-View | すべてのデバイス情報を読み取る。 |
| Devices-Enable/Disable | デバイスを有効/無効化。 |
| Devices-Delete | デバイスを削除。 |
| Devices-Edit Info | デバイス情報を編集。 |
| Devices-Assign to User | デバイスをユーザーに割り当て。 |
| Devices-Update Group | デバイスのグループを変更。 |
| Devices-Update Strategy | デバイスの戦略を変更。 |
| User Groups-View | ユーザーグループを読み取る。 |
| User Groups-Edit | ユーザーグループを作成、編集、削除。 |
| Device Groups-View | デバイスグループを読み取る。 |
| Device Groups-Edit | デバイスグループを作成、編集、削除。 |
| Device Groups-Update Strategy | デバイスグループの戦略を変更。 |
| Audit Logs-View | すべてのログを読み取る。 |
| Audit Logs-Edit | アクティブな接続を切断。 |
| Strategies-View | 戦略を読み取る。 |
| Strategies-Edit | 戦略を作成、編集、削除。 |
| Control Roles-View | コントロールロールを読み取る。 |
| Control Roles-Edit | コントロールロールを作成、編集、削除。 |
| Custom Clients-View | カスタムクライアントを読み取る。 |
| Custom Clients-Edit | カスタムクライアントを作成、編集、削除。 |

### 個人権限

| 権限 | 説明 |
|------------|-------------|
| Devices-View | 自分のデバイス情報を読み取る。 |
| Devices-Enable/Disable | 自分のデバイスを有効/無効化。 |
| Devices-Delete | 自分のデバイスを削除。 |
| Devices-Edit Info | 自分のデバイス情報を編集。 |
| Devices-Update Strategy | 自分のデバイスの戦略を変更。 |
| Audit Logs-View | 個人ログを読み取る。 |
| Audit Logs-Edit | 自分のアクティブな接続を切断。 |

### グループスコープ権限

| 権限 | 説明 |
|------------|-------------|
| Users-View | 選択グループ内のユーザーを読み取る。 |
| Users-Create | 選択グループ内にユーザーを作成。 |
| Users-Invite | 選択グループ内にユーザーを招待。 |
| Users-Delete | 選択グループ内のユーザーを削除。 |
| Users-Enable/Disable | 選択グループ内のユーザーを有効/無効化。 |
| Users-Edit Email | 選択グループ内のユーザーのメールを変更。 |
| Users-Edit Password | 選択グループ内のユーザーのパスワードを変更。 |
| Users-Edit Note | 選択グループ内のユーザーのメモを変更。 |
| Users-Manage 2FA | 選択グループ内のユーザーの2FAを管理。 |
| Users-Force Logout | 選択グループ内のユーザーを強制ログアウト。 |
| Users-Update Strategy | 選択グループ内のユーザーの戦略を変更。 |
| Users-Update Control Role | 選択グループ内のユーザーのコントロールロールを変更。 |
| Devices-View | ロールが管理するデバイスを読み取る。 |
| Devices-Enable/Disable | ロールが管理するデバイスを有効/無効化。 |
| Devices-Delete | ロールが管理するデバイスを削除。 |
| Devices-Edit Info | ロールが管理するデバイス情報を編集。 |
| Devices-Update Strategy | ロールが管理するデバイスの戦略を変更。 |

---
title: Azure
weight: 16
---

### ビデオチュートリアル

[https://www.youtube.com/watch?v=izGxSmifURI](https://www.youtube.com/watch?v=izGxSmifURI)

### 設定

1. [Azureポータル](https://portal.azure.com)にサインインします。
2. **Microsoft Entra ID**を検索して選択します。
3. 左側のメニューで、[**アプリの登録**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps)を選択し、**新しい登録**をクリックします。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/1-Azure-NewRegistration.png)
4. RustDesk Proコンソールを開き、**設定**ページで**OIDC**モジュールをクリックします。次に**コールバックURL**をコピーします。**注意**: **コールバックURL**は編集できません。`Path`部分は`api/oidc/callback`に固定されており、`Protocol://Host:Port`部分は現在のWebページの発信元です。アドレス`http://localhost:8000/<path>`で開く場合、**コールバックURL**は`http://localhost:8000/api/oidc/callback`になります。アドレス`https://192.168.0.1:8000/<path>`で開く場合、**コールバックURL**は`https://192.168.0.1:8000/api/oidc/callback`になります。Azureは`https://`または`http://localhost`を使用する必要があるため、RustDesk Proコンソールを開くために適切なアドレスを選択してください。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/12-RustDesk-Callback.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register-RecirectURIs-Restrictions.png)
5. **名前**を入力し、**サポートされているアカウントの種類**を選択し、RustDesk Proから**リダイレクトURI**を貼り付けます。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register.png)
6. RustDesk Proで、**新しい認証プロバイダー**をクリックします。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/3-RustDesk-NewAuthProvider.png)
7. Azureで、使用するアプリケーションを選択し、**概要**をクリックして、**アプリケーション（クライアント）ID**をコピーします。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/4-Azure-ClientID.png)
8. RustDesk Proで、**クライアントID**を貼り付けます。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/5-RustDesk-ClientID.png)
9. Azureで、**証明書とシークレット**で、新しいクライアントシークレットを作成するか、選択します（通常は新規）。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/6-Azure-NewOrSelectClientSecret.png)
10. Azureで、クライアントシークレットの値をコピーします。**注意**: この値は初回登録時にのみ表示されます。ページを離れると表示されなくなります。この値を適切に保管してください。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/7-Azure-CopySecretValue.png)
11. RustDesk Proで、クライアントシークレットの値を貼り付けます。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/8-RustDesk-FillClientSecret.png)
12. RustDesk Proで、**発行者**フィールドに`https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0`を入力します。`Directory (tenant) ID`を**ディレクトリ（テナント）ID**に置き換えてください。**ディレクトリ（テナント）ID**は、Azureアプリの**概要**パネルにあります。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/9-RustDesk-Issuer.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/10-Azure-TenantID.png)
13. Azureで、**認証**メニューを選択します。次に、**IDトークン（暗黙的およびハイブリッドフローで使用）**を選択して認証を設定します。
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/11-Azure-Auth.png)

### 参考資料

- [Azure ADでOpenID Connectプロバイダーを設定する](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
- [Microsoft IDプラットフォームでのOpenID Connect](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)
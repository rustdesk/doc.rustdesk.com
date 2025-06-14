---
title: Azure
weight: 16
---

### Tutoriel vidéo

[https://www.youtube.com/watch?v=izGxSmifURI](https://www.youtube.com/watch?v=izGxSmifURI)

### Configuration

1. Connectez-vous au [portail Azure](https://portal.azure.com).
2. Recherchez et sélectionnez **Microsoft Entra ID**.
3. Dans le menu de gauche, sélectionnez [**Inscriptions d'applications**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps), cliquez sur **Nouvelle inscription**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/1-Azure-NewRegistration.png)
4. Ouvrez la console RustDesk Pro, dans la page **Paramètres**, cliquez sur le module **OIDC**. Puis copiez l'**URL de rappel**. **Note** : L'**URL de rappel** n'est pas modifiable, la partie `Path` est fixée à `api/oidc/callback`, et la partie `Protocol://Host:Port` est l'origine de la page web actuelle. Si vous l'ouvrez via l'adresse `http://localhost:8000/<path>`, alors l'**URL de rappel** est `http://localhost:8000/api/oidc/callback`. Si vous l'ouvrez via l'adresse `https://192.168.0.1:8000/<path>`, alors l'**URL de rappel** est `https://192.168.0.1:8000/api/oidc/callback`. Comme Azure doit utiliser `https://` ou `http://localhost`, veuillez sélectionner l'adresse appropriée pour ouvrir votre console RustDesk Pro.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/12-RustDesk-Callback.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register-RecirectURIs-Restrictions.png)
5. Saisissez le **Nom**, sélectionnez les **Types de comptes pris en charge**, et collez l'**URI de redirection** depuis RustDesk Pro.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register.png)
6. Dans RustDesk Pro, cliquez sur **Nouveau fournisseur d'authentification**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/3-RustDesk-NewAuthProvider.png)
7. Dans Azure, sélectionnez l'application que vous souhaitez utiliser, cliquez sur **Vue d'ensemble**, et copiez l'**ID d'application (client)**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/4-Azure-ClientID.png)
8. Dans RustDesk Pro, collez l'**ID client**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/5-RustDesk-ClientID.png)
9. Dans Azure, **Certificats et secrets**, créez un nouveau secret client ou sélectionnez-en un, généralement Nouveau.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/6-Azure-NewOrSelectClientSecret.png)
10. Dans Azure, copiez la valeur du secret client. **Note** : Cette valeur n'est visible que lors de votre première inscription. Elle n'est plus visible après avoir quitté la page. Veuillez conserver cette valeur correctement.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/7-Azure-CopySecretValue.png)
11. Dans RustDesk Pro, collez la valeur pour le secret client.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/8-RustDesk-FillClientSecret.png)
12. Dans RustDesk Pro, remplissez le champ **Émetteur** avec `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0`. Veuillez remplacer `Directory (tenant) ID` par votre **ID de répertoire (locataire)**. L'**ID de répertoire (locataire)** se trouve dans le panneau **Vue d'ensemble** de l'application Azure.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/9-RustDesk-Issuer.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/10-Azure-TenantID.png)
13. Dans Azure, sélectionnez le menu **Authentification**. Ensuite, configurez l'autorisation, en choisissant **Jetons d'ID (utilisés pour les flux implicites et hybrides)**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/11-Azure-Auth.png)

### Références

- [Configurer un fournisseur OpenID Connect avec Azure AD](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
- [OpenID Connect sur la plateforme d'identité Microsoft](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)
---
title: Azure
weight: 16
---

### Tutorial en vídeo

[https://www.youtube.com/watch?v=izGxSmifURI](https://www.youtube.com/watch?v=izGxSmifURI)

### Configuración

1. Inicie sesión en el [portal de Azure](https://portal.azure.com).
2. Busque y seleccione **Microsoft Entra ID**.
3. En el menú izquierdo, seleccione [**Registros de aplicaciones**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps), haga clic en **Nuevo registro**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/1-Azure-NewRegistration.png)
4. Abra la consola RustDesk Pro, en la página **Configuración**, haga clic en el módulo **OIDC**. Luego copie la **URL de retorno de llamada**. **Nota**: La **URL de retorno de llamada** no es editable, la parte `Path` está fija en `api/oidc/callback`, y la parte `Protocol://Host:Port` es el origen de la página web actual. Si la abre a través de la dirección `http://localhost:8000/<path>`, entonces la **URL de retorno de llamada** es `http://localhost:8000/api/oidc/callback`. Si la abre a través de la dirección `https://192.168.0.1:8000/<path>`, entonces la **URL de retorno de llamada** es `https://192.168.0.1:8000/api/oidc/callback`. Dado que Azure debe usar `https://` o `http://localhost`, seleccione la dirección apropiada para abrir su consola RustDesk Pro.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/12-RustDesk-Callback.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register-RecirectURIs-Restrictions.png)
5. Ingrese el **Nombre**, seleccione los **Tipos de cuenta compatibles**, y pegue el **URI de redirección** desde RustDesk Pro.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register.png)
6. En RustDesk Pro, haga clic en **Nuevo proveedor de autenticación**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/3-RustDesk-NewAuthProvider.png)
7. En Azure, seleccione la aplicación que desea usar, haga clic en **Información general**, y copie el **ID de aplicación (cliente)**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/4-Azure-ClientID.png)
8. En RustDesk Pro, pegue el **ID de cliente**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/5-RustDesk-ClientID.png)
9. En Azure, **Certificados y secretos**, cree un nuevo secreto de cliente o seleccione uno, generalmente Nuevo.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/6-Azure-NewOrSelectClientSecret.png)
10. En Azure, copie el valor del secreto de cliente. **Nota**: Este valor solo es visible cuando se registra por primera vez. Ya no es visible después de salir de la página. Mantenga este valor adecuadamente.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/7-Azure-CopySecretValue.png)
11. En RustDesk Pro, pegue el valor para el secreto de cliente.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/8-RustDesk-FillClientSecret.png)
12. En RustDesk Pro, complete el campo **Emisor** con `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0`. Reemplace `Directory (tenant) ID` con su **ID de directorio (inquilino)**. El **ID de directorio (inquilino)** está en el panel **Información general** de la aplicación Azure.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/9-RustDesk-Issuer.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/10-Azure-TenantID.png)
13. En Azure, seleccione el menú **Autenticación**. Luego configure la autorización, eligiendo **Tokens de ID (utilizados para flujos implícitos e híbridos)**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/11-Azure-Auth.png)

### Referencias

- [Configurar un proveedor OpenID Connect con Azure AD](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
- [OpenID Connect en la plataforma de identidad de Microsoft](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)
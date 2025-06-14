---
title: Azure
weight: 16
---

## Tutorial video

[https://www.youtube.com/watch?v=izGxSmifURI](https://www.youtube.com/watch?v=izGxSmifURI)

## Configurazione

1. Accedi al [portale Azure](https://portal.azure.com).
2. Cerca e seleziona **Microsoft Entra ID**.
3. Nel menu di sinistra, seleziona [**Registrazioni app**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps), clicca su **Nuova registrazione**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/1-Azure-NewRegistration.png)
4. Apri la console RustDesk Pro, nella pagina **Impostazioni**, clicca sul modulo **OIDC**. Quindi copia l'**URL di callback**. **Nota**: L'**URL di callback** non è modificabile, la parte `Path` è fissa su `api/oidc/callback`, e la parte `Protocol://Host:Port` è l'origine della pagina web corrente. Se la apri tramite l'indirizzo `http://localhost:8000/<path>`, allora l'**URL di callback** è `http://localhost:8000/api/oidc/callback`. Se la apri tramite l'indirizzo `https://192.168.0.1:8000/<path>`, allora l'**URL di callback** è `https://192.168.0.1:8000/api/oidc/callback`. Poiché Azure deve utilizzare `https://` o `http://localhost`, seleziona l'indirizzo appropriato per aprire la tua console RustDesk Pro.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/12-RustDesk-Callback.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register-RecirectURIs-Restrictions.png)
5. Inserisci il **Nome**, seleziona i **Tipi di account supportati**, e incolla l'**URI di reindirizzamento** da RustDesk Pro.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register.png)
6. In RustDesk Pro, clicca su **Nuovo provider di autenticazione**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/3-RustDesk-NewAuthProvider.png)
7. In Azure, seleziona l'applicazione che vuoi utilizzare, clicca su **Panoramica**, e copia l'**ID applicazione (client)**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/4-Azure-ClientID.png)
8. In RustDesk Pro, incolla l'**ID client**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/5-RustDesk-ClientID.png)
9. In Azure, **Certificati e segreti**, crea un nuovo segreto client o selezionane uno, di solito Nuovo.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/6-Azure-NewOrSelectClientSecret.png)
10. In Azure, copia il valore del segreto client. **Nota**: Questo valore è visibile solo quando ti registri per la prima volta. Non è più visibile dopo aver lasciato la pagina. Conserva questo valore appropriatamente.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/7-Azure-CopySecretValue.png)
11. In RustDesk Pro, incolla il valore per il segreto client.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/8-RustDesk-FillClientSecret.png)
12. In RustDesk Pro, compila il campo **Emittente** con `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0`. Sostituisci `Directory (tenant) ID` con il tuo **ID directory (tenant)**. L'**ID directory (tenant)** si trova nel pannello **Panoramica** dell'app Azure.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/9-RustDesk-Issuer.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/10-Azure-TenantID.png)
13. In Azure, seleziona il menu **Autenticazione**. Quindi configura l'autorizzazione, scegliendo **Token ID (utilizzati per flussi impliciti e ibridi)**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/11-Azure-Auth.png)

## Riferimenti

- [Configurare un provider OpenID Connect con Azure AD](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
- [OpenID Connect sulla piattaforma di identità Microsoft](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)
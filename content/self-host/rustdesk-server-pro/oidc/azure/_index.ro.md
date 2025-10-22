---
title: Azure
weight: 16
---

## Tutorial video

[https://www.youtube.com/watch?v=izGxSmifURI](https://www.youtube.com/watch?v=izGxSmifURI)

## Configurare

1. Autentificați‑vă în [portalul Azure](https://portal.azure.com).
2. Căutați și selectați **Microsoft Entra ID**.
3. În meniul din stânga, selectați [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps), apoi faceți clic pe **New registration**.
![](/docs/ro/self-host/rustdesk-server-pro/oidc/azure/images/1-Azure-NewRegistration.png)
4. Deschideți consola RustDesk Pro, în pagina **Settings** faceți clic pe modulul **OIDC**. Apoi copiați **Callback URL**. Notă: **Callback URL** nu este editabil — partea `Path` este fixă la `api/oidc/callback`, iar partea `Protocol://Host:Port` este originea paginii web curente. De exemplu, dacă consola este accesată prin `http://localhost:8000/<path>`, atunci **Callback URL** va fi `http://localhost:8000/api/oidc/callback`. Dacă este accesată prin `https://192.168.0.1:8000/<path>`, atunci **Callback URL** va fi `https://192.168.0.1:8000/api/oidc/callback`. Deoarece Azure acceptă doar `https://` sau `http://localhost`, selectați adresa corespunzătoare pentru a deschide consola RustDesk Pro.
![](/docs/ro/self-host/rustdesk-server-pro/oidc/azure/images/12-RustDesk-Callback.png)
![](/docs/ro/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register-RecirectURIs-Restrictions.png)
5. Introduceți **Name**, selectați **Supported account types** și lipiți **Redirect URI** copiat din RustDesk Pro.
![](/docs/ro/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register.png)
6. În RustDesk Pro, faceți clic pe **New auth provider**.
![](/docs/ro/self-host/rustdesk-server-pro/oidc/azure/images/3-RustDesk-NewAuthProvider.png)
7. În Azure, selectați aplicația pe care doriți să o utilizați, accesați **Overview** și copiați **Application (client) ID**.
![](/docs/ro/self-host/rustdesk-server-pro/oidc/azure/images/4-Azure-ClientID.png)
8. În RustDesk Pro, lipiți **Client ID**.
![](/docs/ro/self-host/rustdesk-server-pro/oidc/azure/images/5-RustDesk-ClientID.png)
9. În Azure, accesați **Certificates & secrets** și creați un client secret nou sau selectați unul existent (de obicei New).
![](/docs/ro/self-host/rustdesk-server-pro/oidc/azure/images/6-Azure-NewOrSelectClientSecret.png)
10. În Azure, copiați valoarea client secret‑ului. Notă: această valoare este vizibilă doar la crearea inițială. Nu va mai fi afișată după părăsirea paginii. Păstrați‑o în siguranță.
![](/docs/ro/self-host/rustdesk-server-pro/oidc/azure/images/7-Azure-CopySecretValue.png)
11. În RustDesk Pro, lipiți valoarea client secret‑ului.
![](/docs/ro/self-host/rustdesk-server-pro/oidc/azure/images/8-RustDesk-FillClientSecret.png)
12. În RustDesk Pro, completați câmpul **Issuer** cu `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0`. Înlocuiți `Directory (tenant) ID` cu **Directory (tenant) ID** al contului dvs. Acesta se găsește în panoul **Overview** al aplicației din Azure.
![](/docs/ro/self-host/rustdesk-server-pro/oidc/azure/images/9-RustDesk-Issuer.png)
![](/docs/ro/self-host/rustdesk-server-pro/oidc/azure/images/10-Azure-TenantID.png)
13. În Azure, accesați meniul **Authentication**. Apoi activați autorizarea, bifând **ID tokens (used for implicit and hybrid flows)**.
![](/docs/ro/self-host/rustdesk-server-pro/oidc/azure/images/11-Azure-Auth.png)

## Referințe

- [Set up an OpenID Connect provider with Azure AD](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
- [OpenID Connect on the Microsoft identity platform](https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-protocols-oidc)
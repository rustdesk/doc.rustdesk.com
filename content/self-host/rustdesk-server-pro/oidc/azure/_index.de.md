---
title: Azure
weight: 16
description: "RustDesk-Dokumentation zu Azure. Hier finden Sie Anleitungen zur Installation, Konfiguration, Bereitstellung und Fehlerbehebung."
keywords: ["rustdesk azure oidc", "rustdesk entra id", "rustdesk azure sso", "rustdesk oidc azure", "rustdesk server pro azure"]
---

## Was macht das Azure-OIDC-Setup?

Mit dieser Konfiguration melden sich Benutzer uber Microsoft Entra ID per OpenID Connect bei RustDesk Server Pro an. Praktisch bedeutet das: Sie registrieren RustDesk als Anwendung in Azure, tragen die Client-Zugangsdaten in RustDesk Pro ein und verweisen RustDesk Pro auf die Issuer-URL Ihres Entra-Tenants.

## Azure-OIDC-Checkliste

- Offnen Sie die RustDesk-Pro-Web-Konsole uber den finalen Callback-Ursprung.
- Erstellen Sie eine App-Registrierung in Microsoft Entra ID.
- Ubertragen Sie die Azure-`Client ID` nach RustDesk Pro.
- Erstellen Sie ein Client-Secret und speichern Sie den Secret-Wert sofort.
- Erzeugen Sie die Issuer-URL mit der `Directory (tenant) ID`.
- Aktivieren Sie `ID tokens` in den Azure-Authentifizierungseinstellungen.

## Welche Azure-Werte gehoren in RustDesk Pro?

| RustDesk-Pro-Feld | Azure-Quelle |
| --- | --- |
| Callback URL | Aus der OIDC-Einstellungsseite von RustDesk Pro kopieren |
| Client ID | `Application (client) ID` in der Azure-App-Ubersicht |
| Client secret | Secret-`Value` aus `Certificates & secrets` |
| Issuer | `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0` |

## Video-Tutorial

[https://www.youtube.com/watch?v=izGxSmifURI](https://www.youtube.com/watch?v=izGxSmifURI)

## Konfiguration

1. Melden Sie sich beim [Azure-Portal](https://portal.azure.com) an.
2. Suchen und wählen Sie **Microsoft Entra ID**.
3. Wählen Sie im linken Menü [**App registrations**](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps) und klicken Sie **New registration**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/1-Azure-NewRegistration.png)
4. Öffnen Sie die RustDesk Pro-Konsole und klicken Sie auf der Seite **Einstellungen** auf das Modul **OIDC**. Kopieren Sie dann die **Callback-URL**. **Hinweis**: Die **Callback-URL** ist nicht editierbar, der Teil `Pfad` ist auf `api/oidc/callback` festgelegt und der Teil `Protokoll://Host:Port` ist der Ursprung der aktuellen Webseite. Wenn Sie sie über die Adresse `http://localhost:8000/<Pfad>` öffnen, lautet die **Callback-URL** `http://localhost:8000/api/oidc/callback`. Wenn Sie sie über die Adresse `https://192.168.0.1:8000/<Pfad>` öffnen, dann ist die **Callback-URL** `https://192.168.0.1:8000/api/oidc/callback`. Da Azure `https://` oder `http://localhost` verwenden muss, wählen Sie bitte die entsprechende Adresse, um Ihre RustDesk Pro-Konsole zu öffnen.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/12-RustDesk-Callback.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register-RecirectURIs-Restrictions.png)
5. Geben Sie den **Namen** ein, wählen Sie die **Unterstützten Kontotypen** aus und fügen Sie die **Redirect URI** von RustDesk Pro ein.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/2-Azure-Register.png)
6. Klicken Sie in RustDesk Pro auf **Neuer Autorisierungsanbieter**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/3-RustDesk-NewAuthProvider.png)
7. Wählen Sie in Azure die Anwendung aus, die Sie verwenden möchten, klicken Sie auf **Übersicht** und kopieren Sie die **Anwendungs-(Client-)ID**.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/4-Azure-ClientID.png)
8. Fügen Sie in RustDesk Pro die **Client-ID** ein.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/5-RustDesk-ClientID.png)
9. Erstellen Sie in Azures **Zertifikate und Geheimnisse** ein neues oder wählen Sie ein Client-Geheimnis aus, normalerweise ein neues.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/6-Azure-NewOrSelectClientSecret.png)
10. Kopieren Sie in Azure den Wert des Client-Geheimnisses. **Hinweis**: Dieser Wert ist nur sichtbar, wenn Sie sich zum ersten Mal registrieren. Nachdem Sie die Seite verlassen haben, ist er nicht mehr sichtbar. Bitte bewahren Sie diesen Wert gut auf.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/7-Azure-CopySecretValue.png)
11. Fügen Sie in RustDesk Pro den Wert für das Client-Geheimnis ein.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/8-RustDesk-FillClientSecret.png)
12. Füllen Sie in RustDesk Pro das Feld **Issuer** mit `https://login.microsoftonline.com/<Directory (tenant) ID>/v2.0` aus. Bitte ersetzen Sie `Directory (tenant) ID` durch Ihre **Directory (tenant) ID**. Die **Directory (tenant) ID** befindet sich im Fenster **Übersicht** der Azure-App.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/9-RustDesk-Issuer.png)
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/10-Azure-TenantID.png)
13. Wählen Sie in Azure das Menü **Authentifizierung**. Richten Sie dann die Autorisierung ein, indem Sie **ID-Token (Implizite Genehmigung und hybride Flows)** wählen.
![](/docs/en/self-host/rustdesk-server-pro/oidc/azure/images/11-Azure-Auth.png)

## Referenzen

- [OpenID Connect-Anbieter einrichten mit Azure AD](https://learn.microsoft.com/de-de/power-pages/security/authentication/openid-settings)
- [OpenID Connect auf Microsoft Identity Platform](https://learn.microsoft.com/de-de/azure/active-directory/develop/v2-protocols-oidc)

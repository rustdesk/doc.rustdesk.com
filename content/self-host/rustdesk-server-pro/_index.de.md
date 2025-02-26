---
title: RustDesk Server Pro
weight: 200
pre: "<b>2.2. </b>"
---

RustDesk Server Pro hat mehr Funktionen im Vergleich zur Open-Source-Version.

- Konto
- Keine gleichzeitige Verbindungsbegrenzung, d.h. keine Begrenzung der gleichzeitigen Verbindungen (die OSS-Version hat ebenfalls keine Begrenzung, aber TeamViewer usw. haben diese Begrenzung)
- [Webkonsole](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/console/)
- API
- [OIDC](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/oidc/), [LDAP](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/ldap/), [2FA](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/2fa/)
- Adressbuch
- Umbenennen
- Protokollverwaltung (Verbindung, Dateiübertragung, Alarm, etc.)
- Gerätemanagement
- [Synchronisierung der Sicherheitseinstellungen](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/strategy/)
- [Zugriffskontrolle](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/permissions/)
- [Mehrere Relay-Server](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/relay/) (wählt automatisch den nächstgelegenen Relay aus)
- [Benutzerdefinierter Client-Generator](https://rustdesk.com/docs/en/self-host/client-configuration/#1-custom-client-generator-pro-only)

{{% notice note %}}
Wenn Sie Ihren eigenen Server zu Hause/im Büro aufbauen und keine Verbindung über öffentliche IP/Domain herstellen können, lesen Sie bitte [diesen Artikel](https://rustdesk.com/docs/en/self-host/nat-loopback-issues/).
{{% /notice %}}

{{% notice note %}}
Wir empfehlen, dies zuerst zu lesen, bevor Sie fortfahren: [Wie funktioniert der selbstgehostete Server?](/docs/en/self-host/#how-does-self-hosted-server-work).
{{% /notice %}}

## Hardwareanforderungen

Das niedrigste VPS-Level reicht für Ihre Anwendungsfälle aus. Die Serversoftware ist nicht CPU- und speicherintensiv. Unser öffentlicher ID-Server, der auf einem 2 CPU/4 GB Vultr-Server gehostet wird, bedient über 1,0 Millionen Endpunkte. Jede Relay-Verbindung verbraucht durchschnittlich 180 kb pro Sekunde. 1 CPU-Kern und 1 GB RAM reichen aus, um 1000 gleichzeitige Relay-Verbindungen zu unterstützen.

## Artikel-Tutorials
- [Schritt-für-Schritt-Anleitung: Selbstgehosteter RustDesk Server Pro in der Cloud über Docker für sicheren Fernzugriff](https://www.linkedin.com/pulse/step-by-step-guide-self-host-rustdesk-server-pro-cloud-montinaro-fwnmf/)

## Video-Tutorials

Es gibt [viele Video-Tutorials](https://rustdesk.com/docs/en/self-host/rustdesk-server-oss/install/#video-tutorials) online, die Sie durch die Installation der kostenlosen OSS-Version führen können.

Hier ist ein weiteres [gutes Tutorial](https://www.linkedin.com/pulse/building-your-own-remote-desktop-solution-rustdesk-cloud-montinaro-bv94f/?trackingId=a07rn2fkBW1ctLHaJ0tVcg%3D%3D) zur Selbsthosting der kostenlosen OSS-Version auf Hetzner Cloud mit Docker.

Die Installation der Pro-Version ist fast identisch, mit den folgenden Unterschieden:

- Ein anderer Download-Pfad und [Docker-Images](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/docker/) / [Compose-Datei](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/installscript/docker/#docker-compose) sind erforderlich.
- Ein zusätzlicher TCP-Port (21114) wird für die Webkonsole benötigt.

## Lizenz

Sie können eine Lizenz von https://rustdesk.com/pricing.html erhalten, weitere Details finden Sie auf der [Lizenzseite](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/).

## Erste Schritte
### 1. Installation

```
bash <(wget -qO- https://get.docker.com)
wget rustdesk.com/pro.yml -O compose.yml
docker compose up -d
```

Weitere Details finden Sie unter [Docker](/docs/en/self-host/rustdesk-server-pro/installscript/docker/).

### 2. Erforderliche Ports

Sie benötigen die Ports `21114`-`21119` TCP und `21116` UDP, bitte stellen Sie sicher, dass diese Ports eingerichtet sind, wenn Sie Firewall-Regeln und Docker-Port-Mapping einrichten.

Weitere Informationen zu diesen Ports finden Sie [hier](/docs/en/self-host/rustdesk-server-oss/install/#ports).

### 3. Lizenz einrichten

Öffnen Sie Ihre Webkonsole, indem Sie `http://<server ip>:21114` aufrufen, und [melden Sie sich an](/docs/en/self-host/rustdesk-server-pro/console/#log-in) mit den Standardanmeldedaten admin/test1234 `admin`/`test1234`. Folgen Sie [dieser Anleitung](/docs/en/self-host/rustdesk-server-pro/license/#set-license), um die Lizenz einzurichten.

### 4. HTTPS für die Webkonsole einrichten

> Sie können diesen Schritt überspringen, wenn Sie während der Testphase kein HTTPS verwenden möchten, aber denken Sie daran, die API-Adresse des Clients zu ändern, nachdem Sie HTTPS eingerichtet haben.

Hier ist ein einfaches Tutorial zur [manuellen HTTPS-Einrichtung](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#set-up-https-for-web-console-manually).

### 5. Client konfigurieren, um den selbstgehosteten Server zu verwenden

https://rustdesk.com/docs/en/self-host/client-configuration/

## Server-Upgrade

Diese [Anleitung](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/faq/#there-is-a-new-version-of-rustdesk-server-pro-out-how-can-i-upgrade) beschreibt, wie Sie RustDesk Server Pro von einer niedrigeren Version upgraden können und behandelt verschiedene Installationsmethoden.

## Migration auf neuen Host und Backup / Wiederherstellung

Hier ist ein detailliertes [Tutorial](https://github.com/rustdesk/rustdesk-server-pro/discussions/184).

## Lizenz migrieren

Bitte folgen Sie dieser [Anleitung](https://rustdesk.com/docs/en/self-host/rustdesk-server-pro/license/#invoices-license-retrieval-and-migration).

## Lizenz upgraden

Folgen Sie [dieser Anleitung](/docs/en/self-host/rustdesk-server-pro/license/#renewupgrade-license), um Ihre Lizenz jederzeit für mehr Benutzer und Geräte zu upgraden.

## Über Sicherheit

https://github.com/rustdesk/rustdesk/discussions/9835

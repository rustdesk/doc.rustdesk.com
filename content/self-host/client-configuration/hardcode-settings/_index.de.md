---
title: Benutzerdefinierte Einstellungen fest codieren
weight: 49
---

### Benutzerdefinierter Server
{{% notice note %}}
Um benutzerdefinierte Servereinstellungen in Ihren ausführbaren Dateien fest einzubinden, müssen Sie den Client auf Ihrem Rechner selbst [erstellen](https://rustdesk.com/docs/de/dev/build/) oder mit [GitHub-Aktionen](https://rustdesk.com/docs/de/dev/build/all/) bauen. <br>
**Hinweis**: [Selbst gehostete Runner](https://docs.github.com/de/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners) für Arm werden in unseren GitHub-Aktionen verwendet, bitte richten Sie sie selbst ein.
{{% /notice %}}
{{% notice note %}}
**Wenn Sie einen dieser Werte ohne den anderen setzen, wird Ihre ausführbare Datei nicht funktionieren!**
{{% /notice %}}

Sie können die folgenden Umgebungsvariablen auf Ihrem Betriebssystem setzen und RustDesk wird diese Variablen beim Erstellen Ihres Clients anstelle der Standardserver von rustdesk.com verwenden.

Wenn Sie nicht wissen, wie Sie eine Umgebungsvariable auf Ihrem System setzen können, sollten Sie in der Lage sein, online eine Dokumentation für Ihr Betriebssystem zu finden, die dies erklärt.

#### RENDEZVOUS_SERVER
Diese Variable sollte auf Ihre Server-URL gesetzt werden.

Es sollte eine Zeichenkette sein wie
```
rustdesk.my-domain.com
```

#### RS_PUB_KEY
Diese Variable wird Ihr öffentlicher Schlüssel sein, weitere Informationen über den Schlüssel finden Sie [hier](https://rustdesk.com/docs/de/self-host/install/#schlüssel).

Es sollte eine Zeichenkette sein wie
```
OeVuKk5nlHiXp+APNn0Y3pC1Iwpwn44JGqrQCsWqmBw=
```

#### API_SERVER
Standardmäßig läuft der API_SERVER auf `http://rustdesk.my-domain.com:21114`. Sie sollten ihn aus Sicherheitsgründen besser mit Nginx über HTTPS laufen lassen.

Es sollte eine Zeichenkette sein wie
```
https://rustdesk.my-domain.com
```

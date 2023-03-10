---
title: Benutzerdefinierte Einstellungen fest codieren
weight: 49
---

## Benutzerdefinierter Server
{{% notice note %}}
Um benutzerdefinierte Servereinstellungen in Ihren ausführbaren Dateien fest einzubinden, müssen Sie den Client auf Ihrem Rechner selbst [erstellen](/docs/de/dev/build/) oder mit [GitHub-Aktionen](/docs/de/dev/build/all/) bauen.
{{% /notice %}}
{{% notice note %}}
**Wenn Sie einen dieser Werte ohne den anderen setzen, wird Ihre ausführbare Datei nicht funktionieren!**
{{% /notice %}}

Sie können die folgenden Umgebungsvariablen auf Ihrem Betriebssystem setzen und Rustdesk wird diese Variablen beim Erstellen Ihres Clients anstelle der Standardserver von rustdesk.com verwenden. 

Wenn Sie nicht wissen, wie Sie eine Umgebungsvariable auf Ihrem System setzen können, sollten Sie in der Lage sein, online eine Dokumentation für Ihr Betriebssystem zu finden, die dies erklärt.

#### RENDEZVOUS_SERVER
Diese Variable sollte auf Ihre Server-URL gesetzt werden.

Es sollte eine Zeichenkette sein wie
```
rustdesk.my-domain.com
```

#### RS_PUB_KEY
Diese Variable wird Ihr öffentlicher Schlüssel sein, weitere Informationen über den Schlüssel finden Sie [hier](/docs/de/self-host/install/#schlüssel).

Es sollte eine Zeichenkette sein wie
```
OeVuKk5nlHiXp+APNn0Y3pC1Iwpwn44JGqrQCsWqmBw=
```

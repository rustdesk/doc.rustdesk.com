---
title: Github-Aktionen
weight: 35
---

{{% notice note %}}
Diese Erstellung verwendet Github-Aktionen. Sie benötigen einen Github-Account. Außerdem kann die Erstellung langsam sein, dafür ist aber keine Entwicklungsumgebung erforderlich.
{{% /notice %}}

## Einen Fork erstellen

Gehen Sie zu https://github.com/rustdesk/rustdesk/fork und klicken Sie auf "Create fork".

## Setzen Sie Ihre Umgebungsvariablen (optional)

{{% notice note %}}
Sie müssen dies nur tun, wenn Sie den Standardserver und den öffentlichen Schlüssel ändern möchten.

Die Server-URL und der Schlüssel, die Sie verwenden, sind für andere Benutzer auf Github verborgen, aber sie können Ihren Client herunterladen und sich mit Ihrem Server verbinden. Wenn Sie ein vollständig privates Repository benötigen, können Sie das Rustdesk-Client-Repository mit https://github.com/new/import importieren. **Wenn Sie ein privates Repository verwenden, können Sie nur eine begrenzte Anzahl von Paketen pro Monat erstellen. Wenn Sie mehr Pakete benötigen, müssen Sie ein kostenpflichtiges Github-Konto einrichten.**
{{% /notice %}}

Gehen Sie auf Ihrem gerade erstellten Fork zu "Settings -> Secrets and Variables -> Actions".

Klicken Sie auf "New repository secret", bei "Name" geben Sie RENDEZVOUS_SERVER ein, bei "Secret" geben Sie den Namen bzw. die IP-Adresse Ihres Servers ein.

Klicken Sie auf "Add secret".

Klicken Sie auf "New repository secret", bei "Name" geben Sie RS_PUB_KEY, bei "Secret" geben Sie den öffentlichen Schlüssel Ihres Servers ein.

Klicken Sie auf "Add secret".

## Workflows aktivieren

Gehen Sie in Ihrem gerade erstellten Fork zu "Settings -> Actions -> General".

Wählen Sie rechts "Allow all actions and reusable workflows".

Sobald die Workflows aktiviert sind, können Sie zu "Actions" gehen.

Auf der linken Seite wählen Sie "Flutter Nightly Build". Dann klicken Sie auf der rechten Seite auf "Enable workflow".

Schließlich können Sie auf "Run workflow" klicken, um die Rustdesk-Clients für alle unterstützten Plattformen zu erstellen.

## Upload-Berechtigungen für Workflows aktivieren

Gehen Sie in Ihrem gerade erstellten Fork zu "Settings -> Actions -> General".

Scrollen Sie nach unten zum Abschnitt "Workflow permissions" und aktivieren Sie "Read and write permissions".

## Ihre erstellten Pakete herunterladen

Nachdem der Workflow abgeschlossen ist, können Sie die erstellten Pakete herunterladen. 

Gehen Sie auf die Hauptseite Ihres Forks und klicken Sie rechts auf "Releases". Die Pakete, die Sie gerade gebaut haben, werden unter "Nightly" angezeigt.

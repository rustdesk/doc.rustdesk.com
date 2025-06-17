---
title: Client-Konfiguration
weight: 300
pre: "<b>2.3. </b>"
---

## Übersicht

Es gibt eine Reihe von Möglichkeiten, RustDesk-Clients so zu konfigurieren, dass sie Ihren eigenen, selbst gehosteten Server nutzen können. Einige davon werden im Folgenden beschrieben.

## 1. Benutzerdefinierter Client-Generator (nur Pro, Basisplan oder benutzerdefinierter Plan)

Sie können Ihren eigenen Namen, Logo, Symbol, Konfiguration, Signatur und mehr haben.

Derzeit werden Windows X64, Mac Arm64 / X64, [Linux](https://twitter.com/rustdesk/status/1788905463678951787), Android Arm 64 unterstützt.

[Video](https://twitter.com/rustdesk/status/1769171628426944539)

![](/docs/en/self-host/client-configuration/images/custom-client-qs.png)
![](/docs/en/self-host/client-configuration/images/web_console_custom_client_config.jpeg)

## 2. Manuelle Konfiguration

Im Hauptmenü des RustDesk-Clients klicken Sie auf die Menü-Schaltfläche [ &#8942; ] neben Ihrer ID und dann auf Netzwerk. Sie können nun die Einstellungen mit erhöhten Rechten freischalten und Ihre ID, Relay, API und Schlüssel einstellen.

![](/docs/en/self-host/client-configuration//docs/en/self-host/client-configuration/images/network-config.png)

Geben Sie in das Eingabefeld **ID-Server** den `hbbs`-Host oder die IP-Adresse ein (lokale Seite und entfernte Seite). Die anderen beiden Adressen können leer gelassen werden, RustDesk wird sie automatisch ermitteln (falls nicht speziell eingestellt). Der Relay-Server bezieht sich auf `hbbr` (Port 21117).

Zum Beispiel

```nolang
hbbs.example.com
```

oder

```nolang
hbbs.example.com:21116
```

### `Key` festlegen

Um eine verschlüsselte Verbindung zu Ihrem self-hosted Server herzustellen, müssen Sie dessen öffentlichen Schlüssel (Publik Key) eingeben. Der Schlüssel wird normalerweise beim ersten Start von `hbbs` erzeugt und befindet sich in der Datei `id_ed25519.pub` in Ihrem Arbeitsverzeichnis / Data-Ordner.

Als `Pro`-Benutzer können Sie den Schlüssel zusätzlich über die [Webkonsole](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/console/) abrufen.

![](/docs/en/self-host/rustdesk-server-pro/console//docs/en/self-host/client-configuration/images/console-home.png?v2)

### `API-Server` festlegen

Dies gilt nur für `Pro`-Benutzer. Wenn Sie sich über die Webkonsole anmelden können, aber nicht über den RustDesk-Client, haben Sie wahrscheinlich den `API-Server` nicht richtig eingestellt.

Wenn Ihr API-Server nicht auf dem Standard-Port `21114` läuft, geben Sie bitte ausdrücklich `API-Server` an. Sie dürfen diesen Port nicht zur Firewall hinzufügen, wenn Sie von der Open-Source-Version kommen.
Wenn Ihr API-Server z. B. auf dem Standard-HTTPS-Port läuft, geben Sie bitte `API-Server` mit `https://hbbs.example.com` an.

Wenn Sie den Wert des `API-Servers` immer noch nicht bestätigen können, gehen Sie bitte auf die Willkommenseite der Webkonsole, der `API-Server` ist im obigen Bild zu sehen (das Eingabefeld mit der Bezeichnung `API:`).

## 3. Mit Import oder Export einrichten

1. Verwenden Sie die Schritte [oben](https://rustdesk.com/docs/de/self-host/client-configuration/#manuelle-konfiguration), um den RustDesk-Client auf einem Gerät zu konfigurieren.
2. Gehen Sie für das oben genannte Gerät zu Einstellungen, dann zu Netzwerk und entsperren.
3. Klicken Sie auf `Serverkonfiguration exportieren`.
4. Fügen Sie die kopierte Zeichenfolge in Notepad o. ä. ein.
5. Gehen Sie zu einem neuen Client und kopieren Sie die obigen Angaben in die Zwischenablage.
6. Gehen Sie in RustDesk-Client auf Einstellungen und dann auf Netzwerk, entsperren Sie den Zugang und klicken Sie auf `Serverkonfiguration importieren`.
7. Die Einstellungen werden dann automatisch eingefügt.
8. Klicken Sie auf `Anwenden`.

## 4. Automatische Konfiguration

Der einfachste Weg zur automatischen Einrichtung ist die Verwendung von Bereitstellungsskripten, die Sie [hier](https://rustdesk.com/docs/de/self-host/client-deployment/) finden.

Sie können festlegen, dass das Passwort erforderlich ist und einen umgekehrten Base64-String im Format `{"host":"HOSTADDRESS", "key":"HOSTKEY", "api":"http://HOSTADDRESS:21114"}` verwenden, um die Clients automatisch zu konfigurieren.

Sie können auch die Schritte von [oben](https://rustdesk.com/docs/de/self-host/client-configuration/#mit-import-oder-export-einrichten) verwenden, um die Zeichenkette zu exportieren und dabei alle `=` am Anfang oder Ende der Zeichenkette entfernen. Starten Sie den RustDesk-Client neu, wenn die Einstellungen nicht angezeigt werden.

## 5. Konfiguration aus `Pro` über die Zwischenablage importieren

![](/docs/en/self-host/rustdesk-server-pro/console//docs/en/self-host/client-configuration/images/console-home.png?v2)

https://github.com/rustdesk/rustdesk-server-pro/discussions/372#discussioncomment-10473298

## 6. Befehlszeile `--config` verwenden
`rustdesk.exe --config <config-string>`

Sie können die Konfigurationszeichenkette über die Webkonsole (wie auf dem obigen Bild zu sehen) oder über den RustDesk-Client unter "Einstellungen → Netzwerk" abrufen ([hier](https://github.com/rustdesk/rustdesk/discussions/7118) gibt es eine Diskussion darüber).

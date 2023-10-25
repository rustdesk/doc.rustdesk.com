---
title: Client-Konfiguration
weight: 300
pre: "<b>2.3. </b>"
---

### Übersicht

Es gibt eine Reihe von Möglichkeiten, RustDesk-Clients so zu konfigurieren, dass sie Ihren eigenen, selbst gehosteten Server nutzen können. Einige davon werden im Folgenden beschrieben.

### Manuelle Konfiguration

Im Hauptmenü des RustDesk-Clients klicken Sie auf die Menü-Schaltfläche [ &#8942; ] neben Ihrer ID und dann auf Netzwerk. Sie können nun die Einstellungen mit erhöhten Rechten freischalten und Ihre ID, Relay, API und Schlüssel einstellen.

![](/docs/en/self-host/client-configuration/images/network-config.png)

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

Als `Pro`-Benutzer können Sie den Schlüssel über die [Webkonsole](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/console/) abrufen. Oder Sie finden ihn in der Datei `id_ed25519.pub` in Ihrem Arbeitsverzeichnis.

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

### `API-Server` festlegen

Dies gilt nur für `Pro`-Benutzer. Wenn Sie sich über die Webkonsole anmelden können, aber nicht über den RustDesk-Client, haben Sie wahrscheinlich den `API-Server` nicht richtig eingestellt.

Wenn Ihr API-Server nicht auf dem Standard-Port `21114` läuft, geben Sie bitte ausdrücklich `API-Server` an.
Wenn Ihr API-Server z. B. auf dem Standard-HTTPS-Port läuft, geben Sie bitte `API-Server` mit `https://hbbs.example.com` an.

Wenn Sie den Wert des `API-Servers` immer noch nicht bestätigen können, gehen Sie bitte auf die Willkommenseite der Webkonsole, der `API-Server` ist im obigen Bild zu sehen (das Eingabefeld mit der Bezeichnung `API:`).

### Mit Import oder Export einrichten

1. Verwenden Sie die Schritte [oben](https://rustdesk.com/docs/de/self-host/client-configuration/#manuelle-konfiguration), um den RustDesk-Client auf einem Gerät zu konfigurieren.
2. Gehen Sie für das oben genannte Gerät zu Einstellungen, dann zu Netzwerk und entsperren.
3. Klicken Sie auf `Serverkonfiguration exportieren`.
4. Fügen Sie die kopierte Zeichenfolge in Notepad o. ä. ein.
5. Gehen Sie zu einem neuen Client und kopieren Sie die obigen Angaben in die Zwischenablage.
6. Gehen Sie in RustDesk-Client auf Einstellungen und dann auf Netzwerk, entsperren Sie den Zugang und klicken Sie auf `Serverkonfiguration importieren`.
7. Die Einstellungen werden dann automatisch eingefügt.
8. Klicken Sie auf `Anwenden`.

### Automatische Konfiguration

Der einfachste Weg zur automatischen Einrichtung ist die Verwendung von Bereitstellungsskripten, die Sie [hier](https://rustdesk.com/docs/de/self-host/client-deployment/) finden.

Sie können festlegen, dass das Passwort erforderlich ist und einen umgekehrten Base64-String im Format `{"host":"HOSTADDRESS", "key":"HOSTKEY", "api":"http://HOSTADDRESS:21114"}` verwenden, um die Clients automatisch zu konfigurieren.

Sie können auch die Schritte von [oben](https://rustdesk.com/docs/de/self-host/client-configuration/#mit-import-oder-export-einrichten) verwenden, um die Zeichenkette zu exportieren und dabei alle `=` am Anfang oder Ende der Zeichenkette entfernen. Starten Sie den RustDesk-Client neu, wenn die Einstellungen nicht angezeigt werden.

#### Konfiguration in den Dateinamen von rustdesk.exe einfügen (nur Windows)

Ändern Sie `rustdesk.exe` in rustdesk-`host=<host-ip-oder-name>,key=<public-key-string>`.exe, z. B. rustdesk-`host=192.168.1.137,key=xfdsfsd32=32`.exe. Das Ergebnis der Konfiguration sehen Sie im untenstehenden Über-Fenster.

Als `Pro`-Benutzer können Sie die gesamte verschlüsselte Zeichenkette über die [Webkonsole](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/console/) abrufen, dann die RustDesk-Client-Exe herunterladen und umbenennen, die Sie dann irgendwo hochladen können, damit Ihre Kunden sie verwenden können.

![](/docs/en/self-host/rustdesk-server-pro/console/images/console-home.png?v2)

<a name="invalidchar"></a>
{{% notice note %}}
Sie müssen sowohl `host` als auch `key` setzen, das Fehlen eines der beiden wird nicht funktionieren.

Fügen Sie nach dem Schlüssel optional ein `,` (Komma) als Trennzeichen vor `.exe` hinzu, um zu verhindern, dass der Schlüssel verstümmelt wird, wenn Windows oder der Browser die Datei beim Herunterladen von doppelten Namen umbenennt.

Wenn der Schlüssel ungültige Zeichen enthält, die nicht in einem Windows-Dateinamen verwendet werden können, entfernen Sie
bitte die Datei `id_ed25519` von Ihrem Server und starten Sie `hbbs`/`hbbr` neu. Dadurch wird die Datei `id_ed25519.pub` neu generiert.
Möglicherweise müssen Sie diesen Vorgang wiederholen, bis Sie gültige Zeichen erhalten.
{{% /notice %}}

### [Benutzerdefinierte Einstellungen fest codieren](https://rustdesk.com/docs/de/self-host/client-configuration/hardcode-settings/)


### Anmeldung eines Benutzers (RustDesk Server Pro)
Um sich bei RustDesk Server Pro anzumelden, vergewissern Sie sich, dass Ihr Client korrekt eingerichtet ist, klicken Sie auf `Einstellungen`, dann auf `Konto`, dann auf `Anmelden`, geben Sie Ihren Benutzernamen und Ihr Passwort ein und melden Sie sich dann an.

### Steuerung von anderen Maschinen übernehmen
Bevor Sie die Kontrolle über RustDesk Server Pro übernehmen, stellen Sie sicher, dass Sie angemeldet sind.

Danach können Sie die Client-ID und das Passwort des Rechners eingeben, über den Sie die Steuerung übernehmen möchten, und auf `Verbinden` klicken.

### Adressbuch (RustDesk Server Pro)
Um ein Gerät zu Ihrem Adressbuch hinzuzufügen, nachdem Sie eine Verbindung zu einem Gerät hergestellt haben, wird es in Ihren letzten Sitzungen angezeigt. Neben dem Gerät können Sie nun auf die Menü-Schaltfläche [ &#8942; ] klicken und es zu Ihrem Adressbuch hinzufügen.

Sie können in Ihrem Adressbuch Tags hinzufügen und zuweisen, um die Organisation von Geräten zu erleichtern und nach ihnen zu suchen.

### Gruppe (RustDesk Server Pro)
Standardmäßig werden nach der Anmeldung alle Geräte, die mit Ihrem RustDesk Server Pro verbunden sind, in der Gruppe angezeigt. Sie benötigen immer noch die Passwörter für den unbeaufsichtigten Zugang, aber alle Geräte sind jetzt da. Es werden alle anderen Benutzer in Ihrer Gruppe angezeigt und wenn Sie in der Webkonsole gruppenübergreifenden Zugang zuweisen, werden auch die Benutzer [in diesen Gruppen](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/console/#neue-gruppen-hinzufügen) angezeigt.

Wenn Sie Geräte zu Ihrem eigenen Adressbuch hinzufügen möchten, klicken Sie auf die Menü-Schaltfläche [ &#8942; ] neben dem Gerät und dann auf `Zum Adressbuch hinzufügen`.

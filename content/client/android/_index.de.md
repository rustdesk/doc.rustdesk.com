---
title: Android
weight: 4
---

### Fernsteuerung

Geben Sie die ID des entfernten Geräts auf der Startseite ein oder wählen Sie ein historisches Gerät zur Verifizierung aus.
Nach erfolgreicher Verifizierung können Sie das entfernte Gerät steuern.

| Startseite | Erfolgreich verbunden |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_en.jpg?width=300px) | ![](/docs/en/client/android/images/connection_en.jpg?width=300px) |

Die Eingabesteuerung bietet zwei Modi: `Mausmodus` und `Touch-Modus`, die über die untere Symbolleiste umgeschaltet werden können.

| Mauseinstellungen | Modusauswahl |
| --- | --- |
| ![](/docs/en/client/android/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/client/android/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
Im `Mausmodus` können Sie auch mit einem `Zwei-Finger-Tippen` die `Rechte Maustaste` des entfernten Geräts auslösen
{{% /notice %}}

### Dateiübertragung (Android)

> Erfordert RustDesk ≥ 1.1.9

Wählen Sie das Gerät in der Geräteliste auf der Startseite aus.

Drücken Sie lange oder tippen Sie auf das Menü rechts, um `Dateiübertragung` auszuwählen.

| Startseite | Erfolgreich verbunden |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_connection_en.jpg?width=300px) |

- Das anfängliche Verzeichnis ist das Home-Verzeichnis des Geräts. Sie können auf <i class="fas fa-home"></i> klicken, um schnell zum Home-Verzeichnis zurückzukehren.
- Unter der Titelleiste befindet sich die Verzeichnisebene. Sie können auf den entsprechenden Ordner klicken, um schnell zu springen.
- Klicken Sie auf <i class="fas fa-arrow-up"></i>, um auf das übergeordnete Verzeichnis zuzugreifen.
- Am unteren Ende der Liste werden der aktuelle absolute Pfad und Projektstatistiken angezeigt.
- Klicken Sie auf `Lokal` / `Entfernt` in der Titelleiste, um zwischen den Seiten zu wechseln.

#### Wie übertrage ich Dateien?

1. **Drücken Sie lange** auf eine Datei oder einen Ordner in der Liste, um schnell in den **Mehrfachauswahlmodus** zu gelangen, in dem mehrere Elemente ausgewählt werden können.
2. Wechseln Sie nach der Dateiauswahl zwischen den Seiten `Lokal` / `Entfernt`. Nach dem Wechsel wird am unteren Bildschirmrand die Aufforderung `Hier einfügen?` angezeigt.
3. Klicken Sie auf das Symbol zum Einfügen von Dateien im Bild, um die ausgewählten Elemente in das Zielverzeichnis zu übertragen.

| Mehrfachauswahlmodus | Datei einfügen |
| --- | --- |
| ![](/docs/en/client/android/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_copy_en.jpg?width=300px) |

### ID/Relay-Server einstellen

1. Klicken Sie auf `Einstellungen` in der unteren Navigationsleiste.
2. Klicken Sie auf `ID/Relay-Server`.
3. Geben Sie den Hostnamen/die IP-Adresse Ihres ID-Servers in das Feld `ID-Server` ein. Lassen Sie `Relay-Server` und `API-Server` leer und geben Sie Ihren öffentlichen Schlüssel (optional, für Verschlüsselung erforderlich) in das Feld `Schlüssel` ein. Drücken Sie **OK**, um Ihre Einstellungen zu speichern. Es wird automatisch zum angegebenen Server gewechselt.

Sie können es auch durch Scannen eines QR-Codes konfigurieren. Um den QR-Code zu generieren, verwenden Sie das folgende Format (ändern Sie die Werte `host` und `key` in Ihre eigenen):

```nolang
config={"host": "xxx", "key": "xxx"}
```

Gehen Sie dann zu einem [Online-QR-Code-Generator](https://www.qr-code-generator.com/) und fügen Sie den obigen Code ein.

Das Bild unten ist ein Screenshot von Android. Wenn es iOS ist, überprüfen Sie bitte das Menü oben rechts auf der Startseite.

![](/docs/en/client/android/images/id_setting_en.jpg?width=300px)

### Bildschirm/Dateien Ihres Android-Telefons teilen

Ab Version 1.1.9 hat der Android-Client die Funktionen zum Teilen des Telefonbildschirms und des Dateisystems des Telefons hinzugefügt.

- Android 6 und höher ist für die Bildschirmfreigabe erforderlich
- Android 10 oder höher ist erforderlich, um das interne Audio des Mobiltelefonsystems zu teilen
- iOS unterstützt noch keine Bildschirmfreigabe

#### Berechtigungen anfordern und Dienste starten

Klicken Sie auf `Bildschirm teilen` in der unteren Navigationsleiste.

Konfigurieren Sie verschiedene Berechtigungen nach Bedarf. Jedes Mal, wenn Sie RustDesk starten, müssen Sie die Berechtigungen "Bildschirmaufnahme" und "Eingabesteuerung" erneut anfordern.

![](/docs/en/client/android/images/server_off_en.jpg?width=300px)

| Berechtigung | Beschreibung |
| --- | --- |
| Bildschirmaufnahme | Ob die Berechtigung zur Bildschirmaufnahme aktiviert werden soll, der Überwachungsdienst wird beim Start gleichzeitig aktiviert |
| Eingabesteuerung* | Ob der Controller die Eingabe des Telefons steuern darf, wie z.B. virtuelle Touchscreen-Operationen mit der Maus |
| Dateiübertragung* | Ob die Dateiübertragungsberechtigung aktiviert werden soll, nach dem Start können Sie das Dateisystem dieses Telefons remote steuern |
| Audioaufnahme | Ob die interne Systemmusik des Telefons geteilt werden soll (nicht Mikrofoneingabe) |

{{% notice note %}}
Das obige * stellt spezielle Berechtigungen dar. Um solche Berechtigungen zu erhalten, müssen Sie zur Android-Systemeinstellungsseite springen, um sie manuell zu erhalten. Die Details sind wie folgt
{{% /notice %}}

#### Spezielle Berechtigungsanfrage - Datei

| Die Anforderung von Android-Dateiberechtigungen springt automatisch zur Systemeinstellungsseite |
| :---: |
| ![](/docs/en/client/android/images/get_file_en.jpg?width=300px) |

#### Spezielle Berechtigungsanfrage - Mauseingabe
| Schritt 1: "Installierte Dienste" finden | Schritt 2: RustDesk Input starten |
| --- | --- |
| ![](/docs/en/client/android/images/get_input1_en.jpg?width=300px) | ![](/docs/en/client/android/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
Die Systemeinstellungsseite verschiedener Anbieter kann unterschiedlich sein. Bitte passen Sie sie entsprechend Ihrer Systemseite an.
{{% /notice %}}

| Remote-Maussteuerung-Tastenkürzel | Beschreibung |
| --- | --- |
| Rechte Maustaste klicken | Zurück |
| Mausrad klicken | Startseite |
| Mausrad lange drücken | Kürzlich geöffnete Apps |
| Mausrad scrollen | Vertikales Scrollen simulieren |

#### Dienst starten

Nach Erhalt der Berechtigung `Bildschirmaufnahme` wird der Dienst automatisch gestartet. Sie können auch auf die Schaltfläche `Dienst starten` klicken, um den Dienst zu starten. Nach dem Start des Dienstes kann er Desktop-Steuerungsanfragen von anderen Geräten akzeptieren.

Wenn die Berechtigung `Dateiübertragung` aktiviert ist, kann er auch Dateisteuerungsanfragen von anderen Geräten akzeptieren.

Nach dem Start des Dienstes wird automatisch eine eindeutige ID und ein zufälliges Passwort für dieses Gerät erhalten. Andere Geräte können das Telefon über die ID und das Passwort steuern oder bei Erhalt einer neuen Anfrage manuell bestätigen.

| Vor dem Starten des Dienstes | Nach dem Starten des Dienstes |
| --- | --- |
| ![](/docs/en/client/android/images/server_off_en.jpg?width=300px) | ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. Das Klicken auf `Dienst starten` aktiviert standardmäßig die Berechtigung `Bildschirmaufnahme`.
2. Wenn die Berechtigung `Bildschirmaufnahme` nicht erhalten wird, können andere Geräte keine Steuerungsanfragen ausgeben.
3. Außer der Berechtigung `Bildschirmaufnahme` wirkt sich das Umschalten anderer Berechtigungen nur auf neue Verbindungen aus und beeinflusst nicht die bestehende Verbindung. Wenn Sie Berechtigungen für eine bestehende Verbindung umschalten müssen, schließen Sie bitte zuerst die aktuelle Verbindung, ändern Sie die Berechtigungen und empfangen Sie dann eine Steuerungsanfrage.
{{% /notice %}}

##### PC

![](/docs/en/client/android/images/android_server_pc_side_en.png?width=700px)

##### Mobiles Endgerät

| Sie können den Dienst jederzeit stoppen oder bestimmte Verbindungen schließen | Sie können Chats empfangen oder initiieren |
| --- | --- |
| ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) | ![](/docs/en/client/android/images/android_server2_en.jpg?width=300px) |
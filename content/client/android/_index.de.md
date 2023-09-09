---
title: Android
weight: 4
---

### Fernsteuerung

Geben Sie die ID des entfernten Geräts auf der Startseite ein oder wählen Sie ein historisches Gerät zur Überprüfung aus.
Nach erfolgreicher Überprüfung können Sie das entfernte Gerät steuern.

| Startfenster | Erfolgreich verbunden |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_en.jpg?width=300px) | ![](/docs/en/client/android/images/connection_en.jpg?width=300px) |

Die Eingabesteuerung bietet zwei Modi: `Mausmodus` und `Touch-Modus`, die über die untere Symbolleiste umgeschaltet werden können.

| Mauseinstellungen | Modusauswahl |
| --- | --- |
| ![](/docs/en/client/android/images/touch_mode_icon_en.png?width=300px) | ![](/docs/en/client/android/images/touch_mode_en.jpg?width=300px) |

{{% notice note %}}
Im `Mausmodus` können Sie die `Rechte Maus` des entfernten Geräts mit einem `Zwei-Finger-Tipp` auslösen.
{{% /notice %}}

### Dateiübertragung (Android)

> Benötigt RustDesk ≥ 1.1.9

Wählen Sie in der Geräteliste auf der Startseite das Gerät aus.

Drücken Sie lange oder tippen Sie zur Auswahl rechts auf das Menü `Datei übertragen`.

| Startfenster | Erfolgreich verbunden |
| --- | --- |
| ![](/docs/en/client/android/images/connection_home_file_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_connection_en.jpg?width=300px) |

- Das Ausgangsverzeichnis ist das Home-Verzeichnis des Geräts, Sie können auf <i class="fas fa-home"></i> klicken, um schnell nach Hause zurückzukehren.
- Unter der Titelleiste befindet sich die Verzeichnisebene, Sie können auf den entsprechenden Ordner klicken, um schnell zu springen.
- Klicken Sie <i class="fas fa-arrow-up"></i>, um auf das übergeordnete Verzeichnis zuzugreifen.
- Der aktuelle absolute Pfad und die Projektstatistik werden am Ende der Liste angezeigt.
- Klicken Sie `Lokal` / `Entfernt` in der Titelleiste, um die Seiten zu wechseln.

#### Wie übertrage ich Dateien?

1. **Drücken Sie lange** auf eine Datei oder einen Ordner in der Liste, um schnell in den **Mehrfachauswahlmodus** zu wechseln, mit dem Sie mehrere Elemente auswählen können.
2. Wechseln Sie nach Auswahl der Datei(en) die Seite `Lokal` / `Entfernt`. Nach dem Umschalten sehen Sie am unteren Rand des Bildschirms die Aufforderung `Hier einfügen?`.
3. Klicken Sie auf das Symbol zum Einfügen von Dateien im Bild, um die ausgewählten Elemente in das Zielverzeichnis zu übertragen.

| Mehrfachauswahlmodus | Datei einfügen |
| --- | --- |
| ![](/docs/en/client/android/images/file_multi_select_en.jpg?width=300px) | ![](/docs/en/client/android/images/file_copy_en.jpg?width=300px) |

### ID/Relay-Server einstellen

1. Klicken Sie `Einstellungen` in der unteren Navigationsleiste.
2. Klicken Sie `ID/Relay-Server`.
3. Geben Sie den Hostnamen oder die IP-Adresse Ihres ID-Servers in das Feld `ID-Server` ein. Lassen Sie `Relay-Server` sowie `API-Server` leer und geben Sie Ihren öffentlichen Schlüssel (optional, für die Verschlüsselung erforderlich) in das Feld `Key` ein. Drücken Sie **OK**, um Ihre Einstellungen zu speichern. Es wird automatisch auf den angegebenen Server umgeschaltet.

Sie können ihn auch durch Scannen eines QR-Codes konfigurieren. Um den QR-Code zu erzeugen, verwenden Sie das folgende Format (ändern Sie die Werte `host` und `key` in Ihre eigenen Werte):

```nolang
config={"host": "xxx", "key": "xxx"}
```

Gehen Sie dann online zu einem [QR-Code-Generator](https://www.qr-code-generator.com/) und fügen Sie den obigen Code ein.

Das folgende Bild ist ein Screenshot von Android. Wenn es sich um iOS handelt, überprüfen Sie bitte das Menü oben rechts auf der Startseite.

![](/docs/en/client/android/images/id_setting_en.jpg?width=300px)

### Bildschirm und Dateien Ihres Android-Telefons freigeben

Ab Version 1.1.9 hat der Android-Client die Funktion zur Freigabe des Bildschirms und des Dateisystems des Telefons hinzugefügt.

- Für die Bildschirmfreigabe ist Android 6 oder höher erforderlich
- Android 10 oder höher ist erforderlich, um den internen Sound des Mobiltelefonsystems zu teilen
- iOS unterstützt noch keine Bildschirmfreigabe

#### **Berechtigungen anfordern und Dienste starten**

Klicken Sie in der unteren Navigationsleiste auf `Bildschirm freigeben`.

Konfigurieren Sie nach Bedarf verschiedene Berechtigungen. Jedes Mal, wenn Sie RustDesk starten, müssen Sie die Berechtigungen „Bildschirmaufnahme“ und „Eingabesteuerung“ erneut anfordern.

![](/docs/en/client/android/images/server_off_en.jpg?width=300px)

| Berechtigung     | Beschreibung                                               |
| --- | --- |
| Bildschirmaufnahme | Wenn Sie die Berechtigung zur Freigabe von Bildschirmaufnahmen aktivieren, wird der Überwachungsdienst gleichzeitig mit dem Start des Dienstes aktiviert. |
| Eingabesteuerung* | Legt fest, ob das Steuergerät die Eingaben des Mobiltelefons steuern darf, z. B. die Bedienung des virtuellen Touchscreens mit der Maus. |
| Datei übertragen* | Wenn Sie die Berechtigung zur Dateiübertragung aktivieren, können Sie nach dem Start das Dateisystem des Telefons fernsteuern. |
| Audioaufnahme  | Legt fest, ob die Systemmusik innerhalb des Telefons freigegeben werden soll (nicht der Mikrofoneingang). |

{{% notice note %}}
Das obige * steht für spezielle Berechtigungen. Um solche Berechtigungen zu erhalten, müssen Sie auf die Seite mit den Android-Systemeinstellungen wechseln, um sie manuell zu erhalten. Die Einzelheiten sind wie folgt
{{% /notice %}}

#### **Sondergenehmigung beantragen – Datei**

| Das Anfordern von Android-Dateiberechtigungen führt automatisch zur Seite mit den Systemeinstellungen |
| :---: |
| ![](/docs/en/client/android/images/get_file_en.jpg?width=300px) |

#### **Sondergenehmigung beantragen - Mauseingabe**
| Schritt 1: Suchen Sie „Installierte Dienste“ | Schritt 2: Starten Sie RustDesk Input |
| --- | --- |
| ![](/docs/en/client/android/images/get_input1_en.jpg?width=300px) | ![](/docs/en/client/android/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
Die Systemeinstellungsseite der verschiedenen Anbieter kann unterschiedlich sein, bitte passen Sie sie entsprechend Ihrer Systemseite an.
{{% /notice %}}

**Tastenkombinationen für die Fernbedienung der Maus:**

- Klick mit der rechten Maustaste: zurück
- Klick auf das Mausrad: Startseite
- Langes Drücken des Mausrads: zuletzt geöffnete Apps
- Scrollen mit dem Mausrad: vertikales Gleiten simulieren

#### **Dienst starten**

Nach Erhalt der Berechtigung `Bildschirmaufnahme` wird der Dienst automatisch gestartet. Sie können auch auf die Schaltfläche `Dienst starten` klicken, um den Dienst zu starten. Nachdem der Dienst gestartet wurde, kann er Desktop-Steuerungsanfragen von anderen Geräten annehmen.

Wenn die Berechtigung `Datei übertragen` aktiviert ist, kann es auch Dateisteuerungsanfragen von anderen Geräten annehmen.

Nachdem der Dienst gestartet wurde, werden automatisch eine eindeutige ID und ein zufälliges Passwort für dieses Gerät vergeben. Andere Geräte können das Telefon über die ID und das Passwort steuern oder den Eingang einer neuen Anfrage manuell bestätigen.

| Vor dem Start des Dienstes | Nach dem Start des Dienstes |
| --- | --- |
| ![](/docs/en/client/android/images/server_off_en.jpg?width=300px) | ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. Wenn Sie auf "Dienst starten" klicken, wird die Berechtigung "Bildschirmaufnahme" standardmäßig aktiviert.
2. Wenn die "Bildschirmaufnahme"-Erlaubnis nicht erteilt wird, können andere Geräte keine Kontrollanfragen stellen.
3. Mit Ausnahme der Berechtigung `Bildschirmaufnahme` wirkt sich das Umschalten anderer Berechtigungen nur auf eine neue und nicht auf die bestehende Verbindung aus. Wenn Sie die Berechtigungen für die bestehende Verbindung ändern müssen, schließen Sie bitte zuerst die aktuelle Verbindung, ändern Sie die Berechtigungen und empfangen Sie dann eine Steuerungsanforderung.
{{% /notice %}}

##### PC

![](/docs/en/client/android/images/android_server_pc_side_en.png?width=700px)

##### Mobiles Endgerät

| Sie können den Dienst jederzeit beenden oder die angegebene Verbindung schließen | Sie können Chats empfangen oder initiieren |
| --- | --- |
| ![](/docs/en/client/android/images/server_on_en.jpg?width=300px) | ![](/docs/en/client/android/images/android_server2_en.jpg?width=300px) |

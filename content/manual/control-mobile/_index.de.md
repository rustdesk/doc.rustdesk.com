---
title: Steuern Sie Ihr Android
weight: 2
---

### Teilen Sie den Bildschirm / die Dateien Ihres Android-Telefons
------

Ab Version 1.1.9 hat der Android-Client die Funktionen zum Freigeben des Telefonbildschirms und zum Freigeben des Dateisystems des Telefons hinzugefügt.

- Für die Bildschirmfreigabe ist Android 6 und höher erforderlich
- Android 10 oder höher ist erforderlich, um das interne Audio des Mobiltelefonsystems zu teilen
- iOS unterstützt noch keine Bildschirmfreigabe


#### **Fordern Sie Berechtigungen an und starten Sie Dienste**

Klicke auf `Bildschirm freigeben` aus der unteren Navigationsleiste

Konfigurieren Sie nach Bedarf verschiedene Berechtigungen. Jedes Mal, wenn Sie RustDesk starten, müssen Sie die Berechtigungen „Screen Capture“ und „Input Control“ erneut anfordern.

![](/docs/en/manual/mobile/images/server_off_en.jpg?width=300px)

| Berechtigungen     | Beschreibung                                               |
| --------------- | --------------------------------------------------------- |
| Bildschirmaufnahme | Ob die Berechtigung zum Teilen von Bildschirmaufnahmen aktiviert werden soll, der Überwachungsdienst wird gleichzeitig mit dem Start aktiviert |
| Eingabesteuerung* | Ob der Controller die Eingabe des Mobiltelefons steuern darf, z. B. virtuelle Touchscreen-Bedienung mit der Maus |
| Datei Übertragen* | Ob Sie die Dateiübertragungsberechtigung aktivieren möchten, nach dem Start können Sie das Dateisystem dieses Telefons fernsteuern |
| Audioaufnahme  | Ob die Systemmusik im Telefon geteilt werden soll (kein Mikrofoneingang) |

{{% notice note %}}
Das obige * steht für spezielle Berechtigungen. Um solche Berechtigungen zu erhalten, müssen Sie zur Seite mit den Android-Systemeinstellungen springen, um sie manuell zu erhalten. Die Einzelheiten sind wie folgt
{{% /notice %}}

#### **Antrag auf Sondergenehmigung – Datei**

| Das Anfordern von Android-Dateiberechtigungen springt automatisch zur Seite mit den Systemeinstellungen |
| :---------------: |
| ![](/docs/en/manual/mobile/images/get_file_en.jpg?width=300px) |

#### **Sondergenehmigungsanfrage - Mauseingabe**
| Schritt 1 Suchen Sie „Installierte Dienste“ | Schritt 2 Starten Sie RustDesk Input |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/get_input1_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/get_input2_en.jpg?width=300px) |

{{% notice note %}}
Die Systemeinstellungsseite verschiedener Anbieter kann unterschiedlich sein, bitte passen Sie sie entsprechend Ihrer Systemseite an
{{% /notice %}}

**Tastenkombinationen für die Fernbedienung der Maus:**

- Klicken Sie mit der rechten Maustaste: Zurück
- Klicken Sie mit dem Mausrad: Startseite
- Langes Drücken des Mausrads: kürzlich geöffnete Apps
- Scrollen mit dem Mausrad: vertikales Gleiten simulieren

#### **Dienst starten**

Nach Erhalt der `Bildschirmberechtigung`, wird der Dienst automatisch gestartet. Sie können auch auf klicken `Start Dienst` Schaltfläche, um den Dienst zu starten. Nachdem der Dienst gestartet wurde, kann er Desktop-Steuerungsanfragen von anderen Geräten annehmen.

Wenn die `Dateiberchtigung` aktiviert ist, kann es auch Dateisteuerungsanfragen von anderen Geräten annehmen.

Nachdem der Dienst gestartet wurde, werden für dieses Gerät automatisch eine eindeutige ID und ein zufälliges Passwort abgerufen. Andere Geräte können das Telefon über die ID und das Passwort steuern oder den Eingang einer neuen Anfrage manuell bestätigen.

| Vor dem Start des Dienstes | Nach dem Start des Dienstes |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/server_off_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/server_on_en.jpg?width=300px) |

{{% notice note %}}
1. Kicken auf `Start Service` wird die `Bildschirmfreigabe` standardmäßig ermöglicht.
2. Mit Ausnahme der `Bildschirmfreigabe`, wirkt sich das Umschalten anderer Berechtigungen nur auf die neue Verbindung aus und nicht auf die hergestellte Verbindung. Wenn Sie die Berechtigungen für eine bestehende Verbindung ändern müssen, schließen Sie bitte zuerst die aktuelle Verbindung, ändern Sie die Berechtigungen und erhalten Sie dann eine Steuerungsanforderung.
{{% /notice %}}

##### PC

![](/docs/en/manual/mobile/images/android_server_pc_side_en.png?width=700px)

##### Mobiles Endgerät

| Sie können den Dienst jederzeit beenden oder die angegebene Verbindung schließen | Sie können Chats empfangen oder initiieren |
| --------------- | -------------------------------------------------------- |
| ![](/docs/en/manual/mobile/images/server_on_en.jpg?width=300px) | ![](/docs/en/manual/mobile/images/android_server2_en.jpg?width=300px) |
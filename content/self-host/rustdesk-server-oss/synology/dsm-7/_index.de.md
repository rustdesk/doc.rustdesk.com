---
title: Synology DSM 7.2
weight: 20
---
<!-- For translators: When translating elements like "buttons", don't just translate, please refer actual naming in their interface. -->
Nach dem DSM 7.2-Update hat Synology sein "Docker"-Paket in "Container Manager" umbenannt. Es bringt eine neue grafische Benutzeroberfläche mit und enthält "docker-compose" in der GUI, mit der Sie Docker einfacher erstellen können.

### Unterstützte Modelle und Voraussetzungen

Der Container Manager bietet ARM64-Unterstützung für einige Low-End-Modelle, wie z. B. die J-Serie. Eine detaillierte Liste der unterstützten Modelle finden Sie auf der [Synology-Website] (https://www.synology.com/en-us/dsm/packages/ContainerManager).
In den meisten Fällen müssen Sie für die Installation von Docker und RustDesk Server keinen zusätzlichen RAM installieren.

### 1. Container Manager (Docker) installieren

Öffnen Sie das "Package Center", suchen und installieren Sie "Container Manager".

![](images/dsm7_install_container_manager_though_package_center.png)

### 2. Ordner erstellen

Nach der Installation von "Container Manager" wird ein gemeinsamer Ordner `docker` erstellt, in dem wir die Daten unseres Servers ablegen.

Öffnen Sie Ihre File Station, erstellen Sie einen Ordner `rustdesk-server` (oder wie immer Sie wollen). Dann erstellen Sie darin einen Ordner `data`, genau wie auf dem Bild.

![](images/dsm7_create_required_folders.png)

### 3. Container erstellen

Öffnen Sie Ihren Container Manager, gehen Sie zu Project und klicken Sie auf Create.

Geben Sie den Projektnamen `rustdesk-server` ein, ändern Sie Source von "Upload docker-compose.yml" zu "Create docker-compose.yml" und kopieren Sie den folgenden Inhalt in das Feld. Danach sollten Sie `rustdesk.example.com` (die auf Ihre `hbbr` verweist) durch die Domain ersetzen, die auf Ihr NAS verweist.

{{% notice note %}}
Sie könnten die Zeile mit `hbbs` vorübergehend in die LAN-IP Ihres NAS ändern, wie auf dem Bild gelb markiert zu sehen. Nachdem Sie sich vergewissert haben, dass Ihr Server funktioniert, **sollten** Sie die Änderung zurücknehmen.
{{% /notice %}}

![](images/dsm7_creating_project_init.png)

```yaml
version: '3'
services:
  hbbs:
    container_name: hbbs
    image: rustdesk/rustdesk-server:latest
    command: hbbs -r rustdesk.example.com:21117 -k _
    volumes:
      - ./data:/root
    network_mode: host
    depends_on:
      - hbbr
    restart: always

  hbbr:
    container_name: hbbr
    image: rustdesk/rustdesk-server:latest
    command: hbbr -k _
    volumes:
      - ./data:/root
    network_mode: host
    restart: always

# Weil der Docker-Host-Modus verwendet wird
# Nur für den Fall, dass Sie die Ports vergessen haben:
# 21115 TCP For NAT type test
# 21116 TCP TCP hole punching
# 21116 UDP Heartbeat/ID server
# 21117 TCP Relay
```

Bitte überspringen Sie `Web portal settings`, dann ist das erledigt.

### 4. Prüfen, ob es funktioniert

Öffnen Sie Ihre File Station, Sie sollten `id_ed25519`, `id_ed25519.pub` in Ihrem Ordner `docker/rustdesk-server/data` sehen. Sie können diese Datei herunterladen und mit einem beliebigen Texteditor öffnen oder [Synology Text Editor](https://www.synology.com/de-de/dsm/packages/TextEditor) verwenden. Dies ist der öffentliche Schlüssel, den Sie für Ihren RustDesk-Client benötigen.

Der öffentliche Schlüssel sieht wie folgt aus:

![](images/dsm7_viewing_public_key_though_syno_text_editor.png)

Lesen Sie [hier](/docs/de/client), um Ihren Client einzurichten. Nur `ID-Server` und `Key` werden benötigt. `Relais-Server` wird nicht benötigt, da wir ihn in `hbbs` festgelegt haben. Diese Informationen werden von hbbs automatisch bereitgestellt.

### 5. Legen Sie Ihre hbbs so fest, dass sie auf Ihre Domäne zeigen

Wenn Sie Ihren `hbbs`-Befehl so eingestellt haben, dass er auf Ihre LAN-IP verweist, und überprüft haben, dass er funktioniert, ist es an der Zeit, zur Domäne zu wechseln, da er nicht funktioniert, wenn Sie ihn außerhalb Ihres LAN verwenden.
<hr>

5.1. Gehen Sie zu Container Manager → Project → Klicken "rustdesk-server" → Action → Stop

5.2. Nach dem Stoppen klicken Sie auf "YAML Configurations", ändern Sie die Zeile, die mit `command: hbbs` beginnt, in Ihre Domäne und klicken Sie dann auf "Save". Stellen Sie sicher, dass Sie "Build and start the project (rebuild the image)" wählen.

![](images/dsm7_recreate_project_after_modified_args.png)

5.3. Ihr RustDesk-Server sollte für Verbindungen aus dem Internet bereit sein, als nächstes sollten Sie eine Portweiterleitung einrichten.

{{% notice note %}}
Haben Sie Probleme, nachdem Sie diesen Schritt durchgeführt haben? Sie sollten [diesen Artikel](/docs/de/self-host/nat-loopback-issues/) überprüfen.
{{% /notice %}}

### 6. Portweiterleitung auf Ihrem Router einrichten

Gehen Sie auf die Verwaltungswebseite Ihres Routers und suchen Sie nach etwas, das mit `Portweiterleitung` zu tun hat. Es sollte unter `WAN` oder `Firewall` erscheinen.

Wenn Sie die Einstellung immer noch nicht finden können, suchen Sie in Google nach `{Router brand} + port forwarding` oder `{Router model} + port forwarding`. Wenn das Gerät von Ihrem ISP stammt, fragen Sie ihn.

Öffnen Sie die erforderlichen Ports:
  * `21115` `TCP` For NAT type test
  * `21116` `TCP` TCP hole punching
  * `21116` `UDP` Heartbeat/ID server
  * `21117` `TCP` Relay

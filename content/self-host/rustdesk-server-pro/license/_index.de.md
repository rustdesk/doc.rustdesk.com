---
title: Lizenz
weight: 15
---

## Lizenz kaufen

Bitte beziehen Sie Ihre Lizenz von [https://rustdesk.com/pricing.html](https://rustdesk.com/pricing.html), geben Sie eine gültige E-Mail-Adresse auf der Bezahlseite von Stripe ein. Die Lizenz und die Rechnung in einer separaten E-Mail werden nach erfolgreicher Zahlung an Ihre E-Mail-Adresse geschickt.

![](/docs/en/self-host/rustdesk-server-pro/license/images/stripe.jpg)

## Lizenz eingeben

Sie müssen die Lizenz in der Webkonsole (`http://<rustdesk-server-pro-ip>:21114`) eingeben oder später ändern.

| Lizenz eingeben | Lizenz ändern |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/set.png) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/change.png) |

## Lizenz verlängern bzw. aktualisieren

Verlängerung bzw. Aktualisierung der Lizenz erfolgt über das [Self-Service-Lizenzportal](https://rustdesk.com/self-host/account/) wie unten beschrieben, melden Sie sich mit der E-Mail-Adresse an, die Sie zum Kauf der Lizenz verwendet haben, wie im obigen Bild gezeigt.

| Lizenzseite mit Verlängerungs-/Aktualisierungsaktionen | Aktualisierungsfenster |
| --- | --- |
| ![](/docs/en/self-host/rustdesk-server-pro/license/images/renew.jpg?v2) | ![](/docs/en/self-host/rustdesk-server-pro/license/images/upgrade.png) |

Nach der Zahlung aktualisieren Sie bitte die Lizenz [wie unten beschrieben](/docs/de/self-host/rustdesk-server-pro/license/#lizenz-aktualisieren), um sie zu aktivieren.

### Lizenz aktualisieren
Nach der Zahlung müssen Sie die Webkonsole aufrufen, um sie manuell zu aktivieren. Klicken Sie einfach auf `Edit` und dann auf `OK`. Sie brauchen nichts zu bearbeiten, denn Ihr Lizenzschlüssel bleibt derselbe.

![](/docs/en/self-host/rustdesk-server-pro/license/images/updatelic.jpg)

## Rechnungen, Lizenzabruf und Migration

Die Lizenz kann nur auf einem Rechner verwendet werden (nur für hbbs, hbbr benötigt keine Lizenz). Wenn Sie auf einen anderen Rechner migrieren, Ihre Lizenz abrufen oder Rechnungen herunterladen möchten, gehen Sie bitte auf [https://rustdesk.com/self-host/account/](https://rustdesk.com/self-host/account/). Melden Sie sich mit der auf der Bezahlseite von Stripe verwendeten E-Mail-Adresse an und heben Sie die Bindung des alten Rechners, von dem Sie migrieren möchten, wie unten zu sehen, auf. Wenn Sie die Lizenz in der Webkonsole des neuen Servers einrichten, wird die Lizenz zugewiesen und automatisch in der Konsole registriert.

![](/docs/en/self-host/rustdesk-server-pro/license/images/unbind.jpg)

## Proxy
Wenn Ihr Server nicht direkt auf das Internet zugreifen kann, um die Lizenz zu überprüfen, können Sie einen Proxy hinzufügen, z.B. `proxy=http://username:password@example.com:8080 ./hbbs`.

Alternativ können Sie `proxy=http://username:password@example.com:8080` zur `.env`-Datei im Arbeitsverzeichnis hinzufügen (wo sich die Dateien `id_ed25519` / `db.sqlite3` befinden).

`http` kann durch `https` oder `socks5` ersetzt werden. Wenn es keinen `username` / `password` / `port` gibt, kann es `proxy=http://example.com` sein.

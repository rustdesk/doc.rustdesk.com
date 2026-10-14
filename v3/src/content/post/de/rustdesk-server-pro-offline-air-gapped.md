---
publishDate: 2026-06-28T16:50:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: rustdesk-server-pro-offline-air-gapped
draft: false
title: 'Kann RustDesk Server Pro offline oder air-gapped betrieben werden?'
excerpt: 'Nein – RustDesk Server Pro braucht fortlaufend ausgehenden Zugriff auf rustdesk.com zur Lizenzprüfung; ein vollständiger Air Gap wird nicht unterstützt.'
image: ~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.webp
category: 'Bereitstellung'
tags: ['RustDesk', 'Bereitstellung', 'Selbst-Hosting']
author: 'RustDesk Team'
slug: 'kann-rustdesk-server-pro-offline-oder-air-gapped-betrieben-werden'
faq:
  - question: 'Kann RustDesk Server Pro offline oder air-gapped betrieben werden?'
    answer: 'Nein. RustDesk Server Pro prüft seine Lizenz etwa einmal täglich über ausgehendes HTTPS (Port 443) bei rustdesk.com und versucht es nach einer fehlgeschlagenen Prüfung rund 7 Tage lang erneut; eine dauerhaft air-gapped Pro-Bereitstellung liegt daher außerhalb des Standard-Lizenzmodells. Ein Proxy wird unterstützt. RustDesk Server OSS, der kostenlose Community-Server, hat keine Lizenzprüfung.'
  - question: 'Benötigt RustDesk Server Pro eine permanente Internetverbindung?'
    answer: 'RustDesk Server Pro benötigt fortlaufenden ausgehenden Zugriff auf rustdesk.com zur Lizenzvalidierung, aber keine buchstäblich ununterbrochene Verbindung. Der Server meldet sich etwa einmal täglich über Port 443 und versucht es nach einer fehlgeschlagenen Prüfung so lange erneut, bis sie gelingt oder rund sieben Tage vergangen sind – ein kurzer Ausfall wird also toleriert, aber ein Server, der länger als diese Karenzzeit von rustdesk.com getrennt ist, validiert nicht mehr. Die Remote-Sitzungen selbst vermitteln Ihre eigenen selbst gehosteten Relay- und ID-Server (Rendezvous).'
  - question: 'Welchen ausgehenden Zugriff benötigt eine isolierte Bereitstellung von RustDesk Server Pro?'
    answer: 'Erlauben Sie ausgehendes HTTPS vom Server zu rustdesk.com für die Lizenzvalidierung, dazu den Build-Dienst für individuelle Clients, falls Sie gebrandete Clients erzeugen. Ein Proxy wird unterstützt, sodass der Rest des Netzwerks abgeschottet bleiben kann. Weitere ausgehende Abläufe, die Sie einplanen sollten, sind Client-Updates und jeder angebundene externe Identitätsanbieter.'
  - question: 'Gibt es eine vollständig air-gapped Lizenzoption für RustDesk?'
    answer: 'Nein. Die Standardlizenz von RustDesk Server Pro erfordert eine regelmäßige Online-Verifizierung. RustDesk Server OSS, der kostenlose Community-Server, hat keine Lizenzprüfung: Seine ID-/Rendezvous- und Relay-Dienste laufen innerhalb eines isolierten Netzes, allerdings ohne die Web-Konsole und die Verwaltungsfunktionen von Pro. Wenn Sie für Pro einen echten Air Gap benötigen, schildern Sie Ihr Szenario an sales@rustdesk.com.'
metadata:
  description: 'Kann RustDesk Server Pro air-gapped laufen? Nein – die Lizenz braucht laufend ausgehenden Zugriff auf rustdesk.com; ein voller Air Gap wird nicht unterstützt.'
  keywords: 'rustdesk server pro offline, rustdesk air-gapped, rustdesk selbst gehostet internetzugang, rustdesk server pro lizenzprüfung, rustdesk offline installation, braucht rustdesk internet'
---

Nein – eine selbst gehostete Bereitstellung von RustDesk Server Pro ist nicht dafür ausgelegt, vollständig offline oder air-gapped zu laufen. Die Pro-Lizenz muss rustdesk.com über eine ausgehende Verbindung erreichen, um gültig zu bleiben – sowohl bei der Aktivierung als auch fortlaufend im Betrieb –, daher liegt ein vollständig isoliertes Netzwerk außerhalb des unterstützten Modells.

## Die kurze Antwort

Die [offizielle FAQ zur Lizenzprüfung](https://github.com/rustdesk/rustdesk/wiki/FAQ#how-often-does-pro-check-license) beschreibt eine regelmäßige Verifizierung: Der Server kontaktiert rustdesk.com etwa einmal täglich über Port 443, und schlägt eine Prüfung fehl, versucht er es so lange erneut, bis sie gelingt oder rund sieben Tage vergangen sind – danach validiert die Lizenz nicht mehr. Dank dieser eingebauten Karenzzeit legt ein kurzer Internetausfall Ihre Bereitstellung nicht sofort lahm, ein dauerhaft offline betriebener Server dagegen schon. Ihre ID- und Relay-Dienste bleiben selbst gehostet; direkte Sitzungen laufen zwischen den Endpunkten, weitergeleitete Sitzungen nutzen Ihr Relay. Ein Proxy wird unterstützt, sodass Sie den benötigten ausgehenden HTTPS-Pfad freigeben und den Rest des Netzwerks sperren können.

## Im Detail

Diese Anforderung gilt für **Server Pro**. **RustDesk Server OSS (der kostenlose Community-Server)** hat keine Lizenzprüfung. Der Client von RustDesk und Server OSS stehen unter der AGPL; Server Pro ist kommerzielle, proprietäre Serversoftware, die Sie selbst hosten. In einem isolierten Netz brauchen Clients und lokale ID-/Relay-Dienste weiterhin funktionierende Routen, korrekte Schlüssel und Plattformberechtigungen. Direkte, über die ID ausgehandelte Sitzungen laufen zwischen den Endpunkten; weitergeleitete Sitzungen nutzen Ihren Server. ID-basierte Sitzungen sind Ende-zu-Ende-verschlüsselt, wenn die Clients den öffentlichen Schlüssel Ihres Servers kennen, während [Direct IP Access unverschlüsselt ist](https://github.com/rustdesk/rustdesk/wiki/FAQ) – es ist also kein Ersatz für eine korrekt konfigurierte ID-Verbindung.

Ein weiterer Ablauf ist zu berücksichtigen: das **Erstellen eines individuellen Clients**. Wenn Sie über Server Pro einen gebrandeten oder vorkonfigurierten Client erzeugen, läuft dieser Build auf dem Build-Dienst von RustDesk und benötigt daher ebenfalls ausgehenden Zugriff. Die übermittelte Konfiguration wird nach Abschluss des Builds gelöscht und das Installationsprogramm nach etwa einem Tag automatisch entfernt; laden Sie es also herunter und bewahren Sie es in Ihrem eigenen Repository auf.

Für ein strikt air-gapped Netzwerk ist genau das der entscheidende Punkt: Ein Server, der rustdesk.com _niemals_ erreichen kann, liegt außerhalb des Standardmodells. Wenn Sie harte Air-Gap-Anforderungen haben, klären Sie Ihr genaues Szenario daher vorab mit RustDesk. Für den weitaus häufigeren Fall „größtenteils isoliert, mit strikt begrenztem Egress“ planen Sie einen ausgehenden HTTPS-Pfad zu rustdesk.com ein – direkt oder über einen Proxy – und legen die genauen Domains, Ports und den Freigabeprozess fest, bevor Sie die Firewall-Richtlinie schreiben. Siehe die [RustDesk-Dokumentation](https://rustdesk.com/docs/de/); dieselbe Lizenzanforderung ist auch der Grund, warum Sie [Server Pro selbst bei einer Installation ohne Docker nicht ganz ohne Internetzugang betreiben können](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/installscript/).

## Jede ausgehende Abhängigkeit erfassen

Sicherheitsteams und [MSPs](/de/blog/rustdesk-fur-msps-ein-einziges-selbst-gehostetes-white-label-tool), die abgeschottete Umgebungen betreuen, stellen diese Frage meist, bevor RustDesk installiert ist. Ihre Egress-Liste für Server Pro ist kurz: Lizenzvalidierung bei rustdesk.com über HTTPS, der Build-Dienst für individuelle Clients, falls Sie gebrandete Clients erzeugen, Client-Updates, SMTP, falls Ihr Mailserver außerhalb des Netzes steht, und jeder angebundene externe Identitätsanbieter. ID-/Rendezvous-Server, Relay und Konsole laufen innerhalb Ihres Netzes; eine präzise Firewall-Regel ersetzt also das unnötig weite Öffnen des Netzwerks.

## Verwandte Fragen

- Ausgehende Domains und Ports: siehe die [RustDesk-Dokumentation](https://rustdesk.com/docs/de/).
- [Kann ich RustDesk Server Pro ohne Docker auf einer einfachen VM installieren?](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/installscript/)
- Einen individuell gebrandeten Client erstellen: siehe die [RustDesk-Dokumentation](https://rustdesk.com/docs/de/).

Planen Sie eine abgeschottete oder nahezu air-gapped Einführung? Öffnen Sie den Lizenzpfad und die ausgehenden Abläufe, die Sie tatsächlich nutzen, halten Sie alles andere intern, und schreiben Sie an [sales@rustdesk.com](mailto:sales@rustdesk.com), wenn Sie einen dauerhaften Air Gap benötigen.

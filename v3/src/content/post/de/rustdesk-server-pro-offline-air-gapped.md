---
publishDate: 2026-06-28T16:50:00Z
lang: 'de'
translationKey: rustdesk-server-pro-offline-air-gapped
draft: false
title: 'Kann RustDesk Server Pro offline oder air-gapped betrieben werden?'
excerpt: 'Nein – selbst gehostetes RustDesk Server Pro benötigt fortlaufenden ausgehenden Zugriff auf rustdesk.com, um seine Lizenz zu validieren, weshalb ein vollständig air-gapped Deployment nicht unterstützt wird.'
image: ~/assets/images/blog/rustdesk-server-pro-offline-air-gapped-og.webp
category: 'Bereitstellung'
tags: ['RustDesk', 'Bereitstellung', 'Selbst-Hosting']
author: 'RustDesk Team'
slug: 'kann-rustdesk-server-pro-offline-oder-air-gapped-betrieben-werden'
faq:
  - question: 'Kann RustDesk Server Pro offline oder air-gapped betrieben werden?'
    answer: 'Nein. Der lizenzierte Server Pro muss während des Betriebs eine ausgehende Verbindung zu rustdesk.com aufrechterhalten, um die Lizenz zu validieren. Eine vollständig air-gapped Bereitstellung, die niemals „nach Hause telefoniert“, wird daher nicht unterstützt. Sie können den ausgehenden Datenverkehr aber eng einschränken und über einen Proxy leiten.'
  - question: 'Benötigt RustDesk Server Pro eine permanente Internetverbindung?'
    answer: 'Er benötigt fortlaufenden ausgehenden Zugriff auf rustdesk.com zur Lizenzvalidierung, jedoch keine im wörtlichen Sinne ununterbrochene Verbindung. Der Server meldet sich über Port 443 etwa einmal täglich, und schlägt eine Prüfung fehl, wird es so lange erneut versucht, bis sie erfolgreich ist oder rund sieben Tage vergangen sind – ein kurzer Ausfall wird also toleriert, aber ein Server, der länger als dieses Kulanzfenster von rustdesk.com getrennt ist, validiert nicht mehr. Die eigentlichen Remote-Sitzungen werden über Ihre eigenen selbst gehosteten Relay- und ID-Server (Rendezvous-Server) vermittelt.'
  - question: 'Welchen ausgehenden Zugriff benötigt eine isolierte RustDesk-Server-Pro-Bereitstellung?'
    answer: 'Erlauben Sie ausgehendes HTTPS vom Server zu rustdesk.com für die Lizenzvalidierung (sowie für die Client-Bereitstellung, falls Sie individuelle Clients nutzen). Ein Proxy wird unterstützt, sodass der Rest des Netzwerks abgeschottet bleiben kann. Die genauen Domains und Ports finden Sie in der RustDesk-Dokumentation.'
  - question: 'Gibt es eine vollständig air-gapped Lizenzoption für RustDesk?'
    answer: 'Das lizenzierte Standardprodukt ist nicht für einen Air-Gap-Betrieb ausgelegt, bei dem niemals „nach Hause telefoniert“ wird. Wenn Sie harte Air-Gap-Anforderungen haben, klären Sie Ihr genaues Szenario vorab mit RustDesk.'
metadata:
  description: 'Kann selbst gehostetes RustDesk Server Pro air-gapped betrieben werden? Nein – die Pro-Lizenz benötigt fortlaufenden ausgehenden Zugriff auf rustdesk.com, weshalb ein vollständiger Air-Gap-Betrieb nicht unterstützt wird.'
  keywords: 'rustdesk server pro offline, rustdesk air-gapped, rustdesk selbst gehostet internetzugang, rustdesk server pro lizenzprüfung, rustdesk offline installation, braucht rustdesk internet'
---

Nein – eine selbst gehostete RustDesk-Server-Pro-Bereitstellung ist nicht dafür ausgelegt, vollständig offline oder air-gapped zu laufen. Die Pro-Lizenz muss rustdesk.com über eine ausgehende Verbindung erreichen, um gültig zu bleiben – sowohl bei der Aktivierung als auch fortlaufend, während der Server läuft. Ein Netzwerk, das wirklich niemals „nach Hause telefoniert“, liegt damit außerhalb des unterstützten Modells.

## Die kurze Antwort

In der Praxis erfolgt die Prüfung periodisch statt permanent: Der Server kontaktiert rustdesk.com über Port 443 etwa einmal täglich, und schlägt eine Prüfung fehl, versucht er es so lange erneut, bis sie entweder erfolgreich ist oder rund sieben Tage vergangen sind – danach validiert die Lizenz nicht mehr. Dieses eingebaute Kulanzfenster bedeutet, dass ein kurzer Internetausfall Ihre Bereitstellung nicht sofort lahmlegt, ein dauerhaft offline betriebener Server hingegen schon. Ihre ID- und Relay-Dienste bleiben selbst gehostet: Direkte Sitzungen laufen zwischen den Endpunkten, weitergeleitete Sitzungen nutzen Ihr eigenes Relay. Sie können das Netzwerk dabei eng abgesichert halten – ein Proxy wird unterstützt, sodass Sie in der Praxis nur den benötigten ausgehenden HTTPS-Pfad freigeben und alles Übrige sperren.

## Im Detail

Der Open-Source-RustDesk-Server, den Sie ohne Lizenz selbst hosten können, ist eine andere Sache – die hier beschriebene Anforderung gilt speziell für den Funktionsumfang des **lizenzierten Server Pro**. Wenn es Ihnen im Kern darum geht, Sitzungsdaten auf Ihrer eigenen Infrastruktur zu behalten, erreichen Sie das bereits durch Self-Hosting an sich – die Anforderung des ausgehenden Zugriffs betrifft die Lizenzierung, nicht die Vermittlung jeder einzelnen Sitzung.

Es gibt noch einen zweiten Workflow zu berücksichtigen: das **Erstellen eines individuellen Clients**. Wenn Sie über Server Pro einen gebrandeten oder vorkonfigurierten Client generieren, benötigt auch dieser Bereitstellungsschritt ausgehenden Zugriff. Prüfen Sie das aktuelle Verhalten für Ihre Version und Ihren Plan.

Für ein strikt air-gapped Netzwerk ist genau das der entscheidende Punkt. Ein wirklich isolierter Server, der rustdesk.com _niemals_ erreichen kann, liegt außerhalb des Standardmodells. Wenn Sie also harte Air-Gap-Anforderungen haben, klären Sie Ihr genaues Szenario vorab mit RustDesk. Für den weitaus häufigeren Fall „größtenteils isoliert, mit strikt begrenztem Egress“ lautet die praktische Empfehlung: Planen Sie einen ausgehenden HTTPS-Pfad zu rustdesk.com ein – direkt oder über einen Proxy – und definieren Sie die genauen Domains, Ports und den Freigabeprozess, bevor Sie die Firewall-Richtlinie schreiben. Siehe die [RustDesk-Dokumentation](https://rustdesk.com/docs); zu beachten ist, dass dieselbe Lizenzanforderung auch der Grund dafür ist, dass Sie [Server Pro selbst bei einer Installation ohne Docker nicht komplett ohne Internetzugang betreiben können](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/installscript/).

## Wer stellt diese Frage

Betreiber isolierter oder regulierter Netzwerke stellen sich diese Frage schon, bevor RustDesk überhaupt installiert ist – das gilt gleichermaßen für Sicherheitsteams wie für [MSPs](/de/blog/rustdesk-fur-msps-ein-einziges-selbst-gehostetes-white-label-tool), die abgeschottete Umgebungen betreuen. Ihre Netzwerke sitzen mitunter hinter strengen Egress-Firewalls, oder sie möchten externe Abhängigkeiten schlicht minimieren. Zu wissen, dass die Lizenz einen fortlaufenden ausgehenden Pfad benötigt – aber eben auch nicht mehr als das –, ermöglicht es ihnen, eine präzise Firewall-Regel zu formulieren, statt entweder das Netzwerk unnötig weit zu öffnen oder fälschlich anzunehmen, das Produkt liefe in einem völligen Vakuum.

## Verwandte Fragen

- Ausgehende Domains und Ports: siehe die [RustDesk-Dokumentation](https://rustdesk.com/docs).
- [Kann ich RustDesk Server Pro ohne Docker auf einer einfachen VM installieren?](https://rustdesk.com/docs/de/self-host/rustdesk-server-pro/installscript/)
- Einen individuell gebrandeten Client erstellen: siehe die [RustDesk-Dokumentation](https://rustdesk.com/docs).

Planen Sie eine abgeschottete oder nahezu air-gapped Einführung? Klären Sie die aktuellen Details zu Konnektivität und Lizenzierung auf rustdesk.com, bevor Sie Ihre Firewall-Richtlinie final festlegen.

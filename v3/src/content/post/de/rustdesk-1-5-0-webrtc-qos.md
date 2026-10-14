---
publishDate: 2026-10-14T00:00:00Z
lang: de
translationKey: rustdesk-1-5-0-webrtc-qos
title: 'RustDesk 1.5.0: WebRTC-Direktverbindungen und QoS-Verbesserungen'
excerpt: 'RustDesk 1.5.0 ergänzt WebRTC-Verbindungswege, Direktzugriff im Web-Client und QoS-Anpassungen für Verzögerung, Überlastung und Bildratenziele.'
image: ~/assets/images/blog/web-client.jpg
category: Veröffentlichung
slug: rustdesk-1-5-0-webrtc-qos-de
tags:
  - WebRTC
  - QoS
  - Web-Client
  - Veröffentlichung
---

Kürzlich haben wir eine Erfahrung aus der Praxis geteilt: Nach dem Upgrade auf 1.5.0 fühlte sich der Zugriff auf einen Mac zu Hause von einem anderen Kontinent aus flüssiger an als zuvor. Der [ursprüngliche Beitrag](https://x.com/rustdesk/status/2110243829978898520) beschreibt diese Erfahrung. Hier erläutern wir die konkreten Änderungen an den Verbindungen und der Anpassung der Bildschirmübertragung in 1.5.0.

[PR #15684](https://github.com/rustdesk/rustdesk/pull/15684) hat Unterstützung für WebRTC Data Channel eingeführt. ICE-Verbindungsversuche laufen dabei parallel und konkurrieren mit den bestehenden Wegen über TCP- und UDP-Hole-Punching sowie direkte IPv6-Verbindungen. Wenn ein Relay bereitsteht, aber ein direkter Verbindungsversuch noch aussteht, hält RustDesk ein kurzes Zeitfenster offen, in dem eine Direktverbindung bevorzugt wird. Nach Ablauf dieses Fensters oder wenn die direkten Versuche scheitern, kann RustDesk das Relay verwenden. Dadurch ergeben sich zusätzliche Möglichkeiten für Direktverbindungen bei einigen Verbindungen, die zuvor ein Relay benötigten.

**Auch der Web-Client kann jetzt Direktverbindungen herstellen.** Bisher mussten RustDesk-Sitzungen im Browser über einen Relay-Server laufen. Wenn die Netzwerkbedingungen es zulassen und ICE einen direkten Pfad auswählt, können Sitzungsdaten jetzt direkt zwischen dem Browser und dem entfernten Gerät übertragen werden. Dadurch lassen sich möglicherweise die Latenz und Bandbreitenbeschränkungen eines Relays vermeiden. Eine über TURN weitergeleitete WebRTC-Verbindung bleibt eine Relay-Verbindung. Die Integration überträgt das RustDesk-Protokoll über Data Channel; die Videokodierung und -dekodierung übernimmt weiterhin RustDesk.

Die QoS-Änderungen stammen aus [PR #16082](https://github.com/rustdesk/rustdesk/pull/16082). Er behebt ein Problem der bisherigen Regelung: Nach einer einzelnen langsamen Antwort oder einem kurzen Stillstand senkte sie die Bildrate stark ab, die sich anschließend nur langsam erholte. Zu den Änderungen in 1.5.0 gehören:

- **Verbesserter Verzögerungsbasiswert.** Für jede Verbindung wird ab der ersten Antwort ihr eigener niedriger Verzögerungsbasiswert verwendet. Er passt sich schrittweise an stabile Änderungen des Basiswerts an, um Fehleinschätzungen bei Verbindungen mit hoher Latenz zu reduzieren.
- **Bestätigung gewöhnlicher Verzögerungsschwankungen.** Reguläre Senkungen der Bildrate erfordern drei aufeinanderfolgende schlechte Antworten. Eine stark erhöhte zusätzliche Verzögerung und Zeitüberschreitungen bei Prüfanfragen können weiterhin schnellere Senkungen auslösen.
- **Zuerst die Bitrate, wenn die Bedingungen es erlauben.** Bei der regulären Anpassung an Überlastung wird zuerst die Bitrate gesenkt, wenn die adaptive Bitratenanpassung aktiviert ist und die Bitrate noch sinken kann. Die Regelung verlässt sich damit nicht ausschließlich auf weniger Bilder bei einem Encoder, der seine Zielbitrate beibehält.
- **Schnellerer Anstieg beim Start und schnellere Wiederherstellung des Bildratenziels.** Zwei aufeinanderfolgende Antworten mit geringer zusätzlicher Verzögerung auf einer ungestörten Verbindung können den Anstieg des Zielwerts beim Start beschleunigen. Nach einer Überlastung können zwei gute Antworten das vorherige Bildratenziel wiederherstellen. Tritt kurz nach der Wiederherstellung erneut eine Überlastung auf, nimmt die Regelung die Wiederherstellung zurück.

Diese Regeln verwenden Verzögerungsrückmeldungen, die denselben Übertragungsweg wie die Bildschirmdaten nutzen. Diese Rückmeldungen umfassen den Rückstau in der Transportschicht, die Hin- und Rücklaufzeit im Netzwerk sowie die zeitliche Einplanung der Client-Antworten. Sie zeigen Laständerungen an, statt die Verzögerung durch Warteschlangen isoliert zu messen. [QoS-Implementierung in 1.5.0](https://github.com/rustdesk/rustdesk/blob/1.5.0/src/server/video_qos.rs).

Für die Änderung zur Beschleunigung beim Start verglich der PR-Autor diese Änderung in einem Bürotest über eine lokale Verbindung mit ihrem Vorgänger-Commit: Die Zeit vom Start bis zum Erreichen des **Zielwerts von 60 FPS** sank von **7.99 Sekunden auf 2.98 Sekunden**. Gemessen wird damit die Wirkung dieser Änderung auf den Anstieg des Bildratenziels beim Start in diesem Test. [Testbericht](https://github.com/rustdesk/rustdesk/pull/16082#issuecomment-5597385117).

Aktualisieren Sie auf [RustDesk 1.5.0](https://github.com/rustdesk/rustdesk/releases/tag/1.5.0) oder testen Sie den neuen Verbindungsweg im [Web-Client](https://rustdesk.com/web). WebRTC muss von beiden Verbindungsteilnehmern und vom Server unterstützt werden. Für selbst gehostete Server ist es standardmäßig deaktiviert; aktivieren Sie es ausdrücklich mit `enable-webrtc=Y`. Für Server Pro nennt die Dokumentation Unterstützung ab Version 1.8.7. Hinweise zur Konfiguration finden Sie in der [Einstellungsanleitung](https://rustdesk.com/docs/de/self-host/client-configuration/advanced-settings/#enable-webrtc).

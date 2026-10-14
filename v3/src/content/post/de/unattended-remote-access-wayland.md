---
publishDate: 2026-08-14T10:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'de'
translationKey: 'unattended-remote-access-wayland'
draft: false
title: 'RustDesk-Wayland-Preview: unbeaufsichtigter Zugriff und Anmeldebildschirm'
excerpt: 'Eine RustDesk-Preview für Debian/Ubuntu-basierte Systeme (x86_64) bringt unbeaufsichtigten Wayland-Zugriff, auch mit mehreren Monitoren und am Anmeldebildschirm nach einem Neustart.'
image: '~/assets/images/blog/unattended-remote-access-wayland-og.webp'
category: 'Veröffentlichung'
tags: ['RustDesk', 'Wayland', 'Linux', 'unbeaufsichtigter Zugriff']
author: 'RustDesk Team'
slug: 'unattended-remote-access-wayland-de'

metadata:
  description: 'Wayland-Preview von RustDesk für Debian/Ubuntu (x86_64) testen: unbeaufsichtigter Zugriff mit mehreren Monitoren und am Anmeldebildschirm nach Neustart.'
  keywords: 'RustDesk Wayland, Wayland unbeaufsichtigter Zugriff, Wayland Remote-Desktop, Linux Remote-Desktop Wayland, RustDesk Linux, unbeaufsichtigter Fernzugriff'
---

Die Wayland-Unterstützung gehörte bisher zu den schwierigeren Aspekten von Remote-Desktop unter Linux.

Die Standard-Builds von RustDesk erfassen Wayland-Desktops bereits in einer angemeldeten Sitzung über PipeWire und `xdg-desktop-portal`, seit Version 1.4.3 auch mit mehreren Monitoren. Die neue **RustDesk-Wayland-Preview für Debian/Ubuntu-basierte Systeme (x86_64)** ergänzt **echten unbeaufsichtigten Zugriff unter Wayland**: Nach der Ersteinrichtung muss niemand am entfernten Rechner jede Sitzung bestätigen. **Auch Multi-Monitor-Setups funktionieren in unbeaufsichtigten Sitzungen.**

Sie können sich sogar verbinden, wenn niemand angemeldet ist – einschließlich am **Anmeldebildschirm** nach einem Neustart.

<div class="twitter-embed" style="display:flex;justify-content:center;">
<blockquote class="twitter-video" data-media-max-width="560"><a href="https://twitter.com/rustdesk/status/2087945266855026744">Demo-Video auf X ansehen</a></blockquote>
</div>
<script data-astro-rerun>
(function () {
  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load();
  } else if (!document.getElementById('twitter-wjs')) {
    var s = document.createElement('script');
    s.id = 'twitter-wjs';
    s.async = true;
    s.src = 'https://platform.twitter.com/widgets.js';
    document.head.appendChild(s);
  }
})();
</script>

Vorerst veröffentlichen wir dies als separaten Preview-Build für **Debian/Ubuntu-basierte Systeme (x86_64)**:

**[Wayland-Build für unbeaufsichtigten Zugriff herunterladen](https://github.com/rustdesk/rustdesk/releases/download/nightly/rustdesk-unattended-wayland-1.4.9-x86_64.deb)**

Zum Vergleich: [AnyDesk dokumentiert Xorg als Voraussetzung für eingehende Linux-Verbindungen](https://support.anydesk.com/anydesk-for-linux-raspberry-pi), während [TeamViewer seine Wayland-Unterstützung als experimentell beschreibt](https://community.teamviewer.com/English/discussion/122410).

Bevor wir dies zum Standard machen, möchten wir mehr Tests unter realen Bedingungen sammeln.

Sobald die Implementierung stabil ist, planen wir, den unbeaufsichtigten Wayland-Zugriff auf weitere Linux-Distributionen auszuweiten, darunter **Fedora und Arch Linux**, und ihn schließlich in die regulären RustDesk-Releases aufzunehmen.

Wenn Sie Wayland nutzen, insbesondere mit mehreren Monitoren, probieren Sie bitte den Preview-Build aus und teilen Sie uns mit, was funktioniert und was nicht. Sinnvolle Tests: nach einem Neustart verbinden, bevor sich jemand anmeldet, nach dem Abmelden erneut verbinden und jeden Monitor einzeln auswählen. Nennen Sie in Ihrem Feedback Distribution, Desktop-Umgebung, Display-Manager und Build-Version, und behalten Sie Ihren bisherigen Zugriffsweg bei, bis diese Tests bestanden sind.

## Weiterführende Artikel

- [RustDesk für Linux](/de/blog/rustdesk-fur-linux-der-open-source-remote-desktop)
- [Unbeaufsichtigter Zugriff mit RustDesk](/de/blog/unbeaufsichtigter-zugriff-mit-rustdesk-einrichtungsanleitung)
- [RustDesk vs. AnyDesk](/de/blog/rustdesk-vs-anydesk-selbst-gehostete-open-source-remotedesktop-software)
- [RustDesk vs. TeamViewer](/de/blog/rustdesk-vs-teamviewer-die-selbst-gehostete-alternative)
- [Implementierung der Wayland-Bildschirmaufnahme (DRM/KMS)](https://github.com/rustdesk/rustdesk/pull/15420)

---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-08-14T10:00:00Z
lang: 'it'
translationKey: 'unattended-remote-access-wayland'
draft: false
title: 'Anteprima Wayland di RustDesk: accesso non presidiato e alla schermata di login'
excerpt: 'Un''anteprima di RustDesk per sistemi x86_64 basati su Debian/Ubuntu aggiunge l''accesso non presidiato su Wayland, anche con più monitor e alla schermata di login dopo un riavvio.'
image: '~/assets/images/blog/unattended-remote-access-wayland-og.webp'
category: 'Rilascio'
tags: ['RustDesk', 'Wayland', 'Linux', 'accesso non presidiato']
author: 'RustDesk Team'
slug: 'unattended-remote-access-wayland-it'

metadata:
  description: 'Prova l''anteprima Wayland di RustDesk per sistemi x86_64 Debian/Ubuntu: accesso non presidiato su più monitor e alla schermata di login dopo un riavvio.'
  keywords: 'RustDesk Wayland, accesso non presidiato Wayland, desktop remoto Wayland, desktop remoto Linux Wayland, RustDesk Linux, accesso remoto non presidiato'
---

Il supporto a Wayland è sempre stato uno degli aspetti più difficili del desktop remoto su Linux.

Le build standard di RustDesk catturano già i desktop Wayland, anche con più monitor dalla versione 1.4.3, tramite PipeWire e `xdg-desktop-portal` in una sessione con utente connesso. La nuova **anteprima Wayland di RustDesk per sistemi x86_64 basati su Debian/Ubuntu** aggiunge un **vero accesso non presidiato su Wayland**: dopo la configurazione iniziale, nessuno sulla macchina remota deve approvare ogni sessione. **Anche le configurazioni multi-monitor funzionano nelle sessioni non presidiate.**

Puoi connetterti anche quando nessuno ha effettuato l'accesso, perfino dalla **schermata di login** dopo un riavvio.

<div class="twitter-embed" style="display:flex;justify-content:center;">
<blockquote class="twitter-video" data-media-max-width="560"><a href="https://twitter.com/rustdesk/status/2087945266855026744">Guarda il video dimostrativo su X</a></blockquote>
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

Per ora la rilasciamo come build di anteprima separata per i **sistemi x86_64 basati su Debian/Ubuntu**:

**[Scarica la build Wayland con accesso non presidiato](https://github.com/rustdesk/rustdesk/releases/download/nightly/rustdesk-unattended-wayland-1.4.9-x86_64.deb)**

Per confronto, [AnyDesk indica che Xorg è necessario per le connessioni in entrata su Linux](https://support.anydesk.com/anydesk-for-linux-raspberry-pi), mentre [TeamViewer definisce sperimentale il proprio supporto a Wayland](https://community.teamviewer.com/English/discussion/122410).

Vorremmo raccogliere più test in condizioni reali prima di renderla il comportamento predefinito.

Quando l'implementazione sarà stabile, prevediamo di portare l'accesso non presidiato su Wayland in altre distribuzioni Linux, tra cui **Fedora e Arch Linux**, e infine di includerlo nelle release standard di RustDesk.

Se usi Wayland, soprattutto con più monitor, prova la build di anteprima e facci sapere cosa funziona e cosa no. Verifiche utili: connettiti dopo un riavvio prima che qualcuno effettui l'accesso, riconnettiti dopo un logout e seleziona ciascun monitor. Nel feedback indica distribuzione, ambiente desktop, display manager e versione della build, e mantieni il tuo attuale metodo di accesso finché queste verifiche non vanno a buon fine.

## Approfondimenti correlati

- [RustDesk per Linux](/it/blog/rustdesk-per-linux-il-desktop-remoto-open-source)
- [Accesso non presidiato con RustDesk](/it/blog/accesso-non-presidiato-con-rustdesk-guida-alla-configurazione)
- [RustDesk vs AnyDesk](/it/blog/rustdesk-vs-anydesk-desktop-remoto-self-hosted-e-open-source)
- [RustDesk vs TeamViewer](/it/blog/rustdesk-vs-teamviewer-lalternativa-self-hosted)
- [Implementazione della cattura Wayland (DRM/KMS)](https://github.com/rustdesk/rustdesk/pull/15420)

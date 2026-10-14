---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-08-14T10:00:00Z
lang: 'es'
translationKey: 'unattended-remote-access-wayland'
draft: false
title: 'Versión preliminar de RustDesk para Wayland: acceso desatendido y a la pantalla de inicio de sesión'
excerpt: 'Una versión preliminar de RustDesk para sistemas x86_64 basados en Debian/Ubuntu añade acceso desatendido en Wayland, con varios monitores y la pantalla de inicio de sesión tras reiniciar.'
image: '~/assets/images/blog/unattended-remote-access-wayland-og.webp'
category: 'Lanzamiento'
tags: ['RustDesk', 'Wayland', 'Linux', 'acceso desatendido']
author: 'RustDesk Team'
slug: 'unattended-remote-access-wayland-es'

metadata:
  description: 'Prueba la versión preliminar de RustDesk para Wayland en sistemas x86_64 Debian/Ubuntu: acceso desatendido con varios monitores y en el inicio de sesión.'
  keywords: 'RustDesk Wayland, acceso desatendido Wayland, escritorio remoto Wayland, escritorio remoto Linux Wayland, RustDesk Linux, acceso remoto desatendido'
---

La compatibilidad con Wayland ha sido una de las partes más difíciles del escritorio remoto en Linux.

Las compilaciones estándar de RustDesk ya capturan escritorios Wayland, incluidos varios monitores desde la versión 1.4.3, mediante PipeWire y `xdg-desktop-portal` en una sesión iniciada. La nueva **versión preliminar de RustDesk para Wayland en sistemas x86_64 basados en Debian/Ubuntu** añade **verdadero acceso desatendido en Wayland**: tras la configuración inicial, nadie tiene que aprobar cada sesión en la máquina remota. **Las configuraciones con varios monitores también funcionan en las sesiones desatendidas.**

Puedes conectarte aunque no haya ningún usuario con la sesión iniciada, incluso desde la **pantalla de inicio de sesión** tras un reinicio.

<div class="twitter-embed" style="display:flex;justify-content:center;">
<blockquote class="twitter-video" data-media-max-width="560"><a href="https://twitter.com/rustdesk/status/2087945266855026744">Ver el vídeo de demostración en X</a></blockquote>
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

Por ahora, la publicamos como una compilación preliminar aparte para **sistemas x86_64 basados en Debian/Ubuntu**:

**[Descargar la compilación de Wayland con acceso desatendido](https://github.com/rustdesk/rustdesk/releases/download/nightly/rustdesk-unattended-wayland-1.4.9-x86_64.deb)**

A modo de comparación, [AnyDesk documenta que las conexiones entrantes en Linux requieren Xorg](https://support.anydesk.com/anydesk-for-linux-raspberry-pi), mientras que [TeamViewer describe su compatibilidad con Wayland como experimental](https://community.teamviewer.com/English/discussion/122410).

Queremos acumular más pruebas en entornos reales antes de convertirla en la opción predeterminada.

Cuando la implementación sea estable, tenemos previsto llevar el acceso desatendido en Wayland a más distribuciones de Linux, como **Fedora y Arch Linux**, e incluirlo más adelante en las versiones estándar de RustDesk.

Si usas Wayland, sobre todo con varios monitores, prueba la versión preliminar y cuéntanos qué funciona y qué no. Comprobaciones útiles: conectarte tras un reinicio antes de que nadie inicie sesión, volver a conectarte después de cerrar la sesión y seleccionar cada monitor. Indica en tus comentarios la distribución, el escritorio, el gestor de pantalla y la versión de la compilación, y conserva tu vía de acceso actual hasta que superes esas comprobaciones.

## Lecturas relacionadas

- [RustDesk para Linux](/es/blog/rustdesk-para-linux-el-escritorio-remoto-de-codigo-abierto)
- [Acceso desatendido en RustDesk](/es/blog/acceso-desatendido-en-rustdesk-guia-de-configuracion)
- [RustDesk vs AnyDesk](/es/blog/rustdesk-vs-anydesk-escritorio-remoto-autoalojado-y-de-codigo-abierto)
- [RustDesk vs TeamViewer](/es/blog/rustdesk-vs-teamviewer-la-alternativa-autoalojada)
- [Implementación de la captura en Wayland (DRM/KMS)](https://github.com/rustdesk/rustdesk/pull/15420)

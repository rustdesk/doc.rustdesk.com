---
updateDate: 2026-10-14T00:00:00Z
publishDate: 2026-08-14T10:00:00Z
lang: 'pt'
translationKey: 'unattended-remote-access-wayland'
draft: false
title: 'Prévia do RustDesk para Wayland: acesso não assistido e pela tela de login'
excerpt: 'Uma prévia do RustDesk para sistemas x86_64 baseados em Debian/Ubuntu traz acesso não assistido no Wayland, inclusive com vários monitores e na tela de login após reiniciar.'
image: '~/assets/images/blog/unattended-remote-access-wayland-og.webp'
category: 'Lançamento'
tags: ['RustDesk', 'Wayland', 'Linux', 'acesso não assistido']
author: 'RustDesk Team'
slug: 'unattended-remote-access-wayland-pt'

metadata:
  description: 'Experimente a prévia do RustDesk para Wayland em sistemas x86_64 Debian/Ubuntu: acesso não assistido com vários monitores e na tela de login após reiniciar.'
  keywords: 'RustDesk Wayland, acesso não assistido Wayland, área de trabalho remota Wayland, área de trabalho remota Linux Wayland, RustDesk Linux, acesso remoto não assistido'
---

O suporte ao Wayland tem sido uma das partes mais difíceis da área de trabalho remota no Linux.

As versões padrão do RustDesk já capturam desktops Wayland, inclusive com vários monitores desde a versão 1.4.3, por meio do PipeWire e do `xdg-desktop-portal` em uma sessão com login. A nova **prévia do RustDesk para Wayland em sistemas x86_64 baseados em Debian/Ubuntu** acrescenta **acesso não assistido de verdade no Wayland**: depois da configuração inicial, ninguém na máquina remota precisa aprovar cada sessão. **Configurações com vários monitores também funcionam nas sessões não assistidas.**

Você pode se conectar mesmo quando ninguém fez login — inclusive a partir da **tela de login** após uma reinicialização.

<div class="twitter-embed" style="display:flex;justify-content:center;">
<blockquote class="twitter-video" data-media-max-width="560"><a href="https://twitter.com/rustdesk/status/2087945266855026744">Assista ao vídeo de demonstração no X</a></blockquote>
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

Por enquanto, estamos lançando isso como uma versão de prévia separada para **sistemas x86_64 baseados em Debian/Ubuntu**:

**[Baixar a versão Wayland com acesso não assistido](https://github.com/rustdesk/rustdesk/releases/download/nightly/rustdesk-unattended-wayland-1.4.9-x86_64.deb)**

Para comparação, o [AnyDesk documenta que o Xorg é obrigatório para conexões de entrada no Linux](https://support.anydesk.com/anydesk-for-linux-raspberry-pi), enquanto o [TeamViewer descreve o próprio suporte a Wayland como experimental](https://community.teamviewer.com/English/discussion/122410).

Queremos reunir mais testes em condições reais antes de torná-la o padrão.

Quando a implementação estiver estável, planejamos levar o acesso não assistido no Wayland a mais distribuições Linux, incluindo **Fedora e Arch Linux**, e, por fim, incluí-lo nas versões padrão do RustDesk.

Se você usa Wayland, especialmente com vários monitores, experimente a versão de prévia e conte para nós o que funciona e o que não funciona. Verificações úteis: conectar após uma reinicialização, antes de alguém fazer login; reconectar após o logout; e selecionar cada monitor. Inclua no seu feedback a distribuição, o ambiente de desktop, o gerenciador de exibição e a versão do build, e mantenha o seu caminho de acesso atual até que essas verificações passem.

## Leituras relacionadas

- [RustDesk para Linux](/pt/blog/rustdesk-para-linux-o-desktop-remoto-de-codigo-aberto)
- [Acesso não assistido do RustDesk](/pt/blog/acesso-nao-assistido-do-rustdesk-guia-de-configuracao)
- [RustDesk vs AnyDesk](/pt/blog/rustdesk-vs-anydesk-area-de-trabalho-remota-auto-hospedada-e-de-codigo)
- [RustDesk vs TeamViewer](/pt/blog/rustdesk-vs-teamviewer-a-alternativa-auto-hospedada)
- [Implementação da captura no Wayland (DRM/KMS)](https://github.com/rustdesk/rustdesk/pull/15420)

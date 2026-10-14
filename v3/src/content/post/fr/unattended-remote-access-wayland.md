---
publishDate: 2026-08-14T10:00:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'fr'
translationKey: 'unattended-remote-access-wayland'
draft: false
title: "Préversion Wayland de RustDesk : accès sans surveillance et à l'écran de connexion"
excerpt: "Une préversion de RustDesk pour les systèmes x86_64 basés sur Debian/Ubuntu ajoute l'accès sans surveillance sous Wayland, multi-écrans et écran de connexion compris."
image: '~/assets/images/blog/unattended-remote-access-wayland-og.webp'
category: 'Version'
tags: ['RustDesk', 'Wayland', 'Linux', 'accès sans surveillance']
author: 'RustDesk Team'
slug: 'unattended-remote-access-wayland-fr'

metadata:
  description: "Essayez la préversion Wayland de RustDesk pour Debian/Ubuntu x86_64 : accès sans surveillance sur plusieurs écrans et à l'écran de connexion après redémarrage."
  keywords: 'RustDesk Wayland, accès sans surveillance Wayland, bureau à distance Wayland, bureau à distance Linux Wayland, RustDesk Linux, accès à distance sans surveillance'
---

La prise en charge de Wayland a toujours été l'un des aspects les plus difficiles du bureau à distance sous Linux.

Les builds standard de RustDesk capturent déjà les bureaux Wayland, y compris sur plusieurs écrans depuis la version 1.4.3, via PipeWire et `xdg-desktop-portal` dans une session ouverte. La nouvelle **préversion Wayland de RustDesk pour les systèmes x86_64 basés sur Debian/Ubuntu** ajoute un **véritable accès sans surveillance sous Wayland** : après la configuration initiale, personne n'a besoin d'approuver chaque session sur la machine distante. **Les configurations multi-écrans fonctionnent aussi dans les sessions sans surveillance.**

Vous pouvez vous connecter même lorsque personne n'a ouvert de session — y compris depuis l'**écran de connexion** après un redémarrage.

<div class="twitter-embed" style="display:flex;justify-content:center;">
<blockquote class="twitter-video" data-media-max-width="560"><a href="https://twitter.com/rustdesk/status/2087945266855026744">Voir la vidéo de démonstration sur X</a></blockquote>
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

Pour l'instant, nous publions cette fonctionnalité sous forme de préversion distincte pour les **systèmes x86_64 basés sur Debian/Ubuntu** :

**[Télécharger le build Wayland avec accès sans surveillance](https://github.com/rustdesk/rustdesk/releases/download/nightly/rustdesk-unattended-wayland-1.4.9-x86_64.deb)**

Pour comparaison, [AnyDesk indique que Xorg est requis pour les connexions Linux entrantes](https://support.anydesk.com/anydesk-for-linux-raspberry-pi), tandis que [TeamViewer décrit sa prise en charge de Wayland comme expérimentale](https://community.teamviewer.com/English/discussion/122410).

Nous souhaitons recueillir davantage de retours en conditions réelles avant d'en faire le comportement par défaut.

Une fois l'implémentation stabilisée, nous prévoyons d'étendre l'accès sans surveillance sous Wayland à d'autres distributions Linux, notamment **Fedora et Arch Linux**, puis de l'intégrer aux versions standard de RustDesk.

Si vous utilisez Wayland, en particulier avec plusieurs écrans, essayez la préversion et dites-nous ce qui fonctionne et ce qui ne fonctionne pas. Vérifications utiles : connexion après un redémarrage avant toute ouverture de session, reconnexion après une fermeture de session, et sélection de chaque écran. Indiquez dans vos retours votre distribution, votre environnement de bureau, votre gestionnaire d'affichage et la version du build, et conservez votre moyen d'accès actuel tant que ces vérifications ne sont pas concluantes.

## Pour aller plus loin

- [RustDesk pour Linux](/fr/blog/rustdesk-pour-linux-le-bureau-a-distance-open-source)
- [Accès sans surveillance RustDesk](/fr/blog/acces-non-surveille-rustdesk-guide-de-configuration)
- [RustDesk vs AnyDesk](/fr/blog/rustdesk-vs-anydesk-bureau-a-distance-open-source-et-auto-heberge)
- [RustDesk vs TeamViewer](/fr/blog/rustdesk-vs-teamviewer-lalternative-auto-hebergee)
- [Implémentation de la capture Wayland (DRM/KMS)](https://github.com/rustdesk/rustdesk/pull/15420)

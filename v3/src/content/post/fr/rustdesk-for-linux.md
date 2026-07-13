---
publishDate: 2026-07-09T08:32:00Z
lang: 'fr'
translationKey: 'rustdesk-for-linux'
draft: false
title: 'RustDesk pour Linux : le bureau à distance open source'
excerpt: 'Installez et exécutez RustDesk sur Linux : .deb, .rpm, Flatpak et AppImage, X11 face à Wayland, accès headless et sans surveillance, et auto-hébergement du serveur.'
image: '~/assets/images/blog/rustdesk-for-linux-og.webp'
category: 'Guides'
tags: ['RustDesk', 'Linux', 'Auto-hébergement']
author: 'RustDesk Team'
slug: 'rustdesk-pour-linux-le-bureau-a-distance-open-source'
faq:
  - question: 'RustDesk fonctionne-t-il sous Wayland ?'
    answer: "Oui — RustDesk offre l'un des meilleurs niveaux de prise en charge de Wayland parmi les outils de bureau à distance, avec notamment le partage multi-écrans ajouté dans la version 1.4.3. Sous Wayland, RustDesk capture l'écran via PipeWire et le portail de bureau XDG, qui affiche une boîte de dialogue de consentement pour choisir un écran — dans la plupart des cas, ce choix est mémorisé et il ne vous sera plus redemandé — et fonctionne au sein de la session graphique active. Cette étape de consentement fait partie de la conception sécuritaire de Wayland, commune à toutes les applications de partage d'écran. Pour un accès avant connexion ou totalement sans surveillance, utilisez aujourd'hui la configuration d'affichage virtuel headless (ou une session X11 lorsque votre distribution en propose encore une, car plusieurs migrent désormais exclusivement vers Wayland) ; la capture Wayland totalement sans surveillance est en cours de développement actif (voir github.com/rustdesk/rustdesk/pull/15420)."
  - question: 'Quel paquet dois-je installer sur Linux ?'
    answer: "Utilisez le .deb sur Debian, Ubuntu et Linux Mint, le .rpm sur Fedora, RHEL et openSUSE, le Flatpak depuis Flathub pour une version isolée (sandboxée) et largement compatible, ou l'AppImage portable comme solution de repli en un seul fichier. Les paquets .deb et .rpm enregistrent et démarrent un service systemd afin que RustDesk survive aux redémarrages ; le Flatpak et l'AppImage ne le font pas par défaut."
  - question: 'Pourquoi ma machine Linux headless affiche-t-elle un écran noir ?'
    answer: "Sans moniteur branché, X ou Wayland n'alloue jamais de framebuffer : il n'y a donc rien que RustDesk puisse capturer, et le visualiseur affiche un écran noir ou un message d'attente d'image. Branchez un faux connecteur HDMI/DisplayPort (dummy plug), configurez un affichage virtuel tel que xserver-xorg-video-dummy ou VKMS, ou activez le mode headless optionnel de RustDesk pour Linux afin qu'un affichage virtuel soit créé automatiquement pour vous."
  - question: 'Puis-je auto-héberger le serveur RustDesk sur Linux ?'
    answer: "Oui. Le serveur RustDesk (les processus hbbs pour l'ID/rendez-vous et hbbr pour le relais) est conçu pour Linux, et c'est la manière standard de l'exécuter. Le serveur communautaire, gratuit et open source, fonctionne indéfiniment sans frais, tandis que Server Pro ajoute une console web, des groupes d'appareils et un générateur de client personnalisé. Les deux s'installent sur une simple VM Linux ou un serveur physique (bare-metal)."
metadata:
  description: 'RustDesk sur Linux, de bout en bout : choix des paquets pour chaque distribution et carte ARM, capture Wayland et X11, configuration headless, et hébergement de votre propre serveur.'
  keywords: 'RustDesk pour Linux, RustDesk Ubuntu, RustDesk Wayland, RustDesk X11, installation RustDesk Linux'
---

Les utilisateurs de Linux n'ont jamais eu un grand choix de bons outils de bureau à distance, et ceux qui existent sont généralement soit des produits commerciaux à code source fermé, soit des piles VNC vieillissantes. RustDesk se démarque : c'est un client de bureau à distance open source sous licence AGPL, qui fonctionne nativement sur toutes les principales distributions, et que vous pouvez connecter à un serveur que vous hébergez vous-même. Cette combinaison — code auditable, client Linux natif et infrastructure auto-hébergeable — explique pourquoi RustDesk est devenu l'une des réponses de référence lorsqu'on cherche un bureau à distance open source pour Linux.

Ce guide explique comment l'installer, le point qui pose problème à presque tout le monde (X11 face à Wayland), comment faire fonctionner l'accès sans surveillance et headless, et quelle est la place du serveur dans tout cela.

## Installer RustDesk sur Linux

RustDesk propose des paquets pour tous les formats de paquetage Linux courants, donc vous avez rarement besoin de compiler depuis les sources. Récupérez la version actuelle depuis la [page des versions RustDesk sur GitHub](https://github.com/rustdesk/rustdesk/releases) ou depuis la [documentation d'installation Linux](https://rustdesk.com/docs/en/client/linux/), puis choisissez le format adapté à votre distribution.

| Format   | Idéal pour                             | Démarre automatiquement un service ? | Notes                                                                                                       |
| -------- | -------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `.deb`   | Debian, Ubuntu, Linux Mint             | Oui (systemd)                        | `sudo apt install ./rustdesk-*.deb`                                                                         |
| `.rpm`   | Fedora, RHEL/CentOS, openSUSE          | Oui (systemd)                        | `sudo dnf install ./rustdesk-*.rpm`                                                                         |
| Flatpak  | Toutes distributions, isolé (sandboxé) | Non                                  | `flatpak install flathub com.rustdesk.RustDesk` ([Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) |
| AppImage | Toutes distributions, portable         | Non                                  | Peut nécessiter `libfuse2` sur les versions récentes d'Ubuntu ; faites `chmod +x` puis exécutez             |
| AUR      | Arch, Manjaro                          | Selon le paquet                      | Maintenu par la communauté (`rustdesk-bin`, `rustdesk-appimage`)                                            |

Les paquets `.deb` et `.rpm` sont ceux à privilégier si vous voulez que RustDesk s'exécute en arrière-plan comme un service qui survit aux redémarrages — les deux enregistrent et démarrent automatiquement une unité systemd. Le Flatpak (`com.rustdesk.RustDesk` sur [Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) est une version isolée (sandboxée), pratique pour un usage bureautique, mais qui n'installe pas de service système par défaut. Pour une distribution que RustDesk ne package pas directement, privilégiez d'abord le **Flatpak** — comme il embarque son propre runtime, c'est généralement le format le plus largement compatible. L'AppImage est une alternative portable en un seul fichier, mais sa compatibilité est plus aléatoire en pratique (elle peut par exemple nécessiter `libfuse2` sur les versions récentes d'Ubuntu).

En pratique, RustDesk est utilisé sur Ubuntu, Debian, Fedora, RHEL/CentOS, openSUSE, Arch et NixOS, avec des versions compilées pour **x86_64, ARM64 (aarch64) et ARM32 (ARMv7)** — il fonctionne donc aussi bien sur des cartes et serveurs ARM que sur des PC standards.

## X11 face à Wayland : la partie qui compte vraiment

C'est l'élément le plus important à comprendre à propos de RustDesk sur Linux, car il détermine si le contrôle à distance « fonctionne tout simplement » d'entrée de jeu, ou s'il nécessite d'abord un petit réglage.

**X11 (Xorg) : la voie de capture la plus directe, là où votre distribution la propose encore.** Sous X11, RustDesk lit directement le framebuffer et injecte directement les entrées : la capture ainsi que le contrôle de la souris et du clavier sont donc aussi directs que possible, et les changements de moniteur sont détectés dynamiquement. De nombreux gestionnaires de connexion permettent encore de choisir « Xorg »/« X11 » via l'icône en forme de roue dentée affichée à l'écran de connexion. Gardez toutefois à l'esprit que plusieurs distributions migrent désormais exclusivement vers Wayland et suppriment la session X11 — considérez donc X11 comme une commodité disponible par endroits, et non comme une base sur laquelle concevoir votre déploiement.

**Wayland : RustDesk offre sans doute la meilleure prise en charge de tous les outils de bureau à distance.** RustDesk prend en charge Wayland depuis la version 1.2.0 et n'a cessé de l'étendre depuis. Comme les compositeurs Wayland n'autorisent pas l'accès direct au framebuffer, RustDesk capture l'écran via le service `xdg-desktop-portal` et [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support), et injecte les entrées via le module noyau `uinput`. Deux conséquences découlent de la conception même de Wayland — et elles s'appliquent à tout outil de partage d'écran sous Wayland, pas seulement à RustDesk :

- **Consentement à chaque connexion.** Le portail affiche une boîte de dialogue vous demandant de choisir l'écran à partager. Il s'agit d'une fonctionnalité de sécurité délibérée de Wayland, pas d'un bug de RustDesk — une application en arrière-plan ne peut pas se mettre à enregistrer votre écran en silence. Le portail v4 et les versions ultérieures prennent en charge un « jeton de restauration » (restore token) pour éviter d'être sollicité à chaque fois, mais le tout premier partage nécessite un clic à l'écran.
- **Session active uniquement.** La capture Wayland est liée à la session graphique où l'utilisateur est connecté. La capture de l'écran de connexion (greeter) Wayland n'est pas encore prise en charge — elle est en cours de développement actif ([PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)). Pour un accès avant connexion dès aujourd'hui, utilisez la configuration headless/affichage virtuel ci-dessous, ou une session X11 sur les distributions qui en proposent encore une.

La prise en charge de Wayland continue de s'améliorer — RustDesk 1.4.3 (octobre 2025) a par exemple [ajouté le partage multi-écrans pour Wayland](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/). Mais si vous vous connectez et voyez un écran noir sur une machine Wayland, c'est presque toujours parce que le chemin portail/PipeWire n'est pas satisfait. Notre article dédié [RustDesk connecté mais en attente d'image](/fr/blog/rustdesk-connected-waiting-for-image-guide-de-depannage-complet) détaille spécifiquement le cas de l'écran noir sous Wayland.

## Accès sans surveillance sur Linux

L'accès sans surveillance consiste à se connecter à une machine sans personne devant l'écran — le scénario classique du support à distance. Sous Linux, la marche à suivre est la suivante :

1. Installez via `.deb` ou `.rpm` afin que le service systemd soit enregistré, ou cliquez sur **Activer le service** dans l'application.
2. Dans RustDesk, définissez un **mot de passe permanent** robuste dans les paramètres de connexion (et activez idéalement l'authentification à deux facteurs).
3. Pour un accès avant ou entre les connexions utilisateur, utilisez la configuration d'affichage virtuel headless ci-dessous (la limite concernant l'écran de connexion Wayland évoquée plus haut s'applique ici).

Une réalité de Wayland à anticiper : le portail basé sur le consentement décrit dans la section Wayland rend la capture totalement sans surveillance plus difficile que sous X11, tant que la prise en charge en développement n'est pas disponible. Prévoyez donc la configuration d'affichage virtuel headless pour les machines qui doivent fonctionner sans aucune intervention.

## Linux headless : des serveurs sans moniteur

Un cas d'usage très courant sous Linux est celui d'une machine sans aucun écran connecté — un serveur personnel, une machine de laboratoire, une VM. Ici, le problème ne vient pas de RustDesk mais de la pile graphique : sans moniteur branché, X ou Wayland n'alloue jamais de framebuffer, il n'y a donc littéralement aucune image à capturer, d'où l'écran noir.

Trois manières de lui donner quelque chose à afficher :

- **Un faux connecteur (dummy plug)** — un petit adaptateur HDMI/DisplayPort « headless » bon marché qui fait croire au GPU qu'un moniteur est branché.
- **Un pilote d'affichage virtuel** — `xserver-xorg-video-dummy` sous X11, ou une option au niveau du noyau comme VKMS.
- **Le mode headless optionnel de RustDesk** — activez-le avec `sudo rustdesk --option allow-linux-headless Y`. D'après le [wiki Headless Linux Support](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support), ce mode est désactivé par défaut, testé principalement sur Ubuntu avec GNOME, et nécessite des paquets comme `xserver-xorg-video-dummy` et `lightdm`. Vous pouvez récupérer l'identifiant de la machine avec `sudo rustdesk --get-id` et définir un mot de passe avec `sudo rustdesk --password <password>`.

Le mode headless a encore quelques aspérités : considérez-le comme « fonctionnel, avec précaution » plutôt que comme une solution clé en main.

## Auto-héberger le serveur RustDesk sur Linux

Tout ce qui précède concerne le _client_. L'autre moitié de l'histoire de RustDesk sous Linux, c'est que le **serveur** — le service `hbbs` pour l'ID/rendez-vous et le relais `hbbr` — est une application native de Linux, qui est son environnement naturel. C'est ce qui vous permet de garder la négociation des sessions et le trafic relayé sur une infrastructure que vous possédez, plutôt que de les faire transiter par le cloud d'un fournisseur.

Vous avez deux options. Le **serveur communautaire**, gratuit et open source, fonctionne indéfiniment sans frais et couvre la fonction de base de connexion et de relais. **RustDesk Server Pro** ajoute une console web auto-hébergée, des groupes d'appareils, un carnet d'adresses partagé, un générateur de client à votre marque, ainsi que [LDAP/Active Directory et le SSO OIDC](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/ldap/). Vous n'êtes pas non plus obligé de passer par Docker — consultez [exécuter Server Pro sans Docker](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/installscript/) pour une installation sur simple VM ou serveur physique. Si vous dimensionnez le matériel pour un grand parc de machines, planifiez la capacité en fonction de votre profil réel de concurrence et de relais avant de vous engager.

Une remarque sur l'auto-hébergement : le serveur communautaire gratuit et Server Pro sont à vous de faire fonctionner, de corriger et de sécuriser. Les exigences matérielles sont faibles et, une fois la mise en place effectuée, la maintenance reste légère — et le support RustDesk peut vous aider en cas de question. Cette maîtrise est précisément tout l'intérêt de la démarche. (La licence de Server Pro nécessite également un accès sortant vers rustdesk.com pour s'activer et rester valide.)

## Pour commencer

Installez le paquet correspondant à votre distribution, définissez un mot de passe permanent pour l'accès sans surveillance et — si la souveraineté des données est ce qui vous amène ici — déployez le serveur communautaire gratuit. Pour les détails actuels des offres, [rustdesk.com/pricing](https://rustdesk.com/pricing) fait office de référence, et [sales@rustdesk.com](mailto:sales@rustdesk.com) peut vous présenter Server Pro. Vous voulez d'abord le voir en action ? [Découvrez RustDesk en action](https://www.youtube.com/@rustdesk).

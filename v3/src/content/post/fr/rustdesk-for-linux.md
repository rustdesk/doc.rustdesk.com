---
publishDate: 2026-07-09T08:32:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'fr'
translationKey: 'rustdesk-for-linux'
draft: false
title: 'RustDesk pour Linux : le bureau à distance open source'
excerpt: 'Installez et exécutez RustDesk sous Linux : .deb, .rpm, Flatpak et AppImage, X11 face à Wayland, accès headless et sans surveillance, et auto-hébergement du serveur.'
image: '~/assets/images/blog/rustdesk-for-linux-og.webp'
category: 'Guides'
tags: ['RustDesk', 'Linux', 'Auto-hébergement']
author: 'RustDesk Team'
slug: 'rustdesk-pour-linux-le-bureau-a-distance-open-source'
faq:
  - question: 'RustDesk fonctionne-t-il sous Wayland ?'
    answer: "Oui. Les builds standard de RustDesk capturent les bureaux Wayland via PipeWire et xdg-desktop-portal dans une session ouverte, y compris sur plusieurs écrans depuis la version 1.4.3. Le portail demande le consentement au partage d'écran, et les versions 4 et ultérieures du portail peuvent mémoriser ce choix. Une préversion distincte ajoute l'accès sans surveillance et l'accès à l'écran de connexion après un redémarrage ; elle cible les systèmes x86_64 basés sur Debian/Ubuntu."
  - question: 'Quel paquet dois-je installer sous Linux ?'
    answer: "Utilisez le .deb sur Debian, Ubuntu et Linux Mint, le .rpm sur Fedora, RHEL et openSUSE, le Flatpak de Flathub pour une version isolée (sandboxée) et largement compatible, ou l'AppImage portable comme solution de repli en un seul fichier. Les paquets .deb et .rpm enregistrent et démarrent un service systemd afin que RustDesk survive aux redémarrages ; le Flatpak et l'AppImage ne le font pas par défaut."
  - question: 'Pourquoi ma machine Linux headless affiche-t-elle un écran noir ?'
    answer: "Généralement parce que la machine Linux headless n'a aucun affichage actif que RustDesk puisse capturer. Sans moniteur, la pile graphique n'expose souvent aucune sortie : la session se connecte, mais affiche un écran noir ou reste en attente de l'image. Branchez un émulateur d'écran HDMI ou DisplayPort (dummy plug), ou configurez un affichage virtuel comme xserver-xorg-video-dummy sous X11, puis reconnectez-vous."
  - question: 'Puis-je auto-héberger le serveur RustDesk sous Linux ?'
    answer: "Oui. Le serveur RustDesk (les processus hbbs pour l'ID/rendez-vous et hbbr pour le relais) est conçu pour Linux, et Linux est la manière standard de l'exécuter. RustDesk Server OSS (le serveur communautaire gratuit) n'a ni frais de licence ni date d'expiration, et Server Pro y ajoute une console web, des groupes d'appareils et un générateur de client personnalisé. Les deux s'installent sur une simple VM Linux ou un serveur physique."
metadata:
  description: 'RustDesk sous Linux de A à Z : paquets pour chaque distribution et carte ARM, capture Wayland et X11, machines headless et hébergement de votre propre serveur.'
  keywords: 'RustDesk pour Linux, RustDesk Ubuntu, RustDesk Wayland, RustDesk X11, installation RustDesk Linux'
---

RustDesk est un bureau à distance open source pour Linux. Son client et RustDesk Server OSS (le serveur communautaire gratuit) sont sous licence AGPL, des paquets natifs couvrent les principales distributions, et vous pouvez pointer chaque client vers des services ID/rendez-vous et relais que vous hébergez vous-même. Server Pro est un logiciel serveur auto-hébergé, commercial et propriétaire, qui ajoute une console web et une gestion centralisée. Code auditable, client Linux natif et infrastructure auto-hébergeable : voilà pourquoi RustDesk revient souvent lorsque quelqu'un cherche un bureau à distance open source pour Linux.

Ce guide explique comment l'installer, le point qui pose problème à presque tout le monde (X11 face à Wayland), comment faire fonctionner l'accès sans surveillance et headless, et quelle place occupe le serveur.

## Installer RustDesk sous Linux

RustDesk fournit des paquets pour tous les formats de paquetage Linux courants : vous avez rarement besoin de compiler depuis les sources. Récupérez la version actuelle sur la [page des versions de RustDesk sur GitHub](https://github.com/rustdesk/rustdesk/releases) ou dans la [documentation d'installation Linux](https://rustdesk.com/docs/fr/client/linux/), puis choisissez le format adapté à votre distribution.

| Format   | Idéal pour                             | Démarre automatiquement un service ? | Notes                                                                                                       |
| -------- | -------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `.deb`   | Debian, Ubuntu, Linux Mint             | Oui (systemd)                        | `sudo apt install ./rustdesk-*.deb`                                                                         |
| `.rpm`   | Fedora, RHEL/CentOS, openSUSE          | Oui (systemd)                        | `sudo dnf install ./rustdesk-*.rpm`                                                                         |
| Flatpak  | Toutes distributions, isolé (sandboxé) | Non                                  | `flatpak install flathub com.rustdesk.RustDesk` ([Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) |
| AppImage | Toutes distributions, portable         | Non                                  | Peut nécessiter `libfuse2` sur les versions récentes d'Ubuntu ; faites `chmod +x` puis exécutez             |
| AUR      | Arch, Manjaro                          | Selon le paquet                      | Maintenu par la communauté (`rustdesk-bin`, `rustdesk-appimage`)                                            |

Les paquets `.deb` et `.rpm` sont ceux à privilégier si vous voulez que RustDesk tourne en arrière-plan comme un service qui survit aux redémarrages : les deux enregistrent et démarrent automatiquement une unité systemd. Le Flatpak (`com.rustdesk.RustDesk` sur [Flathub](https://flathub.org/apps/com.rustdesk.RustDesk)) est une version isolée (sandboxée), pratique sur un poste de travail, mais qui n'installe pas de service système par défaut. Pour une distribution que RustDesk ne package pas directement, essayez d'abord le **Flatpak** : comme il embarque son propre runtime, c'est généralement le format le plus largement compatible. L'AppImage est une alternative portable en un seul fichier, mais sa compatibilité est plus aléatoire en pratique (elle peut par exemple nécessiter `libfuse2` sur les versions récentes d'Ubuntu).

En pratique, RustDesk est utilisé sur Ubuntu, Debian, Fedora, RHEL/CentOS, openSUSE, Arch et NixOS, avec des versions compilées pour **x86_64, ARM64 (aarch64) et ARM32 (ARMv7)** : il fonctionne donc aussi bien sur des cartes et serveurs ARM que sur des PC standard.

## X11 face à Wayland : la partie qui compte vraiment

C'est le point le plus important à comprendre à propos de RustDesk sous Linux, car il détermine si le contrôle à distance « fonctionne tout seul » d'emblée ou s'il demande d'abord un petit réglage.

**X11 (Xorg) : la voie de capture la plus directe, là où votre distribution la propose encore.** Sous X11, RustDesk lit directement le framebuffer et injecte directement les entrées : la capture et le contrôle de la souris et du clavier sont aussi directs que possible, et les changements d'écran sont détectés dynamiquement. De nombreux gestionnaires de connexion permettent encore de choisir « Xorg » ou « X11 » via l'icône en forme de roue dentée de l'écran de connexion. Gardez toutefois à l'esprit que plusieurs distributions passent au tout-Wayland et retirent la session X11 : considérez donc X11 comme une commodité là où elle existe encore, et non comme une base sur laquelle concevoir votre déploiement.

**Wayland : pris en charge par les builds standard, avec une préversion pour l'accès sans surveillance.** Comme les compositeurs Wayland n'autorisent pas l'accès direct au framebuffer, les builds standard de RustDesk capturent l'écran via `xdg-desktop-portal` et [PipeWire](https://deepwiki.com/rustdesk/rustdesk/6.3.1-wayland-support) dans la session ouverte, et injectent les entrées via le module noyau `uinput`. RustDesk 1.4.3 (octobre 2025) a [ajouté le partage multi-écrans sous Wayland](https://ubuntuhandbook.org/index.php/2025/10/rustdesk-released-1-4-3-with-multi-monitor-for-wayland-virtual-mouse/). Une [préversion Wayland sans surveillance](/fr/blog/unattended-remote-access-wayland-fr) distincte ajoute l'accès sans surveillance et l'accès à l'écran de connexion après un redémarrage ; elle cible les **systèmes x86_64 basés sur Debian/Ubuntu**.

- **Consentement au début du partage.** Le portail affiche une boîte de dialogue demandant quel écran partager. C'est une fonction de sécurité de Wayland, pas un bug de RustDesk : une application en arrière-plan ne peut pas se mettre à enregistrer votre écran en silence. Les portails v4 et ultérieurs prennent en charge un « jeton de restauration » (restore token), si bien que la question n'est pas reposée à chaque connexion.
- **Accès à l'écran de connexion.** Les builds standard capturent la session ouverte. Pour l'écran de connexion après un redémarrage, utilisez la préversion sans surveillance sur les systèmes x86_64 basés sur Debian/Ubuntu, ou un écran de connexion X11 là où votre distribution en propose encore un.

Si vous vous connectez à une machine Wayland avec un build standard et voyez un écran noir, c'est généralement que le chemin portail/PipeWire n'est pas satisfait : la demande n'a pas été acceptée, ou `xdg-desktop-portal` ou PipeWire ne tourne pas. Notre guide [RustDesk connecté mais en attente d'image](/fr/blog/rustdesk-connected-waiting-for-image-guide-de-depannage-complet) détaille le cas de Wayland.

## Accès sans surveillance sous Linux

L'accès sans surveillance consiste à se connecter à une machine devant laquelle personne n'est assis — le scénario classique de l'assistance à distance. Sous Linux, la marche à suivre est la suivante :

1. Installez via `.deb` ou `.rpm` afin que le service systemd soit enregistré, ou cliquez sur **Activer le service** dans l'application.
2. Définissez un **mot de passe permanent** robuste dans **Paramètres → Sécurité**. Le mode d'approbation par défaut l'accepte déjà ; ajoutez la 2FA de connexion sur l'appareil contrôlé pour disposer d'un second facteur. Consultez le [guide de configuration de l'accès sans surveillance](/fr/blog/acces-non-surveille-rustdesk-guide-de-configuration).
3. Pour un accès avant l'ouverture de session sous Wayland, utilisez la [préversion Wayland sans surveillance](/fr/blog/unattended-remote-access-wayland-fr) sur les systèmes x86_64 basés sur Debian/Ubuntu, ou configurez l'écran de connexion du gestionnaire d'affichage pour qu'il utilise X11 lorsque c'est possible. Choisir une session de bureau X11 ne concerne que la session après connexion.

## Linux headless : des serveurs sans moniteur

Un cas d'usage courant sous Linux est une machine sans aucun écran branché : un serveur domestique, une machine de laboratoire, une VM. Sans moniteur, la pile graphique n'expose souvent aucune sortie active : il n'y a alors aucune image à capturer, et vous obtenez un écran noir.

Deux manières de lui donner quelque chose à afficher :

- **Un émulateur d'écran (dummy plug)** — un petit adaptateur HDMI/DisplayPort « headless » bon marché qui fait croire au GPU qu'un moniteur est branché.
- **Un pilote d'affichage virtuel** — `xserver-xorg-video-dummy` sous X11, ou une option au niveau du noyau comme VKMS.

## Auto-héberger le serveur RustDesk sous Linux

Tout ce qui précède concerne le _client_. L'autre moitié de l'histoire de RustDesk sous Linux, c'est que le **serveur** — le service `hbbs` pour l'ID/rendez-vous et le relais `hbbr` — est une application native de Linux, son environnement naturel. C'est ce qui vous permet de garder la mise en relation des sessions et le trafic relayé sur une infrastructure qui vous appartient, plutôt que de les faire transiter par le cloud d'un éditeur.

Vous avez deux options. **Server OSS** est gratuit, sans frais de licence ni date d'expiration, et couvre la fonction de base de connexion et de relais. **RustDesk Server Pro** ajoute une console web auto-hébergée, des groupes d'appareils et un carnet d'adresses partagé, ainsi que, dès l'offre Basic, un générateur de client personnalisé à votre marque et [LDAP/Active Directory et le SSO OIDC](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/ldap/). Vous n'êtes pas non plus obligé de passer par Docker : consultez [exécuter Server Pro sans Docker](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/installscript/) pour une installation sur simple VM ou serveur physique.

Une remarque sur l'auto-hébergement : Server OSS et Server Pro sont à vous d'exploiter, de corriger et de sécuriser. Les [exigences matérielles sont très faibles](https://rustdesk.com/docs/fr/self-host/rustdesk-server-oss/install/) (un serveur cloud basique, voire un Raspberry Pi, suffit pour Server OSS) ; dimensionnez selon vos appareils en ligne et votre trafic relayé, et désignez une personne responsable des mises à jour, de la supervision et des sauvegardes. Les offres payantes incluent le support. (Server Pro vérifie aussi sa licence en HTTPS sortant environ une fois par jour : il lui faut donc un accès à rustdesk.com.)

## Pour commencer

Installez le paquet de votre distribution, définissez un mot de passe permanent pour l'accès sans surveillance et — si la souveraineté des données est ce qui vous amène — déployez Server OSS. Pour le détail actuel des offres, [rustdesk.com/pricing](https://rustdesk.com/pricing) fait foi, et [sales@rustdesk.com](mailto:sales@rustdesk.com) peut vous présenter Server Pro. Vous voulez d'abord le voir fonctionner ? [Découvrez RustDesk en action](https://www.youtube.com/@rustdesk).

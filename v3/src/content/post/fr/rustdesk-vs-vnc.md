---
publishDate: 2026-07-09T18:44:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'fr'
translationKey: 'rustdesk-vs-vnc'
draft: false
title: 'RustDesk vs VNC : traversée NAT, codecs, chiffrement'
excerpt: 'RustDesk vs VNC en pratique : traversée du NAT sans redirection de port, codecs modernes, chiffrement intégré, et pourquoi les équipes passent de VNC à RustDesk.'
image: '~/assets/images/blog/rustdesk-vs-vnc-og.webp'
category: 'Comparatifs'
tags: ['RustDesk', 'VNC', 'Comparatif', 'Open source']
author: 'RustDesk Team'
slug: 'rustdesk-vs-vnc-traversee-nat-codecs-chiffrement'
faq:
  - question: 'RustDesk est-il basé sur VNC ?'
    answer: "Non. VNC utilise le protocole RFB (Remote Framebuffer) pour envoyer des mises à jour de pixels. RustDesk est une application distincte, avec un client open source (AGPL), sa propre architecture de rendez-vous et de relais, des codecs vidéo VP8/VP9/AV1 et des sessions par ID chiffrées de bout en bout. RustDesk n'est ni un client VNC ni un serveur VNC."
  - question: 'VNC fonctionne-t-il sur internet sans redirection de port ?'
    answer: "Non, pas à lui seul. Le protocole VNC/RFB de base n'offre aucune traversée du NAT : un usage sur internet exige généralement de rediriger le port TCP 5900, un VPN ou un tunnel SSH — sauf si vous utilisez le service cloud de mise en relation d'un éditeur. RustDesk met la connexion en relation via un serveur ID et un relais, et traverse ainsi le NAT sans rien de tout cela."
  - question: 'VNC est-il chiffré ?'
    answer: "Seulement dans certaines implémentations. TigerVNC prend en charge la sécurité TLS/X509, RealVNC propose un chiffrement AES et TightVNC recommande un tunnel SSH sur les réseaux non fiables. RustDesk chiffre de bout en bout les sessions mises en relation par ID lorsque les clients sont configurés avec la bonne clé publique du serveur. L'accès direct par adresse IP (Direct IP Access) de RustDesk est un mode distinct, non chiffré, à réserver à un VPN."
  - question: 'RustDesk ou VNC : lequel est préférable pour un home lab sur un réseau local ?'
    answer: "Sur un réseau local de confiance, VNC est souvent le choix le plus simple : il est standardisé, rapide à déployer et disponible sur presque tous les systèmes, Raspberry Pi compris. RustDesk devient le meilleur choix dès que vous sortez du réseau local ou avez besoin d'un accès à distance multi-OS, car il ajoute la traversée du NAT, des codecs vidéo modernes et des sessions par ID chiffrées de bout en bout."
metadata:
  description: "RustDesk vs VNC point par point : traversée du NAT, codecs modernes, chiffrement intégré, auto-hébergement, et où VNC, simple et omniprésent, l'emporte encore."
  keywords: 'RustDesk vs VNC, RustDesk vs RealVNC, traversée NAT VNC, comparaison chiffrement VNC'
---

VNC est l'un des moyens les plus anciens et les plus répandus de contrôler un autre ordinateur. C'est un véritable standard ouvert, il fonctionne presque partout et, sur un réseau local, il est difficile à battre en simplicité. RustDesk vise la même tâche fondamentale, mais a été conçu pour un monde de NAT, de pare-feu et de systèmes d'exploitation hétérogènes. Les différences tiennent à la façon dont chacun traverse un réseau — et à tout ce qu'il faut lui greffer pour le sécuriser.

Cette comparaison s'en tient à des faits durables et vérifiables plutôt qu'à des benchmarks qui dépendent de votre matériel et de votre liaison.

## Ce qu'est réellement VNC

« VNC » désigne une famille d'implémentations — RealVNC, TightVNC, TigerVNC, UltraVNC et d'autres — qui parlent le **protocole RFB (Remote Framebuffer)**. RFB envoie des mises à jour du framebuffer selon des encodages négociés, qui peuvent compresser les images ou recourir à la vidéo. Par exemple, [TigerVNC prend en charge les encodages Tight, JPEG, ZRLE, Hextile, H.264 et Raw](https://tigervnc.org/doc/vncviewer.html). Les performances dépendent donc de l'implémentation et de l'encodage, et non de RFB lui-même.

Les licences sont hétérogènes. TigerVNC est distribué sous licence GNU GPL et TightVNC est un fork ouvert porté par sa communauté, tandis que le visualiseur de RealVNC est un produit propriétaire maintenu commercialement. L'affirmation « VNC est open source » n'est donc vraie que pour _certaines_ implémentations, pas pour toutes.

## Ce qu'est RustDesk

Le client RustDesk et RustDesk Server OSS (le serveur communautaire gratuit) sont **sous licence AGPL** ; Server Pro est un logiciel serveur auto-hébergé, commercial et propriétaire, qui ajoute une gestion centralisée. RustDesk repose sur une architecture ID/rendez-vous et relais. Les clients se connectent vers l'extérieur au serveur ID, qui coordonne des sessions directes en pair-à-pair ou relayées. Le [client prend en charge les codecs logiciels VP8, VP9 et AV1 et les codecs matériels H.264/H.265](https://rustdesk.com/docs/fr/). Vous pouvez utiliser votre propre serveur pour la coordination et le relais sans déployer de VPN ni de tunnel SSH par terminal.

## Le problème d'internet : la traversée du NAT

Le protocole RFB de base n'assure pas la traversée du NAT. Un déploiement VNC direct exige en général une route réseau accessible, par exemple un VPN, un tunnel SSH ou un port redirigé. [TightVNC documente ses options de redirection de port et de SSH](https://www.tightvnc.com/faq.php). Certains produits VNC ajoutent une mise en relation par le cloud ; c'est une fonctionnalité du produit, pas une exigence de RFB.

RustDesk a été conçu à l'inverse. Comme les clients des terminaux se connectent **en sortie** vers un serveur de rendez-vous et se rabattent sur un relais lorsque le trajet direct échoue, RustDesk **traverse le NAT et les pare-feu sans redirection de port par terminal, sans VPN et sans tunnel SSH**. Les terminaux n'ont besoin d'aucun port d'écoute entrant, mais un serveur ID/rendez-vous et de relais auto-hébergé doit accepter le trafic entrant sur ses ports de service documentés. C'est cette même traversée du NAT qui en fait une [option de bureau à distance gratuite et pratique pour les entreprises](/fr/blog/meilleurs-logiciels-de-bureau-a-distance-gratuits-pour-les-entreprises), pour l'accès à distance et multi-OS.

## Chiffrement : par défaut ou « ça dépend »

La sécurité de VNC varie selon l'implémentation. [TigerVNC prend en charge les types de sécurité TLS et X509](https://tigervnc.org/doc/vncviewer.html), tandis que [TightVNC prévient que le trafic de session n'est pas chiffré et recommande un tunnel SSH sur les réseaux non fiables](https://www.tightvnc.com/faq.php). Ce sont le serveur, le visualiseur et le type de sécurité configuré qui déterminent si une session VNC est chiffrée.

RustDesk prend en charge des **sessions mises en relation par ID chiffrées de bout en bout**, que le trajet négocié soit direct ou relayé. Les clients auto-hébergés ont besoin de la [bonne clé publique du serveur](https://rustdesk.com/docs/fr/self-host/client-configuration/). L'**accès direct par adresse IP** (Direct IP Access) — saisir une adresse IP au lieu d'utiliser un ID — est un mode différent, [non chiffré](https://github.com/rustdesk/rustdesk/wiki/FAQ#i-only-use-rustdesk-for-a-few-devices-on-my-local-network-with-no-internet-connectivity-can-i-still-use-rustdesk-with-direct-ip-access) ; protégez ce chemin par un VPN.

## RustDesk face à VNC, en un coup d'œil

|                                | RustDesk                                                                                         | VNC (RFB)                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Ce que c'est                   | Une application + serveurs de rendez-vous/relais                                                 | Protocole RFB, nombreuses implémentations                                                                       |
| Code source                    | Client et Server OSS : AGPL ; Server Pro : propriétaire                                          | Hétérogène : GPL/ouvert (TigerVNC, TightVNC), propriétaire (RealVNC)                                            |
| Multiplateforme                | Windows, macOS, Linux, Android ; iOS (contrôleur uniquement)                                     | Très large, y compris Raspberry Pi                                                                              |
| Traversée du NAT               | Rendez-vous et relais intégrés                                                                   | Absente du RFB de base ; des services de mise en relation propres à un produit ou des routes VPN/SSH peuvent y suppléer |
| Chiffrement                    | Sessions par ID chiffrées avec la bonne clé ; accès direct par adresse IP non chiffré            | Selon l'implémentation : TLS/X509 dans TigerVNC, AES dans RealVNC, SSH recommandé pour TightVNC                 |
| Transport vidéo                | VP8/VP9/AV1, H.264/H.265 matériel en option                                                      | Les encodages RFB varient selon l'implémentation ; des chemins d'images compressées et de vidéo peuvent exister |
| Auto-hébergement               | Oui — votre propre serveur ID/relais                                                             | Oui pour les implémentations ouvertes (sans service de mise en relation intégré)                                |
| Configuration sur réseau local | Simple                                                                                           | Très simple                                                                                                     |
| Protocole standardisé          | Propre à RustDesk                                                                                | Standard RFB ouvert et ancien                                                                                   |

Confirmez le détail actuel des offres RustDesk sur [rustdesk.com/pricing](https://rustdesk.com/pricing).

## Là où RustDesk prend l'avantage

Les avantages de conception de RustDesk apparaissent dès que vous sortez du réseau local ou avez besoin de cohérence entre équipes et plateformes :

- **La portée d'internet sans plomberie.** La traversée du NAT et le repli sur relais suppriment la redirection de port, le VPN ou le tunnel SSH par terminal.
- **Le chiffrement sur le chemin par ID.** Les sessions par ID sont chiffrées de bout en bout, directes ou relayées, dès que les clients disposent de la clé publique de votre serveur.
- **Le choix des codecs.** VP8, VP9 et AV1 en logiciel, plus les codecs matériels H.264/H.265 lorsque l'appareil les prend en charge.
- **Un client ouvert et un serveur déployable.** Vous pouvez inspecter et compiler vous-même le client et Server OSS ; vos propres services ID et relais coordonnent les connexions et transportent le trafic relayé.

La contrepartie : auto-héberger RustDesk signifie que **quelqu'un exploite le serveur** — provisionnement, TLS, ports et correctifs au fil du temps. Une installation VNC limitée au réseau local s'en dispense totalement.

## Alors, lequel choisir ?

Pour un réseau local de confiance, un segment isolé (air-gapped) ou un Raspberry Pi, la simplicité et la standardisation de VNC restent vraiment difficiles à battre. Dès qu'il faut traverser internet en sécurité, que vous voulez un chiffrement actif par défaut ou que vous devez prendre en charge, depuis un seul outil, un mélange de Windows, macOS, Linux, Android et iOS, l'architecture de RustDesk fait davantage le travail à votre place. Et si vous hésitez déjà avec les outils natifs de Windows, notre comparatif [RustDesk vs RDP](/fr/blog/rustdesk-vs-rdp-multiplateforme-contre-natif-windows) couvre aussi ce choix.

## Essayez-le

Si cette comparaison met enfin votre tunnel SSH à la retraite, commencez par Server OSS — gratuit, sans frais de licence ni expiration, traversée du NAT incluse. Écrivez à [sales@rustdesk.com](mailto:sales@rustdesk.com) lorsque vous voudrez les conditions d'évaluation de Pro ; les tarifs actuels des offres figurent sur [rustdesk.com/pricing](https://rustdesk.com/pricing).

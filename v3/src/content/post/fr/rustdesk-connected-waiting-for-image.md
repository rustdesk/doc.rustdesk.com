---
publishDate: 2026-07-06T08:31:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'fr'
translationKey: 'rustdesk-connected-waiting-for-image'
draft: false
title: "RustDesk « Connecté ; en attente de l'image » : guide de dépannage complet"
excerpt: "Diagnostiquez « Connecté ; en attente de l'image… » dans RustDesk : écran disponible, autorisations de capture, codecs, pilotes GPU, versions Wayland et connectivité du relais."
image: ~/assets/images/blog/rustdesk-connected-waiting-for-image-og.webp
category: 'Dépannage'
tags: ['RustDesk', 'Dépannage']
author: 'RustDesk Team'
slug: 'rustdesk-connected-waiting-for-image-guide-de-depannage-complet'
faq:
  - question: "Pourquoi RustDesk affiche-t-il « Connecté ; en attente de l'image… » ?"
    answer: "La session est établie, mais aucune image n'arrive. La cause la plus souvent signalée : la machine distante n'a rien à capturer, faute de moniteur, parce que l'écran est en veille ou parce que l'autorisation d'enregistrement d'écran manque. Branchez un moniteur, un adaptateur HDMI factice ou un écran virtuel, réveillez l'écran, accordez l'autorisation, puis essayez un autre codec, comme VP9."
  - question: "Comment corriger l'attente d'image de RustDesk sur un ordinateur headless ?"
    answer: "Donnez à l'ordinateur headless un écran à capturer. Branchez un moniteur ou un adaptateur HDMI factice peu coûteux, qui fait se comporter le GPU comme si un écran était connecté, ou configurez un écran virtuel. Gardez ensuite l'écran éveillé, vérifiez l'autorisation de capture d'écran et passez à un codec logiciel comme VP9 si l'image n'apparaît toujours pas."
  - question: "Changer le codec vidéo permet-il de corriger l'écran noir ?"
    answer: "Souvent, oui. Dans la barre d'outils de la session distante ou dans les paramètres, vous pouvez changer de codec — VP8, VP9, AV1, ou H.264/H.265 lorsque le matériel les prend en charge. Un codec que le matériel distant ne sait pas encoder affiche une image vide ou figée, et revenir à un codec logiciel comme VP9 rétablit généralement l'image."
  - question: "RustDesk affiche l'image sur un PC mais pas sur un autre. Pourquoi ?"
    answer: "Une différence entre deux PC désigne un problème local sur la machine défaillante : un écran en veille ou absent, une autorisation d'enregistrement d'écran manquante sous macOS, un pilote GPU obsolète, un conflit d'accélération matérielle ou un codec que le matériel ne sait pas gérer. Appliquez les solutions par cause sur la machine qui échoue, pas sur celle qui fonctionne."
  - question: "Mon serveur auto-hébergé peut-il être à l'origine de l'attente d'image ?"
    answer: "En général, non. Au moment où RustDesk affiche « Connecté ; en attente de l'image… », le serveur ID a déjà fait son travail. Un port de relais bloqué ou un relais surchargé peut toutefois bloquer le flux vidéo. Sur un serveur auto-hébergé, autorisez TCP 21115-21117 et UDP 21116, et n'autorisez TCP 21118-21119 que si vous utilisez des clients WebSocket."

metadata:
  description: "RustDesk affiche « Connecté ; en attente de l'image » ? Corrigez l'écran noir : machines sans écran, veille, codecs, pilotes GPU, Wayland et ports du pare-feu."
  keywords: "RustDesk connected waiting for image, RustDesk en attente de l'image, RustDesk écran noir, résoudre RustDesk waiting for image, RustDesk pas d'image, RustDesk adaptateur HDMI factice, RustDesk codec vidéo, RustDesk accélération matérielle"
---

Si RustDesk affiche **« Connecté ; en attente de l'image… »** (« Connected, waiting for image » dans l'interface anglaise) puis un écran noir, le plus dur a déjà fonctionné : les deux extrémités se sont trouvées et la session est établie. Ce qui manque, c'est l'_image_. Le plus souvent, la machine distante n'a rien à capturer ; plus rarement, un codec, un pilote GPU ou le trajet du relais bloque le flux. Ce guide passe en revue chaque cause, de la plus souvent signalée aux cas particuliers, avec une solution concrète pour chacune.

## La réponse courte

La session est connectée, mais aucune image n'arrive. La cause la plus souvent signalée est une machine distante qui n'a rien à capturer : **pas de moniteur, un écran en veille ou une autorisation d'enregistrement d'écran manquante**. Donnez à RustDesk un écran réel et éveillé (un moniteur, un adaptateur HDMI factice ou un écran virtuel) et la bonne autorisation, puis passez à un autre codec, comme VP9, si l'image n'apparaît toujours pas. Si l'écran reste noir, mettez à jour le pilote GPU et vérifiez que les ports du relais sont joignables.

## Commencez ici : y a-t-il quelque chose à capturer ?

La cause la plus souvent signalée est une **machine headless** — un serveur, un mini-PC ou une station de travail qui tourne sans moniteur branché, ou avec l'affichage en veille. Sans affichage actif, il n'y a souvent aucun framebuffer à capturer : RustDesk se connecte, mais n'a rien à envoyer. Ce schéma revient régulièrement dans le suivi des problèmes de RustDesk, notamment dans des [signalements d'écran noir précisément lorsque le moniteur de la cible est éteint](https://github.com/rustdesk/rustdesk/issues/9884) et dans le [fil « Connected, waiting for image »](https://github.com/rustdesk/rustdesk/issues/222), ouvert de longue date.

Deux façons de lui donner quelque chose à capturer :

- **Branchez un moniteur** et assurez-vous qu'il est allumé et éveillé.
- **Utilisez un adaptateur HDMI (ou DisplayPort) factice.** Ces adaptateurs peu coûteux font croire au GPU qu'un écran est connecté, si bien qu'il continue de générer un framebuffer que RustDesk peut capturer. C'est la solution standard pour les postes headless et les serveurs domestiques.

Si un moniteur _est_ bien branché, le suspect suivant est sa mise en veille.

## Solutions par cause

| Cause                             | Symptôme                                     | Solution                                                                                                                                                             |
| --------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headless / pas d'affichage        | Écran noir sur un serveur ou un mini-PC      | Branchez un moniteur ou ajoutez un adaptateur HDMI factice                                                                                                           |
| Écran en veille / verrouillé      | Fonctionnait avant, noir après inactivité    | Réveillez l'écran ; gardez l'affichage éveillé pendant les heures d'accès ; laissez le verrouillage par mot de passe activé                                          |
| Autorisation manquante (macOS)    | Se connecte, écran noir permanent            | Accordez l'enregistrement d'écran dans Confidentialité et sécurité ; installez l'assistant pour l'écran de connexion                                                 |
| Incompatibilité de codec          | Image vide ou figée                          | Changez de codec (VP8 / VP9 / AV1 / H.264 / H.265) ; revenez à un codec logiciel                                                                                     |
| Conflit d'accélération matérielle | Noir sur certains GPU                        | Désactivez le codec matériel dans la barre d'outils de session ou les Paramètres, ou changez de codec                                                                |
| Pilote GPU obsolète               | Noir après une mise à jour du pilote/de l'OS | Mettez à jour le pilote GPU (NVIDIA en particulier)                                                                                                                  |
| Session Wayland (Linux)           | Pas d'invite de consentement, écran vide     | Acceptez l'invite PipeWire/portail et vérifiez que le portail de bureau est installé ; une session X11 fonctionne aussi là où une distribution en propose encore une |
| Blocage réseau / relais           | Reste bloqué sur « en attente de l'image »   | Autorisez TCP 21115-21117 et UDP 21116 ; ajoutez TCP 21118-21119 pour les clients WebSocket                                                                          |

### Veille de l'écran, verrouillage et économiseurs d'écran

Si cela fonctionnait avant et que l'écran est devenu noir après une période d'inactivité, c'est que l'affichage s'est mis en veille.

- **Windows :** configurez le mode d'alimentation pour que l'affichage et la machine restent éveillés pendant les heures où vous avez besoin de l'accès à distance. Avec RustDesk installé en tant que service, vous pouvez vous connecter à l'écran de verrouillage : laissez donc le verrouillage par mot de passe activé.
- **macOS :** empêchez l'affichage de se mettre en veille pendant les heures où vous avez besoin de l'accès à distance — réglez-le dans **Réglages Système → Moniteurs** (ou dans les réglages Écran de verrouillage / Énergie), et gardez le Mac branché sur secteur, car la veille se comporte différemment sur batterie.
- **Android :** l'écran doit être allumé pour être partagé ; touchez donc l'écran pour le réveiller avant de vous connecter. Se connecter depuis iOS à un appareil Android en veille, écran éteint, est un [cas connu d'attente d'image](https://github.com/rustdesk/rustdesk/issues/11479) — réveillez d'abord l'appareil cible.

### Autorisations macOS

macOS ne laisse aucune application enregistrer l'écran sans consentement explicite. Si RustDesk se connecte mais reste noir sur un Mac, ouvrez **Réglages Système → Confidentialité et sécurité → Enregistrement de l'écran** et activez RustDesk, puis redémarrez l'application. Un écran noir précisément _à la fenêtre de connexion_ signifie que le service/l'assistant RustDesk n'est pas installé pour s'exécuter avant l'ouverture de session — installez-le pour permettre la capture avant connexion.

### Incompatibilité de codec vidéo

RustDesk peut encoder le flux de plusieurs façons, et le codec par défaut ne convient pas toujours au matériel distant. Dans la barre d'outils de la session (ou dans les Paramètres), changez de codec — **VP8, VP9, AV1, ou H.264/H.265 lorsque le matériel les prend en charge** — et observez si l'image apparaît. Si un codec matériel produit une image vide sur un GPU particulier, revenir à un codec logiciel comme VP9 est la solution fiable.

### Accélération matérielle et pilotes GPU

Certains GPU — les configurations NVIDIA reviennent le plus souvent — entrent en conflit avec les chemins de capture et de rendu accélérés par le matériel de RustDesk. Deux leviers aident :

- **Désactivez le codec matériel.** Dans la barre d'outils de session (ou dans les Paramètres), désactivez **Activer le transcodage matériel** pour que l'encodage repasse par un chemin logiciel — cela fait disparaître l'écran noir sur de nombreux GPU problématiques.
- **Mettez à jour le pilote GPU.** Un écran noir apparu après une mise à jour du pilote ou du système d'exploitation se corrige souvent en passant à un pilote récent, en particulier sur du matériel NVIDIA.

### Linux et Wayland

Sous Linux, les versions standard de RustDesk capturent les bureaux Wayland, y compris plusieurs écrans depuis la version 1.4.3, via **PipeWire et le `xdg-desktop-portal`** dans une session ouverte. Le portail vous demande de choisir l'écran à partager, et les versions 4 et ultérieures du portail peuvent mémoriser ce choix. Si vous obtenez un écran vide sous Wayland, acceptez l'invite de partage d'écran du portail et vérifiez que `xdg-desktop-portal` et PipeWire sont installés et en cours d'exécution. Ouvrir une session X11/Xorg évite aussi le chemin du portail, là où une distribution en propose encore une. Un écran noir à l'écran de connexion (greeter) est attendu avec les versions standard, qui capturent la session ouverte ; la [préversion Wayland pour l'accès sans surveillance](/fr/blog/unattended-remote-access-wayland-fr), distincte et destinée aux **systèmes x86_64 basés sur Debian/Ubuntu**, ajoute l'accès sans surveillance et l'accès à l'écran de connexion après redémarrage.

### Réseau et relais

Comme le message contient le mot « connecté », la session est généralement déjà établie — mais la _vidéo_ peut quand même stagner si le relais est surchargé ou si un port de relais est bloqué. Pour le chemin serveur standard, assurez-vous que **TCP 21115-21117 et UDP 21116** sont joignables de bout en bout. N'ouvrez **TCP 21118-21119 que si vous utilisez des clients WebSocket**. Le serveur de démonstration public est partagé et son débit n'est pas garanti ; si vous dépendez de RustDesk au quotidien, auto-héberger votre relais vous donne la maîtrise de la capacité et de la supervision. Si la session elle-même se coupe ou ne s'établit jamais, c'est un autre problème — consultez la [FAQ de RustDesk Server Pro](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/faq/).

## Gardez tout à jour

Les anciennes versions traînent d'anciens bugs de capture. Mettez à jour **à la fois** le client qui contrôle et le client contrôlé vers la dernière version et, si vous auto-hébergez, mettez aussi le serveur à jour. Plusieurs signalements d'écran noir disparaissent tout simplement après une mise à jour des deux côtés.

## L'avantage open source

Lorsqu'un écran noir résiste à toute la liste de vérifications, RustDesk vous offre ce que les outils propriétaires n'offrent pas : le code de capture réel, sous licence AGPL. Vous (ou un prestataire) pouvez lire exactement comment la capture fonctionne sur votre plateforme, reproduire le problème et déposer un rapport précis sur le dépôt public — au lieu d'attendre dans la file du support d'un éditeur.

## Moins d'inconnues quand le serveur vous appartient

Exploitez [votre propre relais et votre propre serveur ID](/fr/blog/pourquoi-heberger-vous-meme-votre-logiciel-de-bureau-a-distance), et l'infrastructure publique partagée sort de l'équation — une inconnue de moins lorsque vous traquez un problème de capture, et un contrôle total sur les éléments que vous pouvez régler. Un bonus discret, en plus de garder la maîtrise des données.

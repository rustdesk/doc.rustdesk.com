---
publishDate: 2026-07-06T08:31:00Z
lang: 'fr'
translationKey: 'rustdesk-connected-waiting-for-image'
draft: false
title: 'RustDesk « Connected, waiting for image » : guide de dépannage complet'
excerpt: "« Connected, waiting for image » signifie que l'écran distant n'est pas capturé. Voici toutes les causes possibles — machines headless, veille, codecs, pilotes — et leur solution."
image: ~/assets/images/blog/rustdesk-connected-waiting-for-image-og.png
category: 'Dépannage'
tags: ['RustDesk', 'Dépannage']
author: 'RustDesk Team'
slug: 'rustdesk-connected-waiting-for-image-guide-de-depannage-complet'
faq:
  - question: 'Pourquoi RustDesk affiche-t-il « Connected, waiting for image » ?'
    answer: "La session s'est établie avec succès, mais la machine distante ne produit aucune image d'écran à envoyer. La cause la plus fréquente est l'absence d'affichage actif à capturer — un serveur headless sans moniteur, un écran passé en veille ou verrouillé, ou un affichage que le système d'exploitation refuse de laisser RustDesk enregistrer. Corrigez la source de capture et l'image apparaît."
  - question: 'Comment résoudre le « waiting for image » de RustDesk sur un ordinateur headless ?'
    answer: "Une machine sans moniteur n'a aucun framebuffer à capturer, donc RustDesk n'a rien à envoyer. Branchez un véritable moniteur, installez un adaptateur HDMI factice (dummy plug) peu coûteux qui fait croire au GPU qu'un écran est connecté, ou, sous Linux, utilisez la configuration headless documentée (github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support). Réveiller l'écran ou l'empêcher de se mettre en veille résout la plupart des cas."
  - question: "Changer le codec vidéo permet-il de corriger l'écran noir ?"
    answer: "Souvent, oui. Dans la barre d'outils de la session distante ou dans les paramètres, vous pouvez changer de codec — VP8, VP9, AV1, ou H.264/H.265 lorsque le matériel le permet. Un codec que le matériel distant ne peut pas encoder affichera une image vide ou figée, et revenir à un codec logiciel comme VP9 rétablit généralement l'image."
  - question: "RustDesk affiche l'image sur un PC mais pas sur un autre. Pourquoi ?"
    answer: "Cela indique un problème local sur la machine défaillante — un écran en veille ou absent, une autorisation d'enregistrement d'écran manquante sous macOS, un pilote GPU obsolète, un conflit d'accélération matérielle, ou un codec que le matériel ne peut pas gérer. Parcourez les solutions par cause de ce guide sur la machine qui échoue, pas sur celle qui fonctionne."
  - question: "Mon serveur auto-hébergé peut-il être à l'origine du « waiting for image » ?"
    answer: "En général, la session est déjà connectée au moment où ce message apparaît, donc le serveur fait son travail. Mais un relais public surchargé ou un port de relais bloqué peut bloquer le flux vidéo. Pour le chemin serveur standard, autorisez TCP 21115-21117 et UDP 21116 ; n'autorisez TCP 21118-21119 que si vous utilisez des clients WebSocket. Envisagez d'auto-héberger le relais pour un débit plus constant."

metadata:
  description: "RustDesk affiche « Connected, waiting for image » ? Corrigez l'écran noir : affichages headless, veille/verrouillage, codecs vidéo, pilotes GPU, Wayland et ports de pare-feu."
  keywords: "RustDesk connected waiting for image, RustDesk écran noir, résoudre RustDesk waiting for image, RustDesk pas d'image, RustDesk adaptateur HDMI factice, RustDesk codec vidéo, RustDesk accélération matérielle"
---

Si RustDesk affiche **« Connected, waiting for image »** puis un écran noir, bonne nouvelle : le plus dur a déjà été fait — les deux extrémités se sont trouvées et la session est établie. Ce qui manque, c'est l'_image_. Quelque chose sur la machine distante ne produit pas d'image d'écran à envoyer. Ce guide passe en revue toutes les causes connues, de la plus fréquente aux cas particuliers, avec une solution concrète pour chacune.

## La réponse courte

La session est connectée, mais il n'y a aucun framebuffer à capturer. Sur une machine distante **sans moniteur, avec un affichage en veille ou verrouillé, ou un affichage que le système d'exploitation ne laisse pas RustDesk enregistrer**, le flux vidéo n'a rien à encoder. Donnez à RustDesk un affichage réel et actif à capturer — un moniteur, un adaptateur HDMI factice, la bonne autorisation, ou un codec compatible — et l'image apparaît.

## Commencez ici : y a-t-il quelque chose à capturer ?

La cause la plus signalée, de loin, est une **machine headless** — un serveur, un mini-PC ou une station de travail fonctionnant sans moniteur branché, ou avec l'affichage en veille. Sans affichage actif, le GPU ne produit aucun framebuffer, donc RustDesk se connecte mais n'a rien à envoyer. Ce schéma revient sans cesse dans le suivi des problèmes de RustDesk, y compris des [signalements d'écrans noirs précisément lorsque le moniteur de la cible est éteint](https://github.com/rustdesk/rustdesk/issues/9884) et le [fil de discussion « Connected, waiting for image »](https://github.com/rustdesk/rustdesk/issues/222), qui dure depuis longtemps.

Trois façons de lui donner quelque chose à capturer :

- **Branchez un moniteur** et assurez-vous qu'il est allumé et actif.
- **Utilisez un adaptateur HDMI (ou DisplayPort) factice.** Ces adaptateurs peu coûteux font croire au GPU qu'un écran est connecté, ce qui le pousse à continuer de générer un framebuffer que RustDesk peut capturer. C'est la solution standard pour les postes headless et les serveurs personnels.
- **Sous Linux, utilisez le chemin headless documenté.** RustDesk prend en charge les postes Linux headless, mais la configuration diffère d'une session de bureau normale — voir le [wiki Headless Linux Support](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support).

Si un moniteur _est_ bien branché, le prochain suspect est qu'il s'est mis en veille.

## Solutions par cause

| Cause                             | Symptôme                                     | Solution                                                                                                                                                             |
| --------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Headless / pas d'affichage        | Écran noir sur un serveur ou un mini-PC      | Branchez un moniteur, ajoutez un adaptateur HDMI factice, ou utilisez le chemin headless Linux                                                                       |
| Écran en veille / verrouillé      | Fonctionnait avant, noir après inactivité    | Réveillez l'écran ; désactivez la veille/l'économiseur d'écran ; sous macOS, empêchez la mise en veille de l'affichage dans les Réglages                             |
| Autorisation manquante (macOS)    | Se connecte, écran noir permanent            | Accordez l'enregistrement d'écran dans Confidentialité et sécurité ; installez l'assistant pour l'écran de connexion                                                 |
| Incompatibilité de codec          | Image vide ou figée                          | Changez de codec (VP8 / VP9 / AV1 / H.264 / H.265) ; revenez à un codec logiciel                                                                                     |
| Conflit d'accélération matérielle | Noir sur certains GPU                        | Désactivez le codec matériel dans la barre d'outils de session ou les Paramètres, ou changez de codec                                                                |
| Pilote GPU obsolète               | Noir après une mise à jour du pilote/de l'OS | Mettez à jour le pilote GPU (NVIDIA en particulier)                                                                                                                  |
| Session Wayland (Linux)           | Pas d'invite de consentement, vide           | Acceptez l'invite PipeWire/portail et vérifiez que le portail de bureau est installé ; une session X11 fonctionne aussi là où une distribution en propose encore une |
| Blocage réseau / relais           | Reste bloqué sur « waiting for image »       | Autorisez TCP 21115-21117 et UDP 21116 ; ajoutez TCP 21118-21119 pour les clients WebSocket                                                                          |

### Veille de l'écran, verrouillage et économiseurs d'écran

Si cela fonctionnait avant et que l'écran est devenu noir après une période d'inactivité de la machine, c'est que l'affichage s'est mis en veille.

- **Windows :** configurez le mode d'alimentation pour que l'affichage et la machine ne se mettent jamais en veille pendant les heures où vous avez besoin d'un accès à distance, et désactivez l'économiseur d'écran (ou configurez-le pour qu'il ne demande pas de mot de passe en cours de session).
- **macOS :** empêchez l'affichage de se mettre en veille pendant les heures où vous avez besoin d'un accès à distance — configurez cela dans **Réglages Système → Moniteurs** (ou dans les réglages Écran de verrouillage / Énergie), et gardez le Mac branché sur secteur, car la veille se comporte différemment sur batterie.
- **Android :** l'écran doit être allumé pour être partagé, donc touchez l'affichage pour le réveiller avant de vous connecter. Se connecter depuis iOS à un appareil Android endormi avec l'écran éteint est un [cas connu de « waiting for image »](https://github.com/rustdesk/rustdesk/issues/11479) — réveillez d'abord l'appareil cible.

### Autorisations macOS

macOS refuse de laisser une application enregistrer l'écran sans consentement explicite. Si RustDesk se connecte mais reste noir sur un Mac, ouvrez **Réglages Système → Confidentialité et sécurité → Enregistrement d'écran** et activez RustDesk, puis redémarrez l'application. Un écran noir spécifiquement _à l'écran de connexion_ signifie que le service/assistant RustDesk n'est pas installé pour s'exécuter avant qu'un utilisateur ne se connecte — installez-le pour permettre la capture avant connexion.

### Incompatibilité de codec vidéo

RustDesk peut encoder le flux de plusieurs façons, et le codec par défaut ne convient pas toujours au matériel distant. Dans la barre d'outils de la session (ou dans les Paramètres), changez de codec — **VP8, VP9, AV1, ou H.264/H.265 lorsque le matériel le permet** — et observez si l'image apparaît. Si un codec matériel produit une image vide sur un GPU particulier, revenir à un codec logiciel comme VP9 est la solution la plus fiable.

### Accélération matérielle et pilotes GPU

Certains GPU — les configurations NVIDIA reviennent le plus souvent — entrent en conflit avec les chemins de capture et de rendu accélérés par le matériel de RustDesk. Deux leviers peuvent aider :

- **Désactivez le codec matériel.** Dans la barre d'outils de session (ou dans les Paramètres), désactivez **Utiliser le codec matériel** pour que l'encodage repasse par un chemin logiciel — cela résout l'écran noir sur de nombreux GPU problématiques.
- **Mettez à jour le pilote GPU.** Un écran noir apparu après une mise à jour de pilote ou de système d'exploitation est souvent corrigé en passant à un pilote à jour, en particulier sur du matériel NVIDIA.

### Linux et Wayland

Sous Linux, **la capture d'écran Wayland passe par PipeWire et le `xdg-desktop-portal`** : il demande le consentement pour choisir un affichage la première fois — dans la plupart des cas, le choix est mémorisé, donc l'invite ne réapparaît pas — et fonctionne au sein d'une session de connexion active. Il s'agit d'une conception de sécurité propre à Wayland, qui ne couvre donc pas, par nature, l'écran de connexion (greeter) ni une machine véritablement headless — même si la capture Wayland sans surveillance est en développement actif ([PR #15420](https://github.com/rustdesk/rustdesk/pull/15420)). Si vous obtenez un écran vide sous Wayland, la solution consiste généralement à accepter l'invite de partage d'écran du portail et à vérifier que `xdg-desktop-portal` et PipeWire sont installés et en cours d'exécution ; sur une machine headless, utilisez la [configuration headless](https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support) documentée. Se connecter à une session X11/Xorg évite aussi le chemin du portail, là où une distribution en propose encore une — mais comme de nombreuses distributions passent au tout-Wayland, corriger le chemin portail/PipeWire est l'approche la plus pérenne.

### Réseau et relais

Comme le message contient le mot « connected », la session est généralement déjà établie — mais la _vidéo_ peut tout de même stagner si le relais est surchargé ou si un port de relais est bloqué. Pour le chemin serveur standard, assurez-vous que **TCP 21115-21117 et UDP 21116** sont accessibles de bout en bout. N'ouvrez **TCP 21118-21119 que si vous utilisez des clients WebSocket**. Le serveur de démonstration public est partagé et son débit n'est pas garanti ; si vous dépendez de RustDesk au quotidien, auto-héberger votre propre relais vous assure un comportement bien plus constant. Si la session elle-même se coupe ou ne s'établit jamais, il s'agit d'un problème différent — consultez la [FAQ de RustDesk Server Pro](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/faq/).

## Gardez tout à jour

Les anciennes versions conservent d'anciens bugs de capture. Mettez à jour **à la fois** le client contrôleur et le client contrôlé vers la dernière version, et si vous êtes auto-hébergé, mettez également à jour le serveur. Plusieurs signalements d'écran noir disparaissent tout simplement après une mise à jour des deux côtés.

## L'avantage open source

Lorsqu'un écran noir résiste à toute la liste de vérifications, RustDesk vous offre quelque chose que les outils propriétaires n'offrent pas : le code de capture réel sous licence AGPL. Vous (ou un prestataire) pouvez lire exactement comment la capture fonctionne sur votre plateforme, reproduire le problème, et déposer un rapport précis sur le dépôt public — au lieu d'attendre dans la file d'attente du support d'un éditeur.

## Moins d'inconnues quand le serveur vous appartient

Exploitez [votre propre relais et serveur d'identification](/fr/blog/pourquoi-heberger-vous-meme-votre-logiciel-de-bureau-a-distance), et l'infrastructure publique partagée disparaît de l'équation — une inconnue de moins lorsque vous traquez un problème de capture, et un contrôle total sur les éléments que vous pouvez ajuster. C'est un avantage discret, en plus de la maîtrise de vos données.

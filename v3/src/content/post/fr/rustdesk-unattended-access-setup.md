---
publishDate: 2026-07-08T11:04:00Z
updateDate: 2026-10-14T00:00:00Z
lang: 'fr'
translationKey: 'rustdesk-unattended-access-setup'
draft: false
title: 'Accès sans surveillance RustDesk : guide de configuration'
excerpt: "Configurez correctement l'accès sans surveillance de RustDesk : un mot de passe permanent, un service lancé au démarrage, et un client préconfiguré pour déployer à grande échelle."
image: '~/assets/images/blog/rustdesk-unattended-access-setup-og.webp'
category: 'Déploiement'
tags: ['RustDesk', 'Déploiement', 'Accès sans surveillance']
author: 'RustDesk Team'
slug: 'acces-non-surveille-rustdesk-guide-de-configuration'
faq:
  - question: "Comment configurer l'accès sans surveillance dans RustDesk ?"
    answer: "En deux étapes : définissez un mot de passe permanent dans Paramètres → Sécurité, puis installez RustDesk pour que son service système démarre avec la machine. Le mode d'approbation par défaut accepte déjà le mot de passe permanent ; macOS exige en plus les autorisations Enregistrement de l'écran et Accessibilité. Une fois ces deux étapes faites, vous pouvez joindre la machine en ligne à tout moment, y compris à l'écran de connexion Windows, sans personne devant."
  - question: "Pourquoi ma connexion RustDesk se coupe-t-elle lorsque l'utilisateur se déconnecte ?"
    answer: "Parce que RustDesk tourne en exécutable portable et non en service installé. Un processus portable vit dans la session de l'utilisateur : il s'arrête à la déconnexion et, sans élévation, ne peut pas agir sur le bureau sécurisé UAC de Windows. Installez RustDesk et laissez son service système activé ; le service fonctionne indépendamment de tout utilisateur connecté. L'élévation de la version portable reste disponible pour l'assistance Windows en présence de l'utilisateur."
  - question: "L'accès sans surveillance avec un mot de passe permanent est-il sûr ?"
    answer: "Oui, lorsqu'il est bien configuré. Utilisez un mot de passe permanent long et unique, différent de celui de la session du système d'exploitation, activez la 2FA de connexion sur l'appareil contrôlé, et limitez qui peut se connecter avec une liste blanche d'IP ou d'ID et, sur Server Pro, le Contrôle d'accès. Maintenez les clients à jour et examinez les journaux. L'auto-hébergement place le serveur de rendez-vous, le relais et la console sur des serveurs que vous exploitez."
  - question: "Puis-je déployer l'accès sans surveillance de RustDesk sur de nombreux ordinateurs à la fois ?"
    answer: "Oui. Sur les offres auto-hébergées Basic et supérieures, le générateur de client personnalisé (Custom Client Generator) produit un programme d'installation préconfiguré, avec l'adresse de votre serveur, la clé et les paramètres intégrés, pour que les utilisateurs finaux n'aient rien à saisir. Déployez-le avec vos outils de déploiement existants : chaque appareil installe le service et s'enregistre automatiquement auprès de votre serveur."
  - question: "L'accès sans surveillance fonctionne-t-il à l'écran de connexion Windows ?"
    answer: "Oui, une fois RustDesk installé en tant que service. Le service installé démarre avec le système avant toute ouverture de session : vous pouvez donc vous connecter à l'écran de connexion, vous authentifier et même déclencher un redémarrage puis vous reconnecter. L'exécutable portable ne le permet pas, car il n'existe qu'au sein d'une session utilisateur."

metadata:
  description: "Configurez l'accès sans surveillance de RustDesk : mot de passe permanent, service lancé au démarrage, notes Windows/macOS/Linux et déploiement sur un parc."
  keywords: 'accès sans surveillance RustDesk, mot de passe permanent RustDesk, démarrage automatique RustDesk, installation du service RustDesk, configuration accès sans surveillance RustDesk, déploiement RustDesk à grande échelle, accès à distance sans surveillance'
---

L'accès sans surveillance consiste à joindre un ordinateur alors que personne n'est assis devant — un serveur en baie, une borne, le PC d'un proche à l'autre bout du pays. RustDesk le fait très bien dès que deux éléments sont en place : un **mot de passe permanent**, pour que personne n'ait à approuver chaque connexion, et RustDesk exécuté **en tant que service**, pour qu'il soit disponible avant l'ouverture de session et après la déconnexion. Ce guide couvre ces deux points, les autorisations propres à chaque plateforme et le déploiement sur tout un parc.

## La réponse courte

Définissez un **mot de passe permanent** (Paramètres → Sécurité) et **installez RustDesk en tant que service système**, qui démarre avec la machine. Le mode d'approbation par défaut accepte déjà le mot de passe permanent, si bien que personne n'a à cliquer pour accepter ; le service fonctionne indépendamment de tout utilisateur connecté, ce qui vous permet de vous connecter à tout moment, y compris à l'écran de connexion Windows. macOS exige en plus les autorisations Enregistrement de l'écran et Accessibilité. Pour déployer à grande échelle, générez un client préconfiguré afin que chaque machine s'installe d'elle-même auprès de votre serveur.

## Étape 1 : définir un mot de passe permanent

Par défaut, RustDesk affiche un mot de passe à usage unique renouvelé, qu'une personne présente à l'autre bout vous lirait. Pour l'accès sans surveillance, vous le remplacez par un identifiant fixe :

1. Ouvrez RustDesk sur la machine que vous souhaitez joindre.
2. Allez dans **Paramètres → Sécurité** (versions plus anciennes : la zone du mot de passe sur l'écran principal).
3. Choisissez **Définir le mot de passe permanent** et saisissez une valeur forte et unique.

Les paramètres par défaut acceptent déjà ce mot de passe : les sessions sont acceptées via mot de passe ou clic de confirmation, et les deux types de mot de passe sont autorisés. Si quelqu'un a limité le mode d'approbation au clic seul ou le type de mot de passe au mot de passe à usage unique, revenez à **Accepter les sessions via mot de passe** (ou **Accepter les sessions via mot de passe ou clic de confirmation**) et à **Utiliser un mot de passe permanent** (ou **Utiliser les deux mots de passe**). Pour les déploiements gérés, les [clés de configuration](https://rustdesk.com/docs/fr/self-host/client-configuration/advanced-settings/#approve-mode) correspondantes sont `approve-mode` (par défaut `password-click`) et `verification-method` (par défaut `use-both-passwords`).

La [documentation du client RustDesk](https://rustdesk.com/docs/fr/client/) présente cette étape comme le cœur de l'accès sans surveillance. Une règle mérite d'être soulignée : **ne réutilisez pas le mot de passe de session du système d'exploitation.** Utilisez pour RustDesk un mot de passe dédié à forte entropie, afin que la fuite de l'un ne compromette pas l'autre.

## Étape 2 : installer en tant que service et démarrer avec la machine

C'est l'étape que l'on oublie. Un `.exe` ou un `.app` portable s'exécute dans la session de l'utilisateur : il s'arrête lorsque l'utilisateur se déconnecte et, sous Windows, il ne peut pas agir sur le bureau sécurisé UAC sans élévation (l'[élévation de la version portable](https://rustdesk.com/docs/fr/client/windows/windows-portable-elevation/) existe pour l'assistance en présence de l'utilisateur). Pour un accès vraiment sans surveillance, RustDesk doit tourner en arrière-plan en tant que **service système**.

- Lancez le **programme d'installation** de RustDesk (et non la version portable) et terminez l'installation.
- Dans **Paramètres → Général**, vérifiez que le **Service** est en cours d'exécution — cliquez sur **Démarrer** s'il apparaît arrêté. Une fois installé, le service démarre automatiquement avec la machine.

Dès que RustDesk tourne en tant que service, il se charge avant toute ouverture de session : c'est ce qui vous permet de vous connecter à l'**écran de connexion**, de vous authentifier à distance, et même de redémarrer puis de vous reconnecter sans personne sur place. macOS et Linux ajoutent leurs propres exigences de capture d'écran et de session graphique, détaillées ci-dessous.

## Notes par plateforme

| Plateforme | Que faire                                                                | Points de vigilance                                                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Windows    | Installer ; laisser le service actif (il démarre avec la machine)        | L'exe portable s'arrête à la déconnexion et ne peut pas agir sur les invites UAC sans élévation ; utilisez le programme d'installation                                                              |
| macOS      | Installer, définir un mot de passe permanent, accorder les autorisations | Enregistrement de l'écran et Accessibilité doivent être accordés ; la capture à l'écran de connexion nécessite l'installation de l'assistant                                                         |
| Linux      | Installer le paquet du service                                           | Les versions Wayland standard capturent la session ouverte ; la [préversion sans surveillance](/fr/blog/unattended-remote-access-wayland-fr) ajoute l'accès à l'écran de connexion (Debian/Ubuntu x86_64) |
| Android    | Définir un mot de passe permanent ; activer la capture                   | L'écran doit être allumé ; accordez le consentement de capture d'écran (MediaProjection) et l'autorisation de saisie                                                                                 |

### Windows

La voie la plus simple. Installez, activez le service, définissez le mot de passe permanent, c'est terminé. Comme le service se lance au démarrage, l'accès sans surveillance à l'écran de connexion et à travers les redémarrages fonctionne comme prévu.

### macOS

macOS soumet la capture d'écran et la saisie à des autorisations. Après l'installation, ouvrez **Réglages Système → Confidentialité et sécurité** et accordez à RustDesk à la fois **Enregistrement de l'écran** et **Accessibilité**. Pour accéder à la _fenêtre de connexion_ (avant toute ouverture de session), le service/l'assistant RustDesk doit être installé afin de pouvoir capturer l'écran avant la connexion — sinon vous obtiendrez un écran noir à cet endroit, le même [problème de capture traité dans notre guide sur l'écran noir](/fr/blog/rustdesk-connected-waiting-for-image-guide-de-depannage-complet).

### Linux

Installez RustDesk pour que son service se lance au démarrage. Les versions standard de RustDesk capturent les bureaux Wayland, y compris plusieurs écrans depuis la version 1.4.3, via PipeWire et `xdg-desktop-portal` dans une session ouverte. Pour une machine qui reste sur l'écran de connexion (greeter), la [préversion Wayland pour l'accès sans surveillance](/fr/blog/unattended-remote-access-wayland-fr), distincte et destinée aux **systèmes x86_64 basés sur Debian/Ubuntu**, ajoute l'accès sans surveillance et l'accès à l'écran de connexion après un redémarrage. Là où une distribution en propose encore un, un écran de connexion X11 est une autre option ; sur une machine headless, ajoutez un adaptateur factice ou un écran virtuel. Consultez [RustDesk pour Linux](/fr/blog/rustdesk-pour-linux-le-bureau-a-distance-open-source) pour les détails.

## Étape 3 : déployer à grande échelle avec un client préconfiguré

Configurer une machine à la main, c'est faisable. En configurer cinquante, non. Sur les **offres auto-hébergées Basic et supérieures**, le **générateur de client personnalisé** (Custom Client Generator) de la console web crée un programme d'installation où **l'adresse de votre serveur, la clé publique et les paramètres sont déjà intégrés**, si bien que les utilisateurs finaux n'ont rien à saisir. Associé à votre outil de déploiement existant (stratégie de groupe, Intune, le RMM d'un MSP, un script shell), chaque appareil installe le service et s'enregistre auprès de _votre_ serveur au premier lancement.

C'est là que l'auto-hébergement paie pour les équipes : tout le parc s'enregistre auprès de serveurs ID/rendez-vous et de relais que vous exploitez (voir [RustDesk pour les MSP](/fr/blog/rustdesk-pour-les-msp-un-outil-unique-auto-heberge-et-personnalisable-a)). La licence des offres Server Pro porte sur les **comptes utilisateurs et les appareils gérés**. Les offres standard incluent des connexions simultanées illimitées ; seule l'offre [Customized V2](https://rustdesk.com/pricing#custom2) prévoit un nombre défini de connexions simultanées. Budgétez selon le nombre de machines et d'administrateurs — voir [ce qui compte comme appareil géré](/fr/blog/quest-ce-qui-compte-comme-appareil-gere-dans-rustdesk). Servez la console web [en HTTPS](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/faq/#configurer-https-pour-la-console-web-manuellement) derrière un reverse proxy.

## Verrouillez l'accès

L'accès sans surveillance est une porte ouverte en permanence sur une machine ; traitez donc les identifiants avec sérieux :

- **Un mot de passe permanent fort et unique**, changé régulièrement.
- **La 2FA de connexion** sur l'appareil contrôlé et, sur Server Pro, le [Contrôle d'accès](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/permissions/), qui détermine qui peut joindre quels appareils au moyen de règles par utilisateur et par groupe d'appareils (les autorisations des groupes d'utilisateurs et des groupes d'appareils se cumulent). Le carnet d'adresses partagé ne fait qu'organiser les entrées ; ce n'est pas une frontière d'accès. Le [Rôle de contrôle](https://rustdesk.com/docs/fr/self-host/rustdesk-server-pro/control-role/) limite ce qu'un technicien peut faire pendant une session.
- **Auto-hébergez le serveur**, pour que le serveur de rendez-vous, le relais, la console et les données de gestion stockées tournent sur l'infrastructure de votre choix. Le client RustDesk et Server OSS sont sous licence AGPL, ce qui permet d'examiner leur code d'authentification ; Server Pro est un logiciel serveur auto-hébergé, commercial et propriétaire.

## Un accès sans surveillance que vous contrôlez réellement

Pointez un parc toujours allumé vers un serveur que vous exploitez, et l'accès permanent à ces machines reste mis en relation par du matériel qui vous appartient, et non par un cloud que vous louez. Pour un accès permanent, garder ce chemin entre vos mains vaut bien ces quelques minutes de configuration.
